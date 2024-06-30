import { useState } from "react";
import startCase from "lodash/startCase";
import { TypeDetails } from "../types";
import { typeColors } from "../utils";
import { GrNext, GrPrevious } from "react-icons/gr";
import useNavigateSmooth from "../hooks/useNavigateSmooth";
import TextInput from "./TextInput";

interface Props {
  data: TypeDetails;
}

const TypeMovesList = ({ data }: Props) => {
  const handleNavigate = useNavigateSmooth();
  const [currentPage, setCurrentPage] = useState(1);
  const [moveNameFilter, setMoveNameFilter] = useState("");

  if (!data.moves?.length) {
    return null;
  }

  const filteredMoves = data.moves.filter((move) =>
    move.name.includes(moveNameFilter)
  );

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredMoves.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentMoves = filteredMoves.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleMoveNameFilter = (value: string) => {
    setMoveNameFilter(value.toLowerCase());
  };

  return (
    <div className="w-full text-center">
      <h3 className="text-3xl sm:text-4xl md:text:5xl">
        {startCase(data.name)} Moves
      </h3>
      <h6 className="text-xl sm:text-2xl md:text:3xl my-2">
        Count: {filteredMoves.length}
      </h6>
      <div className="w-full flex flex-col items-center">
        <div className="my-2 w-full xs:max-w-72">
          <label className="mb-2 text-sm font-medium text-gray-700 text-start">
            Search Move Name
          </label>
          <TextInput
            placeholder="Search move name..."
            onChange={handleMoveNameFilter}
            value={moveNameFilter}
          />
        </div>
      </div>
      <div className="my-5 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {currentMoves.map((move) => (
          <div
            role="button"
            className="border-l-2 hover:bg-gray-100"
            key={move.name}
            style={{
              borderColor: typeColors[startCase(data.name)],
            }}
            onClick={handleNavigate(`/moves/${move.name}`, {
              name: startCase(move.name),
              path: `/moves/${move.name}`,
            })}
          >
            <span>{startCase(move.name)}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`font-bold py-2 px-4 rounded-l ${
            currentPage !== 1 && "hover:bg-green-200"
          }`}
        >
          <GrPrevious
            className={`${
              currentPage === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-green-700"
            }`}
          />
        </button>
        <span className="text-gray-700 font-bold py-2 px-4">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`font-bold py-2 px-4 rounded-r ${
            currentPage !== totalPages && "hover:bg-green-200"
          }`}
        >
          <GrNext
            className={`${
              currentPage === totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-green-700"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default TypeMovesList;
