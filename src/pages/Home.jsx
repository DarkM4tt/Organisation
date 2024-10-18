import { useEffect, useState } from "react";
import HomeHeader from "../components/common/HomeHeader";
import Dashboard from "../components/dashboard/Dashboard";
import Fleets from "./../components/dashboard/Fleets";
import Vehicles from "./../components/dashboard/Vehicles";
import Drivers from "./../components/dashboard/Drivers";
import SideMenu from "../components/dashboard/SideMenu";
import Settings from "./../components/dashboard/Settings";
import Documents from "./../components/dashboard/Documents";
import LiveMap from "./../components/dashboard/LiveMap";
import Reports from "./../components/dashboard/Reports";
import VehicleInfo from "../components/dashboard/VehicleInfo";
import DriverInfo from "../components/dashboard/DriverInfo";
import Intercity from "../components/dashboard/Intercity";
import FleetInfo from "./../components/dashboard/FleetInfo";
import { generateToken, messaging } from "../firebase";
import { onMessage } from "firebase/messaging";
import { Toaster } from "react-hot-toast";
import IntercityrideInfo from "../components/dashboard/Intercityrideinfo";
import Rentals from "../components/Rentals";
import Cabs from "../components/dashboard/Cabs";
import Packages from "../components/dashboard/Packages";
import Jumpstart from "../components/dashboard/Jumpstart";
import BoldConnect from "../components/dashboard/BoldConnect";
import Notifications from "../components/dashboard/Notifications";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [selectedFleetId, setSelectedFleetId] = useState(null);
  const [notification, setnotification] = useState(null);
  const [showsidebar, setshowsidebar] = useState(false);

  const handleMenuItemClick = (itemName) => {
    setActiveComponent(itemName);
    setSelectedVehicleId(null);
    setSelectedDriverId(null);
    setSelectedFleetId(null);
  };

  const handleVehicleClick = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    setActiveComponent("VehicleInfo");
  };

  const handleDriverClick = (driverId) => {
    setSelectedDriverId(driverId);
    setActiveComponent("DriverInfo");
  };

  const handleFleetClick = (fleetId) => {
    console.log(fleetId);
    setSelectedFleetId(fleetId);
    setActiveComponent("FleetInfo");
  };

  const renderActiveComponent = () => {
    if (selectedVehicleId && activeComponent === "VehicleInfo") {
      return (
        <VehicleInfo
          selectedVehicleId={selectedVehicleId}
          setActiveComponent={setActiveComponent}
          setSelectedVehicle={setSelectedVehicleId}
        />
      );
    }

    if (selectedDriverId && activeComponent === "DriverInfo") {
      return (
        <DriverInfo
          selectedDriverId={selectedDriverId}
          setActiveComponent={setActiveComponent}
          setSelectedDriver={setSelectedDriverId}
        />
      );
    }

    if (selectedFleetId && activeComponent === "FleetInfo") {
      return (
        <FleetInfo
          selectedFleetId={selectedFleetId}
          setActiveComponent={setActiveComponent}
          setSelectedFleet={setSelectedDriverId}
        />
      );
    }

    switch (activeComponent) {
      case "Dashboard":
        return (
          <Dashboard
            onMenuItemClick={handleMenuItemClick}
            activeItem={activeComponent}
          />
        );
      case "Fleets":
        return <Fleets onFleetClick={handleFleetClick} />;
      case "Vehicles":
        return <Vehicles onVehicleClick={handleVehicleClick} />;
      case "Drivers":
        return <Drivers onDriverClick={handleDriverClick} />;
      case "Rides":
        return <Cabs />;
      case "Cabs":
        return <Cabs />;
      case "Packages":
        return <Packages />;
      case "Intercity":
        return <Intercity setActiveComponent={setActiveComponent} />;
      case "Intercityrideinfo":
        return <IntercityrideInfo setActiveComponent={setActiveComponent} />;
      case "Rentals":
        return <Rentals />;
      case "Jumpstart":
        return <Jumpstart />;
      case "Live Map":
        return <LiveMap />;
      case "Bold Connect":
        return <BoldConnect />;
      case "Reports":
        return <Reports />;
      case "Documents":
        return <Documents />;
      case "Notifications":
        return <Notifications />;
      case "Settings":
        return <Settings />;
      default:
        return null;
    }
  };

  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log(payload);
      setnotification(payload.notification.body);
    });
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <HomeHeader
        notification={notification}
        showsidebar={showsidebar}
        setshowsidebar={setshowsidebar}
      />
      <Toaster />
      <div className="flex flex-grow overflow-y-auto">
        <div
          className={`absolute sm:relative z-50 h-full w-2/5 sm:w-1/5 max-w-[280px] ${
            showsidebar ? "block" : "hidden"
          } md:block text-white overflow-y-auto`}
        >
          <SideMenu
            onMenuItemClick={handleMenuItemClick}
            activeItem={activeComponent}
          />
        </div>
        <div className="w-4/5 flex-1 p-4 overflow-y-auto">
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default Home;
