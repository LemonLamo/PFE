import { ReactNode } from "react";

type ColorsProps = {
  bgColor: string;
  textColor: string;
  children: ReactNode;
  className?: string;
};

function Badge({ bgColor, textColor, children, className='' }: ColorsProps) {
  return (
    <span className={`py-1.5 px-3.6 text-xs rounded-3xl inline-block whitespace-nowrap text-center font-bold leading-none ${className}`} style={{ backgroundColor: bgColor, color: textColor }}>
      {children}
    </span>
  );
}

export default Badge;
