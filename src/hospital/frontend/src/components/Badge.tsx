function Badge({ bgColor, textColor }: ColorsProps) {
  return (
    <span
      className={`py-2.2 px-3.6 text-xs rounded-1.8 inline-block whitespace-nowrap text-center ${bgColor} ${textColor} align-baseline font-bold uppercase leading-none`}
    >
      pink
    </span>
  );
}

export default Badge;
