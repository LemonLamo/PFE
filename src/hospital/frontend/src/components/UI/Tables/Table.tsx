import { ReactNode } from "react";

type TableProps = {
  fields: string[];
  children: ReactNode;
  className?: string;
};
function Table({ fields, children, className=''}: TableProps) {
  return (
    <div className={`block w-full overflow-auto scrolling-touch ${className}`}>
      <table className="w-full max-w-full mb-4 bg-transparent">
        <thead className="text-gray-700">
          <tr>
            {fields.map((item, i) => (
              <th key={i} className="pe-4 py-1 text-left">{item} </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {children}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
