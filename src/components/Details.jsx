import { useState } from "react";
import { Button } from "@mui/material";
import checkIcon from "../assets/right.svg";
import PropTypes from "prop-types";
import LoadingAnimation from "./common/LoadingAnimation";

const documents = [
  {
    id: 1,
    name: "> Personal Accident Insurance Policy (Special Conditions + Invoice/Receipt)",
    validUntil: "December 25, 2024",
  },
  {
    id: 2,
    name: "> Civil and Professional Liability Insurance Policy (Special Conditions + Proof of Payment/Receipt)",
    validUntil: "December 25, 2024",
  },
  {
    id: 3,
    name: "> TVDE Operator License",
    validUntil: "December 25, 2024",
  },
  {
    id: 4,
    name: "> TVDE Operator License (DRETT)",
    validUntil: "December 25, 2024",
  },
];

const DocumentUpload = ({
  personalAccidentUploaded,
  civilLiabilityUploaded,
  tvdeLicenseUploaded,
  tvdeLicenseDrettUploaded,
  onUpload,
}) => {
  const [loading, setLoading] = useState(null);

  const handleFileUpload = (event, docId) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === "application/pdf" || file.type.startsWith("image/"))
    ) {
      setLoading(docId);
      setTimeout(() => {
        onUpload(docId);
        setLoading(null);
      }, 1500);
    } else {
      alert("Please upload a valid PDF or image file.");
    }
  };

  const isUploaded = (docId) => {
    switch (docId) {
      case 1:
        return personalAccidentUploaded;
      case 2:
        return civilLiabilityUploaded;
      case 3:
        return tvdeLicenseUploaded;
      case 4:
        return tvdeLicenseDrettUploaded;
      default:
        return false;
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8 font-redhat">
        Mandatory documents of the organization
      </h1>
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="mb-6 flex justify-between items-center border-b-[1px] border-[#DDDDDD] pb-6"
        >
          <div className="flex flex-col">
            <span className="text-base font-bold font-redhat">
              [Partner Only] {doc.name}
            </span>
            {isUploaded(doc.id) ? (
              <div className="flex items-center mt-4 gap-2">
                <img src={checkIcon} alt="ckecked" />
                <span className="font-redhat text-base font-medium text-[#18C4B8]">
                  Valid until {doc.validUntil}
                </span>
              </div>
            ) : null}
          </div>
          <div className="ml-4">
            <input
              accept=".pdf,image/*"
              id={`upload-${doc.id}`}
              type="file"
              style={{ display: "none" }}
              onChange={(event) => handleFileUpload(event, doc.id)}
            />
            <label htmlFor={`upload-${doc.id}`}>
              <Button
                variant="contained"
                component="span"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#E5E5E5",
                  color: "#000",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "#E5E5E5",
                  },
                }}
              >
                {loading === doc.id ? (
                  <LoadingAnimation height={40} width={40} />
                ) : isUploaded(doc.id) ? (
                  "Re-upload"
                ) : (
                  "Upload"
                )}
              </Button>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

DocumentUpload.propTypes = {
  personalAccidentUploaded: PropTypes.bool.isRequired,
  civilLiabilityUploaded: PropTypes.bool.isRequired,
  tvdeLicenseUploaded: PropTypes.bool.isRequired,
  tvdeLicenseDrettUploaded: PropTypes.bool.isRequired,
  onUpload: PropTypes.func.isRequired,
};

export default DocumentUpload;
