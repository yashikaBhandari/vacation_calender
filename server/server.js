const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Load holidays.json
const holidaysPath = path.join(__dirname, "data", "holidays.json");
let holidayData = {};
if (fs.existsSync(holidaysPath)) {
  holidayData = JSON.parse(fs.readFileSync(holidaysPath, "utf-8"));
}

// Route: Get list of countries
app.get("/api/countries", (req, res) => {
  if (!holidayData.countries) {
    return res.status(500).json({ error: "Countries data not found" });
  }
  res.json(holidayData.countries);
});

// Route: Get holidays by country + year
app.get("/api/holidays", (req, res) => {
  const { country, year } = req.query;
  if (!country || !year) {
    return res.status(400).json({ error: "Provide country & year" });
  }

  const holidays = holidayData.holidays[country] || [];

  // Filter holidays for the selected year
  const filtered = holidays.filter((h) =>
    h.date.startsWith(year.toString())
  );

  res.json(filtered);
});

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
