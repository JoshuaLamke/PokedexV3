import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import { TypeDetails } from "../types";
import startCase from "lodash/startCase";
import useType from "../hooks/useType";
import useNavigateSmooth from "../hooks/useNavigateSmooth";
import capitalize from "lodash/capitalize";
import { typeColors } from "../utils";
import { useLocation } from "react-router-dom";
import Breadcrumbs, { Breadcrumb } from "./Breadcrumbs";

interface Props {
  data: TypeDetails;
}

const CURR_TOP_TYPE_NUM = 19;

const TypeInfoHeader = ({ data }: Props) => {
  const location = useLocation();
  const handleNavigate = useNavigateSmooth();
  const { data: prevType } = useType(
    data.id === 1 ? String(CURR_TOP_TYPE_NUM) : String(data.id - 1)
  );
  const { data: nextType } = useType(
    data.id === CURR_TOP_TYPE_NUM ? "1" : String(data.id + 1)
  );

  return (
    <div className="mb-4">
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 p-4 border-b-gray-300 border-b mb-4">
        <div className="order-1 sm:order-2 mb-2 flex justify-center col-span-2 sm:col-span-1">
          <></>
        </div>
        {prevType ? (
          <button
            className="text-white rounded-md text-sm xs:text-xl flex items-end order-2 sm:order-1 w-fit"
            style={{
              color: typeColors[capitalize(prevType.name)],
            }}
            onClick={handleNavigate(`/types/${prevType.name}`, {
              name: startCase(prevType.name),
              path: `/types/${prevType.name}`,
            })}
          >
            <div className="flex items-center">
              <TbPlayerTrackPrevFilled
                color={typeColors[capitalize(prevType.name)]}
                className="mr-2 size-3 xs:size-5"
              />
              <div className="mb-1">{startCase(prevType.name)}</div>
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
          {nextType ? (
            <button
              className="text-white rounded-md text-sm xs:text-xl flex items-end justify-end w-fit"
              style={{
                color: typeColors[capitalize(nextType.name)],
              }}
              onClick={handleNavigate(`/types/${nextType.name}`, {
                name: startCase(nextType.name),
                path: `/types/${nextType.name}`,
              })}
            >
              <div className="flex items-center">
                <div className="mb-1">{startCase(nextType.name)}</div>
                <TbPlayerTrackNextFilled
                  color={typeColors[capitalize(nextType.name)]}
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

export default TypeInfoHeader;
