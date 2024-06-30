import startCase from "lodash/startCase";
import { TableRow, MoveDetails } from "../types";
import Table from "./Table";

interface Props {
  data: MoveDetails;
}
const GenMoveInfoTable = ({ data }: Props) => {
  const genMoveInfoTableData: TableRow[] = [
    {
      header: "Move #",
      value: <span>#{data.id}</span>,
    },
    {
      header: "Power",
      value: <span>{data.power ?? "N/A"}</span>,
    },
    {
      header: "Damage Class",
      value: <span>{startCase(data.damage_class.name) ?? "N/A"}</span>,
    },
    {
      header: "Accuracy",
      value: <span>{data.accuracy ?? "N/A"}</span>,
    },
    {
      header: "Power Points",
      value: <span>{data.pp ?? "N/A"}</span>,
    },
    {
      header: "Target",
      value: <span>{startCase(data.target.name) ?? "N/A"}</span>,
    },
    {
      header: "Generation",
      value: (
        <span>
          {startCase(data.generation.name.split("-")[0])}{" "}
          {data.generation.name.split("-")[1].toUpperCase()}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table tableMetadata={genMoveInfoTableData} />
    </div>
  );
};

export default GenMoveInfoTable;
