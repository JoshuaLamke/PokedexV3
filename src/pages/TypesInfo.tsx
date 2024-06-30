import { useParams } from "react-router-dom";
import LoadingSnom from "../components/LoadingSnom";
import startCase from "lodash/startCase";
import { getImageByType, typeColors } from "../utils";
import useType from "../hooks/useType";
import TypeInfoHeader from "../components/TypeInfoHeader";
import GenTypeInfoTable from "../components/GenTypeInfoTable";
import TypePokemonSection from "../components/TypePokemonSection";
import TypeMovesList from "../components/TypeMovesList";

const TypeInfo = () => {
  const { name } = useParams();
  const { data } = useType(name!);

  if (!data) {
    return <LoadingSnom />;
  }

  return (
    <div>
      <TypeInfoHeader data={data} />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col order-2 md:order-1">
          <h1
            style={{ color: typeColors[startCase(data.name)] }}
            className="text-5xl sm:text-6xl mb-5"
          >
            {startCase(name)}
          </h1>
          <GenTypeInfoTable data={data} />
        </div>
        <div className="flex justify-center items-center order-1 md:order-2">
          <img
            className="w-3/5 sm:w-1/2 md:w-3/5 h-auto"
            src={getImageByType(startCase(data.name))}
            alt={data.name}
          />
        </div>
      </div>
      <TypeMovesList data={data} />
      <TypePokemonSection data={data} />
    </div>
  );
};

export default TypeInfo;
