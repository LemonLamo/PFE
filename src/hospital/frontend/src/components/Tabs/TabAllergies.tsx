import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { useMemo } from 'react'
import DataTable from '../UI/Tables/DataTable';
import moment from 'moment';
import { baseURL } from '../../hooks';
type Props = {
    NIN: string
}

function TabAllergies({NIN} : Props) {
    const allergies = useQuery<Allergie[]>({
        queryKey: ['allergies' + NIN],
        queryFn: async () => {
            const data = (await axios.get(`${baseURL}/api/patients/${NIN}/allergies`)).data;
            return data;
        }
    });
    const allergiesTableDefinition = useMemo(() => [
        { header: "#", id: "index", cell: (info) => info.row.index + 1 },
        { header: "Code", accessorKey: "code_allergene" },
        { header: "Nom", accessorKey: "nom_allergene" },
        { header: "Date", id: "date", cell: (info) => moment(info.row.original.date).format('DD/MM/YYYY HH:mm') },
        { header: "Remarques", accessorKey: "remarques" },
    ], []) as ColumnDef<Allergie>[];
    return (
        <>
            <h3 className="text-lg font-bold text-gray-900 mb-0">Allergies</h3>
            <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
            <DataTable query={allergies} tableDefinition={allergiesTableDefinition} />
        </>
    )
}

export default TabAllergies