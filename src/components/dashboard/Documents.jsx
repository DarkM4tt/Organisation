import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import tickIcon from "../../assets/tick.svg";
import LoadingAnimation from "./../common/LoadingAnimation";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const Documents = () => {
  const [orgDocDetails, setOrgDocDetails] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [isPdf, setIsPdf] = useState(false);

  const fetchDocs = useCallback(async () => {
    setLoading(true);
    const orgId = localStorage.getItem("org_id");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_DEV_URL}/organization_docs/${orgId}`
      );
      if (!res.ok) {
        setError("Error in fetching org documents!");
        setLoading(false);
        return;
      }
      const response = await res.json();
      setOrgDocDetails(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }, []);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  const handleViewDocument = (url, label) => {
    const extension = url.split(".").pop();
    if (extension === "pdf") {
      setIsPdf(true);
    } else if (["jpg", "jpeg", "png"].includes(extension)) {
      setIsPdf(false);
    }
    setModalContent(url);
    setModalTitle(label);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalContent(null);
    setModalTitle("");
  };

  if (loading) {
    return (
      <div className="mx-auto w-full h-full">
        <LoadingAnimation height={500} width={500} />
      </div>
    );
  }

  if (error) {
    return <h1 className="text-red-400 text-3xl p-4 font-bold">{error}</h1>;
  }

  return (
    <div className="p-6 w-[70%] max-w-[1100px] flex flex-col gap-8">
      <div className="">
        <Typography
          sx={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px" }}
        >
          Mandatory documents of the organization
        </Typography>
        {[
          {
            label:
              "[Partner Only] > Personal Accident Insurance Policy (Special Conditions + Invoice/Receipt)",
            date: "December 25, 2024",
            type: "accident_insurance_url",
            url: orgDocDetails?.accident_insurance_url,
          },
          {
            label:
              "[Partner Only] > Civil and Professional Liability Insurance Policy (Special Conditions + Proof of Payment/Receipt)",
            date: "December 25, 2024",
            type: "cp_liability_url",
            url: orgDocDetails?.cp_liability_url,
          },
          {
            label: "[Partner Only] > TVDE Operator License",
            date: "December 25, 2024",
            type: "tvde_url",
            url: orgDocDetails?.tvde_url,
          },
          {
            label: "[Partner Only] > TVDE Operator License (DRETT)",
            date: "December 25, 2024",
            type: "drett_url",
            url: orgDocDetails?.drett_url,
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
              <Box
                display="flex"
                gap="15px"
                sx={{ color: "rgba(24, 196, 184, 1)", marginTop: 2 }}
              >
                <img src={tickIcon} alt="tickIcon" />
                <span>Valid until {item.date}</span>
              </Box>
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
              onClick={() => handleViewDocument(item.url, item.label)}
            >
              View
            </Button>
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

      {/* Modal for viewing documents (PDFs or images) */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {modalTitle}
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {modalContent && (
            <>
              {isPdf ? (
                <Worker
                  workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
                >
                  <Viewer fileUrl={modalContent} />
                </Worker>
              ) : (
                <img
                  src={modalContent}
                  alt={modalTitle}
                  style={{ width: "100%" }}
                />
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Documents;
