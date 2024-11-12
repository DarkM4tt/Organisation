import { Button } from "@mui/material";
import PropTypes from "prop-types";
import Euroicon from "../../assets/euroicon.svg";
import Upgraph from "../../assets/upgraph.svg";
import dashboardvehicle from "../../assets/dashboardvehicle.svg";
import CircleIcon from "@mui/icons-material/Circle";
import moderategraph from "../../assets/moderategrapgdash.svg";
import { Doughnut } from "react-chartjs-2";
import CancellationChart from "./Dashboardcharts/Cancellationchart";
import PerformanceChart from "./Dashboardcharts/Companyperformance";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import Dashboardzones from "./Dashboardcharts/Dashboardzones";

// Register required chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const belowsampledata = [
  {
    head: "Intercity",
    count: 3312,
  },
  {
    head: "Package",
    count: 2293,
  },
  {
    head: "Regular",
    count: 3312,
  },
  {
    head: "Rentals",
    count: 2293,
  },
  {
    head: "Jumpstarts",
    count: 2293,
  },
];

const Dashboard = ({ onMenuItemClick }) => {
  const data = {
    labels: ["Complete", "Incomplete"],
    datasets: [
      {
        data: [54, 46], // You can adjust the percentage here
        backgroundColor: ["#2dd4bf", "#f5f5dc"], // Adjust colors to match the design
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "75%", // Adjust for inner white space (doughnut thickness)
    plugins: {
      legend: {
        display: false, // Disable legend if you don't need it
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <div className="flex gap-2">
          <span className="text-3xl">🖖</span>
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold font-redhat">
              Hello, Good afternoon
            </h1>
            <p className="font-semibold font-redhat text-sm text-semiGray">
              Here are your this week’s performance
            </p>
          </div>
          <p className="ml-4 text-base font-semibold text-midGray">
            06/24 00:00 - 06/25 11:06
          </p>
        </div>
        <div className="flex space-x-4 ali">
          <Button
            variant="contained"
            sx={{
              bgcolor: "#EEEEEE",
              color: "#000",
              fontSize: "16px",
              fontWeight: "500",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#EEEEEE",
              },
            }}
            onClick={() => onMenuItemClick("Vehicles")}
          >
            Vehicles online (1/9)
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#f0f0f0",
              color: "#000",
              fontSize: "16px",
              fontWeight: "500",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#EEEEEE",
              },
            }}
            onClick={() => onMenuItemClick("Drivers")}
          >
            Online drivers (4/9)
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onMenuItemClick("Performance")}
          className="border border-borderGray rounded-lg flex flex-col justify-between cursor-pointer p-4"
        >
          <div className="flex gap-2">
            <img src={Euroicon} alt="info" className="h-8 mt-2" />
            <div>
              <h1 className="text-4xl font-bold">3322</h1>
              <p className="font-redhat text-sm font-semibold">
                Total earnings
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <img src={Upgraph} alt="info" className="w-[20%] mt-2" />
            <div className="flex justify-end flex-col">
              <p className="font-redhat text-sm font-semibold text-[#777777]">
                4% high
              </p>
            </div>
          </div>
        </div>
        <div
          onClick={() => onMenuItemClick("Rides")}
          className="border border-borderGray rounded-lg flex flex-col justify-between cursor-pointer p-4"
        >
          <div className="flex gap-4 ">
            <img src={dashboardvehicle} alt="info" className="h-12 mt-1" />
            <div>
              <h1 className="text-4xl font-bold">60129</h1>
              <p className="font-redhat text-sm font-semibold">Total trips</p>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <CircleIcon fontSize="8px" style={{ color: "#2FCA16" }} />
              <p className="font-normal text-sm text-[#777777]">
                Ongoing{" "}
                <span className="font-semibold text-[#484848]">221</span>
              </p>
            </div>

            <div className="flex gap-2 items-center">
              <CircleIcon fontSize="8px" style={{ color: "#F81422" }} />
              <p className="font-normal text-sm text-[#777777]">
                Offline{" "}
                <span className="font-semibold text-[#484848]">380</span>
              </p>
            </div>
          </div>
        </div>
        <div
          onClick={() => onMenuItemClick("Reports")}
          className="border border-borderGray rounded-lg flex justify-between cursor-pointer p-4"
        >
          <div className="leftonelast w-1/2 flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <p className="font-redhat text-sm font-semibold">
                Acceptance rate
              </p>
              <p className="font-redhat text-sm font-semibold text-[#777777]">
                Moderately good
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <img src={moderategraph} alt="info" className="w-[40%] mt-2" />
              <div className="flex justify-end flex-col">
                <p className="font-redhat text-sm font-semibold text-[#777777]">
                  4% high
                </p>
              </div>
            </div>
          </div>
          <div className="rightonelast w-[35%]">
            <div className="relative w-full">
              {/* The Doughnut chart */}
              <Doughnut data={data} options={options} />

              {/* Inner text */}
              <div className="absolute inset-0 flex justify-center items-center">
                <span className="text-lg font-bold font-redhat">54%</span>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => onMenuItemClick("Performance")}
          className="border border-borderGray rounded-lg flex justify-between cursor-pointer p-4"
        >
          <div className="leftonelast w-1/2 flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <p className="font-redhat text-sm font-semibold">Performance</p>
              <p className="font-redhat text-sm font-semibold text-[#777777]">
                Moderately good
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <img src={moderategraph} alt="info" className="w-[40%] mt-2" />
              <div className="flex justify-end flex-col">
                <p className="font-redhat text-sm font-semibold text-[#777777]">
                  4% high
                </p>
              </div>
            </div>
          </div>
          <div className="rightonelast w-[35%]">
            <div className="relative w-full">
              {/* The Doughnut chart */}
              <Doughnut data={data} options={options} />

              {/* Inner text */}
              <div className="absolute inset-0 flex justify-center items-center">
                <span className="text-lg font-bold font-redhat">54%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-evenly space-x-4 pt-12 ">
        <div className="flex-1 border rounded-lg border-[#DDDDDD] overflow-hidden">
          {" "}
          <CancellationChart />
        </div>
        <div className="flex-1 border rounded-lg border-[#DDDDDD] overflow-hidden">
          <Dashboardzones />
        </div>
        <div className="flex-1 border rounded-lg border-[#DDDDDD] overflow-hidden">
          {" "}
          <PerformanceChart />
        </div>
      </div>

      <div className="lowerone pt-10 ">
        <p className="upperbig font-redhat font-bold text-2xl">Ride overview</p>
        <p className="font-redhat text-lg font-normal text-[#777777]">
          Total ride taken this month
        </p>
      </div>
      <div className="flex space-x-20 pt-8">
        {belowsampledata.map((category) => {
          return (
            <div key={category.head}>
              <p className="font-redhat font-bold text-lg">{category.head}</p>
              <p className="font-redhat font-bold text-4xl pt-4">
                {category.count}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  onMenuItemClick: PropTypes.func.isRequired,
};

export default Dashboard;
