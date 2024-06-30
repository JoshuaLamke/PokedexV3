import startCase from "lodash/startCase";
import { SpeciesDetails, TableRow } from "../types";
import Table from "./Table";

interface Props {
  speciesData: SpeciesDetails;
}

const BreedingSection = ({ speciesData }: Props) => {
  const breedingTableData: TableRow[] = [
    {
      header: "Gender Rates",
      value: (
        <span>
          {speciesData.gender_rate === -1
            ? "Genderless"
            : `${(speciesData.gender_rate / 8) * 100}% Male, ${
                ((8 - speciesData.gender_rate) / 8) * 100
              }% Female`}
        </span>
      ),
    },
    {
      header: "Egg Groups",
      value: (
        <span>
          {speciesData.egg_groups
            .map((group) => startCase(group.name))
            .join(", ")}
        </span>
      ),
    },
    {
      header: "Habitat",
      value: <span>{startCase(speciesData.habitat?.name) || "N/A"}</span>,
    },
  ];
  return (
    <div className="mt-5 flex flex-col items-center">
      <h3 className="text-3xl sm:text-4xl md:text:5xl">Breeding</h3>
      <Table tableMetadata={breedingTableData} />
    </div>
  );
};

export default BreedingSection;
