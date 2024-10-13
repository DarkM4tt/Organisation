import { useNavigate } from "react-router-dom";
import boldCyan from "../../assets/boldCyan.svg";

const SignupHeader = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <div className="py-5 px-24 border-b-[1px] border-lightGray">
      <img
        src={boldCyan}
        alt="bold"
        className="w-20 cursor-pointer"
        onClick={handleClick}
      />
    </div>
  );
};

export default SignupHeader;
