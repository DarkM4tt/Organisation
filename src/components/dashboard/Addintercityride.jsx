import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Box,
  Typography,
  InputAdornment,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '../../assets/crossIcon.svg';
import CalendarTodayIcon from "../../assets/calendericon.svg"
import locationpinicon from "../../assets/locationpickupicon.svg"
import euroicon from "../../assets/euroicon.svg"
import timeicon from "../../assets/timeicon.svg"

export const CustomCalendarIcon = (props) => (
   <img className='w-[20px] h-[20px]' src={CalendarTodayIcon} alt='calender'/>
);

export const CustomClockIcon = (props) => (
  <img className='w-[20px] h-[20px]' src={timeicon} alt='timeicon'/>
);

const Addintercityride = ({Handleclose}) => {
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [isYesChecked, setIsYesChecked] = useState(false);
  const [isNoChecked, setIsNoChecked] = useState(false);

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: 5,
        padding: '24px',
        width: '100%',
        maxWidth: '100%',
        margin: '0 auto',
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <h4 className='font-redhat font-bold text-2xl'>
          Create new intercity ride
        </h4>
        <IconButton onClick={Handleclose}>
          <img src={CloseIcon} alt='closeicon'/>
        </IconButton>
      </div>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
            From
          </Typography>
          <TextField
            name="From"
            // value={formData.registration_number}
            // onChange={handleChange}
            placeholder="Enter city name and pin exact location"
            fullWidth
            variant="outlined"
            InputProps={{
                endAdornment: <img src={locationpinicon} />,
              }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
            To
          </Typography>
          <TextField
            name="To"
            // value={formData.registration_number}
            // onChange={handleChange}
            placeholder="Enter city name and pin exact location"
            fullWidth
            variant="outlined"
            InputProps={{
                endAdornment: <img src={locationpinicon} />,
              }}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ flex: 1}}>
            <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
              Departure Date
            </Typography>
            <DatePicker
             slotProps={{textField:{fullWidth:true}}}
              value={selectedDate}
               mask="__-__-____"
          inputFormat="DD-MM-YYYY"
            //   onChange={(date) => setSelectedDate(date)}
            renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                />
              )}
              slots={{openPickerIcon:CustomCalendarIcon}}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
              Departure Time
            </Typography>
            <TimePicker
             slotProps={{textField:{fullWidth:true}}}
              value={selectedTime}
            //   onChange={(time) => setSelectedTime(time)}
              renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
              slots={{openPickerIcon:CustomCalendarIcon}}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
              ETA
            </Typography>
            <TimePicker
             slotProps={{textField:{fullWidth:true}}}
              value={selectedTime}
            //   onChange={(time) => setSelectedTime(time)}
              renderInput={(params) => <TextField {...params} sx={{width:"100%"}} variant="outlined" />}
              slots={{openPickerIcon:CustomClockIcon}}
            />
          </Box>
        </LocalizationProvider>
      </Box>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
        <Box sx={{ flex: 1}}>
          <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
            Vehicle
          </Typography>
          <TextField
            name="category"
            // value={formData.category}
            // onChange={handleChange}
            placeholder="For example: 1234 - ABCD"
            fullWidth
            select
            variant="outlined"
          >
            {/* {vehicleCategories.map((option) => (
              <MenuItem key={option.id} value={option._id}>
                {option.name}
              </MenuItem>
            ))} */}
          </TextField>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
            Per seat charges
          </Typography>
          <TextField
            name="Per seat charges"
            // value={formData.vehicle_model}
            // onChange={handleChange}
            placeholder="Per seat charges"
            fullWidth
            variant="outlined"
            InputProps={{
                endAdornment: <img src={euroicon} alt='calender' />,
              }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
            Per seat charges
          </Typography>
          <FormControlLabel
          sx={{marginTop:"5px"}}
            control={
              <Checkbox
                // checked={isYesChecked}
                // onChange={(e) => setIsYesChecked(e.target.checked)}
                sx={{
                  '&.Mui-checked': {
                    color: "#18C4B8",
                  },
                }}
              />
            }
            label="Yes"
          />
          <FormControlLabel
          sx={{marginTop:"5px"}}
            control={
              <Checkbox
                // checked={isNoChecked}
                // onChange={(e) => setIsNoChecked(e.target.checked)}
                sx={{
                  '&.Mui-checked': {
                    color: "#18C4B8",
                  }
                }}
              />
            }
            label="No"
          />
        </Box>
      </Box>
      <Typography variant="body2" className="mt-4">
        Lorem ipsum dolor sit amet consectetur. Turpis nunc auctor vel amet convallis non viverra. Vel aliquam cras scelerisque rhoncus nunc sed vitae aliquet morbi.
      </Typography>
    </Box>
  );
};

export default Addintercityride;

