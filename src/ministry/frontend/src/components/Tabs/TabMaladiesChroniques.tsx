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

function TabMaladiesChroniques({ NIN }: Props) {
    const maladies_chroniques = useQuery<any>({
        queryKey: ['maladies_chroniques' + NIN],
        queryFn: async () => {
            const data = (await axios.get(`${baseURL}/api/patients/${NIN}/maladies-chroniques`)).data;
            return data;
        }
    });
    const maladies_chroniquesTableDefinition = useMemo(() => [
        { header: "#", id: "index", cell: (info) => info.row.index + 1 },
        { header: "Code", accessorKey: "code_maladie" },
        { header: "Intitulé", accessorKey: "nom_maladie" },
        { header: "Date de diagnostic", id: "date_diagonstic", cell: (info) => moment(info.row.original.date_diagnostic).format('DD/MM/YYYY') },
        { header: "Remarques", accessorKey: "remarques" },
    ], []) as ColumnDef<any>[];
    return (
        <>
            <h3 className="text-lg mb-0">Maladies chroniques</h3>
            <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
            <DataTable query={maladies_chroniques} tableDefinition={maladies_chroniquesTableDefinition} />
        </>
    )
}

export default TabMaladiesChroniques