import connect from "@/config/db";
import Bid from "@/models/Bid";
import { authMiddleware } from "@/utils";
import multer from "multer";
import nextConnect from "next-connect";
import path from "path";

connect();

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

const api = nextConnect({
  onError: (req, res) => {
    return res.status(500).json({ message: "An error occurred" });
  },
  onNoMatch: (req, res) => {
    return res.status(500).json({ message: `${req.method} not allowed` });
  },
});

api.use(upload.array("images"));

api.post(async (req, res) => {
  const { body, files } = req;

  const auth = await authMiddleware({ req, res });
  if (auth?.code !== 200) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const mapFunction = (eachFile) => {
    return `/uploads/${eachFile?.filename}`;
  };

  const bid = await Bid.create({
    name: body.name,
    startingBid: +body.startingBid,
    currentBid: 0,
    highestBidder: "null",
    expiry: new Date(body.expiry),
    image: `/uploads/${files[0]?.filename}`,
    category: body.category,
    description: body.description,
    expired: false,
    userId: auth?.data?.id,
    paid: false,
    images: files.map(mapFunction),
    winner: {
      userId: "",
    },
  });

  if (!bid) {
    return res.status(400).json({ message: "An error occured" });
  }
  return res.status(200).json(bid);
});

api.get(async (req, res) => {
  const bids = await Bid.find().catch((e) => {
    return res.status(400).json({ message: "An error occured" });
  });

  if (bids?.length < 1) {
    return res.status(404).json({ message: "No bid's available" });
  }
  return res.status(200).json(bids);
});

export default api;
