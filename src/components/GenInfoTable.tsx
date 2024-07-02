import startCase from "lodash/startCase";
import { TableRow, PokemonInfo, SpeciesDetails } from "../types";
import { kgsToLbs, metersToFeetInches } from "../utils";
import padStart from "lodash/padStart";
import Table from "./Table";
interface Props {
  data: PokemonInfo;
  speciesData: SpeciesDetails;
}
const GenInfoTable = ({ data, speciesData }: Props) => {
  const height = data.height / 10;
  const weight = data.weight / 10;

  const genInfoTableData: TableRow[] = [
    { header: "Pokemon Number", value: data.id },
    {
      header: "Generation",
      value: (
        <>
          {startCase(speciesData.generation.name.split("-")[0])}{" "}
          {speciesData.generation.name.split("-")[1].toUpperCase()}
        </>
      ),
    },
    {
      header: "Abilities",
      value: (
        <div className="flex flex-col items-start">
          {data.abilities.map((a, i) => (
            <p key={a.ability.name}>{`${i + 1}) ${startCase(a.ability.name)} ${
              a.is_hidden ? "(Hidden)" : ""
            }`}</p>
          ))}
        </div>
      ),
    },
    {
      header: "Height",
      value: `${
        height < 1 ? padStart(String(height), 2, "0") : height
      }m (${metersToFeetInches(height)})`,
    },
    {
      header: "Weight",
      value: `${
        weight < 1 ? padStart(String(weight), 2, "0") : weight
      }kg (${kgsToLbs(weight)}lbs)`,
    },
    {
      header: "Genus",
      value:
        speciesData.genera.filter((genus) => genus.language.name === "en")?.[0]
          ?.genus ?? "N/A",
    },
    {
      header: "Shape",
      value: startCase(speciesData.shape?.name) || "Not Found",
    },
    {
      header: "Color",
      value: startCase(speciesData.color.name),
    },
  ];
  return (
    <div>
      <Table tableMetadata={genInfoTableData} />
    </div>
  );
};

export default GenInfoTable;
