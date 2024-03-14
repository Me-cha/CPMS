import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      position: "bottom",
      font: {
        size: 20,
      },
    },
  },
};

const labels = ["2018", "2019", "2020", "2021", "2022", "2023", "2024"];

export const data = {
  labels,
  datasets: [
    {
      label: "Students Placed",
      data: labels.map(() => faker.number.int({ min: 100, max: 200 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "students Registered",
      data: labels.map(() => faker.number.int({ min: 150, max: 200 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function LineChart() {
  return (
    <div
      className="lg:w-[50vw] lg:px-5
    sm:w-[80vw] "
    >
      <Line options={options} data={data} />
    </div>
  );
}
