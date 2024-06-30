import { useEffect, useState } from "react";
import startCase from "lodash/startCase";
import { GrPrevious, GrNext } from "react-icons/gr";
import { CgInternal } from "react-icons/cg";
import useNavigateSmooth from "../hooks/useNavigateSmooth";

export type MoveTableData = {
  name: string;
  level: number;
  learnMethod: string;
}[];

interface Props {
  itemsPerPage: number;
  moves: MoveTableData;
  method: string;
}
const MovesTable = ({ moves, itemsPerPage, method }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const handleNavigate = useNavigateSmooth();

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentMoves = moves.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(moves.length / itemsPerPage);

  const onPageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [method]);

  return (
    <div className="mt-2 text-left">
      <div className="overflow-x-auto w-full">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-200 xs:bg-white">
            <tr className="w-full">
              <th className="sticky left-0 z-1 bg-white py-4 px-6 text-gray-900 font-medium border-r min-w-36">
                Name
              </th>
              <th className="py-4 pl-4 text-gray-900 min-w-32">
                Level Learned
              </th>
              <th className="py-4 pl-4 text-gray-900 min-w-36">Learn Method</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentMoves.map((move) => (
              <tr
                key={`${move.name}-${move.learnMethod}`}
                className="border-y w-full"
              >
                <td className="sticky left-0 z-1 bg-white py-4 px-6 text-gray-900 font-medium border-r min-w-36">
                  <div
                    className="hover:text-green-700 flex items-center max-w-fit"
                    role="button"
                    onClick={handleNavigate(`/moves/${move.name}`, {
                      name: startCase(move.name),
                      path: `/moves/${move.name}`,
                    })}
                  >
                    {startCase(move.name)}
                    <CgInternal size={20} className="ml-2" />
                  </div>
                </td>
                <td className="py-4 pl-4 text-gray-700 min-w-32">
                  {move.level ?? 0}
                </td>
                <td className="py-4 pl-4 text-gray-700 min-w-36">
                  {startCase(move.learnMethod)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
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
          onClick={() => onPageChange(currentPage + 1)}
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

export default MovesTable;
