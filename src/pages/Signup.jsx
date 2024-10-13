import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FooterButtons from "../components/FooterButtons";
import InputMobileNumber from "../components/InputMobileNumber";
import CreatePassword from "../components/CreatePassword";
import OrgName from "../components/OrgName";
import CountrySelector from "../components/CountrySelector";
import Details from "../components/Details";
import InputEmail from "../components/InputEmail";
import SignupHeader from "../components/common/SignupHeader";
import {
  useRegisterUserMutation,
  useSendMobileOTPMutation,
} from "../features/auth/authSlice";

const Signup = () => {
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [earningCountry, setEarningCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [personalAccidentUploaded, setPersonalAccidentUploaded] =
    useState(false);
  const [civilLiabilityUploaded, setCivilLiabilityUploaded] = useState(false);
  const [tvdeLicenseUploaded, setTvdeLicenseUploaded] = useState(false);
  const [tvdeLicenseDrettUploaded, setTvdeLicenseDrettUploaded] =
    useState(false);
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const [sendMobileOTP] = useSendMobileOTPMutation();

  const { input, isEmail, isPrevVerified, prevInput } = location.state;

  useEffect(() => {
    if (prevInput) {
      isEmail ? setMobileNumber(prevInput) : setEmail(prevInput);
    }
    isEmail ? setEmail(input) : setMobileNumber(input);
    if (isPrevVerified && step === 1) {
      setStep(2);
    }
  }, [isPrevVerified, step, input, isEmail, prevInput]);

  const handleNext = async () => {
    if (step === 1 && isEmail) {
      const phoneNumber = "+" + countryCode.phone + mobileNumber;
      setIsError(false);
      setLoading(true);
      try {
        const response = await sendMobileOTP({
          mobile_number: phoneNumber,
          entity: "org",
        }).unwrap();
        const token = response.token;
        localStorage.setItem("auth_token", token);
        navigate("/otp", {
          state: {
            input: phoneNumber,
            isEmail: false,
            isPrevVerified: true,
            prevInput: email,
          },
        });
      } catch (error) {
        console.error("Error: ", error);
        setIsError(true);
      }
      setLoading(false);
    } else if (step === 5) {
      const userData = {
        phone_number: mobileNumber,
        phone_verified: true,
        password,
        organization_name: orgName,
        country: earningCountry,
        language,
        email,
      };

      setLoading(true);
      try {
        const response = await registerUser(userData).unwrap();
        const org_id = response?.org?._id;
        localStorage.setItem("org_id", org_id);
        navigate("/home");
      } catch (error) {
        console.error("Error: ", error);
        setIsError(true);
      } finally {
        setLoading(false);
      }
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      navigate("/");
    } else {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const isNextEnabled = () => {
    switch (step) {
      case 1:
        return countryCode && !isError && mobileNumber.length > 5;
      case 2:
        return (
          password.length >= 8 && /\d/.test(password) && /\D/.test(password)
        );
      case 3:
        return isChecked && orgName.length > 2;
      case 4:
        return earningCountry && language;
      case 5:
        // return (
        //   personalAccidentUploaded &&
        //   civilLiabilityUploaded &&
        //   tvdeLicenseUploaded &&
        //   tvdeLicenseDrettUploaded
        // );
        return true;
      default:
        return false;
    }
  };

  const handleUpload = (docId) => {
    switch (docId) {
      case 1:
        setPersonalAccidentUploaded(true);
        break;
      case 2:
        setCivilLiabilityUploaded(true);
        break;
      case 3:
        setTvdeLicenseUploaded(true);
        break;
      case 4:
        setTvdeLicenseDrettUploaded(true);
        break;
      default:
        break;
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCountryCodeChange = (event, newValue) => {
    setCountryCode(newValue);
  };

  const handleMobileNumberChange = (event) => {
    const value = event.target.value;
    const isValid = /^[0-9]*$/.test(value);
    setIsError(!isValid);
    setMobileNumber(value);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    const isValid =
      newPassword.length >= 8 &&
      /\d/.test(newPassword) &&
      /\D/.test(newPassword);
    setIsError(!isValid);
  };

  const handleOrgNameChange = (event) => {
    setOrgName(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleEarningCountryChange = (event) => {
    setEarningCountry(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden overflow-y-auto">
      <SignupHeader />
      <div className=" flex-grow flex flex-col max-w-[100vw] justify-center items-center mb-8">
        <div className="w-[50%] max-w-[480px]">
          {step === 1 && isEmail && (
            <InputMobileNumber
              {...{
                countryCode,
                handleCountryCodeChange,
                mobileNumber,
                handleMobileNumberChange,
                isError,
                setIsError,
              }}
            />
          )}
          {step === 1 && !isEmail && (
            <InputEmail
              {...{ email, mobileNumber, handleEmailChange, isError }}
            />
          )}
          {step === 2 && (
            <CreatePassword {...{ password, handlePasswordChange, isError }} />
          )}
          {step === 3 && (
            <OrgName
              {...{
                orgName,
                handleOrgNameChange,
                isChecked,
                handleCheckboxChange,
              }}
            />
          )}
          {step === 4 && (
            <CountrySelector
              {...{
                earningCountry,
                handleEarningCountryChange,
                language,
                handleLanguageChange,
              }}
            />
          )}
          {step === 5 && (
            <Details
              personalAccidentUploaded={personalAccidentUploaded}
              civilLiabilityUploaded={civilLiabilityUploaded}
              tvdeLicenseUploaded={tvdeLicenseUploaded}
              tvdeLicenseDrettUploaded={tvdeLicenseDrettUploaded}
              onUpload={handleUpload}
            />
          )}
          <div className="mt-4" id="recaptcha-container"></div>
          {!(step === 1 && !isEmail) && (
            <FooterButtons
              loading={loading}
              isNextEnabled={!!isNextEnabled()}
              onNextClick={handleNext}
              handleBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
