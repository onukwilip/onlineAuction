import connect from "@/config/db";
import Bid from "@/models/Bid";
import { authMiddleware } from "@/utils";

export default async function Bids(req, res) {
  connect();

  if (req.method === "GET") {
    const auth = await authMiddleware({ req, res });
    if (auth?.code !== 200) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const bids = await Bid.find({ userId: auth?.data?.id });

    if (bids?.length < 1) {
      return res.status(404).json({ message: "No bid available" });
    }
    return res.status(200).json(bids);
  }

  return res.status(400).json({ message: "Method not allowed" });
}
