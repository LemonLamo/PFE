import { ReactNode } from "react";

type ColorsProps = {
  bgColor: string;
  textColor: string;
  children: ReactNode;
};

function Badge({ bgColor, textColor, children }: ColorsProps) {
  return (
    <span className={`py-2.2 px-3.6 text-xs rounded-3xl inline-block whitespace-nowrap text-center align-baseline font-bold leading-none`} style={{ backgroundColor: bgColor, color: textColor }}>
      {children}
    </span>
  );
}

export default Badge;
