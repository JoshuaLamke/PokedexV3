import { TableRow, MoveDetails } from "../types";
import Table from "./Table";

interface Props {
  data: MoveDetails;
  versionGroup: string;
}
const MoveEffectsSection = ({ data, versionGroup }: Props) => {
  const moveEffectsTableData: TableRow[] = [
    {
      header: <span className="sm:text-nowrap">Effect</span>,
      value: (
        <span>
          {data.effect_entries.filter((e) => e.language.name === "en")?.[0]
            ?.effect ?? "N/A"}
        </span>
      ),
    },
    {
      header: <span className="sm:text-nowrap">Short Effect</span>,
      value: (
        <span>
          {data.effect_entries.filter((e) => e.language.name === "en")?.[0]
            ?.short_effect ?? "N/A"}
        </span>
      ),
    },
    {
      header: <span className="sm:text-nowrap">Effect Chance</span>,
      value: (
        <span>
          {typeof data.effect_chance === "number"
            ? `${data.effect_chance}%`
            : "N/A"}
        </span>
      ),
    },
    {
      header: <span className="sm:text-nowrap">Effect Changes</span>,
      value: (
        <span>
          {data.effect_changes
            ?.find(
              (e) =>
                e?.effect_entries.some((ef) => ef.language.name === "en") &&
                e?.version_group.name === versionGroup
            )
            ?.effect_entries.find((e) => e.language.name === "en")?.effect ??
            "N/A"}
        </span>
      ),
    },
  ];

  return (
    <div className="mt-5 flex flex-col items-center">
      <h3 className="text-3xl sm:text-4xl md:text:5xl">Effects</h3>
      <Table tableMetadata={moveEffectsTableData} />
    </div>
  );
};

export default MoveEffectsSection;
