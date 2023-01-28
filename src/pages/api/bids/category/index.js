import connect from "@/config/db";
import Bid from "@/models/Bid";
import { authMiddleware } from "@/utils";

export default async function Bids(req, res) {
  connect();
  const { body } = req;
  if (req.method === "POST") {
    if (!Array.isArray(body) || body?.length < 1)
      return res
        .status(400)
        .json({ message: "Body must contain an array of at least one object" });

    const bids = await Bid.find({ $or: body });

    if (bids?.length < 1) {
      return res.status(404).json({ message: "No bid available" });
    }
    return res.status(200).json(bids);
  }

  return res.status(400).json({ message: "Method not allowed" });
}
