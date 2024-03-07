import { ReactNode } from "react";

type TableCellProps = {
  children: ReactNode;
  className?: string;
};

<<<<<<< HEAD
function TableCell({ children, className }: TableCellProps) {
  return <td className={`text-left ${className}`}>{children}</td>;
=======
function TableCell({ children, className='' }: TableCellProps) {
  return (
      <td className={`text-left ${className}`} >
        {children}
      </td>
  )
>>>>>>> f16d90fbefbfa0bb71326482f6700b5e2820d787
}

export default TableCell;
