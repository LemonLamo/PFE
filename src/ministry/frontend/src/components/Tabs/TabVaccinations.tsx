import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { useMemo } from 'react'
import DataTable from '../UI/Tables/DataTable';
import moment from 'moment';
import { baseURL } from '../../config';
type Props = {
    NIN: string
}

function TabVaccinations({NIN} : Props) {
    const vaccinations = useQuery<Vaccination[]>({
        queryKey: ['vaccinations' + NIN],
        queryFn: async () => {
            const data = (await axios.get(`${baseURL}/api/patients/${NIN}/vaccinations`)).data;
            return data;
        }
    });
    const vaccinationsTableDefinition = useMemo(() => [
        { header: "#", id: "index", cell: (info) => info.row.index + 1 },
        { header: "Code", accessorKey: "code_vaccin" },
        { header: "Nom", accessorKey: "nom_vaccin" },
        { header: "Date", id: "date", cell: (info) => moment(info.row.original.date).format('DD/MM/YYYY HH:mm') },
        { header: "Remarques", accessorKey: "remarques" },
        { header: "Nombre de doses", accessorKey: "nombre_de_doses" },
        { header: "Prochaine dose", id: "date_de_prochaine_dose", cell: (info) => moment(info.row.original.date_de_prochaine_dose).format('DD/MM/YYYY HH:mm') }
    ], []) as ColumnDef<Vaccination>[];
    return (
        <>
            <h3 className="text-lg mb-0">Vaccinations</h3>
            <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
            <DataTable query={vaccinations} tableDefinition={vaccinationsTableDefinition} />
        </>
    )
}

export default TabVaccinations