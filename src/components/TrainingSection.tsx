import startCase from "lodash/startCase";
import { SpeciesDetails, TableRow } from "../types";
import Table from "./Table";

interface Props {
  speciesData: SpeciesDetails;
}

const TrainingSection = ({ speciesData }: Props) => {
  const trainingTableData: TableRow[] = [
    {
      header: "Capture Rate",
      value: <span>{speciesData.capture_rate || "N/A"}</span>,
    },
    {
      header: "Base Happiness",
      value: <span>{speciesData.base_happiness}</span>,
    },
    {
      header: "Growth Rate",
      value: <span>{startCase(speciesData.growth_rate?.name) || "N/A"}</span>,
    },
  ];
  return (
    <div className="mt-5 flex flex-col items-center">
      <h3 className="text-3xl sm:text-4xl md:text:5xl">Training</h3>
      <Table tableMetadata={trainingTableData} />
    </div>
  );
};

export default TrainingSection;
