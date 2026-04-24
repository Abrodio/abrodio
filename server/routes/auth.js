const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

const sign = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

// User Register
router.post("/user/register", async (req, res) => {
  try {
    const { name, mobile, password, city_id, country_id } = req.body;
    const exists = await User.findOne({ mobile });
    if (exists) return res.status(400).json({ error: "Mobile already registered" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, mobile, password: hashed, city_id, country_id });
    res.json({ token: sign({ id: user._id, type: "user" }), user: { _id: user._id, name: user.name, mobile: user.mobile, city_id: user.city_id, country_id: user.country_id } });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// User Login
router.post("/user/login", async (req, res) => {
  try {
    const { mobile, password } = req.body;
    const user = await User.findOne({ mobile });
    if (!user) return res.status(400).json({ error: "User not found" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid password" });
    res.json({ token: sign({ id: user._id, type: "user" }), user: { _id: user._id, name: user.name, mobile: user.mobile, city_id: user.city_id, country_id: user.country_id } });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Admin Login
router.post("/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ error: "Admin not found" });
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ error: "Invalid password" });
    res.json({ token: sign({ id: admin._id, type: "admin" }), admin: { _id: admin._id, name: admin.name, username: admin.username, city_id: admin.city_id, country_id: admin.country_id } });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
