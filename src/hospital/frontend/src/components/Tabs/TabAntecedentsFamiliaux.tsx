import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { useMemo } from 'react'
import DataTable from '../UI/Tables/DataTable';
import { baseURL } from '../../hooks';
type Props = {
    NIN: string
}

function TabAntecedentsFamiliaux({ NIN }: Props) {
    const antecedents_familiaux = useQuery<AntecedentFamilial[]>({
        queryKey: ['antecedents_familiaux' + NIN],
        queryFn: async () => {
            const data = (await axios.get(`${baseURL}/api/patients/${NIN}/antecedents-familiaux`)).data;
            return data;
        }
    });
    const antecedents_familiauxTableDefinition = useMemo(() => [
        { header: "#", id: "index", cell: (info) => info.row.index + 1 },
        { header: "Description", accessorKey: "description" },
        { header: "Remarques", accessorKey: "remarques" },
    ], []) as ColumnDef<AntecedentFamilial>[];
    return (
        <>
            <h3 className="text-lg font-bold text-gray-900 mb-0">Antécédents Familiaux</h3>
            <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
            <DataTable query={antecedents_familiaux} tableDefinition={antecedents_familiauxTableDefinition} />
        </>
    )
}

export default TabAntecedentsFamiliaux