import { useMemo, useState } from "react";
import moment from "moment";
import Card from "../components/UI/Card";
import EditModal from "../components/Modals/EditModal";
import { Link } from "react-router-dom";
import DeleteModal from "../components/Modals/DeleteModal";
import Select from "../components/Select";
import { ColumnDef } from "@tanstack/react-table";
import ViewButton from "../components/Buttons/ViewButton";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../components/UI/Tables/DataTable";
import dictionnaire_interventions from "../codifications/interventions.json"

function MesAdmisPage() {
  const [selectedHospitalisation, ] = useState<Hospitalisation>({ 
      code_hospitalisation: "",
      nom_hopital: "",
      medecin: { NIN: "", nom: "", prenom: "" },
      patient: { NIN: "", nom: "", prenom: "" },
      date_entree: new Date(),
      mode_entree: "",
      motif_hospitalisation: "",
      date_sortie_prevu: new Date(),
  })
  const [openModal, setOpenModal] = useState('');
  const query = useQuery({
    queryKey: ['patients_admis'],
    queryFn: () => {
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
    }
  })

  const tableDefinition = useMemo(() => [
    { header: "#", accessorKey: "id" },
    { header: "Patient", id: "patient", cell: (info) => {
        const p = info.row.original;
        return <div className="py-2 flex w-68">
          <img className="rounded-full w-12 me-2" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"></img>
          <div>
            <h6 className="mb-0">{p.patient.nom} {p.patient.prenom}</h6>
            <p className="mb-0 font-semibold mt-[-0.4rem]">NIN: {p.patient.NIN}</p>
          </div>
        </div>
      }
    },
    { header: "Date entrée", id: "date_entree", cell: (info) =>
        moment(info.row.original.date_entree).format('DD/MM/YYYY')
    },
    { header: "Mode entrée", accessorKey: "mode_entree" },
    { header: "Motif d'hospitalisation", accessorKey: "motif_hospitalisation" },
    { header: "Date sortie prévu", id:"date_sortie_prevu", accessorKey: "date_sortie_prevu", cell: (info) =>
        moment(info.row.original.date_sortie_prevu).format('DD/MM/YYYY')
    },
    { header: "", id: "actions", cell: (info) => {
        const a = info.row.original
        return (
          <div className="flex justify-end gap-2">
            <Link to={`/patients/${a.patient.NIN}`} className="w-4 transform text-green-500 hover:text-green-700 hover:scale-110"> <ViewButton onClick={() => null} /> </Link>
            <ViewButton onClick={() => setOpenModal('intervention')} />
            <ViewButton onClick={() => setOpenModal('remarques')} />
            <ViewButton onClick={() => setOpenModal('transfert')} />
            <ViewButton onClick={() => setOpenModal('sortie')} />
          </div>
        )
      }
    },
  ], []) as ColumnDef<Hospitalisation>[];
  
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

  function debug(){

  }

  const action = (
    <Link className="flex items-center justify-center py-2 h-10 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0" to="/nouvelle_hospitalisation">
      <i className="fa fa-plus" />
      <span className="ms-2">Nouvelle hospitalisation</span>
    </Link>
  );
  return (
    <Card title="Liste des  admis" subtitle="Une liste de tous les  admis" className="w-full" action={action}>
      <DataTable tableDefinition={tableDefinition} query={query} className="mt-2" />

      <EditModal open={openModal === 'intervention'} close={() => setOpenModal('')} action={debug}>
        <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Plannifier une intervention</h3>
        <p className="text-gray-600">Remplissez ce formulaire pour plannifier une intervention pour <span className="font-bold">{selectedHospitalisation.patient.nom} {selectedHospitalisation.patient.prenom}</span>.</p>
        <div className="grid grid-cols-6 gap-2">
          <label className="font-semibold text-slate-700 text-sm col-span-2"> Intervention: </label>
          <Select className="col-span-4" options={dictionnaire_interventions} placeholder="Intervention" onChange={select_intervention} state={{ key: selectedInterventions.code_intervention, value: selectedInterventions.nom! }} />

          <label className="font-semibold text-slate-700 text-sm col-span-2"> Date: </label>
          <input className="primary col-span-4" type="datetime-local" placeholder="Date" value={moment(selectedInterventions.date).format('YYYY-MM-DDTHH:mm')} onChange={(e) => setSelectedInterventions({ ...selectedInterventions, date: moment(e.target.value, 'YYYY-MM-DDTHH:mm').toDate() })}></input>

          <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Remarques: </label>
          <textarea className="col-span-4" rows={5} placeholder="Remarques" value={selectedInterventions.remarques} onChange={(e) => setSelectedInterventions({ ...selectedInterventions, remarques: e.target.value })}></textarea>
        </div>
      </EditModal>

      <EditModal open={openModal === 'remarques'} close={() => setOpenModal('')} action={debug}>
        <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Ajouter une remarque</h3>
        <p className="text-gray-600">Remplissez ce formulaire pour ajouter une remarque à cette hospitalisation pour <span className="font-bold">{selectedHospitalisation.patient.nom} {selectedHospitalisation.patient.prenom}</span>.</p>
        <div className="grid grid-cols-6 gap-2">
          <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Remarques: </label>
          <textarea className="col-span-4" rows={5} placeholder="Remarques" value={selectedInterventions.remarques} onChange={(e) => setSelectedInterventions({ ...selectedInterventions, remarques: e.target.value })}></textarea>
        </div>
      </EditModal>

      <DeleteModal open={openModal === 'transfert'} close={() => setOpenModal('')} action={debug}>
        <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Transfert de patient</h3>
        <p className="text-gray-600">Remplissez ce formulaire pour plannifier une intervention pour <span className="font-bold">{selectedHospitalisation.patient.nom} {selectedHospitalisation.patient.prenom}</span>.</p>
        <div className="grid grid-cols-6 gap-2">
          <label className="font-semibold text-slate-700 text-sm col-span-2"> Transferer à: </label>
          <Select className="col-span-4" options={dictionnaire_interventions} placeholder="Medecin" onChange={select_intervention} state={{ key: selectedInterventions.code_intervention, value: selectedInterventions.nom! }} />

          <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Remarques: </label>
          <textarea className="col-span-4" rows={5} placeholder="Remarques" value={selectedInterventions.remarques} onChange={(e) => setSelectedInterventions({ ...selectedInterventions, remarques: e.target.value })}></textarea>
        </div>
      </DeleteModal>

      <DeleteModal open={openModal === 'sortie'} close={() => setOpenModal('')} action={debug}>
        <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Sortie du malade</h3>
        <p className="text-gray-600">Remplissez ce formulaire pour ajouter une remarque à cette hospitalisation pour <span className="font-bold">{selectedHospitalisation.patient.nom} {selectedHospitalisation.patient.prenom}</span>.</p>
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
    </Card>
  );
}

export default MesAdmisPage;
