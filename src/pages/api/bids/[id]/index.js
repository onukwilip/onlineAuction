import connect from "@/config/db";
import Bid from "@/models/Bid";
import Biddings from "@/models/Biddings";
import { authMiddleware } from "@/utils";

export default async function Bids(req, res) {
  connect();
  const { body, query } = req;
  if (req.method === "GET") {
    const bid = await Bid.findOne({ _id: query.id });

    if (bid?.length < 1) {
      return res.status(404).json({ message: "No bid available" });
    }
    return res.status(200).json(bid);
  }

  if (req.method === "PUT") {
    const auth = await authMiddleware({ req, res });
    if (auth?.code !== 200) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const bid = await Bid.findOne({ _id: query.id });
    if (bid?.userId !== auth?.data?.id)
      return res.status(401).json({
        message: "You are NOT aothorized to make changes to this bid",
      });

    const updatedBid = await Bid.updateOne(
      { _id: query.id },
      { $set: { ...body, expired: false, paid: false, "winner.userId": "" } }
    );

    if (!updatedBid) {
      return res.status(400).json({ message: "Something went wrong" });
    }
    return res.status(200).json(updatedBid);
  }

  if (req.method === "DELETE") {
    const auth = await authMiddleware({ req, res });
    if (auth?.code !== 200) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const bid = await Bid.findOne({ _id: query.id });
    if (bid?.userId !== auth?.data?.id)
      return res.status(401).json({
        message: "You are NOT authorized to make changes to this bid",
      });

    const removedBid = await Bid.remove({ _id: query.id });
    await Biddings.remove({ bidId: query.id });

    if (!removedBid) {
      return res.status(400).json({ message: "Something went wrong" });
    }
    return res.status(204).json({ message: "Bid deleted successfully" });
  }

  return res.status(400).json({ message: "Method not allowed" });
}
