import { ReactNode } from "react";

type ColorsProps = {
  bgColor: string;
  textColor: string;
  children: ReactNode;
  className?: string;
};

function Badge({ bgColor, textColor, children, className='' }: ColorsProps) {
  return (
    <span className={`py-2.2 px-3.6 text-xs rounded-3xl inline-block whitespace-nowrap text-center align-baseline font-bold leading-none ${className}`} style={{ backgroundColor: bgColor, color: textColor }}>
      {children}
    </span>
  );
}

export default Badge;
