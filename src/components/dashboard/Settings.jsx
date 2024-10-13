import { useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Avatar,
  Checkbox,
  Switch,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { countries } from "./../../utils/countries";

const SettingsPage = () => {
  const [selectedTab, setSelectedTab] = useState("General");
  const [userData, setUserData] = useState({
    brandName: "BOLD",
    tradeName: "Boldness BOLD LLD Ltd.",
    contactNumber: "+220 11928 1992",
    fax: "---",
    email: "admin@boldcabs.com",
    country: "Portugal",
    city: "",
    flatUnit: "",
    street: "",
    number: "",
    postcode: "",
  });
  // eslint-disable-next-line no-unused-vars
  const [preferencesData, setPreferencesData] = useState({
    companyTimeZone: "(UTC-08:00) Pacific time...",
    language: "English (US)",
    sidebarSize: "Medium (200px)",
    timeZone: "Small (24px)",
  });
  // eslint-disable-next-line no-unused-vars
  const [notificationsData, setNotificationsData] = useState({
    emailNotifications: true,
    changesAndAlerts: true,
    billingAndPayouts: false,
  });
  // eslint-disable-next-line no-unused-vars
  const [accountData, setAccountData] = useState({
    bankAccountNumber: "12099 1119201 9921012 01221",
    bankName: "ICICI Bank Ltd",
    accountType: "Current account",
    currentPaymentGateway: "Stripe payments",
    taxId: "Lorem ipsum",
    taxAccountNumber: "BOLPP00219NM",
  });

  const [isChanged, setIsChanged] = useState(false);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setIsChanged(true);
  };

  const handleToggle = (event) => {
    setNotificationsData({
      ...notificationsData,
      [event.target.name]: event.target.checked,
    });
  };

  // Handler for toggling checkboxes
  const handleCheckboxChange = (event) => {
    setNotificationsData({
      ...notificationsData,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCancel = () => {
    setUserData({
      brandName: "BOLD",
      tradeName: "Boldness BOLD LLD Ltd.",
      contactNumber: "+220 11928 1992",
      fax: "---",
      email: "admin@boldcabs.com",
      country: "Portugal",
      city: "",
      flatUnit: "",
      street: "",
      number: "",
      postcode: "",
    });
    setIsChanged(false);
  };

  const handleSave = () => {
    // Call save API here
    setIsChanged(false);
  };

  const renderContent = () => {
    if (selectedTab === "General") {
      return (
        <div>
          <div className="border-b-[1px] border-[#EEEEEE] flex flex-col gap-2">
            <h2 className="text-2xl font-bold font-redhat">General</h2>
            <p className="text-base font-semibold font-redhat text-[#666666] mb-4">
              Lorem ipsum dolor
            </p>
          </div>

          {/* Company Details Section */}
          <div className="mt-6">
            <h3 className="text-lg font-bold font-redhat">Company details</h3>
            <div className="flex items-center space-x-4 mt-4">
              <Avatar alt="Company Logo" className="w-20 h-20" />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "none",
                  padding: "7px 30px",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
              >
                Update logo
              </Button>
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#E5E5E5",
                  color: "#000",
                  border: "none",
                  padding: "10px 30px",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#E5E5E5",
                    border: "none",
                  },
                }}
              >
                Delete
              </Button>
            </div>

            {/* Fields with custom labels and placeholders */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-600 font-redhat text-base font-medium">
                  Brand name
                </label>
                <TextField
                  name="brandName"
                  value={userData.brandName}
                  onChange={handleInputChange}
                  placeholder="Enter brand name"
                  fullWidth
                />
              </div>
              <div>
                <label className="block text-gray-600 font-redhat text-base font-medium">
                  Trade name
                </label>
                <TextField
                  name="tradeName"
                  value={userData.tradeName}
                  onChange={handleInputChange}
                  placeholder="Enter trade name"
                  fullWidth
                />
              </div>
              <div>
                <label className="block text-gray-600 font-redhat text-base font-medium">
                  Contact number
                </label>
                <TextField
                  name="contactNumber"
                  value={userData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Enter contact number"
                  fullWidth
                />
              </div>
              <div>
                <label className="block text-gray-600 font-redhat text-base font-medium">
                  Fax
                </label>
                <TextField
                  name="fax"
                  value={userData.fax}
                  onChange={handleInputChange}
                  placeholder="Enter fax number"
                  fullWidth
                />
              </div>
              <div>
                <label className="block text-gray-600 font-redhat text-base font-medium">
                  Email id
                </label>
                <TextField
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  fullWidth
                />
              </div>
            </div>
          </div>

          {/* Registered Address Section */}
          <div>
            <h3 className="mt-8 text-lg font-semibold">Registered address</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-600 font-redhat text-base font-medium">
                  Country
                </label>
                <TextField
                  select
                  name="country"
                  value={userData.country}
                  onChange={handleInputChange}
                  placeholder="Select country"
                  fullWidth
                >
                  {countries.map((country) => (
                    <MenuItem key={country.code} value={country.label}>
                      {country.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div>
                <label className="block text-gray-600 font-redhat text-base font-medium">
                  City
                </label>
                <TextField
                  name="city"
                  value={userData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  fullWidth
                />
              </div>
              <div>
                <label className="block text-gray-600 font-redhat text-base font-medium">
                  Flat/Unit
                </label>
                <TextField
                  name="flatUnit"
                  value={userData.flatUnit}
                  onChange={handleInputChange}
                  placeholder="Enter flat/unit"
                  fullWidth
                />
              </div>
              <div>
                <label className="block text-gray-600 font-redhat text-base font-medium">
                  Street
                </label>
                <TextField
                  name="street"
                  value={userData.street}
                  onChange={handleInputChange}
                  placeholder="Enter street"
                  fullWidth
                />
              </div>
              <div>
                <label className="block text-gray-600 font-redhat text-base font-medium">
                  Number
                </label>
                <TextField
                  name="number"
                  value={userData.number}
                  onChange={handleInputChange}
                  placeholder="Enter number"
                  fullWidth
                />
              </div>
              <div>
                <label className="block text-gray-600 font-redhat text-base font-medium">
                  Postcode
                </label>
                <TextField
                  name="postcode"
                  value={userData.postcode}
                  onChange={handleInputChange}
                  placeholder="Enter postcode"
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (selectedTab === "Preferences") {
      return (
        <div>
          <div className="border-b-[1px] border-[#EEEEEE] flex flex-col gap-2">
            <h2 className="text-2xl font-bold font-redhat">Preferences</h2>
            <p className="text-base font-semibold font-redhat text-[#666666] mb-4">
              Lorem ipsum dolor
            </p>
          </div>

          {/* Preferences Fields */}
          <div className="grid grid-cols-2 gap-4 items-center mt-8">
            <label className="font-redhat text-base font-medium">
              Company Time Zone
            </label>
            <TextField
              name="companyTimeZone"
              value={preferencesData.companyTimeZone}
              onChange={handleInputChange}
              placeholder="(UTC-08:00) Pacific time..."
              fullWidth
            />

            <label className="font-redhat text-base font-medium">
              Language
            </label>
            <TextField
              name="language"
              value={preferencesData.language}
              onChange={handleInputChange}
              placeholder="English (US)"
              fullWidth
            />

            <label className="font-redhat text-base font-medium">
              Sidebar size
            </label>
            <TextField
              name="sidebarSize"
              value={preferencesData.sidebarSize}
              onChange={handleInputChange}
              placeholder="Medium (200px)"
              fullWidth
            />

            <label className="font-redhat text-base font-medium">
              Time Zone
            </label>
            <TextField
              name="timeZone"
              value={preferencesData.timeZone}
              onChange={handleInputChange}
              placeholder="Small (24px)"
              fullWidth
            />
          </div>
        </div>
      );
    }
    if (selectedTab === "Notifications") {
      return (
        <div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold">Notification</h2>
              <p className="text-gray-500 mb-6">Lorem ipsum dolor</p>
            </div>
            <Switch
              checked={notificationsData.emailNotifications}
              onChange={handleToggle}
              name="emailNotifications"
              color="primary"
            />
          </div>

          <div className="flex items-center mb-4">
            <label className="font-semibold text-black mr-2">
              Email Notifications
            </label>
            <Switch
              checked={notificationsData.emailNotifications}
              onChange={handleToggle}
              name="emailNotifications"
              color="primary"
            />
          </div>

          <p className="text-gray-500 mb-4">
            Lorem ipsum dolor sit amet consectetur pretium magna dictum volutpat
            ac nisl.
          </p>

          <div className="ml-4 mb-4">
            <div className="flex items-center mb-4">
              <Checkbox
                checked={notificationsData.changesAndAlerts}
                onChange={handleCheckboxChange}
                name="changesAndAlerts"
                color="primary"
              />
              <div className="ml-2">
                <label className="font-semibold text-black">
                  Changes and alerts
                </label>
                <p className="text-gray-500">
                  Lorem ipsum dolor sit amet consectetur pretium magna dictum
                  volutpat ac nisl.
                </p>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <Checkbox
                checked={notificationsData.billingAndPayouts}
                onChange={handleCheckboxChange}
                name="billingAndPayouts"
                color="primary"
              />
              <div className="ml-2">
                <label className="font-semibold text-black">
                  Billing and payouts
                </label>
                <p className="text-gray-500">
                  Lorem ipsum dolor sit amet consectetur pretium magna dictum
                  volutpat ac nisl.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (selectedTab === "Account") {
      return (
        <Box>
          <div className="border-b-[1px] border-[#EEEEEE] flex flex-col gap-2">
            <h2 className="text-2xl font-bold font-redhat">Account</h2>
            <p className="text-base font-semibold font-redhat text-[#666666] mb-4">
              Lorem ipsum dolor
            </p>
          </div>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column">
                <Typography fontWeight="500">Bank account number</Typography>
                <TextField
                  value={accountData.bankAccountNumber}
                  placeholder="12099 1119201 9921012 01221"
                  size="md"
                  mt={1}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column">
                <Typography fontWeight="500">Bank name</Typography>
                <TextField
                  value={accountData.bankName}
                  placeholder="ICICI Bank Ltd"
                  size="md"
                  mt={1}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column">
                <Typography fontWeight="500">Account type</Typography>
                <TextField
                  value={accountData.accountType}
                  placeholder="Current account"
                  size="md"
                  mt={1}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column">
                <Typography fontWeight="500">
                  Current payment gateway
                </Typography>
                <TextField
                  value={accountData.currentPaymentGateway}
                  placeholder="Stripe payments"
                  size="md"
                  mt={1}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column">
                <Typography fontWeight="500">TAX ID</Typography>
                <TextField
                  value={accountData.taxId}
                  placeholder="Lorem ipsum"
                  size="md"
                  mt={1}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column">
                <Typography fontWeight="500">TAX Account number</Typography>
                <TextField
                  value={accountData.taxAccountNumber}
                  placeholder="BOLPP00219NM"
                  size="md"
                  mt={1}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      );
    }

    return <div>{selectedTab} settings</div>;
  };

  return (
    <div className="p-8">
      {/* Heading */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-redhat">Settings</h1>
          <p className="font-redhat font-semibold text-base text-gray">
            Lorem ipsum dolor sit amet consectetur pretium magna dictum volutpat
            ac nisl.
          </p>
        </div>
        {/* Cancel and Save Buttons */}
        {isChanged && (
          <div className="space-x-4">
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{
                textTransform: "none",
                backgroundColor: "#E5E5E5",
                color: "#000",
                border: "none",
                padding: "10px 30px",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#E5E5E5",
                  border: "none",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              className="normal-case bg-black text-white"
              sx={{
                backgroundColor: "black",
                color: "white",
                textTransform: "none",
                padding: "10px 30px",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
            >
              Save
            </Button>
          </div>
        )}
      </div>

      {/* Sidebar and Content */}
      <div className="flex mt-6">
        {/* Sidebar Menu */}
        <div className="w-1/5">
          <div className="space-y-2">
            {["General", "Preferences", "Notifications", "Account"].map(
              (tab) => (
                <div
                  key={tab}
                  className={`p-2 cursor-pointer font-redhat font-semibold text-lg ${
                    selectedTab === tab
                      ? "bg-[rgba(24,196,184,0.1)] border-r-4 border-r-[#18C4B8] text-[#18C4B8]"
                      : ""
                  }`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </div>
              )
            )}
          </div>
        </div>

        {/* Content */}
        <div className="w-4/5 border-l-[1px] border-[#EEEEEE] pl-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
