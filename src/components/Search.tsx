import React, { RefObject, useEffect, useState } from "react";
import { Filters } from "../types";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  nameQuery: string;
  inputRef: RefObject<HTMLInputElement>;
}

const Search = ({ setFilters, nameQuery, inputRef }: Props) => {
  const [typingValue, setTypingValue] = useState(nameQuery);

  // Focus search if name query changed so user doesnt have to do it
  useEffect(() => {
    if (inputRef) {
      inputRef.current?.focus();
    }
  }, [nameQuery]);

  // Debounce updating parent filters
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters((prev) => ({ ...prev, nameQuery: typingValue }));
    }, 400);
    return () => clearTimeout(timeout);
  }, [typingValue, setFilters]);

  const handleReset = () => {
    setTypingValue("");
  };

  return (
    <div className="max-w-80 w-full mx-2 my-4">
      <div className="relative flex items-center w-full">
        <input
          type="text"
          ref={inputRef}
          value={typingValue}
          onChange={(e) => setTypingValue(e.target.value.toLowerCase())}
          placeholder="Search for a Pokémon..."
          className="w-full px-4 py-2 text-gray-700 bg-gray-200 placeholder-gray-700 h-10 rounded outline-none border-none focus:outline-none"
        />
        {typingValue && (
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
