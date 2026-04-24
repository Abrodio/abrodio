const router = require("express").Router();
const Message = require("../models/Message");

// Get chat history for a city+country room
router.get("/:country_id/:city_id", async (req, res) => {
  try {
    const messages = await Message.find({
      city_id: req.params.city_id,
      country_id: req.params.country_id,
    }).sort("createdAt").limit(100);
    res.json(messages);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
