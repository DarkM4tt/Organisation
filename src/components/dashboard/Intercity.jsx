import { useCallback, useEffect, useState } from "react";
import { Button } from "@mui/material";
import settingsIcon from "../../assets/settingsIcon.svg";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Addintercityride from "./Addintercityride";
import LoadingAnimation from "../common/LoadingAnimation";
import "../extra.css";

// eslint-disable-next-line react/prop-types
const Intercity = ({ setActiveComponent }) => {
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [intercityRides, setIntercityRides] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState("");

  const fetchIntercityData = useCallback(async () => {
    const orgId = localStorage.getItem("org_id");
    const url = `${
      import.meta.env.VITE_DEV_URL
    }/organization/${orgId}/getIntercity`;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        setError("Error in fetching vehicles!");
        setLoading(false);
        return;
      }
      const response = await res.json();
      setIntercityRides(response.data);
    } catch (err) {
      setError(err || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIntercityData();
  }, [fetchIntercityData]);

  const Handleclose = () => {
    setShowAddVehicleModal(!showAddVehicleModal);
  };

  function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (minutes === 0 && secs === 0) {
      return `${hours}h`;
    } else if (secs === 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes === 0) {
      return `${hours}h ${secs}s`;
    } else {
      return `${hours}h ${minutes}m ${secs}s`;
    }
  }

  if (loading) {
    return (
      <div className="mx-auto w-full h-full ">
        <LoadingAnimation height={500} width={500} />
      </div>
    );
  }

  if (error) {
    return <h1 className="text-red-400 text-3xl p-4 font-bold">{error}</h1>;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Intercity rides</h1>
        <Button
          variant="contained"
          sx={{
            backgroundColor: showAddVehicleModal ? "#BBBBBB" : "black",
            color: "white",
            textTransform: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: showAddVehicleModal ? "#BBBBBB" : "black",
            },
          }}
          onClick={Handleclose}
        >
          Create new intercity ride
        </Button>
      </div>
      {showAddVehicleModal && (
        <Addintercityride
          Handleclose={Handleclose}
          showAddVehicleModal={showAddVehicleModal}
        />
      )}
      {intercityRides && intercityRides.length === 0 && (
        <p className="text-red-400 text-xl p-4 font-bold">
          No intercity ride created till now!
        </p>
      )}
      {intercityRides && intercityRides.length > 0 && (
        <div>
          <TableContainer className="">
            <Table
              sx={{
                borderCollapse: "separate",
                borderSpacing: "0px 16px",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align=""
                    sx={{
                      fontSize: "16px",
                      fontWeight: "700",
                      borderBottomWidth: "0px",
                      paddingBottom: "0px",
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    align=""
                    sx={{
                      fontSize: "16px",
                      fontWeight: "700",
                      borderBottomWidth: "0px",
                      paddingBottom: "0px",
                    }}
                  >
                    Departure
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "16px",
                      fontWeight: "700",
                      borderBottomWidth: "0px",
                      paddingBottom: "0px",
                    }}
                  >
                    Destination
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "16px",
                      fontWeight: "700",
                      borderBottomWidth: "0px",
                      paddingBottom: "0px",
                    }}
                  >
                    Time
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "16px",
                      fontWeight: "700",
                      borderBottomWidth: "0px",
                      paddingBottom: "0px",
                    }}
                  >
                    Duration
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "16px",
                      fontWeight: "700",
                      borderBottomWidth: "0px",
                      paddingBottom: "0px",
                    }}
                  >
                    Vehicle
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "16px",
                      fontWeight: "700",
                      borderBottomWidth: "0px",
                      paddingBottom: "0px",
                    }}
                  >
                    Seats
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ borderBottomWidth: "0px", paddingBottom: "0px" }}
                  >
                    <img
                      src={settingsIcon}
                      alt="settingicon"
                      className="pl-2"
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {intercityRides.map((intercity, index) => (
                  <TableRow
                    key={index}
                    onClick={() => {
                      setActiveComponent("Intercityrideinfo");
                    }}
                    sx={{
                      borderRadius: "8px",
                      backgroundColor: "#EEEEEE",
                    }}
                  >
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        fontWeight: "700",
                      }}
                    >
                      #{intercity?.id?.slice(-5)}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        fontWeight: "700",
                      }}
                    >
                      {intercity?.from}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        fontWeight: "700",
                      }}
                    >
                      {intercity?.to}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {intercity?.time}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {formatDuration(intercity?.duration)}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {intercity?.vehicle_model}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                      align="center"
                    >
                      {intercity?.seats}
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default Intercity;
