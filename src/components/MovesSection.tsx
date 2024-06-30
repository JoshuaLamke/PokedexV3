import { useMemo, useState } from "react";
import useVersions from "../hooks/useVersions";
import { PokemonInfo, SpeciesDetails } from "../types";
import Spinner from "./Spinner";
import Select from "./Select";
import startCase from "lodash/startCase";
import MovesTable, { MoveTableData } from "./MovesTable";
import TextInput from "./TextInput";

interface Props {
  data: PokemonInfo;
  speciesData: SpeciesDetails;
  version: string;
}

const MovesSection = ({ data, speciesData, version }: Props) => {
  const [moveNameFilter, setMoveNameFilter] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("all");
  const engFlavorTexts = speciesData?.flavor_text_entries.filter(
    (f) => f.language.name === "en"
  );
  const versions = useVersions(engFlavorTexts);

  const versionToGroupMap = versions.reduce((acc, curr) => {
    return {
      ...acc,
      ...(curr.data
        ? { [curr.data!.name]: curr.data!.version_group.name }
        : undefined),
    };
  }, {} as Record<string, string>);

  const moveLearnMethodsMap = useMemo(() => ({ All: "all" }), []) as Record<
    string,
    string
  >;

  const moves = useMemo(() => {
    return data.moves.reduce((acc, curr) => {
      const moveInfo = curr.version_group_details.find(
        (details) => details.version_group.name === versionToGroupMap[version]
      );

      if (!moveInfo) {
        return acc;
      }

      moveLearnMethodsMap[startCase(moveInfo.move_learn_method.name)] =
        moveInfo.move_learn_method.name;

      if (
        moveInfo.move_learn_method.name !== selectedMethod &&
        selectedMethod !== "all"
      ) {
        return acc;
      }

      return [
        ...acc,
        {
          name: curr.move.name,
          level: moveInfo.level_learned_at,
          learnMethod: moveInfo.move_learn_method.name,
        },
      ].sort((a, b) => a.level - b.level);
    }, [] as MoveTableData);
  }, [
    version,
    selectedMethod,
    data.moves,
    moveLearnMethodsMap,
    versionToGroupMap,
  ]);

  if (versions.some((v) => v.isLoading)) {
    return (
      <div className="w-full flex justify-center border-t border-b items-center">
        <h3 className="text-green-700 text-3xl sm:text-4xl md:text:5xl my-4 mr-2">
          Loading Moves
        </h3>
        <Spinner />
      </div>
    );
  }
  if (!versions.every((v) => v.data) || !moves.length) {
    return null;
  }

  const handleChangeMethod = (method: string) => {
    setSelectedMethod(moveLearnMethodsMap[method]);
  };

  const handleMoveNameFilter = (value: string) => {
    setMoveNameFilter(value);
  };

  const filteredMoves = moves.filter((move) =>
    move.name.toLowerCase().includes(moveNameFilter.toLowerCase())
  );

  return (
    <div className="my-5 flex flex-col">
      <h3 className="text-3xl sm:text-4xl md:text:5xl">Moves</h3>
      <div className="w-full flex flex-col xs:flex-row xs:justify-between">
        <div className="my-2 w-full xs:max-w-60 flex flex-col items-center xs:items-start">
          <label className="mb-2 text-sm font-medium text-gray-700 text-start">
            Move Learn Methods
          </label>
          <Select
            defaultValue={startCase(selectedMethod)}
            onChange={handleChangeMethod}
            options={Object.keys(moveLearnMethodsMap)}
          />
        </div>
        <div className="my-2 w-full xs:max-w-52 xs:ml-3 flex flex-col items-center xs:items-start">
          <label className="mb-2 text-sm font-medium text-gray-700 text-start">
            Search Move Name
          </label>
          <TextInput
            placeholder="Search move name..."
            onChange={handleMoveNameFilter}
            value={moveNameFilter}
          />
        </div>
      </div>
      {filteredMoves.length ? (
        <MovesTable
          moves={filteredMoves}
          itemsPerPage={5}
          method={selectedMethod}
        />
      ) : (
        <div className="w-full flex justify-center text-lg">No Moves.</div>
      )}
    </div>
  );
};

export default MovesSection;
