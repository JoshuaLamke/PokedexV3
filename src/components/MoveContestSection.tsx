import startCase from "lodash/startCase";
import { TableRow, MoveDetails } from "../types";
import Table from "./Table";
import useNavigateSmooth from "../hooks/useNavigateSmooth";
import { CgInternal } from "react-icons/cg";

interface Props {
  data: MoveDetails;
}
const MoveContestSection = ({ data }: Props) => {
  const handleNavigate = useNavigateSmooth();
  const moveContestTableData: TableRow[] = [
    {
      header: <span className="sm:text-nowrap">Contest Type</span>,
      value: <span>{startCase(data.contest_type?.name) || "N/A"}</span>,
    },
    {
      header: (
        <span className="md:text-nowrap">
          Normal Contest Combos(Use Before)
        </span>
      ),
      value: (
        <div className="flex flex-col">
          {data.contest_combos?.normal?.use_before?.map((move) => (
            <span
              key={move.name}
              role="button"
              className="hover:text-green-700 flex items-center"
              onClick={handleNavigate(`/moves/${move.name}`, {
                name: startCase(move.name),
                path: `/moves/${move.name}`,
              })}
            >
              {startCase(move.name)}
              <CgInternal size={20} className="ml-2" />
            </span>
          )) ?? "N/A"}
        </div>
      ),
    },
    {
      header: (
        <span className="sm:text-nowrap">Normal Contest Combos(Use After)</span>
      ),
      value: (
        <div className="flex flex-col">
          {data.contest_combos?.normal?.use_after?.map((move) => (
            <span
              key={move.name}
              role="button"
              className="hover:text-green-700 flex items-center"
              onClick={handleNavigate(`/moves/${move.name}`, {
                name: startCase(move.name),
                path: `/moves/${move.name}`,
              })}
            >
              {startCase(move.name)}
              <CgInternal size={20} className="ml-2" />
            </span>
          )) ?? "N/A"}
        </div>
      ),
    },
    {
      header: (
        <span className="sm:text-nowrap">Super Contest Combos(Use Before)</span>
      ),
      value: (
        <div className="flex flex-col">
          {data.contest_combos?.super?.use_before?.map((move) => (
            <span
              key={move.name}
              role="button"
              className="hover:text-green-700 flex items-center"
              onClick={handleNavigate(`/moves/${move.name}`, {
                name: startCase(move.name),
                path: `/moves/${move.name}`,
              })}
            >
              {startCase(move.name)}
              <CgInternal size={20} className="ml-2" />
            </span>
          )) ?? "N/A"}
        </div>
      ),
    },
    {
      header: (
        <span className="sm:text-nowrap">Super Contest Combos(Use After)</span>
      ),
      value: (
        <div className="flex flex-col">
          {data.contest_combos?.super?.use_after?.map((move) => (
            <span
              key={move.name}
              role="button"
              className="hover:text-green-700 flex items-center"
              onClick={handleNavigate(`/moves/${move.name}`, {
                name: startCase(move.name),
                path: `/moves/${move.name}`,
              })}
            >
              {startCase(move.name)}
              <CgInternal size={20} className="ml-2" />
            </span>
          )) ?? "N/A"}
        </div>
      ),
    },
  ];

  return (
    <div className="mt-5 flex flex-col items-center">
      <h3 className="text-3xl sm:text-4xl md:text:5xl">Contest</h3>
      <Table tableMetadata={moveContestTableData} />
    </div>
  );
};

export default MoveContestSection;
