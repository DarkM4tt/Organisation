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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [personalAccidentFile, setPersonalAccidentFile] = useState(null);
  const [civilLiabilityFile, setCivilLiabilityFile] = useState(null);
  const [tvdeLicenseFile, setTvdeLicenseFile] = useState(null);
  const [tvdeLicenseDrettFile, setTvdeLicenseDrettFile] = useState(null);
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
      const formData = new FormData();
      formData.append("organization_name", orgName);
      formData.append("phone_number", mobileNumber);
      formData.append("country", earningCountry);
      formData.append("language", language);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("phone_verified", true);

      if (personalAccidentFile) {
        formData.append("accident_insurance", personalAccidentFile);
      }
      if (civilLiabilityFile) {
        formData.append("cp_liability", civilLiabilityFile);
      }
      if (tvdeLicenseFile) {
        formData.append("tvde", tvdeLicenseFile);
      }
      if (tvdeLicenseDrettFile) {
        formData.append("drett", tvdeLicenseDrettFile);
      }

      setLoading(true);
      try {
        const response = await registerUser(formData).unwrap();
        const org_id = response?.org?._id;
        localStorage.setItem("org_id", org_id);
        navigate("/home");
      } catch (error) {
        console.error("Error: ", error.data.message);
        setError(error.data.message);
        setIsError(true);
      } finally {
        setLoading(false);
      }
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (step === 1 || step === 2) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("org_id");
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
        return (
          personalAccidentFile &&
          civilLiabilityFile &&
          tvdeLicenseFile &&
          tvdeLicenseDrettFile
        );
      default:
        return false;
    }
  };

  const handleUpload = (docId, file) => {
    switch (docId) {
      case 1:
        setPersonalAccidentFile(file);
        break;
      case 2:
        setCivilLiabilityFile(file);
        break;
      case 3:
        setTvdeLicenseFile(file);
        break;
      case 4:
        setTvdeLicenseDrettFile(file);
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
              personalAccidentFile={personalAccidentFile}
              civilLiabilityFile={civilLiabilityFile}
              tvdeLicenseFile={tvdeLicenseFile}
              tvdeLicenseDrettFile={tvdeLicenseDrettFile}
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
        {error && (
          <p className="text-red-500 text-lg mt-2">
            {error || "Error occurred"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
