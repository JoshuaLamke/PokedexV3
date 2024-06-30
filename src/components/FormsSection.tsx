import startCase from "lodash/startCase";
import { SpeciesDetails, TableRow } from "../types";
import Table from "./Table";
import { CgInternal } from "react-icons/cg";
import useNavigateSmooth from "../hooks/useNavigateSmooth";

interface Props {
  speciesData: SpeciesDetails;
}

const FormsSection = ({ speciesData }: Props) => {
  const handleNavigate = useNavigateSmooth();
  const formsTableData: TableRow[] = [
    {
      header: "Has Gender Differences",
      value: <span>{speciesData.has_gender_differences ? "Yes" : "No"}</span>,
    },
    {
      header: <div className="h-14 flex items-start">Varieties</div>,
      value: (
        <span>
          {speciesData.varieties.map((variety, i) => (
            <p
              key={variety.pokemon.name}
              role="button"
              className="flex items-center hover:text-green-700"
              onClick={handleNavigate(`/pokemon/${variety.pokemon.name}`, {
                name: startCase(variety.pokemon.name),
                path: `/pokemon/${variety.pokemon.name}`,
              })}
            >
              {`${i + 1}) ${startCase(variety.pokemon.name)}`}
              <CgInternal size={20} className="ml-2" />
            </p>
          ))}
        </span>
      ),
    },
  ];
  return (
    <div className="mt-5 flex flex-col items-center">
      <h3 className="text-3xl sm:text-4xl md:text:5xl">Forms</h3>
      <Table tableMetadata={formsTableData} />
    </div>
  );
};

export default FormsSection;
