import { LineChart } from "../../../Analytics/LineChart/Line";
import React from "react";
import { Piechart } from "../../../Analytics/Piechart/Pie";
import NumberAnalysis from "../../../Analytics/NumericalAnalysis/Number";

function StudentDashboard() {
  return (
    <div className="flex flex-col sm:w-[100%] sm:justify-between sm:items-center sm:h-[90vh] sm:py-2">
      <h1>Student Dashboard</h1>
      <NumberAnalysis />
      <div
        className="flex lg:flex-row lg:align-center lg:justify-around lg:w-[85vw] lg:py-4
      sm:flex-col sm:justify-center sm:items-center  sm:w-[80vw] "
        style={{
          width: "75vw",
          maxHeight: "73vh",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <LineChart />
        <Piechart />
      </div>
    </div>
  );
}

export default StudentDashboard;
