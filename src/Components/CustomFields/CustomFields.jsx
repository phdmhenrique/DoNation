import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const CustomFields = ({
  label,
  type,
  placeholder,
  value,
  name,
  onChange,
  options,
  hasIcon,
}) => {
  const [inputType, setInputType] = useState(type);

  const handleInputChange = (value) => {
    onChange(name, value);
  };

  const handleTogglePassword = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div className="max-w-xs flex flex-col gap-2">
      <label className="text-gray-600 text-sm font-medium">{label}</label>
      {type === "select" ? (
        <select
          onChange={(e) => handleInputChange(e.target.value)}
          value={value}
          name={name}
          className="w-full h-16 p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-gray-500 hover:bg-gray-100">
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          <input
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            className="w-full h-16 p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
          {hasIcon && (
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-400">
              {inputType === "password" ? (
                <IoEyeOutline onClick={handleTogglePassword} />
              ) : (
                <IoEyeOffOutline onClick={handleTogglePassword} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomFields;
