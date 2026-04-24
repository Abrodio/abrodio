const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
  sender_id:   { type: mongoose.Schema.Types.ObjectId, required: true },
  sender_type: { type: String, enum: ["user", "admin"], required: true },
  sender_name: { type: String, required: true },
  message:     { type: String, required: true },
  city_id:     { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
  country_id:  { type: mongoose.Schema.Types.ObjectId, ref: "Country", required: true },
}, { timestamps: true });
module.exports = mongoose.model("Message", MessageSchema);
