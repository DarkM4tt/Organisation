import PropTypes from "prop-types";
import CheckIcon from "../assets/right.svg";
import CrossIcon from "../assets/cross.svg";

const PasswordRequirement = ({ isValid, text }) => (
  <div className="flex items-center gap-2">
    <img
      src={isValid ? CheckIcon : CrossIcon}
      alt={isValid ? "Valid" : "Invalid"}
      className="w-5 h-5"
    />
    <p className="text-base font-normal text-[#777777]">{text}</p>
  </div>
);

PasswordRequirement.propTypes = {
  isValid: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default PasswordRequirement;
