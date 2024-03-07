import { useMemo, useState } from "react";
import moment from "moment";
import Card from "../../components/UI/Card";
import CreateModal from "../../components/Modals/CreateModal";
import Table from "../../components/UI/Tables/Table";
import TableRow from "../../components/UI/Tables/TableRow";
import TableCell from "../../components/UI/Tables/TableCell";
import ViewModal from "../../components/Modals/ViewModal";
import EditModal from "../../components/Modals/EditModal";
import DeleteModal from "../../components/Modals/DeleteModal";

function MesAdmisPage() {
  const [selectedPatientAdmis, setSelectedPatientAdmis] =
    useState<PatientAdmis>({
      NIN: "",
      nom: "",
      prenom: "",
      date_naissance: "",
      email: "",
      telephone: "",
    });

  function create_patientadmis() {
    console.log("Creating new patient admis");
    // use state variable to submit agent data
  }

  function view_patientadmis(NIN: string) {
    // use NIN to get the agent data into the state variable
    console.log(`Viewing patient Admis ${NIN}`);
    setSelectedPatientAdmis((v) => ({ ...v, NIN: NIN }));
  }

  function load_edit_patientadmis(NIN: string) {
    console.log(`Loading information for edit modal ${NIN}`);
    // use NIN to get the agent data into the state variable
  }

  function edit_patientadmis(NIN: string) {
    alert(`Editing patient admis ${NIN}`);
  }

  function delete_patientadmis(NIN: string) {
    alert(`Deleting patient admis ${NIN}`);
    // do actual delete
  }

  const createModal = (
    <>
      <CreateModal
        onCreate={create_patientadmis}
        onCancel={() => console.log("Cancelled create")}
      >
        <h3
          className="text-lg font-semibold leading-6 text-gray-900 mb-3"
          id="modal-title"
        >
          Create patient admis
        </h3>
        <p className="text-gray-600">Here is the form.</p>
      </CreateModal>
    </>
  );
  const patientadmis = useMemo<PatientAdmis[]>(() => {
    let data = [
      {
        NIN: "100010364027390000",
        nom: "BRAHIM",
        prenom: "Abderrazak",
        date_naissance: new Date(),
        email: "brahim.abderrazak1307@gmail.com",
        telephone: "0799771062",
      },
      {
        NIN: "111111111111111111",
        nom: "NADIL",
        prenom: "Marwa",
        date_naissance: new Date(),
        email: "nadilmarwa02@gmail.com",
        telephone: "0799771062",
      },
    ];
    return data;
  }, []);

  return (
    <Card
      title="Liste des  admis"
      subtitle="Une liste de tous les  admis"
      className="w-full"
    >
      <Table
        fields={[
          "NIN",
          "Nom",
          "Prénom",
          "Date de naissance",
          "Téléphone",
          "Email",
          "",
        ]}
      >
        {patientadmis.map((a, i) => (
          <TableRow>
            <TableCell className="pe-3 py-2">{a.NIN} </TableCell>
            <TableCell className="pe-3 py-2"> {a.nom} </TableCell>
            <TableCell className="pe-3 py-2"> {a.prenom} </TableCell>
            <TableCell className="pe-3 py-2">
              {" "}
              {moment(a.date_naissance).format("DD/MM/YYYY")},{" "}
            </TableCell>
            <TableCell className="pe-3 py-2"> {a.telephone} </TableCell>
            <TableCell className="pe-3 py-2"> {a.email} </TableCell>
            <TableCell className="flex justify-end gap-2">
              <ViewModal onOpen={() => view_patientadmis(a.NIN)}>
                <h3
                  className="text-lg font-semibold leading-6 text-gray-900 mb-3"
                  id="modal-title"
                >
                  View patient admis
                </h3>
                <form>
                  <input type="text" value={selectedPatientAdmis.NIN}></input>
                </form>
              </ViewModal>

              <EditModal
                onOpen={() => load_edit_patientadmis(a.NIN)}
                onEdit={() => edit_patientadmis(a.NIN)}
                onCancel={() => console.log("Cancelled edit")}
              >
                <h3
                  className="text-lg font-semibold leading-6 text-gray-900 mb-3"
                  id="modal-title"
                >
                  Edit patient admis
                </h3>
                <p className="text-gray-600">Here is some more more info.</p>
              </EditModal>

              <DeleteModal
                onDelete={() => delete_patientadmis(a.NIN)}
                onCancel={() => console.log("Cancelled delete")}
              >
                <h3
                  className="text-lg font-semibold leading-6 text-gray-900 mb-3"
                  id="modal-title"
                >
                  Delete patient admis
                </h3>
                <p className="text-gray-600">
                  Are you sure you want to delete this record? All of your data
                  will be permanently removed. This action cannot be undone.
                </p>
              </DeleteModal>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </Card>
  );
}

export default MesAdmisPage;
