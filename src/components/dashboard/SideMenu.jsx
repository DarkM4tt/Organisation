import { useState } from "react";
import arrowIndicator from "../../assets/arrowIndicator.svg";
import downarrow from "../../assets/innersidemenuarrow.svg";
import PropTypes from "prop-types";

const menuItems = [
  { name: "Dashboard" },
  { name: "Fleets" },
  { name: "Vehicles" },
  { name: "Drivers" },
  {
    name: "Rides",
    submenu: ["Cabs", "Packages", "Intercity", "Rentals", "Jumpstart"],
  },
  { name: "Live Map" },
  { name: "Bold Connect" },
  { name: "Reports" },
  { name: "Documents" },
  { name: "Balance" },
  { name: "Settings" },
];

const SideMenu = ({ activeItem, onMenuItemClick }) => {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const handleMenuItemClick = (itemName) => {
    if (itemName === "Rides") {
      onMenuItemClick(itemName);
      setExpandedMenu(expandedMenu === "Rides" ? null : "Rides");
    } else {
      setExpandedMenu(null);
      onMenuItemClick(itemName);
    }
  };

  return (
    <div className="bg-themeBlue text-white h-full flex justify-between overflow-y-auto hidescrollbar box-border flex-col py-8">
      <nav className="flex flex-col">
        {menuItems.slice(0, -1).map((item, index) => (
          <div key={index}>
            <div
              className={`${
                activeItem === item.name && "bg-white-10"
              } flex items-center justify-between pl-6 py-4 cursor-pointer hover:bg-white-10`}
              onClick={() => handleMenuItemClick(item.name)}
            >
              <span
                className={` flex gap-2 ${
                  activeItem === item.name
                    ? "font-bold text-xl font-redhat"
                    : "font-semibold text-lg font-redhat"
                }`}
              >
                {item.name}
                {item.name === "Rides" && (
                  <span
                    className={`transform transition-transform duration-200 ${
                      expandedMenu === "Rides" ? "rotate-0" : "rotate-180"
                    }`}
                  >
                    <img src={downarrow} alt="downarrow" />
                  </span>
                )}
              </span>
              {item.name === activeItem && (
                <img
                  src={arrowIndicator}
                  alt="arrowIndicator"
                  className="transform transition-transform duration-200"
                />
              )}
            </div>
            {item.name === "Rides" && expandedMenu === "Rides" && (
              <div className="pl-10">
                {item.submenu.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    className={`p-2 cursor-pointer hover:bg-white-10 ${
                      activeItem === subItem ? "bg-white-10" : ""
                    }`}
                    onClick={() => onMenuItemClick(subItem)}
                  >
                    <span
                      className={`${
                        activeItem === subItem
                          ? "font-bold text-lg font-redhat "
                          : "font-semibold text-base font-redhat"
                      }`}
                    >
                      {subItem}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div
        className={`${
          activeItem === "Settings" && "bg-white-10"
        } flex items-center justify-between pl-6 py-3 cursor-pointer hover:bg-white-10`}
        onClick={() => onMenuItemClick("Settings")}
      >
        <span
          className={`${
            activeItem === "Settings"
              ? "font-bold text-xl font-redhat"
              : "font-semibold text-lg font-redhat"
          }`}
        >
          Settings
        </span>
        {activeItem === "Settings" && (
          <img src={arrowIndicator} alt="arrowIndicator" />
        )}
      </div>
    </div>
  );
};

SideMenu.propTypes = {
  activeItem: PropTypes.string.isRequired,
  onMenuItemClick: PropTypes.func.isRequired,
};

export default SideMenu;
