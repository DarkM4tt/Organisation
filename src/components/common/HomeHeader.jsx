import { useNavigate } from "react-router-dom";
import boldCyan from "../../assets/boldCyan.svg";
import { Badge, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Notification from "./Notification";
import MenuIcon from "@mui/icons-material/Menu";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#D20B0B",
    color: "#D20B0B",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

// eslint-disable-next-line react/prop-types
const HomeHeader = ({ notification, showsidebar, setshowsidebar }) => {
  const navigate = useNavigate();
  const [shownotification, setshownotification] = useState(false);

  const handleClick = () => {
    navigate("/home");
  };

  const handleLogout = () => {
    localStorage.removeItem("org_id");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("_grecaptcha");
    navigate("/");
  };

  const orgName = localStorage.getItem("org_name") || "Null";

  return (
    <div className="flex items-center justify-between shadow-md">
      <div className="bg-themeBlue w-[42.5%]  sm:w-1/5 py-4 flex items-center max-w-[280px] gap-4 justify-center md:justify-start flex-col md:flex-row ">
        <img
          src={boldCyan}
          alt="bold"
          className="w-20 cursor-pointer md:ml-10"
          onClick={handleClick}
        />
        <div
          className=" block md:hidden text-white"
          onClick={() => {
            setshowsidebar(!showsidebar);
          }}
        >
          <MenuIcon fontSize="large" />
        </div>
      </div>
      <div className="flex-1 flex flex-row justify-between items-center px-10">
        <p className="font-redhat text-lg font-semibold">
          {orgName?.toUpperCase()}
        </p>
        <div className="flex flex-row gap-10">
          <div
            className="flex flex-row items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md group"
            onClick={handleLogout}
          >
            <IconButton
              sx={{
                color: "red",
                "&:hover": { backgroundColor: "transparent" }, // Remove default hover effect
              }}
            >
              <LogoutIcon />
            </IconButton>
            <p className="font-redhat text-lg font-semibold ml-2 group-hover:text-red-600">
              Logout
            </p>
          </div>
          <div
            className="bg-[#EEEEEE] rounded-lg p-[12px] relative cursor-pointer"
            onClick={() => setshownotification(!shownotification)}
          >
            {notification ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                variant="dot"
              >
                <NotificationsIcon sx={{ fontSize: "20px" }} />
              </StyledBadge>
            ) : (
              <NotificationsIcon sx={{ fontSize: "20px" }} />
            )}
            {shownotification && (
              <div className="absolute top-24 right-0 w-[434px] max-w-screen-sm z-50">
                <Notification
                  message={notification ? notification : "No Notifications"}
                  date={"July 24, 2024"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
