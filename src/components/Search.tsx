import React from "react";
import { Filters } from "../types";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  name: string;
}

const Search = ({ setFilters, name }: Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value.toLowerCase();
    setFilters((filters) => ({ ...filters, name: newName }));
  };

  const handleReset = () => {
    setFilters((filters) => ({ ...filters, name: "" }));
  };

  return (
    <div className="max-w-80 w-full mx-2 my-4">
      <div className="relative flex items-center w-full">
        <input
          type="text"
          value={name}
          onChange={handleInputChange}
          placeholder="Search for a pokemon..."
          className="w-full px-4 py-2 text-gray-700 bg-gray-200 placeholder-gray-700 h-10 rounded ouline-none border-none focus:outline-none"
        />
        {name && (
          <AiOutlineClose
            className="absolute right-2 cursor-pointer text-gray-700"
            onClick={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
