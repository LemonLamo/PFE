import TabContent from "../Tabs/TabContent"

function TableDynamic({HeaderRow, tableContent}) {
    return (
        <div className="block w-full overflow-auto scrolling-touch px-6">
            <table className="w-full max-w-full mb-4 bg-transparent">
                <thead className="text-gray-700">
                    <tr>
                    {HeaderRow.map((item, index) => (
                        <th className="pe-4 py-3 text-left">{item} </th>
          ))}
                    </tr>
                </thead>
                <tbody className="text-gray-600">
                {tableContent.map((item, index) => (
                    <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.surname}</td>
                    <td>{item.data1}</td>
                    <td>{item.data2}</td>
                    <td>{item.data3}</td>
                    <td className="py-3 text-right flex justify-center gap-2">
                        <div className="w-4 transform text-green-500 hover:text-green-700 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                </path>
                            </svg>
                        </div>
                        <div className="w-4 transform text-yellow-500 hover:text-yellow-700 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
                                </path>
                            </svg>
                        </div>
                        <div className="w-4 transform text-red-500 hover:text-red-700 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                </path>
                            </svg>
                        </div>
                    </td>
                </tr>
          ))}

                </tbody>
            </table>
        </div>
    )
  }
  
  export default TableDynamic