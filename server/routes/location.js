const router = require("express").Router();
const Country = require("../models/Country");
const City = require("../models/City");

router.get("/countries", async (req, res) => {
  try { res.json(await Country.find().sort("name")); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

router.get("/cities/:country_id", async (req, res) => {
  try { res.json(await City.find({ country_id: req.params.country_id }).sort("name")); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
