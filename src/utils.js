import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";
import { getCookie, setCookie } from "cookies-next";
import RefreshToken from "@/models/RefreshToken";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import DataURIParser from "datauri/parser";
import path from "path";
import cloudinary from "./cloudinary";

export const generateRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const sendMail = async ({ from, to, subject, html, text }) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "gerydragos@gmail.com",
      pass: process.env.SMTP_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from,
    to,
    subject,
    text,
    html,
  };

  const sent = await transporter.sendMail(mailOptions).catch((e) => {
    console.log(e?.message);
  });

  return sent;
};

export const toBase64 = (string) => {
  return Buffer.from(string, "utf-8").toString("base64");
};

export const fromBase64 = (string) => {
  try {
    return Buffer.from(string, "base64").toString("utf-8");
  } catch (e) {
    return string;
  }
};

export const generateJWT = ({ id, email }) => {
  return jwt.sign(
    {
      id,
      email,
      iat: Math.floor(Date.now() / 1000) - 30,
    },
    process.env.JWT_KEY,
    { expiresIn: 60 * 10 }
  );
};

export const refreshExistingToken = async ({ refresh_token_id, req, res }) => {
  const refreshToken = await RefreshToken.findOne({ id: refresh_token_id });

  if (!refreshToken)
    return { code: 401, data: "Refresh token id doesn't exist" };

  if (new Date().getTime() >= new Date(refreshToken?.expiry).getTime())
    return { code: 401, data: "Refresh token is expired" };

  const new_refresh_token = {
    id: uuidv4(),
    email: refreshToken?.email || "",
    userId: refreshToken?.userId,
    expiry: refreshToken?.expiry,
  };

  await RefreshToken.create(new_refresh_token);
  await RefreshToken.remove({ id: refresh_token_id });
  const token = {
    accessToken: generateJWT({
      id: refreshToken?.userId,
      email: refreshToken?.email,
    }),
    refreshToken: new_refresh_token.id,
  };
  setCookie("access-token", token.accessToken, {
    req,
    res,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
  });
  setCookie("refresh-token", token.refreshToken, {
    req,
    res,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
  });
  return {
    code: 200,
    data: { ...token, id: refreshToken?.userId, email: refreshToken?.email },
  };
};

export const generateToken = async ({ userId, email, req, res }) => {
  const new_refresh_token = {
    id: uuidv4(),
    email: email,
    userId: userId,
    expiry: new Date().setDate(new Date().getDate() + 30),
  };

  const refreshToken = await RefreshToken.create(new_refresh_token);

  if (!refreshToken) return { code: 400, data: null };

  const access_token = generateJWT({ id: userId, email: email });

  const token = {
    accessToken: access_token,
    refreshToken: new_refresh_token.id,
  };

  setCookie("access-token", token.accessToken, {
    req,
    res,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
  });
  setCookie("refresh-token", token.refreshToken, {
    req,
    res,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
  });

  return {
    code: 200,
    data: token,
  };
};

export const verifyJWT = async ({
  access_token,
  refresh_token_id,
  executable,
  req,
  res,
}) => {
  return jwt.verify(access_token, process.env.JWT_KEY, async (err, decoded) => {
    return typeof executable === "function"
      ? await executable({
          err,
          decoded,
          refresh_token_id,
          req,
          res,
        })
      : { code: 401, data: "Not a function" };
  });
};

const checkJWTValue = async ({ err, decoded, refresh_token_id, req, res }) => {
  if (decoded) return { code: 200, data: decoded };
  // else if (err?.name === "TokenExpiredError") {
  //   return await refreshExistingToken({
  //     refresh_token_id: refresh_token_id,
  //   });
  // }
  else {
    return await refreshExistingToken({
      refresh_token_id: refresh_token_id,
      req,
      res,
    });
  }
};

export const authMiddleware = async ({ req, res }) => {
  const headers = req.headers;
  const authorization = headers?.Authorization?.split(" ") || [];
  const h_refresh_token = headers["Refresh-token"];
  const h_access_token =
    authorization[0] === "Bearer" ? authorization[1] : null;

  const access_token =
    getCookie("access-token", { req, res }) || h_access_token;
  const refresh_token =
    getCookie("refresh-token", { req, res }) || h_refresh_token;

  return verifyJWT({
    access_token,
    refresh_token_id: refresh_token,
    executable: checkJWTValue,
    req,
    res,
  });
};

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

export const mapFunction = (url) => {
  // return `/uploads/${eachFile?.filename}`;
  return url;
};

export const uploadImage = async (image, folder) => {
  const parser = new DataURIParser();
  const base64Image = parser.format(
    path.extname(image.originalname).toString(),
    image.buffer
  );
  return await cloudinary.uploader.upload(base64Image.content, folder, {
    resource_type: "image",
  });
};

export const getUploadedImagesUrl = async (files) => {
  const imagesUrls = [];
  for (const image of files) {
    const uploadedImage = await uploadImage(
      image,
      process.env.CLOUDINARY_FOLDER
    );

    imagesUrls.push(uploadedImage?.url);
  }
  return imagesUrls;
};
