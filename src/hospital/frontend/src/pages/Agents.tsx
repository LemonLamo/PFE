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

function Agents() {
  const agents = useMemo<Agent[]>(() => {
    let data = [
      { NIN: "1302893", nom: "NADIL", prenom: "Marwa", birthday: new Date(), sexe: "Female", addresse: "39 HAI MOUHOUS", telephone: "0799771062" },
      { NIN: "1302894", nom: "NADIL", prenom: "Marwa", birthday: new Date(), sexe: "Male", addresse: "39 HAI MOUHOUS", telephone: "0799771062" }
    ];
    return data
  }, []);
  const [selectedAgent, setSelectedAgent] = useState<Agent>({ NIN: "", nom: "", prenom: "", birthday: new Date(), sexe: "Male", addresse: "", telephone: "" });

  function create_agent() {
    console.log("Creating new agent")
    // use state variable to submit agent data
  }

  function view_agent(NIN : string){
    // use NIN to get the agent data into the state variable
    console.log(`Viewing agent ${NIN}`)
    setSelectedAgent(v => ({...v, nom: "Brahim" }))
  }

  function load_edit_agent(NIN: string) {
    console.log(`Loading information for edit modal ${NIN}`);
    // use NIN to get the agent data into the state variable
  }
  function edit_agent(NIN: string) {
    alert(`Editing agent ${NIN}`);
  }

  function load_delete_agent(NIN: string) {
    console.log(`Loading information for delete modal ${NIN}`);
    // set NIN into the state variable
  }
  function delete_agent(NIN : string) {
    alert(`Deleting agent ${NIN}`)
    // do actual delete
  }

  const createModal = <>
    <CreateModal onCreate={create_agent} onCancel={() => console.log("Cancelled create")}>
      <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Create agent</h3>
      <p className="text-gray-600">Here is the form.</p>
    </CreateModal>
  </>

  return (
    <>
      <Card title="Agents" action={createModal}>
        <Table fields={["NIN", "Nom", "Prénom", "Date de naissance", "Sexe", "Adresse", "Numero de telephone", "" ]}>
          { agents.map((a) => (
            <TableRow>
              <TableCell> {a.NIN} </TableCell>
              <TableCell> {a.nom} </TableCell>
              <TableCell> {a.prenom} </TableCell>
              <TableCell> {moment(a.birthday).format('DD/MM/YYYY')} </TableCell>
              <TableCell> {a.sexe} </TableCell>
              <TableCell> {a.addresse} </TableCell>
              <TableCell> {a.telephone} </TableCell>

              <TableCell className="flex justify-end gap-2">
                <ViewModal onOpen={() => view_agent(a.NIN)}>
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">View agent</h3>
                  <form>
                    <input type="text" value={selectedAgent.nom}></input>
                  </form>
                </ViewModal>

                <EditModal onOpen={() => load_edit_agent(a.NIN)} onEdit={() => edit_agent(a.NIN)} onCancel={() => console.log("Cancelled edit")}>
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Edit agent</h3>
                  <p className="text-gray-600">Here is some more more info.</p>
                </EditModal>

                <DeleteModal onOpen={() => load_delete_agent(a.NIN)} onDelete={() => delete_agent(a.NIN)} onCancel={() => console.log("Cancelled delete")}>
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Delete Agent</h3>
                  <p className="text-gray-600">Are you sure you want to delete this record? All of your data will be permanently removed. This action cannot be undone.</p>
                </DeleteModal>
              </TableCell>
            </TableRow>
          )) }
        </Table>
      </Card>
    </>
  );
}

export default Agents;
