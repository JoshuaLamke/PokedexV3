import useNavigateSmooth from "../hooks/useNavigateSmooth";
import { effectivenessVerbiageMap, getImageByType } from "../utils";

interface Props {
  data: Record<number, string[]>;
  type: "attack" | "defense";
}
const TypeEffectivenessTable = ({ data, type }: Props) => {
  const handleNavigate = useNavigateSmooth();

  return (
    <div className="mb-5">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border-t mt-5">
          <tbody>
            {Object.entries(data)
              .sort((a, b) => Number(a[0]) - Number(b[0]))
              .map(([mult, types]) => (
                <tr className="border-b py-2" key={`${type}-${mult}`}>
                  <th className="border-r pr-4">
                    {effectivenessVerbiageMap[Number(mult)]}{" "}
                    {type === "attack" ? "Damage To" : "Damage From"}
                  </th>
                  <td className="flex flex-wrap min-h-12 text-gray-700 items-center pl-4">
                    {types.length > 0 ? (
                      types.map((type) => (
                        <img
                          key={type}
                          src={getImageByType(type)}
                          className="w-10 h-auto m-2 hover:scale-105"
                          onClick={handleNavigate(
                            `/types/${type.toLowerCase()}`,
                            {
                              name: type,
                              path: `/types/${type.toLowerCase()}`,
                            }
                          )}
                          role="button"
                        />
                      ))
                    ) : (
                      <strong className="text-black text-md ml-2">None</strong>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TypeEffectivenessTable;
