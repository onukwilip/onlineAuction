import { authMiddleware } from "@/utils";
import Categories from "@/models/Categories";
import connect from "@/config/db";

export default async function CategoriesEndpoint(req, res) {
  connect();

  if (req.method === "GET") {
    const user = await Categories.find();

    if (!user) return res.status(404).json({ message: "No categories" });

    return res.status(200).json(user);
  }
}
