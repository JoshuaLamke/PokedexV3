import { useState, useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { FaCheck } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

interface MultiSelectProps {
  label: string;
  options: string[];
  values: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
}

const MultiSelect = ({
  label,
  options,
  values,
  onChange,
  placeholder,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter((value) => value !== option));
    } else {
      onChange([...values, option]);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useOutsideClick(selectRef, handleClose);

  return (
    <div className="flex flex-col flex-wrap w-full mt-4 relative">
      <label className="text-xs mb-2">{label}</label>
      <div ref={selectRef}>
        <div
          className={`flex flex-wrap items-center px-4 bg-gray-200 placeholder-gray-700 min-h-10 rounded outline-none border-none focus:outline-none w-full cursor-pointer`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {values.length > 0 ? (
            <>
              {values.map((type) => (
                <span
                  className="border-gray-900 border rounded-full bg-gray-600 px-2 m-1 flex items-center text-white"
                  key={type}
                >
                  {type}
                  <AiOutlineClose
                    className="ml-2"
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(values.filter((value) => value !== type));
                    }}
                  />
                </span>
              ))}
            </>
          ) : (
            <span className="text-gray-700">{placeholder}</span>
          )}
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full rounded shadow-lg max-h-60 overflow-auto bottom-0 transform translate-y-full bg-white">
            {options.map((option) => (
              <div
                key={option}
                className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-200 flex items-center justify-between"
                onClick={() => handleOptionClick(option)}
              >
                {option}
                {values.includes(option) && (
                  <FaCheck className="fill-gray-700 m-2" size={8} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
