import React from "react";
import MonthlyView from "./MonthlyView";

function QuarterlyView({ country, year, startMonth, holidays }) {
  const months = [startMonth, startMonth + 1, startMonth + 2];
  return (
    <div>
      <h2>Quarterly View ({country})</h2>
      <div className="quarterly-container">
        {months.map(m => (
          <MonthlyView
            key={m}
            country={country}
            year={year}
            month={m}
            holidays={holidays || []}
          />
        ))}
      </div>
    </div>
  );
}

export default QuarterlyView;
