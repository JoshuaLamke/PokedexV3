import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaCheck } from "react-icons/fa";

interface SelectProps {
  options: string[];
  label?: string;
  onChange: (value: string) => void;
  defaultValue: string;
}

const Select = ({ options, label, onChange, defaultValue }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    onChange(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="flex flex-col w-full max-w-48 md:max-w-xs"
      ref={dropdownRef}
    >
      {label && (
        <label className="mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center justify-between w-full px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <span>{selectedValue}</span>
          <FaChevronDown
            className={`transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option}
                className="flex items-center justify-between px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionClick(option)}
              >
                <span>{option}</span>
                {selectedValue === option && (
                  <FaCheck className="text-gray-700" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
