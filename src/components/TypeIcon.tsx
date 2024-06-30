import capitalize from "lodash/capitalize";
import { getImageByType, typeColors } from "../utils";
import useNavigateSmooth from "../hooks/useNavigateSmooth";
import startCase from "lodash/startCase";

interface Props {
  type: string;
}

const TypeIcon = ({ type }: Props) => {
  const handleNavigate = useNavigateSmooth();
  return (
    <div
      className="flex items-center rounded-md pr-3 mx-2 hover:scale-105"
      style={{ background: typeColors[capitalize(type)] }}
      key={type}
      onClick={handleNavigate(`/types/${type}`, {
        name: startCase(type),
        path: `/types/${type}`,
      })}
      role="button"
    >
      <img src={getImageByType(capitalize(type))} className="w-8 h-8" />
      <span className="text-white text-xl xs:text-2xl sm:text-3xl mb-1">
        {capitalize(type)}
      </span>
    </div>
  );
};

export default TypeIcon;
