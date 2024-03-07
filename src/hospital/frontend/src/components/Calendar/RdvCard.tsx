function RdvCard({ children }) {
  console.log(children);
  return (
    <ul className="flex flex-col gap-y-4">
      {children.map((item) => (
        <li className="flex justify-between gap-x-3 mb-0">
          <img
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900 mb-0">
              {item.title}
            </p>
            <p className="mb-0 truncate text-sm leading-5 text-gray-600">
              {item.subtitle} - {item.date.toLocaleDateString()}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
export default RdvCard;
