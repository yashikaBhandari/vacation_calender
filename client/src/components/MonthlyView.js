import React, { useState } from "react";
import dayjs from "dayjs";

function MonthlyView({ country, year, month, holidays }) {
  const [selectedHolidays, setSelectedHolidays] = useState([]);

  const monthHolidays = (holidays || [])
    .filter(d => d && d.date && typeof d.date === "string")
    .filter(d => d.date.startsWith(`${year}-${String(month).padStart(2, "0")}`));

  const holidayMap = {};
  monthHolidays.forEach(h => {
    if (!holidayMap[h.date]) holidayMap[h.date] = [];
    holidayMap[h.date].push(h);
  });

  const firstDay = dayjs(`${year}-${month}-01`);
  const daysInMonth = firstDay.daysInMonth();
  const weeks = [];
  let week = [];

  for (let i = 0; i < firstDay.day(); i++) week.push(null);

  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = dayjs(`${year}-${month}-${d}`);
    week.push(dateObj);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  const isHoliday = date => date && holidayMap[date.format("YYYY-MM-DD")];
  const getRowColor = week => {
    const holidayCount = week.filter(isHoliday).length;
    if (holidayCount === 1) return "week-lightgreen";
    if (holidayCount >= 2) return "week-darkgreen";
    return "";
  };

  return (
    <div className="month-card">
      <h2>{firstDay.format("MMMM YYYY")} ({country})</h2>
      <table className="calendar-table">
        <thead>
          <tr>
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
              <th key={d}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((weekArr, idx) => (
            <tr key={idx} className={getRowColor(weekArr)}>
              {weekArr.map((date, i) => {
                const h = date ? holidayMap[date.format("YYYY-MM-DD")] : null;
                return (
                  <td
                    key={i}
                    className={h ? "holiday-star" : ""}
                    onClick={() => { if (h) setSelectedHolidays(h) }}
                  >
                    {date ? date.date() : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedHolidays.length > 0 && (
        <div className="holiday-details">
          <strong>Holiday Details:</strong>
          <ul>
            {selectedHolidays.map((h, idx) => <li key={idx}>{h.date} - {h.localName}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MonthlyView;
