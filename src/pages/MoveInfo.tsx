import { useParams } from "react-router-dom";
import useMove from "../hooks/useMove";
import LoadingSnom from "../components/LoadingSnom";
import startCase from "lodash/startCase";
import { getImageByType, normalizeSentence, typeColors } from "../utils";
import capitalize from "lodash/capitalize";
import MoveInfoHeader from "../components/MoveInfoHeader";
import { useState } from "react";
import GenMoveInfoTable from "../components/GenMoveInfoTable";
import MoveEffectsSection from "../components/MoveEffectsSection";
import MoveContestSection from "../components/MoveContestSection";
import MoveOtherSection from "../components/MoveOtherSection";
import MovePokemonSection from "../components/MovePokemonSection";
import useNavigateSmooth from "../hooks/useNavigateSmooth";

const MoveInfo = () => {
  const { name } = useParams();
  const { data } = useMove(name!);
  const [flavText, setFlavText] = useState("");
  const [versionGroup, setVersionGroup] = useState("");
  const handleNavigate = useNavigateSmooth();

  if (!data) {
    return <LoadingSnom />;
  }

  return (
    <div>
      <MoveInfoHeader
        data={data}
        setFlavText={setFlavText}
        setVersionGroup={setVersionGroup}
      />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col order-2 md:order-1">
          <h1
            style={{ color: typeColors[startCase(data.type.name)] }}
            className="text-5xl sm:text-6xl"
          >
            {startCase(name)}
          </h1>
          <div className="flex justify-center mt-4">
            <div
              className="flex items-center rounded-full pr-3 mx-2 hover:scale-105"
              style={{ background: typeColors[capitalize(data.type.name)] }}
              key={data.type.name}
              onClick={handleNavigate(`/types/${data.type.name}`, {
                name: startCase(data.type.name),
                path: `/types/${data.type.name}`,
              })}
              role="button"
            >
              <img
                src={getImageByType(capitalize(data.type.name))}
                className="w-8 h-8"
              />
              <span className="text-white text-xl xs:text-2xl sm:text-3xl mb-1">
                {capitalize(data.type.name)}
              </span>
            </div>
          </div>
          {flavText && (
            <p className="text-lg my-2">{normalizeSentence(flavText)}</p>
          )}
          <GenMoveInfoTable data={data} />
        </div>
        <div className="flex justify-center items-center order-1 md:order-2">
          <img
            className="w-3/4 md:w-4/5 h-auto"
            src={getImageByType(startCase(data.type.name))}
            alt={data.type.name}
          />
        </div>
      </div>
      <MoveContestSection data={data} />
      <MoveEffectsSection versionGroup={versionGroup} data={data} />
      <MoveOtherSection data={data} />
      <MovePokemonSection data={data} />
    </div>
  );
};

export default MoveInfo;
