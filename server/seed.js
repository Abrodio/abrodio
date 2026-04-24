require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Country = require("./models/Country");
const City = require("./models/City");
const Admin = require("./models/Admin");

const data = [
  { country: "UK", cities: ["London", "Birmingham", "Manchester"] },
  { country: "India", cities: ["Mumbai", "Delhi", "Hyderabad", "Bangalore"] },
  { country: "USA", cities: ["New York", "Los Angeles", "Chicago"] },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  for (const { country, cities } of data) {
    let c = await Country.findOne({ name: country });
    if (!c) c = await Country.create({ name: country });

    for (const cityName of cities) {
      const exists = await City.findOne({ name: cityName, country_id: c._id });
      if (!exists) {
        const city = await City.create({ name: cityName, country_id: c._id });

        // Create a default admin for each city
        const username = `admin_${cityName.toLowerCase().replace(" ", "_")}`;
        const adminExists = await Admin.findOne({ username });
        if (!adminExists) {
          await Admin.create({
            name: `Admin ${cityName}`,
            username,
            password: await bcrypt.hash("admin123", 10),
            city_id: city._id,
            country_id: c._id,
          });
          console.log(`Created admin: ${username} / admin123`);
        }
      }
    }
  }

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
