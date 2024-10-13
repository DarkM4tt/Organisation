import { useCallback, useEffect, useState } from "react";
import { Button, Card, MenuItem, Select } from "@mui/material";
import settingsIcon from "../../assets/settingsIcon.svg";
import React from "react";
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
import "../extra.css"
import Addintercityride from "./Addintercityride";


const Intercity = ({setActiveComponent}) => {
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const rows = [
    {
      departure: "Departure city name",
      destination: "Destination city name",
      duration: "15h 15m",
      vehicle: "Ford Figo",
      seats: "2/5",
    },
    {
      departure: "Departure city name",
      destination: "Destination city name",
      duration: "5h 15m",
      vehicle: "Volvo bus",
      seats: "5/7",
    },
    {
      departure: "Departure city name",
      destination: "Destination city name",
      duration: "1h 25m",
      vehicle: "Volvo bus",
      seats: "20/24",
    },
    {
      departure: "Departure city name",
      destination: "Destination city name",
      duration: "1h 25m",
      vehicle: "Volvo bus",
      seats: "20/24",
    },
    {
      departure: "Departure city name",
      destination: "Destination city name",
      duration: "2h 15m",
      vehicle: "Alto",
      seats: "Full",
    },
    {
      departure: "Departure city name",
      destination: "Destination city name",
      duration: "2h 15m",
      vehicle: "Alto",
      seats: "Full",
    },
  ];

  const Handleclose =()=>{
    setShowAddVehicleModal(!showAddVehicleModal);
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
      {showAddVehicleModal && <Addintercityride Handleclose={Handleclose} showAddVehicleModal={showAddVehicleModal}/>}
      <div>
        <TableContainer className="">
          <Table sx={{
          borderCollapse: "separate",
          borderSpacing: "0px 16px"
    }}>
            <TableHead>
              <TableRow>
                <TableCell align=""
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                    borderBottomWidth:"0px",
                    paddingBottom:"0px"
                  }}
                >
                  Departure
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                     borderBottomWidth:"0px",
                     paddingBottom:"0px"
                  }}
                >
                  Destination
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                     borderBottomWidth:"0px",
                     paddingBottom:"0px"
                  }}
                >
                  Duration
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                     borderBottomWidth:"0px",
                     paddingBottom:"0px"
                  }}
                >
                  Vehicle
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                     borderBottomWidth:"0px",
                     paddingBottom:"0px"
                  }}
                >
                  Seats
                </TableCell>
                <TableCell align="right" sx={{borderBottomWidth:"0px",
                     paddingBottom:"0px"}}>
                  <img src={settingsIcon} alt="settingicon" className="pl-2" />
                </TableCell>
              </TableRow>
            </TableHead>
            {/* </Table>
            </TableContainer>
            <TableContainer className="p-6 pt-0">
            <Table sx={{
          borderCollapse: "separate",
          borderSpacing: "0px 16px"
    }}> */}
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index} onClick={()=>{setActiveComponent("Intercityrideinfo")}} sx={{
                  borderRadius: "8px",
                  backgroundColor: "#EEEEEE",
                }}>
                  <TableCell sx={{
                  fontSize: "14px",
                  fontWeight: "700",
                }}
                  >{row.departure}</TableCell>
                  <TableCell sx={{
                  fontSize: "14px",
                  fontWeight: "700",
                }}
                  >{row.destination}</TableCell>
                  <TableCell sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}>{row.duration}</TableCell>
                  <TableCell sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}>{row.vehicle}</TableCell>
                  <TableCell sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}>{row.seats}</TableCell>
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
    </div>
  );
};

export default Intercity;
