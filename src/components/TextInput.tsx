import { ChangeEvent } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface TextInputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

const TextInput = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: TextInputProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  const handleReset = () => {
    onChange("");
  };

  return (
    <div className="flex flex-col w-full">
      {label && <label className="text-xs mb-2">{label}</label>}
      <div className="relative flex items-center w-full">
        <input
          className="pl-4 bg-gray-200 placeholder-gray-700 h-10 rounded outline-none border-none focus:outline-none w-full pr-8"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          type={type}
        />
        {value && (
          <AiOutlineClose
            className="absolute right-2 cursor-pointer text-gray-700"
            onClick={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default TextInput;
