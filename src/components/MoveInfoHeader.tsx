import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import { MoveDetails } from "../types";
import Select from "./Select";
import startCase from "lodash/startCase";
import { useEffect } from "react";
import useMove from "../hooks/useMove";
import useNavigateSmooth from "../hooks/useNavigateSmooth";
import capitalize from "lodash/capitalize";
import { typeColors } from "../utils";
import Breadcrumbs, { Breadcrumb } from "./Breadcrumbs";
import { useLocation } from "react-router-dom";

interface Props {
  setFlavText: React.Dispatch<React.SetStateAction<string>>;
  setVersionGroup: React.Dispatch<React.SetStateAction<string>>;
  data: MoveDetails;
}

const CURR_TOP_MOVE_NUM = 919;

const MoveInfoHeader = ({ setFlavText, setVersionGroup, data }: Props) => {
  const handleNavigate = useNavigateSmooth();
  const location = useLocation();
  const { data: prevMove } = useMove(
    data.id === 1 ? String(CURR_TOP_MOVE_NUM) : String(data.id - 1)
  );
  const { data: nextMove } = useMove(
    data.id === CURR_TOP_MOVE_NUM ? "1" : String(data.id + 1)
  );

  const engTextEntries = data.flavor_text_entries?.filter(
    (entry) => entry.language.name === "en"
  );

  const versionMap = engTextEntries.reduce((acc, curr) => {
    return {
      ...acc,
      [startCase(curr.version_group.name)]: {
        flavText: curr.flavor_text,
        version: curr.version_group.name,
      },
    };
  }, {} as Record<string, { flavText: string; version: string }>);

  useEffect(() => {
    if (engTextEntries?.[0]) {
      setFlavText(engTextEntries[0].flavor_text);
      setVersionGroup(engTextEntries[0].version_group.name);
    }
  }, [engTextEntries, setFlavText, setVersionGroup]);

  return (
    <div className="mb-4">
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 p-4 border-b-gray-300 border-b mb-4">
        <div className="order-1 sm:order-2 mb-2 flex justify-center col-span-2 sm:col-span-1">
          {engTextEntries.length ? (
            <Select
              label="Game Version Group"
              onChange={(version) => {
                setFlavText(versionMap[version].flavText);
                setVersionGroup(versionMap[version].version);
              }}
              defaultValue={startCase(engTextEntries?.[0]?.version_group.name)}
              options={Object.keys(versionMap)}
            />
          ) : (
            <></>
          )}
        </div>
        {prevMove ? (
          <button
            className="text-white rounded-md text-sm xs:text-xl flex items-end order-2 sm:order-1 w-fit"
            style={{
              color: typeColors[capitalize(prevMove.type.name)],
            }}
            onClick={handleNavigate(`/moves/${prevMove.name}`, {
              name: startCase(prevMove.name),
              path: `/moves/${prevMove.name}`,
            })}
          >
            <div className="flex items-center">
              <TbPlayerTrackPrevFilled
                color={typeColors[capitalize(prevMove.type.name)]}
                className="mr-2 size-3 xs:size-5"
              />
              <div className="mb-1">{startCase(prevMove.name)}</div>
            </div>
          </button>
        ) : (
          <button
            className="text-gray-400 rounded-md text-sm xs:text-xl flex items-end order-2 sm:order-1 cursor-not-allowed w-fit"
            disabled
          >
            <div className="flex items-center">
              <TbPlayerTrackPrevFilled
                size={20}
                className="mr-2 text-gray-400"
              />
              <div className="mb-1">No Prev</div>
            </div>
          </button>
        )}
        <div className="flex justify-end order-3">
          {nextMove ? (
            <button
              className="text-white rounded-md text-sm xs:text-xl flex items-end justify-end w-fit"
              style={{
                color: typeColors[capitalize(nextMove.type.name)],
              }}
              onClick={handleNavigate(`/moves/${nextMove.name}`, {
                name: startCase(nextMove.name),
                path: `/moves/${nextMove.name}`,
              })}
            >
              <div className="flex items-center">
                <div className="mb-1">{startCase(nextMove.name)}</div>
                <TbPlayerTrackNextFilled
                  color={typeColors[capitalize(nextMove.type.name)]}
                  className="ml-2 size-3 xs:size-5"
                />
              </div>
            </button>
          ) : (
            <button
              className="text-gray-400 rounded-md text-sm xs:text-xl flex items-end justify-end order-3 cursor-not-allowed w-fit"
              disabled
            >
              <div className="flex items-center">
                <div className="mb-1">No Next</div>
                <TbPlayerTrackNextFilled
                  size={20}
                  className="ml-2 text-gray-400"
                />
              </div>
            </button>
          )}
        </div>
      </div>
      {location.state?.crumbs && (
        <Breadcrumbs crumbs={location.state.crumbs as Breadcrumb[]} />
      )}
    </div>
  );
};

export default MoveInfoHeader;
