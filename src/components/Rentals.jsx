import React, { useState } from 'react';
import { Tabs, Tab, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import useGoogleMapsLoader from '../useGoogleMapsLoader';
import {
  GoogleMap,
} from "@react-google-maps/api";

const CustomTab = styled(Tab)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: '700',
  fontFamily: 'Red Hat Display',
  textTransform: 'none', // to avoid the default uppercase
  padding:"10px 16px",
  color:"black",
 '&.Mui-selected': {
    color: 'black', // Active tab text color
  },
  

}));


const appointments = [
  {
    rideID: "#1954",
    driverName: "Jhon Doe",
    pickup: "Sector 9, Badshahpur road, Gurgaon",
    drop: "DLF phase 3, Cyber hub, Delhi",
    time: "05:00AM",
    price: "€231",
    vehicle: "MK 50 MG 54",
    duration: "28min",
  },
  {
    rideID: "#1953",
    driverName: "Ranjith Ratan",
    pickup: "Sector 9, Badshahpur road, Gurgaon",
    drop: "DLF phase 3, Cyber hub, Delhi",
    time: "05:00AM",
    price: "€231",
    vehicle: "MK 50 MG 54",
    duration: "5hr",
  },
  {
    rideID: "#1952",
    driverName: "Manglu",
    pickup: "Sector 9, Badshahpur road, Gurgaon",
    drop: "DLF phase 3, Cyber hub, Delhi",
    time: "05:00AM",
    price: "€231",
    vehicle: "MK 50 MG 54",
    duration: "2hr",
  },
  {
    rideID: "#1951",
    driverName: "William Dutta",
    pickup: "Sector 9, Badshahpur road, Gurgaon",
    drop: "DLF phase 3, Cyber hub, Delhi",
    time: "05:00AM",
    price: "€231",
    vehicle: "MK 50 MG 54",
    duration: "8hr",
  },
  {
    rideID: "#1950",
    driverName: "Megan Suth",
    pickup: "Sector 9, Badshahpur road, Gurgaon",
    drop: "DLF phase 3, Cyber hub, Delhi",
    time: "05:00AM",
    price: "€231",
    vehicle: "MK 50 MG 54",
    duration: "6hr",
  },
];

const Rentals = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const { isLoaded, loadError } = useGoogleMapsLoader();

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const renderTable = () => (
    <TableContainer className="my-4">
      <Table sx={{
          borderCollapse: "separate",
          borderSpacing: "0px 16px"
    }}>
        <TableHead className="bg-gray-200">
          <TableRow sx={{
                  borderRadius: "8px",
                  backgroundColor: "#EEEEEE",
                }}>
            <TableCell sx={{fontSize: "14px",
                    fontWeight: "700"}}>Ride ID</TableCell>
            <TableCell sx={{fontSize: "14px",
                    fontWeight: "700"}}>Name</TableCell>
            <TableCell sx={{fontSize: "14px",
                    fontWeight: "700"}}>Pickup</TableCell>
            <TableCell sx={{fontSize: "14px",
                    fontWeight: "700"}}>Drop</TableCell>
            <TableCell sx={{fontSize: "14px",
                    fontWeight: "700"}}>Time</TableCell>
            <TableCell sx={{fontSize: "14px",
                    fontWeight: "700"}}>Price</TableCell>
            <TableCell sx={{fontSize: "14px",
                    fontWeight: "700"}}>Vehicle</TableCell>
            <TableCell sx={{fontSize: "14px",
                    fontWeight: "700"}}>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((ride) => (
            <TableRow key={ride.rideID} sx={{background:"#FAFAFA", paddingX:"24px"}} >
              <TableCell sx={{paddingY:"24px"}}>{ride.rideID}</TableCell>
              <TableCell sx={{paddingY:"24px"}}>{ride.driverName}</TableCell>
              <TableCell sx={{paddingY:"24px"}}>{ride.pickup}</TableCell>
              <TableCell sx={{paddingY:"24px"}}>{ride.drop}</TableCell>
              <TableCell sx={{paddingY:"24px"}}>{ride.time}</TableCell>
              <TableCell sx={{paddingY:"24px"}}>{ride.price}</TableCell>
              <TableCell sx={{paddingY:"24px"}}>{ride.vehicle}</TableCell>
              <TableCell sx={{paddingY:"24px"}}>{ride.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div className='p-4'>
    <h1 className="text-2xl font-bold">Rentals</h1>
    <Box sx={{paddingTop:"3rem"}}>
      {/* Tabs */}
      <Tabs value={selectedTab} onChange={handleTabChange} className="mb-4 "  TabIndicatorProps={{
    sx: { backgroundColor: 'black', height: '4px' , '& .Mui-selected': {
      color: 'black', // Active tab text color
      
    },}, // Black border for active tab
  }}>
         <CustomTab label="List of Appointments" />
         <CustomTab label="Appointments History" />
         <CustomTab label="Outlets" />
      </Tabs>

      {/* Tab Panels */}
      {selectedTab === 0 && renderTable()}
      {selectedTab === 1 && renderTable()}
      {selectedTab === 2 && <div>
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
          // onClick={Handleclose}
        >
          Add new outlet
        </Button>
        <div className='py-4'>
        {loadError && <div>Error loading maps</div>}
          {!isLoaded && <div>Loading Maps...</div>}
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ height: "500px", width: "100%" }}
              center={{ lat: 40.756795, lng: -73.954298 }}
              zoom={13}
            />
          )}
        </div>
        </div>
        }
        
    </Box>
    </div>

  );
};

export default Rentals;
