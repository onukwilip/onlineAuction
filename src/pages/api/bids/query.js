import connect from "@/config/db";
import Bid from "@/models/Bid";
import { authMiddleware } from "@/utils";

export default async function Bids(req, res) {
  connect();
  const { body } = req;

  if (req.method === "POST") {
    const bids = await Bid.aggregate(Array.isArray(body) ? body : null).catch(
      (e) => {
        return res.status(400).json({ message: "An error occured" });
      }
    );

    if (bids?.length < 1) {
      return res.status(404).json({ message: "No bid's available" });
    }
    return res.status(200).json(bids);
  }
  return res.status(404).json({ message: "Method not allowed" });
}
