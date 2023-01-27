import connect from "@/config/db";
import Bid from "@/models/Bid";
import { authMiddleware } from "@/utils";

export default async function Bids(req, res) {
  connect();
  const { query } = req;
  if (req.method === "GET") {
    const bids = await Bid.find({ category: query.name });

    if (bids?.length < 1) {
      return res.status(404).json({ message: "No bid available" });
    }
    return res.status(200).json(bids);
  }

  return res.status(400).json({ message: "Method not allowed" });
}
