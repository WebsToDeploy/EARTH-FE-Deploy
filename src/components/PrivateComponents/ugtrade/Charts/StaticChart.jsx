import React from "react";
import ReactApexChart from "react-apexcharts";
import { Typography } from "@mui/material";

function MyChart() {
  // Sample data for the chart
  const chartData = {
    options: {
      xaxis: {
        categories: [
          "Barge 1",
          "Barge 2",
          "Barge 3",
          "Barge 4",
          "Barge 5",
          "Barge 6",
          "Barge 7",
          "Barge 8",
          "Barge 9",
          "Barge 10",
          "Barge 11",
          "Barge 12",
        ],
      },
    },
    series: [
      {
        name: "Period 1",
        data: [30, 40, 25, 50, 49, 60, 70, 91, 125, 100, 90, 80],
      },
      {
        name: "Period 2",
        data: [60, 60, 45, 70, 69, 80, 90, 111, 145, 120, 110, 100],
      },
    ],
  };

  return (
    <div style={{ width: "900px", marginTop: "10px", marginLeft: "30px" }}>
      <Typography
        sx={{
          color: "Black",
          fontSize: 24,
          fontWeight: "Bold",
          fontStyle: "Poppins",
          marginBottom: "20px",
        }}
      >
        Yearly Data
      </Typography>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area" // Change the type to "area" for Spline Line Chart
        height={350}
      />
    </div>
  );
}

export default MyChart;
