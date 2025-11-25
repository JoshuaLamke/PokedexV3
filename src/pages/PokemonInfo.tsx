import { useParams } from "react-router-dom";
import LoadingSnom from "../components/LoadingSnom";
import usePokemonInfo from "../hooks/usePokemonInfo";
import {
  getImageURLFromInfoObj,
  normalizeSentence,
  typeColors,
} from "../utils";
import defaultImage from "../assets/sadPokemon.png";
import startCase from "lodash/startCase";
import GenInfoTable from "../components/GenInfoTable";
import useSpeciesInfo from "../hooks/useSpeciesInfo";
import useEvoInfo from "../hooks/useEvoInfo";
import StatsContainer from "../components/StatsContainer";
import EvolutionChain from "../components/EvolutionChain";
import PokemonInfoHeader from "../components/PokemonInfoHeader";
import { useState } from "react";
import TypeEffectivenessSection from "../components/TypeEffectivenessSection";
import SpritesSection from "../components/SpritesSection";
import BreedingSection from "../components/BreedingSection";
import TrainingSection from "../components/TrainingSection";
import ClassTypesSection from "../components/ClassTypesSection";
import FormsSection from "../components/FormsSection";
import MovesSection from "../components/MovesSection";
import TypeIcon from "../components/TypeIcon";

const PokemonInfo = () => {
  const { name } = useParams();
  const { data } = usePokemonInfo(name!);
  const { data: speciesData } = useSpeciesInfo(data?.species.url, name!);
  const { data: evoData } = useEvoInfo(
    speciesData?.evolution_chain?.url,
    name!
  );
  const [flavText, setFlavText] = useState("");
  const [version, setVersion] = useState("");

  if (!data || !speciesData || !evoData) {
    return <LoadingSnom />;
  }

  return (
    <div className="min-h-screen text-gray-700 mb-10">
      <PokemonInfoHeader
        pokemonData={data}
        setFlavText={setFlavText}
        setVersion={setVersion}
        speciesData={speciesData}
      />
      <div className="flex flex-col-reverse sm:flex-row">
        <div className="w-full sm:w-5/12 flex-col items-center">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl"
            style={{
              color: typeColors[startCase(data.types[0].type.name)],
            }}
          >
            {startCase(data.name)}
          </h1>
          <div className="flex justify-center mt-4">
            {data.types.map((type) => (
              <TypeIcon type={type.type.name} key={type.type.name} />
            ))}
          </div>
          {flavText && (
            <p className="text-lg my-2">{normalizeSentence(flavText)}</p>
          )}
          <GenInfoTable data={data} speciesData={speciesData} />
        </div>
        <div className="w-full sm:w-7/12 flex flex-col items-center justify-center">
          <img
            src={getImageURLFromInfoObj(data) ?? defaultImage}
            alt={`Image of ${data.name}`}
            className="w-full sm:w-4/6 h-auto animate-float hover:scale-105 hover:animate-none"
          />
        </div>
      </div>
      <StatsContainer data={data} />
      <EvolutionChain evoData={evoData} name={name!} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap gap-4">
        <BreedingSection speciesData={speciesData} />
        <TrainingSection speciesData={speciesData} />
        <ClassTypesSection speciesData={speciesData} />
        <FormsSection speciesData={speciesData} />
      </div>
      <MovesSection data={data} speciesData={speciesData} version={version} />
      <TypeEffectivenessSection name={name!} />
      <SpritesSection data={data} />
    </div>
  );
};

export default PokemonInfo;
