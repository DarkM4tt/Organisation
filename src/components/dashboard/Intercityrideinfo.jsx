import useradminpc from "../../assets/useradmin.jpg";
import drivervehicle from "../../assets/superadmincarone.svg";
import adminoffice from "../../assets/adminoffice.svg";
import cautionomg from "../../assets/caution.svg";
import euroicon from "../../assets/euroicon.svg"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Avatar,
  Typography,
} from "@mui/material";
import {
  GoogleMap,
  Polygon,
  DrawingManager,
  Autocomplete,
} from "@react-google-maps/api";
import useGoogleMapsLoader from "../../useGoogleMapsLoader";
import React  from "react";
import CalendarTodayIcon from "../../assets/calendericon.svg"
import driverphone from "../../assets/driverphone.svg"
import totaldistance from "../../assets/totaldistance.svg"
import totalduration from "../../assets/totalduration.svg"
import { useState } from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import travelicon from "../../assets/travelling.svg";

const IntercityrideInfo = ({setActiveComponent}) => {
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const { isLoaded, loadError } = useGoogleMapsLoader();
  const incidentData = [
    { keyanme: "Accidental", count: 0 },
    { keyanme: "Police", count: 1 },
    { keyanme: "Personal", count: 0 },
    { keyanme: "Other", count: 1 },
  ];

  const customers = [
    {
      name: "Madelyn Herwitz",
      email: "mandelynherwitz221@gmail.com",
      pin: "2212",
      phone: "+351-900817726",
      charge: "22.1",
      avatar: "https://example.com/avatar1.jpg", // Use actual avatar URLs
    },
    {
      name: "Haylie Passaquindici",
      email: "mandelynherwitz221@gmail.com",
      pin: "1011",
      phone: "+351-900817726",
      charge: "17.32",
      avatar: "https://example.com/avatar2.jpg",
    },
    {
      name: "Abram Lubin",
      email: "mandelynherwitz221@gmail.com",
      pin: "297",
      phone: "+351-900817726",
      charge: "08.22",
      avatar: null, // No avatar available for this user
    },
    {
      name: "Abram Mango",
      email: "example221@gmail.com",
      pin: "3918",
      phone: "+351-900817726",
      charge: "17",
      avatar: "https://example.com/avatar4.jpg",
    },
  ];


  const Handleclose =()=>{
    setShowAddVehicleModal(!showAddVehicleModal);
  }

  return (
    <div className="py-6 px-8">
    <div className="flex justify-between items-center ">
    <div className="flex items-center gap-4">
      <ArrowBackIcon onClick={()=>{setActiveComponent("Intercity")}}/>
        <h1 className="text-2xl font-bold">Intercity rides</h1>
        </div>
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

      {/* lowerdistance */}

      <div className="flex gap-4 pt-2">
        <p className="text-base font-bold font-redhat">Porto</p>
        <img src={travelicon} alt="travel" />
        <p className="text-base font-bold font-redhat">Lisbon</p>
      </div>
    <div className="flex gap-6 ">
      {/* leftsectione */}
      <div className="flex flex-col gap-6 w-[30%] ">
        {/* Upper Section */}
        <div className="upperone rounded-lg ">
          <div className="flex flex-col items-center pt-8 ">
            <div className="upperphotodiv w-[45%] flex flex-col items-center">
              <div className="phto w-[80%]">
                <img
                  className="w-full object-cover object-center"
                  src={useradminpc}
                  alt="userone"
                />
              </div>
              <p className="pt-2 font-redhat text-2xl font-bold text-center">
                Carter Curtis
              </p>
              <p className="font-medium text-base font-redhat pt-2 text-center">
                Driver<span className="text-[#777777]">,23 y/o</span>
              </p>
            </div>
            <div className="bg-[#1E293B] mt-6 py-6 px-4 flex flex-col gap-2 rounded-t-[8px] ">
              <p className="text-white font-bold text-base ">Ride overview</p>
              <p className="text-white font-normal text-base ">
                The journey was good and was rated with an average of 4.2/5 |
                There was no issue reported and the average speed during the
                journey was 108 kmph
              </p>
            </div>
            <div className="lowergreen flex py-3 px-4 gap-4 bg-[#18C4B8] w-full rounded-lg -mt-2 ">
              <img src={drivervehicle} alt="drivervehicle" />
              <div className="flex flex-col gap-2 justify-center">
                <p className="font-redhat text-white text-sm font-medium">
                  Vehicle:{" "}
                  <span className="font-bold text-base">FORD Mustang GT</span>
                </p>
                <p className="font-redhat text-white text-sm font-medium">
                  ROC: <span className="font-bold text-base">22AM PQ 1101</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        {/* <div className="bottomone px-4 py-6 rounded-lg flex-1 flex flex-col justify-between ">
          <div className="bottomupper">
            <div className="flex gap-2 items-center">
              <img src={adminoffice} alt="admin office" />
              <p className="font-redhat font-bold text-base">Organisation</p>
            </div>
            <p className="pt-4 font-redhat font-normal text-base ">
              ABC Company Pvt. Ltd.
            </p>
          </div>

          <div className="bottombottom">
            <div className="flex gap-2 items-center">
              <img src={cautionomg} alt="caution" />
              <p className="font-redhat font-bold text-base">Incidents</p>
            </div>
            <div className="pt-4">
              <TableContainer>
                <Table
                  sx={{
                    border: "0px",
                  }}
                >
                  <TableBody>
                    {incidentData.map((incident, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 }, // Remove border for last row
                          borderBottom: "0px", // Remove bottom border for all rows
                          height: "30px", // Adjust row height
                        }}
                      >
                        <TableCell
                          style={{
                            width: "150px",
                            paddingLeft: "0px",
                            paddingTop: "0px",
                            borderBottom: "0px",
                          }}
                        >
                          <p className="font-redhat font-normal text-base">
                            {incident.keyanme}
                          </p>
                        </TableCell>
                        <TableCell
                          style={{ paddingTop: "0px", borderBottom: "0px" }}
                        >
                          <p className="font-redhat font-normal text-base">
                            {incident.count}
                          </p>
                        </TableCell>
                        <TableCell
                          style={{
                            width: "100px",
                            textAlign: "right",
                            paddingRight: "0px",
                            paddingTop: "0px",
                            borderBottom: "0px",
                          }}
                        >
                          <p className="font-redhat font-normal text-base text-[#18C4B8]">
                            View
                          </p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div> */}
      </div>

      {/* rightsection */}
      <div className="flex flex-col gap-6 flex-grow">
        {/* <div className="upperright">
          <TableContainer>
            <Table >
              <TableHead>
                <TableRow sx={{borderBottom:2 , borderBottomColor:"#EEEEEE"}}>
                  <TableCell
                    sx={{
                      fontSize: "16px",
                      fontWeight: "700",
                      
                    }}
                  >
                    Customer list
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    PIN
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    Phone number
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    Total charge
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="space-x-4">
                      <div className="flex items-center">
                        <Avatar
                          alt={customer.name}
                          src={customer.avatar || ""}
                          className="mr-4"
                        />
                        <div>
                          <p className="font-redhat font-semibold text-base">
                            {customer.name}
                            </p>
                            <p className="font-redhat font-normal text-xs text-[#777777]">
                            {customer.email}
                            </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                    <p className="font-redhat font-medium text-base">
                            {customer.pin}
                            </p>
                    </TableCell>
                    <TableCell>
                    <p className="font-redhat font-medium text-base">
                            {customer.phone}
                            </p>
                    </TableCell>
                    <TableCell className="flex items-center">
                      <div className="flex gap-2 items-center">
                        <img src={euroicon} alt="euro" />
                        <p className="font-redhat font-medium text-base">{customer.charge}</p>
                        </div>
                        
                      
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div> */}
        <div className="lowerright p-6">
          {/* Check if the Google Maps API has loaded */}
          {loadError && <div>Error loading maps</div>}
          {!isLoaded && <div>Loading Maps...</div>}
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ height: "300px", width: "100%" }}
              center={{ lat: 40.756795, lng: -73.954298 }}
              zoom={13}
            />
          )}

          <div className="flex justify-between pt-6  ">
            <div className="leftone gap-2">
              <p className="font-normal text-base">Ride ID: <span className="text-[#18C4B8]">22172112AM</span></p>
            </div>
            <div className="flex gap-2 items-center">
              <img src={CalendarTodayIcon} alt="admin office" />
              <p className="font-redhat font-normal text-base">13-08-2024</p>
            </div>
          </div>
          <div className="my-10 flex justify-between ">
            <div className="flex ">
              <img src={driverphone} alt="phone" />
              <div className="flex flex-col gp-2 justify-center ">
                <p className="font-redhat font-bold text-base">Drivers phone</p>
                <p className="font-redhat font-medium text-base">+351-900817726</p>
              </div>
            </div>
            <div className="flex ">
              <img src={totaldistance} alt="phone" />
              <div className="flex flex-col gp-2 justify-center ">
                <p className="font-redhat font-bold text-base">Total Distance</p>
                <p className="font-redhat font-semibold text-base">82 <span className="text-[#777777] font-medium">Kms</span></p>
              </div>
            </div>
            <div className="flex ">
              <img src={totalduration} alt="phone" />
              <div className="flex flex-col gp-2 justify-center ">
                <p className="font-redhat font-bold text-base">Total Duration</p>
                <p className="font-redhat font-semibold text-base">12 <span className="text-[#777777] font-medium">Hrs</span></p>
              </div>
            </div>
          </div>

          <p className="font-redhat font-normal text-base text-[#777777]">Note: This ride was scheduled through Drivers End. The ride was started by <span className="font-semibold text-black">05:24 AM</span></p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default IntercityrideInfo;
