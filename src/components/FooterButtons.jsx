import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import leftArrowBlack from "../assets/leftArrowBlack.svg";
import rightArrowWhite from "../assets/rightArrowWhite.svg";
import LoadingAnimation from "./common/LoadingAnimation";

const FooterButtons = ({ isNextEnabled, onNextClick, handleBack, loading }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex w-full justify-between items-center mt-12">
      <Button
        variant="outlined"
        onClick={handleBack ? handleBack : handleBackClick}
        sx={{
          borderRadius:"10px",
          border: "1px solid #DDDDDD",
          paddingBlock: "16px",
          "&:hover": {
            border: "1px solid gray",
          },
        }}
      >
        <img src={leftArrowBlack} alt="leftArrowBlack" />
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={!isNextEnabled}
        sx={{
          fontFamily: 'Red Hat Display, sans-serif',
          color: "white",
          backgroundColor: "black",
          textTransform: "none",
          fontWeight: "700",
          fontSize: "18px",
          borderRadius: "10px",
          paddingBlock: "10px",
          "&:hover": {
            backgroundColor: "black",
          },
          "&.Mui-disabled": {
            color: "white",
            backgroundColor: "lightgray",
          },
        }}
        onClick={onNextClick}
      >
        {loading ? <LoadingAnimation height={40} width={40} /> : "Next"}{" "}
        {!loading && (
          <img src={rightArrowWhite} alt="rightArrowWhite" className="ml-4" />
        )}
      </Button>
    </div>
  );
};

FooterButtons.propTypes = {
  isNextEnabled: PropTypes.bool,
  loading: PropTypes.bool,
  onNextClick: PropTypes.func.isRequired,
  handleBack: PropTypes.func,
};

export default FooterButtons;
