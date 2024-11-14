import React, { useState, useEffect, useRef } from "react";
import { Select, OptionsContainer, Option, ArrowIcon } from "./DropdownForm.ts";

// Definição dos tipos para as opções
interface OptionType {
  value: string;
  label: string;
}

// Tipagem para as props do DropdownForm
interface DropdownFormProps {
  value: string;
  onChange: (value: string) => void;
  options: OptionType[];
}

const DropdownForm: React.FC<DropdownFormProps> = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(option => option.value === value) || options[0];

  return (
    <div ref={dropdownRef}>
      <Select onClick={handleSelectClick}>
        {selectedOption.label}
        <ArrowIcon isOpen={isOpen} />
      </Select>
      <OptionsContainer open={isOpen}>
        {options.map((option) => (
          <Option
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            active={value === option.value ? "true" : undefined}
          >
            {option.label}
          </Option>
        ))}
      </OptionsContainer>
    </div>
  );
};

export default DropdownForm;
