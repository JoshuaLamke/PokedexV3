import { SpeciesDetails, TableRow } from "../types";
import Table from "./Table";

interface Props {
  speciesData: SpeciesDetails;
}

const ClassTypesSection = ({ speciesData }: Props) => {
  const classTypesTableData: TableRow[] = [
    {
      header: "Baby Pokemon",
      value: <span>{speciesData.is_baby ? "Yes" : "No"}</span>,
    },
    {
      header: "Mythical Pokemon",
      value: <span>{speciesData.is_mythical ? "Yes" : "No"}</span>,
    },
    {
      header: "Legendary Pokemon",
      value: <span>{speciesData.is_legendary ? "Yes" : "No"}</span>,
    },
  ];
  return (
    <div className="mt-5 flex flex-col items-center">
      <h3 className="text-3xl sm:text-4xl md:text:5xl">Class Types</h3>
      <Table tableMetadata={classTypesTableData} />
    </div>
  );
};

export default ClassTypesSection;
