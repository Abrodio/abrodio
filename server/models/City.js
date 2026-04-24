const mongoose = require("mongoose");
const CitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  country_id: { type: mongoose.Schema.Types.ObjectId, ref: "Country", required: true },
});
module.exports = mongoose.model("City", CitySchema);
