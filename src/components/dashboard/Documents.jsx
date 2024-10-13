import { Button, Card, Typography } from "@mui/material";
// import LoadingAnimation from "../common/LoadingAnimation";

const Documents = () => {
  return (
    <div className="p-6 w-[70%] max-w-[1100px] flex flex-col gap-4">
      <div className="">
        <Typography
          sx={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px" }}
        >
          Mandatory documents of the organization
        </Typography>
        {[
          {
            label: "[Partner Only] > Car Insurance Policy (Green Card)",
            date: "Valid until December 25, 2024",
            type: "carInsurancePolicyGreenCard",
            value: "car_insurance_policy_green_card",
          },
          {
            label: "[Partner Only] > Car Insurance Policy (Special Conditions)",
            date: "Valid until December 25, 2024",
            type: "carInsuranceSpecialConditions",
            value: "car_insurance_special_conditions",
          },
          {
            label:
              "[Partner Only] > DUA - Single Car Document (front and back) or Rental Agreement + DUA/DAV or Declaration of Assignment of Use +DUA/DAV",
            date: "Valid until December 25, 2024",
            type: "duaSingleCarDocument",
            value: "dua_single_car_document",
          },
          {
            label:
              "[Partner Only] > Periodic Technical Inspection (Vehicles over 1 year old)",
            date: "Valid until December 25, 2024",
            type: "periodicTechnicalInspection",
            value: "periodic_technical_inspection",
          },
        ].map((item, index) => (
          <Card
            key={index}
            sx={{
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 0",
              borderBottom: "1px solid rgba(221, 221, 221, 1)",
            }}
          >
            <div className="md:max-w-[80%]">
              <Typography variant="body1" fontWeight="700">
                {item.label}
              </Typography>
              <Typography
                variant="body1"
                fontWeight="500"
                sx={{ color: "rgba(24, 196, 184, 1)", marginTop: 1 }}
              >
                {item.date}
              </Typography>
            </div>
            <Button
              variant="contained"
              sx={{
                bgcolor: "rgba(238, 238, 238, 1)",
                color: "#000",
                fontSize: "16px",
                fontWeight: "600",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(238, 238, 238, 1)",
                },
              }}
              // onClick={() => handleUpload(item.type)}
            >
              Upload
              {/* {uploadingDocument === item.type ? (
              <LoadingAnimation width={30} height={30} />
            ) : vehicleDetails?.documents &&
              vehicleDetails?.documents[item.value] ? (
              "Re-upload"
            ) : (
              "Upload"
            )} */}
            </Button>
            {/* {uploadError && (
            <p className="mt-2 font-redhat text-red-400">{uploadError}</p>
          )} */}
          </Card>
        ))}
      </div>
      <div className="">
        <Typography
          sx={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px" }}
        >
          Optional organization documents
        </Typography>
        {[
          {
            label: "[Partner Only] > Car Insurance Policy (Green Card)",
            date: "Valid until December 25, 2024",
            type: "carInsurancePolicyGreenCard",
            value: "car_insurance_policy_green_card",
          },
          {
            label: "[Partner Only] > Car Insurance Policy (Special Conditions)",
            date: "Valid until December 25, 2024",
            type: "carInsuranceSpecialConditions",
            value: "car_insurance_special_conditions",
          },
          {
            label:
              "[Partner Only] > DUA - Single Car Document (front and back) or Rental Agreement + DUA/DAV or Declaration of Assignment of Use +DUA/DAV",
            date: "Valid until December 25, 2024",
            type: "duaSingleCarDocument",
            value: "dua_single_car_document",
          },
          {
            label:
              "[Partner Only] > Periodic Technical Inspection (Vehicles over 1 year old)",
            date: "Valid until December 25, 2024",
            type: "periodicTechnicalInspection",
            value: "periodic_technical_inspection",
          },
        ].map((item, index) => (
          <Card
            key={index}
            sx={{
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 0",
              borderBottom: "1px solid rgba(221, 221, 221, 1)",
            }}
          >
            <div className="md:max-w-[80%]">
              <Typography variant="body1" fontWeight="700">
                {item.label}
              </Typography>
              <Typography
                variant="body1"
                fontWeight="500"
                sx={{ color: "rgba(24, 196, 184, 1)", marginTop: 1 }}
              >
                {item.date}
              </Typography>
            </div>
            <Button
              variant="contained"
              sx={{
                bgcolor: "rgba(238, 238, 238, 1)",
                color: "#000",
                fontSize: "16px",
                fontWeight: "600",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(238, 238, 238, 1)",
                },
              }}
              // onClick={() => handleUpload(item.type)}
            >
              Upload
              {/* {uploadingDocument === item.type ? (
              <LoadingAnimation width={30} height={30} />
            ) : vehicleDetails?.documents &&
              vehicleDetails?.documents[item.value] ? (
              "Re-upload"
            ) : (
              "Upload"
            )} */}
            </Button>
            {/* {uploadError && (
            <p className="mt-2 font-redhat text-red-400">{uploadError}</p>
          )} */}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Documents;
