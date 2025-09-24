import axios from "axios";

const API_BASE = "http://localhost:4000/api";
export async function getHolidays(country, year) {
    try {
      const res = await axios.get(`${API_BASE}/holidays`, { params: { country, year } });
      return res.data; // [{date, localName, name}]
    } catch (err) {
      console.error("Error fetching holidays:", err);
      return [];
    }
  }


export async function getCountries() {
  try {
    const res = await axios.get(`${API_BASE}/countries`);
    return res.data; // [{countryCode, name}, ...]
  } catch (err) {
    console.error("Error fetching countries:", err);
    return [];
  }
}

