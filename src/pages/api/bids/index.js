import connect from "@/config/db";
import Bid from "@/models/Bid";
import { authMiddleware } from "@/utils";

export default async function Bids(req, res) {
  connect();
  const { body } = req;
  if (req.method === "POST") {
    const auth = await authMiddleware({ req, res });
    if (auth?.code !== 200) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const bid = await Bid.create({
      name: body.name,
      startingBid: body.startingBid,
      currentBid: body.currentBid,
      expiry: new Date(body.expiry),
      image: "",
      category: body.category,
      expired: false,
      userId: auth?.data?.id,
      paid: false,
      winner: {
        userId: "",
      },
    }).catch((e) => {
      return res.status(400).json({ message: "An error occured" });
    });

    if (!bid) {
      return res.status(400).json({ message: "An error occured" });
    }
    return res.status(200).json(bid);
  }
  if (req.method === "GET") {
    const bids = await Bid.find().catch((e) => {
      return res.status(400).json({ message: "An error occured" });
    });

    if (bids?.length < 1) {
      return res.status(404).json({ message: "No bid's available" });
    }
    return res.status(200).json(bids);
  }
  return res.status(404).json({ message: "Method not allowed" });
}
