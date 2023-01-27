import connect from "@/config/db";
import Bid from "@/models/Bid";
import { authMiddleware } from "@/utils";

export default async function Bids(req, res) {
  connect();

  const auth = await authMiddleware({ req, res });
  if (auth?.code !== 200) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { query } = req;

  if (req.method === "PUT") {
    const bid = await Bid.findOne({ _id: query.id });

    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    if (new Date().getTime() < new Date(bid?.expiry)?.getTime()) {
      return res.status(400).json({ message: "Bid hasn't expired yet!" });
    }

    const updatedBid = await Bid.updateOne(
      { _id: query.id },
      { $set: { expired: true } },
      { new: true }
    );

    if (!updatedBid) {
      return res.status(400).json({ message: "Something went wrong" });
    }
    return res.status(200).json(updatedBid);
  }

  return res.status(400).json({ message: "Method not allowed" });
}