import { authMiddleware } from "@/utils";
import User from "@/models/User";
import connect from "@/config/db";

export default async function UserAPI(req, res) {
  connect();

  const auth = await authMiddleware({ req, res });
  if (auth?.code !== 200) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { query, body } = req;
  if (req.method === "GET") {
    const user = await User.findOne({ _id: auth?.data?.id });

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  }

  if (req.method === "PUT") {
    const user = await User.updateOne(
      { _id: auth?.data?.id },
      { $set: body },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  }
}
