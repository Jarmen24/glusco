"use client";

import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface RiskTrendProps {
  chartData: { date: string; percent: number }[];
}

const getRiskColor = (value: number) => {
  if (value < 40) return "#16A34A"; // Green
  if (value < 70) return "#F97316"; // Orange
  return "#DC2626"; // Red
};

export default function RiskTrendChart({ chartData }: RiskTrendProps) {
  const labels = chartData.map((d) => d.date);

  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: "Risk %",
        data: chartData.map((d) => d.percent),
        borderColor: "#0B1956",
        backgroundColor: "#0B1956",
        tension: 0.3,
        fill: false,
        pointBackgroundColor: chartData.map((d) => getRiskColor(d.percent)),
        pointBorderColor: "#fff",
        pointHoverRadius: 8,
        pointRadius: 6,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // hide legend
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.parsed.y}%`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Assessment Date",
          color: "#374151",
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
        title: {
          display: true,
          text: "Risk Percentage (%)",
          color: "#374151",
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}
