const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Hardcoded countries (same as before)
const countries = [
  { countryCode: "IN", name: "India" },
  { countryCode: "US", name: "United States" },
  { countryCode: "GB", name: "United Kingdom" },
  { countryCode: "AU", name: "Australia" },
  { countryCode: "CA", name: "Canada" }
];

const indiaHolidays = [
    // 2024
    { date: "2024-01-01", localName: "New Year's Day", name: "New Year's Day" },
    { date: "2024-01-26", localName: "Republic Day", name: "Republic Day" },
    { date: "2024-03-25", localName: "Holi", name: "Holi" },
    { date: "2024-03-11", localName: "Eid-ul-Fitr", name: "Eid-ul-Fitr" },
    { date: "2024-04-02", localName: "Ram Navami", name: "Ram Navami" },
    { date: "2024-03-29", localName: "Good Friday", name: "Good Friday" },
    { date: "2024-04-14", localName: "Ambedkar Jayanti", name: "Ambedkar Jayanti" },
    { date: "2024-05-01", localName: "Labour Day", name: "Labour Day" },
    { date: "2024-05-23", localName: "Buddha Purnima", name: "Buddha Purnima" },
    { date: "2024-06-17", localName: "Bakri Eid", name: "Bakri Eid" },
    { date: "2024-07-27", localName: "Muharram", name: "Muharram" },
    { date: "2024-08-15", localName: "Independence Day", name: "Independence Day" },
    { date: "2024-08-26", localName: "Janmashtami", name: "Janmashtami" },
    { date: "2024-10-02", localName: "Gandhi Jayanti", name: "Gandhi Jayanti" },
    { date: "2024-11-01", localName: "Diwali", name: "Diwali" },
    { date: "2024-11-14", localName: "Gurpurab", name: "Gurpurab" },
    { date: "2024-12-25", localName: "Christmas", name: "Christmas" },

    // 2025
    { date: "2025-01-01", localName: "New Year's Day", name: "New Year's Day" },
    { date: "2025-01-26", localName: "Republic Day", name: "Republic Day" },
    { date: "2025-03-14", localName: "Holi", name: "Holi" },
    { date: "2025-03-31", localName: "Eid-ul-Fitr", name: "Eid-ul-Fitr" },
    { date: "2025-04-06", localName: "Ram Navami", name: "Ram Navami" },
    { date: "2025-04-18", localName: "Good Friday", name: "Good Friday" },
    { date: "2025-04-14", localName: "Ambedkar Jayanti", name: "Ambedkar Jayanti" },
    { date: "2025-05-01", localName: "Labour Day", name: "Labour Day" },
    { date: "2025-05-12", localName: "Buddha Purnima", name: "Buddha Purnima" },
    { date: "2025-06-07", localName: "Bakri Eid", name: "Bakri Eid" },
    { date: "2025-07-06", localName: "Muharram", name: "Muharram" },
    { date: "2025-08-15", localName: "Independence Day", name: "Independence Day" },
    { date: "2025-08-16", localName: "Janmashtami", name: "Janmashtami" },
    { date: "2025-10-02", localName: "Gandhi Jayanti", name: "Gandhi Jayanti" },
    { date: "2025-10-20", localName: "Diwali", name: "Diwali" },
    { date: "2025-11-05", localName: "Gurpurab", name: "Gurpurab" },
    { date: "2025-12-25", localName: "Christmas", name: "Christmas" },

    // 2026
    { date: "2026-01-01", localName: "New Year's Day", name: "New Year's Day" },
    { date: "2026-01-26", localName: "Republic Day", name: "Republic Day" },
    { date: "2026-03-04", localName: "Holi", name: "Holi" },
    { date: "2026-03-21", localName: "Eid-ul-Fitr", name: "Eid-ul-Fitr" },
    { date: "2026-04-02", localName: "Ram Navami", name: "Ram Navami" },
    { date: "2026-03-27", localName: "Good Friday", name: "Good Friday" },
    { date: "2026-04-14", localName: "Ambedkar Jayanti", name: "Ambedkar Jayanti" },
    { date: "2026-05-01", localName: "Labour Day", name: "Labour Day" },
    { date: "2026-05-01", localName: "Buddha Purnima", name: "Buddha Purnima" },
    { date: "2026-06-27", localName: "Bakri Eid", name: "Bakri Eid" },
    { date: "2026-07-16", localName: "Muharram", name: "Muharram" },
    { date: "2026-08-15", localName: "Independence Day", name: "Independence Day" },
    { date: "2026-08-06", localName: "Janmashtami", name: "Janmashtami" },
    { date: "2026-10-02", localName: "Gandhi Jayanti", name: "Gandhi Jayanti" },
    { date: "2026-10-09", localName: "Diwali", name: "Diwali" },
    { date: "2026-11-15", localName: "Gurpurab", name: "Gurpurab" },
    { date: "2026-12-25", localName: "Christmas", name: "Christmas" }
  ];


  // Return list of countries for dropdown
app.get('/api/countries', (req, res) => {
    res.json(countries);
  });

  app.get('/api/holidays', async (req, res) => {
    const { country, year } = req.query;
    if (!country || !year) return res.status(400).json({ error: 'Provide country & year' });

    // India ke liye hardcoded
    if (country === "IN") {
      return res.json(indiaHolidays);
    }

    // Baaki countries ke liye dynamic API
    try {
      const response = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`);
      const holidays = response.data.map(h => ({
        date: h.date,
        localName: h.localName,
        name: h.name
      }));
      res.json(holidays);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to fetch holidays' });
    }
  });

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
