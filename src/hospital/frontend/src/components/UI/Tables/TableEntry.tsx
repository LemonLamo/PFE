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
            <Badge bgColor={"#fee2e2"} textColor={"#991b1b"} Children={"Repture de stock"}></Badge>
          </td>
        ) : val === "Moyenne" ? (
          <td>
            <Badge bgColor={"#fdba74"} textColor={"#9a3412"} Children={"Près de repture"}></Badge>
          </td>
        ) : val === "Elevée" ? (
          <td>
            <Badge bgColor={"#dcfce7"} textColor={"#267142"} Children={"En stock"} ></Badge>
          </td>
        ) : (
          <td>{val}</td>
        )
      )}
    </tr>
  );
}

export default TableEntry;
