const mongoose = require("mongoose");

const generalSchema = new mongoose.Schema({
  tokenIds: { type: Number },
});

const Token = mongoose.model("Token", generalSchema);

module.exports = Token;
