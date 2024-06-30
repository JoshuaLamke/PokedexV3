import { TableRow } from "../types";

interface Props {
  tableMetadata: TableRow[];
}

const Table = ({ tableMetadata }: Props) => {
  return (
    <table className="min-w-full text-start">
      <tbody>
        {tableMetadata.map((row, index) => (
          <tr key={index} className="border-b last:border-b-0 align-top">
            <th className="py-4 px-6 text-left text-gray-900 font-medium">
              {row.header}
            </th>
            <td className="py-4 px-6 text-gray-700">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
