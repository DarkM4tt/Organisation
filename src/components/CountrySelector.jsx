import React from "react";
import PropTypes from "prop-types";
import { MenuItem, Select, OutlinedInput, FormControl } from "@mui/material";
import { languages } from "./../utils/languages";
import { countries } from "../utils/countries";

const CountrySelector = ({
  earningCountry,
  handleEarningCountryChange,
  language,
  handleLanguageChange,
}) => {
  const countrySelectRef = React.useRef(null);
  const languageSelectRef = React.useRef(null);

  const handleCountryFocus = () => {
    countrySelectRef.current.focus();
  };

  const handleLanguageFocus = () => {
    languageSelectRef.current.focus();
  };
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 300, 
      },
    },
  };

  return (
    <div className="flex flex-col gap-4 py-8">
      <h2 className="text-mxl font-semibold font-redhat">Select your country</h2>
      <p className="text-lg font-normal text-gray">
        Let us know how to properly address you
      </p>
      <div className="my-8">
        <p
          className="font-normal text-lg mb-1 cursor-pointer"
          onClick={handleCountryFocus}
        >
          Where would you like to earn?
        </p>
        <FormControl fullWidth>
          <Select
            labelId="country-select-label"
            id="country-select"
            value={earningCountry}
            onChange={handleEarningCountryChange}
            displayEmpty
            input={<OutlinedInput notched={false} />}
            inputProps={{
              ref: countrySelectRef,
              placeholder: "Select country name",
            }}
            renderValue={(selected) => {
              if (!selected) {
                return <em>Select country name</em>;
              }
              return selected;
            }}
            MenuProps={MenuProps}
            sx={{
              backgroundColor: "#FAFAFA",
              "& .MuiOutlinedInput-root": {
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid black",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid black",
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "10px",
                border: "1px solid #DDDDDD",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #DDDDDD",
              },
            }}
          >
            <MenuItem value="" disabled>
              <em>Select country name</em>
            </MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.code} value={country.label}>
                <img
                  loading="lazy"
                  src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                  alt=""
                  style={{ marginRight: "10px", width: "20px" }}
                />
                {country.label} ({country.code}) +{country.phone}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="mt-3 mb-6">
        <p
          className="text-[#111111] font-normal text-lg mb-1 cursor-pointer"
          onClick={handleLanguageFocus}
        >
          Language
        </p>
        <FormControl fullWidth>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
            displayEmpty
            input={<OutlinedInput notched={false} />}
            inputProps={{
              ref: languageSelectRef,
              placeholder: "Select language",
            }}
            renderValue={(selected) => {
              if (!selected) {
                return <em>Select language</em>;
              }
              return selected;
            }}
            MenuProps={MenuProps}
            sx={{
              backgroundColor: "#FAFAFA",
              "& .MuiOutlinedInput-root": {
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid black",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid black",
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "10px",
                border: "1px solid #DDDDDD",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #DDDDDD",
              },
            }}
          >
            <MenuItem value="" disabled>
              <em>Select language</em>
            </MenuItem>
            {languages.map((language) => (
              <MenuItem key={language.code} value={language.label}>
                {language.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

CountrySelector.propTypes = {
  earningCountry: PropTypes.string,
  handleEarningCountryChange: PropTypes.func,
  language: PropTypes.string,
  handleLanguageChange: PropTypes.func,
};

export default CountrySelector;
