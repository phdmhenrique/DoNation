import React, { useState } from "react";
import {
  RightsideLabel,
  RightsideInputs,
  StyledInput,
  StyledEyeIcon,
  StyledSelect,
  StyledOption,
  StyledInfo,
} from "./CustomFields.ts";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface CustomFieldsProps {
  label: string;
  type: string;
  value: string;
  name: string;
  onChange: (name: string, value: string) => void,
  placeholder?: string;
  options?: { value: string, label: string }[];
  hasIcon?: boolean;
}

const CustomFields = ({
  label,
  type,
  placeholder,
  value,
  name,
  onChange,
  options,
  hasIcon,
}: CustomFieldsProps) => {
  const [inputType, setInputType] = useState(type);

  const handleInputChange = (value: string) => {
    onChange(name, value);
  };

  const handleTogglePassword = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <RightsideInputs className="rightside-inputs">
      <RightsideLabel>{label}</RightsideLabel>
      {type === "select" ? (
        <StyledSelect onChange={(e) => handleInputChange(e.target.value)} value={value} name={name}>
          {options?.map((option) => (
            <StyledOption key={option.value} value={option.value}>
              {option.label}
            </StyledOption>
          ))}
        </StyledSelect>
      ) : (
        <div style={{ position: "relative" }}>

          <StyledInput
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
          />

          {hasIcon && (
            <StyledEyeIcon>
              {inputType === "password" ? (
                <IoEyeOutline onClick={handleTogglePassword} />
              ) : (
                <IoEyeOffOutline onClick={handleTogglePassword} />
              )}
            </StyledEyeIcon>
          )}
        </div>
      )}
    </RightsideInputs>
  );
};

export default CustomFields;
