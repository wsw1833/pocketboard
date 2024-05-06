const mongoose = require("mongoose");

const submission = new mongoose.Schema({
  author: { type: String },
  submissionDate: { type: Date },
  link: { type: String },
  comment: { type: String },
  network: { type: String },
  profileImage: { type: String },
  walletAddress: { type: String },
});

const bounty = new mongoose.Schema({
  title: { type: String },
  interest: { type: String },
  description: { type: String },
  attachment: { type: String },
  createdBy: { type: String },
  bountyOwner: { type: String },
  dueDate: { type: Date },
  badge: { type: String },
  badgeHash: { type: String },
  reward: { type: Number },
  awarded: { type: String },
  submission: [submission],
  awardedAddress: { type: String },
});

const serviceProvider = new mongoose.Schema({
  name: { type: String },
  bio: { type: String },
  ImageURL: { type: String },
  interest: { type: String },
  twitter: { type: String },
  mintId: { type: Number, default: null },
  isMinted: { type: Boolean, default: false },
  hallOfBadge: [
    {
      image: { type: String },
    },
  ],
  handshakes: [
    {
      id: { type: String },
      name: { type: String },
      image: { type: String },
      date: { type: Date },
    },
  ],
});

const client = new mongoose.Schema({
  companyName: { type: String },
  website: { type: String },
  logo: { type: String },
  interest: { type: String },
  twitter: { type: String },
});

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, unique: true },
  serviceProvider: serviceProvider,
  client: client,
  bounty: [bounty],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
