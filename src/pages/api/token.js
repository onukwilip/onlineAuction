import connect from "@/config/db";
import { authMiddleware } from "@/utils";

export default async function Token(req, res) {
  connect();

  if (req.method === "GET") {
    const response = await authMiddleware({ req, res });
    return res.status(response?.code || 400).json(response);
  }
  return res.status(400).json({ message: "Method not allowed" });
}
