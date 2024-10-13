import radioButtonChecked from "../../assets/radioButtonChecked.svg";
import radioButtonUnChecked from "../../assets/radioButtonUnChecked.svg";
import { useState } from "react";
import {
  styled,
  Button,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

// import {
//   Select,
//   MenuItem,
//   TextField,
//   InputAdornment,
//   IconButton,
//   Menu,
  
//   Switch,
//   FormControlLabel,
//   styled,
// } from "@mui/material";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarTodayIcon from "../../assets/calendericon.svg"
import DownloadIcon from '@mui/icons-material/Download';

const ColorButton = styled(Button)(({ theme }) => ({
  fontSize: "16px",
  fontFamily: "Red Hat Display, sans-serif",
}));

 const CustomCalendarIcon = (props) => (
  <img className='w-[20px] h-[20px]' src={CalendarTodayIcon} alt='calender'/>
);
const CustomSelectDropdown = ({
  value,
  onChange,
  name,
  options,
  ...rest
}) => {
  const MenuProps = {
    PaperProps: {
      style: {
        Height: "100%",
      },
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
  };
  return (
    <Select
      value={value}
      onChange={onChange}
      MenuProps={MenuProps}
      style={{height:"100%",overflow:"hidden"}}

      {...rest}
      displayEmpty
      renderValue={(selected) => {
        if (!selected) {
          return (
            <span
              className="text-sm lg:text-base"
              style={{
                color: "black",
                fontFamily: "Red Hat Display, sans-serif",
                fontWeight: 600,
              }}
            >
              {name}
            </span>
          );
        }
        return `${selected}`;
      }}
      sx={{
        backgroundColor: value ? "black" : "#EEEEEE",
        color: value ? "white" : "gray",
        borderRadius: "8px",
        ".MuiSvgIcon-root": {
          color: value ? "black" : "black",
          
        },
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
          borderRadius: "10px",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        },
        ".MuiSelect-select": {
          height:"100%",
          display:"flex",
          alignItems:"center",
          paddingInline: 2,
          paddingBlock: 1,
          backgroundColor: value ? "#EEEEEE" : "#EEEEEE",
          color: "black",
          fontFamily: "Red Hat Display, sans-serif",
          fontSize: {
            xs: "0.5", // default font size for small devices
            sm: "0.75", // for devices with min-width: 600px
            md: "0.87rem", // for devices with min-width: 960px
            lg: "1rem", // for devices with min-width: 1280px
          },
          fontWeight: 600,
         

          borderRadius: "8px",
        },
        ".MuiInputBase-root": {
          borderRadius: "8px",
          height:"100%",
        },
      }}
    >
      {options.map((option, idx) => (
        <MenuItem
          key={idx}
          value={option}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: value === option ? "#F5F5F5" : "transparent",
            "&:hover": {
              backgroundColor: "#F5F5F5",
              ".MuiMenuItem-root": {
                paddingY: 0,
              },
            },
            color: "black",
            fontFamily: "Red Hat Display, sans-serif",
            fontSize: {
              xs: "0.5", // default font size for small devices
              sm: "0.75", // for devices with min-width: 600px
              md: "0.87rem", // for devices with min-width: 960px
              lg: "1rem", // for devices with min-width: 1280px
            },
            fontWeight: 600,
          }}
        >
          {option}
          {value === option ? (
            <img
              src={radioButtonChecked}
              alt="radioButtonChecked"
              className="ml-4"
            />
          ) : (
            <img
              src={radioButtonUnChecked}
              alt="radioButtonUnChecked"
              className="ml-4"
            />
          )}
        </MenuItem>
      ))}
    </Select>
  );
};

const Sampledata=[
  {fileName:"20240624-20240628-trip_activity- organization_name",
    startDate:"2024-09-18",
    endDate:"2024-09-25",
    reportType:"Travel activities",
  },
  {fileName:"20240624-20240628-trip_activity- organization_name",
    startDate:"2024-09-18",
    endDate:"2024-09-25",
    reportType:"Payment activities",
  },
  {fileName:"20240624-20240628-trip_activity- organization_name",
    startDate:"2024-09-18",
    endDate:"2024-09-25",
    reportType:"Driver quality",
  }
]

const Reports = () => {

  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedDate, setSelectedDate] = useState();

  const handleDriverChange = (event) => {
    setSelectedDriver(event.target.value);
  };


  return <div className="py-6 px-8">
    <p className="font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black font-redhat">
    Reports
      </p>

      <p className="font-redhat text-xl font-bold pt-12 ">Reports generator</p>
      <div className="pt-4 flex gap-6">
        <div className="flex flex-col">
      <p className="font-bold font-redhat text-base pb-2">Report type</p>
      <div className="flex-grow">
      <CustomSelectDropdown
            value={selectedDriver}
            onChange={handleDriverChange}
            name="Select"
            options={["Driver quality","Travel activities","Payments transactions","Driver earnings","Attendance"]}
          />
          </div>
          </div>

          <div className="">
      <p className="font-bold font-redhat text-base pb-2">Start date</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ flex: 1}}>
            <DatePicker
             slotProps={{textField:{size:"small",fullWidth:false}}}
              value={selectedDate}
               mask="__-__-____"
          inputFormat="DD-MM-YYYY"
            //   onChange={(date) => setSelectedDate(date)}
            renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  sx={{
                    paddingY:"0px"
                  }}
                />
              )}
              slots={{openPickerIcon:CustomCalendarIcon}}
            />
          </Box>
        </LocalizationProvider>

          </div>

          <div className="">
      <p className="font-bold font-redhat text-base pb-2">End date</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ flex: 1}}>
            <DatePicker
             slotProps={{textField:{size:"small",fullWidth:false}}}
              value={selectedDate}
               mask="__-__-____"
          inputFormat="DD-MM-YYYY"
            //   onChange={(date) => setSelectedDate(date)}
            renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  sx={{
                    paddingY:"0px"
                  }}
                />
              )}
              slots={{openPickerIcon:CustomCalendarIcon}}
            />
          </Box>
        </LocalizationProvider>

          </div>
          <div className="items-end flex">
          <ColorButton
            variant="contained"
            sx={{
              backgroundColor: "black",
              height:"58%",
              fontWeight: 600,
              color: "white",
              fontSize:"14px",
              fontFamily: "Red Hat Display, sans-serif",
              textTransform: "none",
              padding: "12px 24px",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
            // onClick={handleSubmit}
          >
            To generate
          </ColorButton>
          </div>

          
      </div>
    <p className="font-redhat text-xl font-bold pt-12 pb-4">Recent reports</p>
      <div>
          <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "rgba(238, 238, 238, 1)" }}>
              <TableRow>
                <TableCell sx={{ fontSize: "14px", fontWeight: "700" }}>
                File name
                </TableCell>
                <TableCell
                  sx={{ fontSize: "14px", fontWeight: "700" }}
                >
                  Start date
                </TableCell>
                <TableCell
                  sx={{ fontSize: "14px", fontWeight: "700" }}
                >
                  End date
                </TableCell>
                <TableCell
                  sx={{ fontSize: "14px", fontWeight: "700" }}
                >
                  Report type
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "14px", fontWeight: "700" }}
                >
                  Download
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Sampledata?.map((report, index) => (
                <TableRow key={report.fileName}>
                  <TableCell sx={{ fontSize: "14px", fontWeight: "600" }}>
                    {report.fileName}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "14px", fontWeight: "600" }}
                  >
                    {report.startDate}
                  </TableCell>
                  <TableCell  sx={{ fontSize: "14px", fontWeight: "600" }}>
                    {report.endDate}
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", fontWeight: "600" }}>
                    {report.reportType}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton >
                    <DownloadIcon fontSize="large"/>
                    </IconButton>
                   
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
          </div>
  </div>;
};

export default Reports;
