import connect from "@/config/db";
import Bid from "@/models/Bid";
import { authMiddleware } from "@/utils";
import nextConnect from "next-connect";
import cors from "cors";

connect();

const api = nextConnect({
  onNoMatch: (req, res) => {
    return res
      .status(400)
      .json({ message: "Only GET and POST ruests are allowed" });
  },
});

api.use(cors());

api.get(async (req, res) => {
  const auth = await authMiddleware({ req, res });
  if (auth?.code !== 200) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const bids = await Bid.find({ "winner.userId": auth?.data?.id });

  if (bids?.length < 1) {
    return res.status(404).json({ message: "No bid available" });
  }
  return res.status(200).json(bids);
});

export default api;

// export default async function Bids(req, res) {
//   connect();

//   if (req.method === "GET") {
//     const auth = await authMiddleware({ req, res });
//     if (auth?.code !== 200) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const bids = await Bid.find({ 'winner.userId': auth?.data?.id });

//     if (bids?.length < 1) {
//       return res.status(404).json({ message: "No bid available" });
//     }
//     return res.status(200).json(bids);
//   }

//   return res.status(400).json({ message: "Method not allowed" });
// }
