import { Button, TextField, MenuItem, Box } from "@mui/material";

const BoldConnect = () => {
  return (
    <div className="bg-gray-100 min-h-screen px-8 py-4">
      {/* Header */}
      <div className="mb-4 space-y-2">
        <h1 className="text-2xl font-bold font-redhat">Bold connect</h1>
        <p className="text-base font-semibold font-redhat mb-6 text-[#666666]">
          Lorem ipsum dolor sit amet consectetur pretium magna dictum volutpat
          ac nisi.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {/* Form Heading */}
        <h2 className="text-lg font-bold font-redhat mb-4">Fill the details</h2>

        {/* Form */}
        <form className="space-y-4">
          {/* Concern Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Concern
            </label>
            <TextField
              select
              fullWidth
              defaultValue="Vehicle is blocked"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            >
              <MenuItem value="Vehicle is blocked">Vehicle is blocked</MenuItem>
              <MenuItem value="Other Concern">Other Concern</MenuItem>
            </TextField>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email id
            </label>
            <TextField
              fullWidth
              type="email"
              defaultValue="admin@boldcabs.com"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <TextField
              fullWidth
              multiline
              rows={4}
              defaultValue="admin@boldcabs.com"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </div>

          {/* Buttons */}
          <Box className="flex pt-4 gap-4">
            <Button
              variant="outlined"
              className="text-black border-black"
              sx={{
                px: 4,
                py: 1,
                borderRadius: "8px",
                borderWidth: "1px",
                textTransform: "none",
                border: "none",
                backgroundColor: "#EEEEEE",
                color: "black",
                "&:hover": {
                  borderColor: "black",
                  backgroundColor: "#EEEEEE",
                  border: "none",
                },
              }}
            >
              Discard
            </Button>
            <Button
              variant="contained"
              className="bg-black text-white"
              sx={{
                px: 4,
                py: 1,
                borderRadius: "8px",
                textTransform: "none",
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
            >
              Send
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default BoldConnect;
