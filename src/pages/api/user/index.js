import { authMiddleware, storage, uploadImage } from "@/utils";
import User from "@/models/User";
import connect from "@/config/db";
import nextConnect from "next-connect";
import multer from "multer";
import cors from "cors";

connect();

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: multer.memoryStorage(),
});

const api = nextConnect({
  onNoMatch: (req, res) =>
    res.status(404).json({ message: `${req.method} method not allowed` }),
});

api.use(upload.single("image"));

api.use(cors());

api.get(async (req, res) => {
  const auth = await authMiddleware({ req, res });
  if (auth?.code !== 200) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await User.findOne({ _id: auth?.data?.id });

  if (!user) return res.status(404).json({ message: "User not found" });

  return res.status(200).json(user);
});

api.put(async (req, res) => {
  const { body, file } = req;

  const auth = await authMiddleware({ req, res });
  if (auth?.code !== 200) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const image = await uploadImage(file, process.env.CLOUDINARY_FOLDER);

  const user = await User.updateOne(
    { _id: auth?.data?.id },
    { $set: { ...body, image: image?.url } },
    { new: true }
  );

  if (!user) return res.status(404).json({ message: "User not found" });

  return res.status(200).json(user);
});

export default api;
