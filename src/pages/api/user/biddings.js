import { authMiddleware } from "@/utils";
import connect from "@/config/db";
import Biddings from "@/models/Biddings";
import Bid from "@/models/Bid";

export default async function UserAPI(req, res) {
  connect();

  const auth = await authMiddleware({ req, res });
  if (auth?.code !== 200) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (req.method === "GET") {
    let returnBids = [];
    const userBiddings = await Biddings.find({ userId: auth?.data?.id });

    if (!userBiddings)
      return res.status(404).json({ message: "No bids found" });

    for (let i = 0; i < userBiddings.length; i++) {
      const currentBid = userBiddings[i];
      const bid = await Bid.findOne({ _id: currentBid?.bidId });

      returnBids.push({ ...currentBid?._doc, bid: bid });
    }
    return res.status(200).json([...returnBids]);
  }
}
