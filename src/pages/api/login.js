import connect from "@/config/db";
import User from "@/models/User";
import { generateJWT, generateToken } from "@/utils";
import bcrypt from "bcrypt";

export default async function Login(req, res) {
  connect();

  const body = req.body;
  const password = body?.password;
  const user = await User.findOne({ email: body?.email });

  if (user && (await bcrypt.compare(password, user?.password))) {
    if (user.authenticated === true) {
      // Return JWT token
      const token = await generateToken({
        userId: user?.id,
        email: user?.email,
        req,
        res,
      });

      return res.status(200).json({
        message: "Login successfull",
        access_token: token?.data?.accessToken,
        refresh_token: token?.data?.refreshToken,
        user: user,
      });
    }
    return res.status(400).json({ message: "User not authenticated" });
  }

  return res.status(404).json({ message: "Incorrect username or password" });
}
