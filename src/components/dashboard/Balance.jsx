import {
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import radioButtonChecked from "../../assets/radioButtonChecked.svg";
import radioButtonUnChecked from "../../assets/radioButtonUnChecked.svg";
import Paper from "@mui/material/Paper";
import moneyicon from "../../assets/balancemoney.svg";
import twoLeft from "../../assets/twoLeft.svg";
import oneLeft from "../../assets/oneLeft.svg";
import twoRight from "../../assets/twoRight.svg";

const CustomSelectDropdown = ({ value, onChange, name, options, ...rest }) => {
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 200,
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
      {...rest}
      displayEmpty
      renderValue={(selected) => {
        if (!selected) {
          return (
            <span
              // className="text-sm lg:text-base"
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
        height: "100%",
        color: value ? "white" : "gray",
        borderRadius: "10px",
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
        },
      }}
    >
      {options.map((option, idx) => (
        <MenuItem
          key={idx}
          value={option}
          sx={{
            display: "flex",
            height: "100%",
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
const Balance = () => {
  const times = ["11:46 PM", "11:46 PM", "11:46 PM", "11:46 PM"];
  return (
    <div className="flex flex-col gap-2 px-4 py-2">
      <h1 className="text-2xl font-bold">Performance</h1>
      <div className="flex gap-6 pt-11">
        <div className="border border-[#DDDDDD] rounded-xl py-4 px-3 flex-grow flex flex-col gap-3">
          <p className="font-redhat font-semibold text-base text-[#666666]">
            Current Balance
          </p>
          <p className=" font-bold text-4xl">317,48 $</p>
          <p className="font-redhat font-semibold text-base text-[#666666]">
            Next Weekly payment on: July 24, 2024
          </p>
        </div>
        <div className="border border-[#DDDDDD] rounded-xl py-4 px-3 flex-grow flex flex-col gap-3">
          <p className="font-redhat font-semibold text-base text-[#666666]">
            Driver statement
          </p>
          <p className="font-redhat font-semibold text-base text-[#666666]">
            Next Weekly payment on: 24 July
          </p>
          <div>
            <Button
              variant="contained"
              sx={{
                backgroundColor: false ? "#BBBBBB" : "black",
                color: "white",
                textTransform: "none",
                padding: "12px 24px",
                fontWeight: "600",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: false ? "#BBBBBB" : "black",
                },
              }}
            >
              All Transactions
            </Button>
          </div>
        </div>
      </div>
      <div className="flex gap-4 pt-11 ">
        <div className="">
          <Button
            variant="contained"
            sx={{
              backgroundColor: false ? "#BBBBBB" : "black",
              color: "white",
              textTransform: "none",
              padding: "12px 24px",
              fontWeight: "600",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: false ? "#BBBBBB" : "black",
              },
            }}
          >
            All Transactions
          </Button>
        </div>
        <div>
          <CustomSelectDropdown
            // value={selectedOrg}
            // onChange={handleDriverChange}
            name="Article type"
            options={["Org1", "Org2"]}
          />
        </div>
      </div>
      <p className="text-sm font-semibold text-[#777777]">Monday, June 24th</p>
      <TableContainer
        component={Paper}
        className="bg-black rounded-md"
        style={{ borderRadius: "8px", overflow: "hidden" }}
      >
        <Table>
          <TableBody>
            {times.map((time, index) => (
              <TableRow
                key={index}
                className=""
                style={{
                  borderBottom: "1px solid #333333", // Set border color to dark gray
                  height: "60px", // Adjust height to control row spacing
                }}
              >
                <TableCell className="">
                  <div className="flex gap-4 items-center">
                    <img src={moneyicon} alt="" />
                    <div>
                      {" "}
                      <p className="text-base font-semibold">Ride</p>
                      <p className="text-sm font-normal text-[#777777] pt-1">
                        Monday, June 24th
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-white ">
                  <p className="text-base font-semibold">
                    RICARDO ALBERTO VIDAL DOS SANTOS
                  </p>
                </TableCell>
                <TableCell className="text-white ">
                  <p className="text-lg font-semibold">$ 6.48</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-between items-center">
        <Select
          value="10"
          onChange={() => {}}
          sx={{
            backgroundColor: "white",
            fontWeight: "600",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        >
          <MenuItem value="10">10 lines</MenuItem>
          <MenuItem value="20">20 lines</MenuItem>
          <MenuItem value="50">50 lines</MenuItem>
        </Select>
        <div className="flex gap-4">
          <Button
            sx={{
              color: "rgba(119, 119, 119, 1)",
              paddingInline: "20px",
              paddingBlock: "10px",
              backgroundColor: "rgba(238, 238, 238, 1)",
              fontSize: "14px",
              fontWeight: "500",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "rgba(238, 238, 238, 1)",
              },
            }}
          >
            <img src={twoLeft} alt="twoLeft" className="mr-1" />
            First page
          </Button>
          <Button
            sx={{
              color: "rgba(119, 119, 119, 1)",
              paddingInline: "20px",
              backgroundColor: "rgba(238, 238, 238, 1)",
              fontSize: "14px",
              fontWeight: "500",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "rgba(238, 238, 238, 1)",
              },
            }}
          >
            <img src={oneLeft} alt="oneLeft" className="mr-2" />
            Anterior
          </Button>
          <Button
            sx={{
              color: "rgba(119, 119, 119, 1)",
              paddingInline: "20px",
              backgroundColor: "rgba(238, 238, 238, 1)",
              fontSize: "14px",
              fontWeight: "500",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "rgba(238, 238, 238, 1)",
              },
            }}
          >
            Following
            <img src={twoRight} alt="twoRight" className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Balance;
