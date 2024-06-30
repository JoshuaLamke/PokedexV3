import startCase from "lodash/startCase";
import { TableRow, TypeDetails } from "../types";
import Table from "./Table";

interface Props {
  data: TypeDetails;
}
const GenTypeInfoTable = ({ data }: Props) => {
  const genTypeInfoTableData: TableRow[] = [
    {
      header: "Type #",
      value: <span>#{data.id}</span>,
    },
    {
      header: "Damage Class",
      value: <span>{startCase(data.move_damage_class?.name) || "N/A"}</span>,
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
      <Table tableMetadata={genTypeInfoTableData} />
    </div>
  );
};

export default GenTypeInfoTable;
