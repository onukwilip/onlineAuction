import { authMiddleware } from "@/utils";
import connect from "@/config/db";
import Biddings from "@/models/Biddings";
import Bid from "@/models/Bid";
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
  const { query } = req;
  let returnBids = [];
  const userBiddings = await Biddings.find({ userId: query.id });

  if (!userBiddings) return res.status(404).json({ message: "No bids found" });

  for (let i = 0; i < userBiddings.length; i++) {
    const currentBid = userBiddings[i];
    const bid = await Bid.findOne({ _id: currentBid?.bidId });

    returnBids.push({ ...currentBid?._doc, bid: bid });
  }
  return res.status(200).json([...returnBids]);
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
//     let returnBids = [];
//     const userBiddings = await Biddings.find({ userId: query.id });

//     if (!userBiddings)
//       return res.status(404).json({ message: "No bids found" });

//     for (let i = 0; i < userBiddings.length; i++) {
//       const currentBid = userBiddings[i];
//       const bid = await Bid.findOne({ _id: currentBid?.bidId });

//       returnBids.push({ ...currentBid?._doc, bid: bid });
//     }
//     return res.status(200).json([...returnBids]);
//   }
// }
