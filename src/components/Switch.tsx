import { GiBroadsword, GiCheckedShield } from "react-icons/gi";

interface SwitchProps {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Switch = ({ checked, setChecked }: SwitchProps) => {
  const handleToggle = () => {
    setChecked(!checked);
  };

  return (
    <div
      className="relative inline-flex items-center cursor-pointer"
      onClick={handleToggle}
    >
      <div className="w-16 h-8 bg-gray-300 rounded-full flex items-center p-1 transition-colors duration-300">
        <div
          className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            checked ? "translate-x-0" : "translate-x-8"
          }`}
        />
      </div>
      <div
        className={`absolute left-1 flex items-center justify-center w-6 h-6 transition-opacity duration-300 ${
          checked ? "opacity-100" : "opacity-0"
        }`}
      >
        <GiCheckedShield className="text-gray-700" />
      </div>
      <div
        className={`absolute right-1 flex items-center justify-center w-6 h-6 transition-opacity duration-300 ${
          checked ? "opacity-0" : "opacity-100"
        }`}
      >
        <GiBroadsword className="text-gray-700" />
      </div>
    </div>
  );
};

export default Switch;
