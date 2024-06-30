import startCase from "lodash/startCase";
import { TableRow, MoveDetails } from "../types";
import Table from "./Table";

interface Props {
  data: MoveDetails;
}
const MoveOtherSection = ({ data }: Props) => {
  const addPercent = (num?: number | null) =>
    typeof num === "number" ? `${num}%` : "N/A";
  const moveOtherTableData: TableRow[] = [
    {
      header: <span className="sm:text-nowrap">Ailment</span>,
      value: <span>{startCase(data.meta?.ailment.name) || "N/A"}</span>,
    },
    {
      header: <span className="sm:text-nowrap">Ailment Chance</span>,
      value: <span>{addPercent(data.meta?.ailment_chance)}</span>,
    },
    {
      header: <span className="sm:text-nowrap">Categories</span>,
      value: (
        <span>
          {data.meta?.category.name
            .split("+")
            .map((c) => startCase(c))
            .join(", ") || "N/A"}
        </span>
      ),
    },
    {
      header: <span className="sm:text-nowrap">Crit Rate</span>,
      value: <span>{addPercent(data.meta?.crit_rate)}</span>,
    },
    {
      header: <span className="sm:text-nowrap">Drain</span>,
      value: <span>{addPercent(data.meta?.drain)}</span>,
    },
    {
      header: <span className="sm:text-nowrap">Flinch Chance</span>,
      value: <span>{addPercent(data.meta?.flinch_chance)}</span>,
    },
    {
      header: <span className="sm:text-nowrap">Max Hits</span>,
      value: <span>{data.meta?.max_hits ?? "N/A"}</span>,
    },
    {
      header: <span className="sm:text-nowrap">Min Hits</span>,
      value: <span>{data.meta?.min_hits ?? "N/A"}</span>,
    },
    {
      header: <span className="sm:text-nowrap">Max Turns</span>,
      value: <span>{data.meta?.max_turns ?? "N/A"}</span>,
    },
    {
      header: <span className="sm:text-nowrap">Min Turns</span>,
      value: <span>{data.meta?.min_turns ?? "N/A"}</span>,
    },
    {
      header: <span className="sm:text-nowrap">Stat Chance</span>,
      value: <span>{addPercent(data.meta?.stat_chance)}</span>,
    },
  ];

  return (
    <div className="mt-5 flex flex-col items-center">
      <h3 className="text-3xl sm:text-4xl md:text:5xl">Other Stats</h3>
      <Table tableMetadata={moveOtherTableData} />
    </div>
  );
};

export default MoveOtherSection;
