import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { useMemo } from 'react'
import DataTable from '../UI/Tables/DataTable';
type Props = {
    NIN: string
}

function TabAntecedentsMedicales({NIN} : Props) {
    const antecedents_medicales = useQuery<AntecedentMedicale[]>({
        queryKey: ['antecedents_medicales' + NIN],
        queryFn: async () => {
            const data = (await axios.get(`http://localhost:8080/api/patients/${NIN}/antecedents-medicals`)).data;
            return data;
        }
    });
    const antecedents_medicalesTableDefinition = useMemo(() => [
        { header: "#", id: "index", cell: (info) => info.row.index + 1 },
        { header: "Description", accessorKey: "description" },
        { header: "Remarques", accessorKey: "remarques" },
    ], []) as ColumnDef<AntecedentMedicale>[];
    return (
        <>
            <h3 className="text-lg font-bold text-gray-900 mb-0">Antécédents Médicales</h3>
            <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
            <DataTable query={antecedents_medicales} tableDefinition={antecedents_medicalesTableDefinition} />
        </>
    )
}

export default TabAntecedentsMedicales