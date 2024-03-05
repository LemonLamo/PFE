import Badge from "../Badge";

type TableEntryProps = {
  data: string[];
};

function TableEntry({ data }: TableEntryProps) {
  return (
    <tr>
      {data.map((val) =>
        val === "Faible" ? (
          <td>
            <Badge
              bgColor={"#fee2e2"}
              textColor={"#991b1b"}
              Children={"Repture de stock"}
            ></Badge>
          </td>
        ) : val === "Moyenne" ? (
          <td>
            <Badge
              bgColor={"#fdba74"}
              textColor={"#9a3412"}
              Children={"Près de repture"}
            ></Badge>
          </td>
        ) : val === "Elevée" ? (
          <td>
            <Badge
              bgColor={"#dcfce7"}
              textColor={"#267142"}
              Children={"En stock"}
            ></Badge>
          </td>
        ) : (
          <td>{val}</td>
        )
      )}

      <td className="py-3 text-right flex justify-center gap-2">
        <div className="w-4 transform text-green-500 hover:text-green-700 hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            ></path>
          </svg>
        </div>
        <div className="w-4 transform text-yellow-500 hover:text-yellow-700 hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </div>
        <div className="w-4 transform text-red-500 hover:text-red-700 hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
        </div>
      </td>
    </tr>
  );
}

export default TableEntry;
