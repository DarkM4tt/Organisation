import React, { useState, useEffect } from "react";
import searchIcon from "../../assets/searchIcon.svg";
import downloadicon from "../../assets/downloadicon.svg";
import {
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
  styled,
} from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";
import ZonesupdateModal from "./Zonesupdatemodal";
import {
  useDeleteZoneMutation,
  useGetZonesQuery,
  useToggleZoneStatusMutation,
  useGetZonePricesQuery
} from "../../features/Zones/zonesSlice";

// Custom Select Dropdown Component
const CustomSelectDropdown = ({ value, onChange, name, options, ...rest }) => {
  const MenuProps = {
    PaperProps: {
      style: { maxHeight: 200 },
    },
    anchorOrigin: { vertical: "bottom", horizontal: "left" },
    transformOrigin: { vertical: "top", horizontal: "left" },
  };
  return (
    <Select
      value={value}
      onChange={onChange}
      MenuProps={MenuProps}
      {...rest}
      displayEmpty
      renderValue={(selected) => (
        <span
          className="text-sm lg:text-base"
          style={{ color: "#18C4B8", fontWeight: 600 }}
        >
          <img className="inline-block pr-2" src={downloadicon} alt="any" />
          Exports
        </span>
      )}
      sx={{
        backgroundColor: "white",
        borderRadius: "10px",
        ".MuiSvgIcon-root": { color: "#18C4B8" },
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: "#18C4B8",
          borderRadius: "10px",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#18C4B8",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#18C4B8" },
        ".MuiSelect-select": {
          paddingInline: 2,
          backgroundColor: "white",
          color: "black",
          fontFamily: "Red Hat Display, sans-serif",
          fontWeight: 600,
          borderRadius: "8px",
          paddingY: "8px",
        },
      }}
    >
      {options?.map((option, idx) => (
        <MenuItem
          key={idx}
          value={option}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: value === option ? "#F5F5F5" : "transparent",
            "&:hover": { backgroundColor: "#F5F5F5" },
            color: "black",
            fontFamily: "Red Hat Display, sans-serif",
            fontWeight: 600,
          }}
        >
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};

// Custom Switch Component
const CustomSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const Zoneslist = ({ sampleData, carOptions }) => {
  const [search, setSearch] = useState("");
  const [state, setState] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [zones, setZones] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteZone] = useDeleteZoneMutation();
  const [toggleZoneStatus] = useToggleZoneStatusMutation();
  const { refetch } = useGetZonesQuery();
  const [zoneupdate, setzoneupdate] = useState(false)
  const { data: zonePrices, error, refetch:zonepricesreftech } = useGetZonePricesQuery(
    selectedZone?._id, 
    { skip: !selectedZone } // Skip the query if selectedZone is null
  );

  useEffect(() => {
    if (zonePrices && selectedZone && selectedZone.prices !== zonePrices.prices) {
      setSelectedZone((prevZone) => ({
        ...prevZone,
        prices: zonePrices.prices,
      }));
    }
  }, [zonePrices, selectedZone,zoneupdate]);
  

  const handleMenuOpen = async (event, zone) => {
    setMenuAnchor(event.currentTarget);
    setSelectedZone(zone);
  };

  const handleEditzone = () => {
    setMenuAnchor(null);
    setOpen(true);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
    setOpen(false);
  };
  const handleStateChange = (event) => setState(event.target.value);

  const handleStatusChange = async (zone) => {
    const updatedZones = zones.map((z) =>
      z._id === zone._id ? { ...z, is_active: !zone.is_active } : z
    );
    setZones(updatedZones);

    try {
      await toggleZoneStatus({
        id: zone._id,
        is_active: !zone.is_active,
      }).unwrap(); // Toggle the zone status
      refetch(); // Refetch the data to reflect the change
    } catch (error) {
      console.error("Failed to toggle zone status:", error);
    }
  };

  const handleRemoveZone = async (zoneId) => {
    const updatedZones = zones.filter((zone) => zone._id !== zoneId);
    setZones(updatedZones);

    try {
      await deleteZone(zoneId).unwrap(); // Delete the zone
      refetch();
    } catch (error) {
      console.error("Failed to delete zone:", error);
      // Handle error appropriately
    }
    handleMenuClose();
  };

  const filteredData = zones.filter((zone) =>
    zone.zone_name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (sampleData !== zones) {
      setZones(sampleData);
    }
  }, [sampleData, zones]);

  return (
    <div className="border-[1px] border-[#DDDDDD] rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between px-4 pt-4">
        <div className="flex gap-4 items-center">
          <p className="font-redhat font-bold text-sm lg:text-base xl:text-lg">
            Zone List
          </p>
          <div className="py-2 bg-[#EEEEEE] rounded-[6px] align-middle px-2 font-redhat font-bold text-sm lg:text-base xl:text-lg">
            {filteredData.length}
          </div>
        </div>
        <div className="flex gap-4 md:place-content-end flex-1 md:max-w-[50%] max-[480px]:flex-col">
          <TextField
            className="max-[480px]:w-4/5 w-1/2 justify-center bg-white"
            variant="outlined"
            placeholder="Search Business Zone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img
                    src={searchIcon}
                    alt="search icon"
                    style={{ width: 25 }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "white",
              ".MuiOutlinedInput-input": {
                padding: "10px 16px",
                paddingLeft: "0px",
              },
            }}
          />
          <CustomSelectDropdown
            value={state}
            onChange={handleStateChange}
            name="State"
            options={["PDF", "Excel", "Word Doc"]}
          />
        </div>
      </div>
      <div className="pt-3">
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "rgba(238, 238, 238, 1)" }}>
              <TableRow>
                <TableCell sx={{ fontSize: "16px", fontWeight: "700" }}>
                  SN
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "16px", fontWeight: "700" }}
                >
                  Business Zone Name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "16px", fontWeight: "700" }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "16px", fontWeight: "700" }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData?.map((zone, index) => (
                <TableRow key={zone._id}>
                  <TableCell sx={{ fontSize: "16px", fontWeight: "600" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "16px", fontWeight: "600" }}
                  >
                    {zone.zone_name}
                  </TableCell>
                  <TableCell align="center">
                    <FormControlLabel
                      control={
                        <CustomSwitch
                          checked={zone.is_active}
                          onChange={() => handleStatusChange(zone)}
                        />
                      }
                      sx={{ marginLeft: 1.5 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={(e) => handleMenuOpen(e, zone)}>
                      <MoreVert />
                    </IconButton>
                    <Menu
                      anchorEl={menuAnchor}
                      open={Boolean(menuAnchor)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleEditzone}>Edit</MenuItem>
                      <MenuItem
                        onClick={() => handleRemoveZone(selectedZone._id)}
                      >
                        Remove
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <ZonesupdateModal
          setOpen={setOpen}
          open={open}
          zone={selectedZone}
          carOptions={carOptions}
          refetch={zonepricesreftech}
        />
      </div>
    </div>
  );
};

export default Zoneslist;
