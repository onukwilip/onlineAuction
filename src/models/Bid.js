const mongoose = require("mongoose");

const BidModel = mongoose.Schema({
  name: { type: String, required: true },
  startingBid: { type: Number, required: true },
  currentBid: { type: Number, required: true },
  highestBidder: { type: String, required: false },
  expiry: { type: Date, required: true },
  expired: { type: Boolean, required: true },
  image: String,
  category: { type: String, required: true },
  images: Array,
  userId: { type: String, required: true },
  description: { type: String, required: true },
  winner: {
    userId: String,
  },
  paid: {
    type: Boolean,
    required: true,
  },
  bids: [
    {
      userId: String,
      amount: Number,
    },
  ],
});

module.exports = mongoose.models.Bid || mongoose.model("Bid", BidModel);
