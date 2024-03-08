import { ReactNode } from "react";

type TableCellProps = {
  children: ReactNode;
  className?: string;
};

function TableCell({ children, className }: TableCellProps) {
  return <td className={`text-left ${className}`}>{children}</td>;
}

export default TableCell;
