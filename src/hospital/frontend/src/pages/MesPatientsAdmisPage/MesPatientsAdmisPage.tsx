import { useMemo, useState } from "react";
import moment from "moment";
import Card from "../../components/UI/Card";
import Table from "../../components/UI/Tables/Table";
import TableRow from "../../components/UI/Tables/TableRow";
import TableCell from "../../components/UI/Tables/TableCell";
import EditModal from "../../components/Modals/EditModal";
import { Link } from "react-router-dom";
import DeleteModal from "../../components/Modals/DeleteModal";
import Select from "../../components/Select";

const dictionnaire_interventions = [
  { key: 'M101', value: 'Appendictomie', },
]

const createModal = (
  <>
    <Link className="flex items-center justify-center py-2 h-10 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0" to="/nouvelle_hospitalisation">
      <i className="fa fa-plus" />
      <span className="ms-2">Nouvelle hospitalisation</span>
    </Link>
  </>
);

function MesAdmisPage() {
  const patientadmis = useMemo<Hospitalisation[]>(() => {
    let data = [
      {
        code_hospitalisation: "hos_2135131",
        nom_hopital: "CHU Beni Messous",
        medecin: {
          NIN: "100010364027390000",
          nom: "BRAHIM",
          prenom: "Abderrazak"
        },
        patient: {
          NIN: "100010364027390000",
          nom: "BRAHIM",
          prenom: "Abderrazak"
        },
        date_entree: new Date(),
        mode_entree: "Hospitalisation complète",
        motif_hospitalisation: "Idk, I haven't thought about it just yet",
        date_sortie_prevu: new Date(),
        resume_hospitalisation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      }
    ];
    return data;
  }, []);

  const [selectedInterventions, setSelectedInterventions] = useState<Intervention>({
    nom_hopital: '',
    medecin: {
      NIN: "100010364027390000",
      nom: "BRAHIM",
      prenom: "Abderrazak"
    },
    patient: {
      NIN: "100010364027390000",
      nom: "BRAHIM",
      prenom: "Abderrazak"
    },
    code_intervention: '',
    nom: '',
    date: new Date(),
    remarques: ''
  })

  function select_intervention({ key, value }: { key: string, value: string }) {
    setSelectedInterventions({ ...selectedInterventions, code_intervention: key, nom: value })
  }

  return (
    <Card title="Liste des  admis" subtitle="Une liste de tous les  admis" className="w-full" action={createModal}>
      <Table fields={["#", "Patient", "Date entrée", "Mode entrée", "Motif d'hospitalisation", "Date sortie prévu", ""]}>
        {patientadmis.map((a, i) => (
          <TableRow key={i}>
            <TableCell className="py-2 font-bold">{i+1} </TableCell>
            <TableCell className="py-2 flex w-68">
              <img className="rounded-full w-12 me-2" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"></img>
              <div>
                <h6 className="mb-0">{a.patient.nom} {a.patient.prenom}</h6>
                <p className="mb-0 font-semibold mt-[-0.4rem]">NIN: {a.patient.NIN}</p>
              </div>
            </TableCell>
            <TableCell className="py-2"> {moment(a.date_entree).format("DD/MM/YYYY HH:mm")} </TableCell>
            <TableCell className="py-2"> {a.mode_entree} </TableCell>
            <TableCell className="py-2"> {a.resume_hospitalisation} </TableCell>
            <TableCell className="py-2"> {moment(a.date_sortie_prevu).format("DD/MM/YYYY HH:mm")} </TableCell>
            <TableCell className="align-middle">
              <div className="flex justify-end gap-1">
                <Link to={`/patients/${a.patient.NIN}`} className="w-4 transform text-green-500 hover:text-green-700 hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" ></path>
                  </svg>
                </Link>
                <EditModal onOpen={() => console.log(a.patient.NIN)}>
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Plannifier une intervention</h3>
                  <p className="text-gray-600">Remplissez ce formulaire pour plannifier une intervention pour <span className="font-bold">{a.patient.nom} {a.patient.prenom}</span>.</p>
                  <div className="grid grid-cols-6 gap-2">
                    <label className="font-semibold text-slate-700 text-sm col-span-2"> Intervention: </label>
                    <Select className="col-span-4" options={dictionnaire_interventions} placeholder="Intervention" onChange={select_intervention} state={{ key: selectedInterventions.code_intervention, value: selectedInterventions.nom! }} />

                    <label className="font-semibold text-slate-700 text-sm col-span-2"> Date: </label>
                    <input className="primary col-span-4" type="datetime-local" placeholder="Date" value={moment(selectedInterventions.date).format('YYYY-MM-DDTHH:mm')} onChange={(e) => setSelectedInterventions({ ...selectedInterventions, date: moment(e.target.value, 'YYYY-MM-DDTHH:mm').toDate() })}></input>

                    <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Remarques: </label>
                    <textarea className="col-span-4" rows={5} placeholder="Remarques" value={selectedInterventions.remarques} onChange={(e) => setSelectedInterventions({ ...selectedInterventions, remarques: e.target.value })}></textarea>
                  </div>
                </EditModal>
                <EditModal onOpen={() => console.log(a.patient.NIN)}>
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Ajouter une remarque</h3>
                  <p className="text-gray-600">Remplissez ce formulaire pour ajouter une remarque à cette hospitalisation pour <span className="font-bold">{a.patient.nom} {a.patient.prenom}</span>.</p>
                  <div className="grid grid-cols-6 gap-2">
                    <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Remarques: </label>
                    <textarea className="col-span-4" rows={5} placeholder="Remarques" value={selectedInterventions.remarques} onChange={(e) => setSelectedInterventions({ ...selectedInterventions, remarques: e.target.value })}></textarea>
                  </div>
                </EditModal>
                <DeleteModal>
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Transfert de patient</h3>
                  <p className="text-gray-600">Remplissez ce formulaire pour plannifier une intervention pour <span className="font-bold">{a.patient.nom} {a.patient.prenom}</span>.</p>
                  <div className="grid grid-cols-6 gap-2">
                    <label className="font-semibold text-slate-700 text-sm col-span-2"> Transferer à: </label>
                    <Select className="col-span-4" options={dictionnaire_interventions} placeholder="Medecin" onChange={select_intervention} state={{ key: selectedInterventions.code_intervention, value: selectedInterventions.nom! }} />

                    <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Remarques: </label>
                    <textarea className="col-span-4" rows={5} placeholder="Remarques" value={selectedInterventions.remarques} onChange={(e) => setSelectedInterventions({ ...selectedInterventions, remarques: e.target.value })}></textarea>
                  </div>
                </DeleteModal>
                <DeleteModal onOpen={() => console.log(a.patient.NIN)}>
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Sortie du malade</h3>
                  <p className="text-gray-600">Remplissez ce formulaire pour ajouter une remarque à cette hospitalisation pour <span className="font-bold">{a.patient.nom} {a.patient.prenom}</span>.</p>
                  <div className="grid grid-cols-6 gap-2">
                    <label className="font-semibold text-slate-700 text-sm col-span-6"> Mode de sortie: </label>
                    <select className="col-span-6">
                      <option>Hospitalisation complète</option>
                      <option>Hospitalisation partielle</option>
                      <option>Hôpital du jour</option>
                    </select>

                    <label className="font-semibold text-slate-700 text-sm col-span-6"> Date de sortie: </label>
                    <input className="primary col-span-7" type="datetime-local"></input>
                  </div>
                </DeleteModal>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </Card>
  );
}

export default MesAdmisPage;
