import { authMiddleware } from "@/utils";
import User from "@/models/User";
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
  const auth = await authMiddleware({ req, res });
  if (auth?.code !== 200) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { query } = req;
  const user = await User.findOne({ _id: query?.id });

  if (!user) return res.status(404).json({ message: "User not found" });

  return res.status(200).json(user);
});

export default api;

// export default async function UserAPI(req, res) {
//   connect();

//   const auth = await authMiddleware({ req, res });
//   if (auth?.code !== 200) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
//   const { query } = req;
//   if (req.method === "GET") {
//     const user = await User.findOne({ _id: query?.id });

//     if (!user) return res.status(404).json({ message: "User not found" });

//     return res.status(200).json(user);
//   }
// }
