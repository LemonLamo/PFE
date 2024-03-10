import { useMemo, useState } from "react";
import moment from "moment";
import Card from "../../components/UI/Card";
import Table from "../../components/UI/Tables/Table";
import TableRow from "../../components/UI/Tables/TableRow";
import TableCell from "../../components/UI/Tables/TableCell";
import { Link } from "react-router-dom";

const createModal = (
  <>
    <Link className="flex items-center justify-center py-2 h-10 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0" to="/nouvelle_consultation">
      <i className="fa fa-plus" />
      <span className="ms-2">Nouvelle consultation</span>
    </Link>
  </>
);

function MesPatientsPage() {
  const patients = useMemo<Partial<Patient>[]>(() => {
    let data = [
      {
        NIN: "100010364027390000",
        nom: "BRAHIM",
        prenom: "Abderrazak",
        date_naissance: new Date(),
        lieu_naissance: "Tebessa",
        email: "brahim.abderrazak1307@gmail.com",
        telephone: "0799771062",
      },
      {
        NIN: "111111111111111111",
        nom: "NADIL",
        prenom: "Marwa",
        date_naissance: new Date(),
        lieu_naissance: "Kouba",
        email: "nadilmarwa02@gmail.com",
        telephone: "0799771062",
      },
    ];
    return data;
  }, []);
  
  const [selectedPatient, setSelectedPatient] = useState<Partial<Patient>>({
    NIN: "",
    nom: "",
    prenom: "",
    date_naissance: new Date(),
    lieu_naissance: "",
    email: "",
    telephone: "",
  });
  
  return (
    <Card title="Liste des patients" subtitle="Une liste de tous les patients du service" className="w-full" action={createModal} >
      <Table fields={["#", "Patient", "Date et lieu de naissance", "Téléphone", "Email", "Prochain rendez-vous", ""]}>
        {patients.map((a, i) => (
          <TableRow key={i}>
            <TableCell className="py-2 font-bold">{i + 1} </TableCell>
            <TableCell className="py-2 flex w-68">
              <img className="rounded-full w-12 me-2" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"></img>
              <div>
                <h6 className="mb-0">{a.nom} {a.prenom}</h6>
                <p className="mb-0 font-semibold mt-[-0.4rem]">NIN: {a.NIN}</p>
              </div>
            </TableCell>
            <TableCell className="py-2">
              {moment(a.date_naissance).format("DD/MM/YYYY")}, {a.lieu_naissance}
            </TableCell>
            <TableCell className="py-2"> {a.telephone} </TableCell>
            <TableCell className="py-2"> {a.email} </TableCell>
            <TableCell className="py-2"> {moment(new Date()).format("DD/MM/YYYY HH:mm")} </TableCell>
            <TableCell className="align-middle">
              <div className="flex justify-end gap-1">
                <Link to={`/patients/${a.NIN}`} className="w-4 transform text-green-500 hover:text-green-700 hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" ></path>
                  </svg>
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </Card>
  );
}

export default MesPatientsPage;
