import { Children, ReactNode } from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

type ColorsProps = {
  bgColor: string;
  textColor: string;
  Children: ReactNode;
};

function Badge({ bgColor, textColor, Children }: ColorsProps) {
  return (
    <span
      className={`py-2.2 px-3.6 text-xs rounded-3xl inline-block whitespace-nowrap text-center align-baseline font-bold leading-none`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {Children === "En stock" ? (
        <CheckCircleIcon className="h-[2vh] mr-1" />
      ) : (
        <ExclamationTriangleIcon className="h-[2vh] mr-1" />
      )}
      {Children}
    </span>
  );
}

export default Badge;
