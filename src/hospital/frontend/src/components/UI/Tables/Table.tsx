import { ReactNode } from "react";

type TableProps = {
  fields: string[];
  children: ReactNode;
};
function Table({ fields, children }: TableProps) {
  return (
    <div className="block w-full overflow-auto scrolling-touch px-6">
      <table className="w-full max-w-full mb-4 bg-transparent">
        <thead className="text-gray-700">
          <tr>
            {fields.map((item) => (
              <th className="pe-4 py-3 text-left">{item} </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-600">{children}</tbody>
      </table>
    </div>
  );
}

export default Table;
