const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  mobile:     { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  city_id:    { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
  country_id: { type: mongoose.Schema.Types.ObjectId, ref: "Country", required: true },
}, { timestamps: true });
module.exports = mongoose.model("User", UserSchema);
