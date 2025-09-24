import React, { useEffect, useState } from "react";
import MonthlyView from "./components/MonthlyView";
import QuarterlyView from "./components/QuarterlyView";
import { getCountries, getHolidays } from "./api";
import "./App.css"; // Import new CSS

function App() {
  const [view, setView] = useState("monthly");
  const [countriesList, setCountriesList] = useState([]);
  const [country, setCountry] = useState("IN");
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(1);
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    async function fetchCountries() {
      const data = await getCountries();
      setCountriesList(data);
      if (data.length > 0) setCountry(data[0].countryCode);
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    async function fetchHolidays() {
      if (!country || !year) return;
      const data = await getHolidays(country, year);
      setHolidays(data);
    }
    fetchHolidays();
  }, [country, year]);

  return (
    <div className="calendar-app">
      <h1>Vacation Calendar</h1>

      <div className="header-controls">
        <label>
          Country:
          <select value={country} onChange={e => setCountry(e.target.value)}>
            {countriesList.map(c => <option key={c.countryCode} value={c.countryCode}>{c.name}</option>)}
          </select>
        </label>

        <label>
          Year:
          <input type="number" value={year} onChange={e => setYear(Number(e.target.value))} />
        </label>

        <label>
          Month:
          <input type="number" min="1" max="12" value={month} onChange={e => setMonth(Number(e.target.value))} />
        </label>

        <button onClick={() => setView("monthly")}>Monthly View</button>
        <button onClick={() => setView("quarterly")}>Quarterly View</button>
      </div>

      <div className="calendar-container">
        {view === "monthly" ? (
          <MonthlyView country={country} year={year} month={month} holidays={holidays} />
        ) : (
          <QuarterlyView country={country} year={year} startMonth={month} holidays={holidays} />
        )}
      </div>
    </div>
  );
}

export default App;
