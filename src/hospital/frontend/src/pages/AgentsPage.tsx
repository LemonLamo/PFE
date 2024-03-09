import { useMemo, useState } from "react";
import moment from "moment";
import Card from "../components/UI/Card";
import CreateModal from "../components/Modals/CreateModal";
import Table from "../components/UI/Tables/Table";
import TableRow from "../components/UI/Tables/TableRow";
import TableCell from "../components/UI/Tables/TableCell";
import ViewModal from "../components/Modals/ViewModal";
import EditModal from "../components/Modals/EditModal";
import DeleteModal from "../components/Modals/DeleteModal";

function AgentsPage() {
  const agents = useMemo<Agent[]>(() => {
    let data = [
      {
        NIN: "100010364027390000",
        nom: "BRAHIM",
        prenom: "Abderrazak",
        date_naissance: new Date("12-05-2002"),
        lieu_naissance: "Tebessa",
        sexe: "Female",
        addresse: "39 HAI MOUHOUS",
        email: "brahim.abderrazak1307@gmail.com",
        telephone: "0799771062",
      },
      {
        NIN: "111111111111111111",
        nom: "NADIL",
        prenom: "Marwa",
        date_naissance: new Date(),
        lieu_naissance: "Blida",
        sexe: "Male",
        addresse: "39 HAI MOUHOUS",
        email: "nadilmarwa02@gmail.com",
        telephone: "0799771062",
      },
    ];
    return data;
  }, []);
  const [selectedAgent, setSelectedAgent] = useState<Agent>({
    NIN: "",
    nom: "",
    prenom: "",
    date_naissance: new Date(),
    lieu_naissance: "",
    sexe: "Male",
    addresse: "",
    email: "",
    telephone: "",
  });

  function create_agent() {
    console.log("Creating new agent");
  }

  function view_agent(NIN: string, nom: string, prenom: string, date_naissance: Date, lieu_naissance: string, sexe: string, email: string, telephone: string) {
    // use NIN to get the agent data into the state variable
    console.log(`Viewing agent ${NIN}`);
    setSelectedAgent((v) => ({
      ...v,
      NIN: NIN,
      nom: nom,
      prenom: prenom,
      date_naissance: date_naissance,
      lieu_naissance: lieu_naissance,
      sexe: sexe,
      email: email,
      telephone: telephone,
    }));
  }
  function load_edit_agent( NIN: string, nom: string, prenom: string, date_naissance: Date, lieu_naissance: string, sexe: string, email: string, telephone: string ) {
    console.log(`Loading information for edit modal ${NIN}`);
    setSelectedAgent((v) => ({
      ...v,
      NIN: NIN,
      nom: nom,
      prenom: prenom,
      date_naissance: date_naissance,
      lieu_naissance: lieu_naissance,
      sexe: sexe,
      email: email,
      telephone: telephone,
    }));
  }

  function edit_agent(NIN: string) {
    alert(`Editing agent ${NIN}`);
  }

  function delete_agent(NIN: string) {
    alert(`Deleting agent ${NIN}`);
  }

  const createModal = (
    <>
      <CreateModal onCreate={create_agent} onCancel={() => console.log("Cancelled create")} >
        <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title" >
          Créer agent
        </h3>
        <p className="text-gray-600">
          Veuillez remplir les informations nécessaires
        </p>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12">
            <label className="text-sm font-semibold">NIN</label>
            <input type="text" className="primary" placeholder="NIN" value={selectedAgent.NIN} onChange={(e) => setSelectedAgent({ ...selectedAgent, NIN: e.target.value }) } />
          </div>
          <div className="col-span-6">
            <label className="text-sm font-semibold">Nom </label>
            <input type="text" className="primary" placeholder="Nom" value={selectedAgent.nom} onChange={(e) => setSelectedAgent({ ...selectedAgent, nom: e.target.value }) } />
          </div>
          <div className="col-span-6">
            <label className="text-sm font-semibold">Prénom </label>
            <input type="text" className="primary" placeholder="Prenom" value={selectedAgent.prenom} onChange={(e) => setSelectedAgent({ ...selectedAgent, prenom: e.target.value }) } />
          </div>
          <div className="col-span-6">
            <label className="text-sm font-semibold">Date de naissance </label>
            <input type="date" className="primary" placeholder="Date de naissance" value={selectedAgent.nom} onChange={(e) => setSelectedAgent({ ...selectedAgent, date_naissance: e.target.valueAsDate! }) } />
          </div>
          <div className="col-span-6">
            <label className="text-sm font-semibold">Lieu de naissance </label>
            <input type="text" className="primary" placeholder="Lieu de naissance" value={selectedAgent.lieu_naissance} onChange={(e) => setSelectedAgent({ ...selectedAgent, lieu_naissance: e.target.value }) } />
          </div>
          <div className="col-span-6">
            <label className="text-sm font-semibold">Sexe </label>
            <select onChange={(e) => setSelectedAgent({ ...selectedAgent, sexe: e.target.value }) } >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="col-span-12">
            <label className="text-sm font-semibold">Email </label>
            <input type="email" className="primary" placeholder="Email" value={selectedAgent.email} onChange={(e) => setSelectedAgent({ ...selectedAgent, email: e.target.value, }) } />
          </div>
          <div className="col-span-12">
            <label className="text-sm font-semibold">Numero de téléphone </label>
            <input type="tel" className="primary" placeholder="Numero de telephone" value={selectedAgent.telephone} onChange={(e) => setSelectedAgent({ ...selectedAgent, telephone: e.target.value, }) } />
          </div>
        </div>
      </CreateModal>
    </>
  );

  return (
    <>
      <Card title="Agents" action={createModal} className="w-full">
        <Table fields={["NIN", "Nom", "Prénom", "Date de naissance", "Lieu de naissance", "Sexe", "Email", "Numero de téléphone", "" ]} >
          {agents.map((a, i) => (
            <TableRow key={i}>
              <TableCell className="pe-3 py-2 font-bold"> {a.NIN} </TableCell>
              <TableCell className="pe-3 py-2"> {a.nom} </TableCell>
              <TableCell className="pe-3 py-2"> {a.prenom} </TableCell>
              <TableCell className="pe-3 py-2"> {moment(a.date_naissance).format("DD/MM/YYYY")} </TableCell>
              <TableCell className="pe-3 py-2"> {a.lieu_naissance} </TableCell>
              <TableCell className="pe-3 py-2"> {a.sexe} </TableCell>
              <TableCell className="pe-3 py-2"> {a.email} </TableCell>
              <TableCell className="pe-3 py-2"> {a.telephone} </TableCell>
              <TableCell className="flex justify-end gap-2">
                <ViewModal onOpen={() => view_agent( a.NIN, a.nom, a.prenom, a.date_naissance, a.lieu_naissance, a.sexe, a.email, a.telephone) } >
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title" >
                    View agent
                  </h3>
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-12">
                      <label className="text-sm font-semibold">NIN</label>
                      <input type="text" className="primary" placeholder="NIN" value={selectedAgent.NIN} onChange={(e) => setSelectedAgent({ ...selectedAgent, NIN: e.target.value })} />
                    </div>
                    <div className="col-span-6">
                      <label className="text-sm font-semibold">Nom </label>
                      <input type="text" className="primary" placeholder="Nom" value={selectedAgent.nom} onChange={(e) => setSelectedAgent({ ...selectedAgent, nom: e.target.value })} />
                    </div>
                    <div className="col-span-6">
                      <label className="text-sm font-semibold">Prénom </label>
                      <input type="text" className="primary" placeholder="Prenom" value={selectedAgent.prenom} onChange={(e) => setSelectedAgent({ ...selectedAgent, prenom: e.target.value })} />
                    </div>
                    <div className="col-span-6">
                      <label className="text-sm font-semibold">Date de naissance </label>
                      <input type="date" className="primary" placeholder="Date de naissance" value={moment(selectedAgent.date_naissance).format('YYYY-MM-DD')} onChange={(e) => setSelectedAgent({ ...selectedAgent, date_naissance: e.target.valueAsDate! })} />
                    </div>
                    <div className="col-span-6">
                      <label className="text-sm font-semibold">Lieu de naissance </label>
                      <input type="text" className="primary" placeholder="Lieu de naissance" value={selectedAgent.lieu_naissance} onChange={(e) => setSelectedAgent({ ...selectedAgent, lieu_naissance: e.target.value })} />
                    </div>
                    <div className="col-span-6">
                      <label className="text-sm font-semibold">Sexe </label>
                      <select onChange={(e) => setSelectedAgent({ ...selectedAgent, sexe: e.target.value })} >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div className="col-span-12">
                      <label className="text-sm font-semibold">Email </label>
                      <input type="email" className="primary" placeholder="Email" value={selectedAgent.email} onChange={(e) => setSelectedAgent({ ...selectedAgent, email: e.target.value, })} />
                    </div>
                    <div className="col-span-12">
                      <label className="text-sm font-semibold">Numero de téléphone </label>
                      <input type="tel" className="primary" placeholder="Numero de telephone" value={selectedAgent.telephone} onChange={(e) => setSelectedAgent({ ...selectedAgent, telephone: e.target.value, })} />
                    </div>
                  </div>
                </ViewModal>

                <EditModal onOpen={() => load_edit_agent(a.NIN, a.nom, a.prenom, a.date_naissance, a.lieu_naissance, a.sexe, a.email, a.telephone)} onEdit={() => edit_agent(a.NIN)} onCancel={() => console.log("Cancelled edit")}>
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title" >
                    Modifier agent
                  </h3>
                  <p className="text-gray-600">
                    Veuillez changer les informations que vous désirez
                  </p>
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-12">
                      <label className="text-sm font-semibold">NIN</label>
                      <input type="text" className="primary" placeholder="NIN" value={selectedAgent.NIN} onChange={(e) => setSelectedAgent({ ...selectedAgent, NIN: e.target.value })} />
                    </div>
                    <div className="col-span-6">
                      <label className="text-sm font-semibold">Nom </label>
                      <input type="text" className="primary" placeholder="Nom" value={selectedAgent.nom} onChange={(e) => setSelectedAgent({ ...selectedAgent, nom: e.target.value })} />
                    </div>
                    <div className="col-span-6">
                      <label className="text-sm font-semibold">Prénom </label>
                      <input type="text" className="primary" placeholder="Prenom" value={selectedAgent.prenom} onChange={(e) => setSelectedAgent({ ...selectedAgent, prenom: e.target.value })} />
                    </div>
                    <div className="col-span-6">
                      <label className="text-sm font-semibold">Date de naissance </label>
                      <input type="date" className="primary" placeholder="Date de naissance" value={moment(selectedAgent.date_naissance).format('YYYY-MM-DD')} onChange={(e) => setSelectedAgent({ ...selectedAgent, date_naissance: e.target.valueAsDate! })} />
                    </div>
                    <div className="col-span-6">
                      <label className="text-sm font-semibold">Lieu de naissance </label>
                      <input type="text" className="primary" placeholder="Lieu de naissance" value={selectedAgent.lieu_naissance} onChange={(e) => setSelectedAgent({ ...selectedAgent, lieu_naissance: e.target.value })} />
                    </div>
                    <div className="col-span-6">
                      <label className="text-sm font-semibold">Sexe </label>
                      <select onChange={(e) => setSelectedAgent({ ...selectedAgent, sexe: e.target.value })} >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div className="col-span-12">
                      <label className="text-sm font-semibold">Email </label>
                      <input type="email" className="primary" placeholder="Email" value={selectedAgent.email} onChange={(e) => setSelectedAgent({ ...selectedAgent, email: e.target.value, })} />
                    </div>
                    <div className="col-span-12">
                      <label className="text-sm font-semibold">Numero de téléphone </label>
                      <input type="tel" className="primary" placeholder="Numero de telephone" value={selectedAgent.telephone} onChange={(e) => setSelectedAgent({ ...selectedAgent, telephone: e.target.value, })} />
                    </div>
                  </div>
                </EditModal>

                <DeleteModal onDelete={() => delete_agent(a.NIN)} onCancel={() => console.log("Cancelled delete")}>
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title" >
                    Supprimer l'agent "{a.nom} {a.prenom}"
                  </h3>
                  <p className="text-gray-600">Êtes-vous sûr de vouloir supprimer cet enregistrement? Toutes vos données seront définitivement supprimées. Cette action ne peut pas être annulée.</p>
                </DeleteModal>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </>
  );
}

export default AgentsPage;
