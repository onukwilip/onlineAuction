import { authMiddleware } from "@/utils";
import Categories from "@/models/Categories";
import connect from "@/config/db";
import nextConnect from "next-connect";
import cors from "cors";

connect();

const api = nextConnect({
  onNoMatch: (req, res) => {
    return res.status(400).json({ message: `${req.method} not allowed` });
  },
});

api.use(cors());

api.get(async (req, res) => {
  const user = await Categories.find();

  if (!user) return res.status(404).json({ message: "No categories" });

  return res.status(200).json(user);
});

export default api;

// export default async function CategoriesEndpoint(req, res) {

//   if (req.method === "GET") {
//     const user = await Categories.find();

//     if (!user) return res.status(404).json({ message: "No categories" });

//     return res.status(200).json(user);
//   }
// }
