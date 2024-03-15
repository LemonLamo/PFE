import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { useMemo } from 'react'
import DataTable from '../UI/Tables/DataTable';
type Props = {
    NIN: string
}

function TabMaladiesChroniques({ NIN }: Props) {
    const maladies_chroniques = useQuery<Patient>({
        queryKey: ['maladies_chroniques' + NIN],
        queryFn: () => {
            //const data = (await axios.get(`http://localhost:8080/api/patients/${NIN}/maladies-chroniques`)).data;
            return [];
        }
    });
    const maladies_chroniquesTableDefinition = useMemo(() => [
        { header: "#", id: "index", cell: (info) => info.row.index + 1 },
        { header: "Code", accessorKey: "code_maladie" },
        { header: "Intitulé", accessorKey: "nom_maladie" },
        { header: "Date de diagnostic", accessorKey: "date" },
        { header: "Remarques", accessorKey: "remarques" },
    ], []) as ColumnDef<AntecedentMedicale>[];
    return (
        <>
            <h3 className="text-lg font-bold text-gray-900 mb-0">Maladies chroniques</h3>
            <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
            <DataTable query={maladies_chroniques} tableDefinition={maladies_chroniquesTableDefinition} />
        </>
    )
}

export default TabMaladiesChroniques