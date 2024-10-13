import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card } from "@mui/material";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the datalabels plugin

// Register required components in Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const CancellationChart = () => {
  // Chart data
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Driver",
        data: [112, 137, 62, 88, 88],
        backgroundColor: "#2dd4bf", // Tailwind teal-400
        borderColor: "#2dd4bf",
        borderWidth: 1,
        barPercentage: 0.4, // Adjust width of each bar
        categoryPercentage: 0.8,
      },
      {
        label: "Customer",
        data: [118, 125, 57, 90, 93],
        backgroundColor: "#ec4899", // Tailwind pink-500
        borderColor: "#ec4899",
        borderWidth: 1,
        barPercentage: 0.4, // Adjust width of each bar
        categoryPercentage: 0.8,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          font: {
            size: "8px",
          },
        },
      },
      datalabels: {
        color: "#00000", // Color of the data labels
        anchor: "end",
        offset: 5,
        align: "top",
        font: {
          weight: "bold",
          size: "8px",
        },
        formatter: (value) => value, // Display the actual value
      },
    },
    scales: {
      y: {
        ticks: {
          display: false,
        },
        beginAtZero: true,
        suggestedMax:
          Math.max(...data.datasets.flatMap((dataset) => dataset.data)) * 1.2, // Adding space above the highest value
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      categoryPercentage: 0.6, // Reduces the category width to create space between bars
      barPercentage: 0.6,
    },
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Card className=" w-full h-full p-4 ">
        <div className="p-0">
          {/* <p className="font-redhat font-semibold text-xs">Cancellation chart</p> */}
          {/* Render the bar chart */}
          <div className="h-full relative">
            <Bar data={data} options={options} />
            <p className=" absolute top-0 left-0 font-redhat font-semibold text-xs">
              Cancellation chart
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CancellationChart;
