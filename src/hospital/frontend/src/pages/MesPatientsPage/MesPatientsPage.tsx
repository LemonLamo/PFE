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

function MesPatientsPage() {
  const [selectedPatient, setSelectedPatient] = useState<Patient>({
    NIN: "",
    nom: "",
    prenom: "",
    date_naissance: "",
    lieu_naissance: "",
    email: "",
    telephone: "",
  });

  function create_patient() {
    console.log("Creating new patient");
    // use state variable to submit agent data
  }

  function view_patient(NIN: string) {
    // use NIN to get the agent data into the state variable
    console.log(`Viewing patient ${NIN}`);
    setSelectedPatient((v) => ({ ...v, NIN: NIN }));
  }

  function load_edit_patient(NIN: string) {
    console.log(`Loading information for edit modal ${NIN}`);
    // use NIN to get the agent data into the state variable
  }

  function edit_patient(NIN: string) {
    alert(`Editing patient ${NIN}`);
  }

  function delete_patient(NIN: string) {
    alert(`Deleting patient ${NIN}`);
    // do actual delete
  }

  const createModal = (
    <>
      <CreateModal
        onCreate={create_patient}
        onCancel={() => console.log("Cancelled create")}
      >
        <h3
          className="text-lg font-semibold leading-6 text-gray-900 mb-3"
          id="modal-title"
        >
          Create patient
        </h3>
        <p className="text-gray-600">
          Remplissez ce formulaire pour ajouter un nouveau patient
        </p>
        <div className="col-span-4 mb-2">
          <label className="text-sm font-semibold">NIN </label>
          <input
            type="text"
            className="primary"
            placeholder="NIN"
            value={selectedPatient.NIN}
            onChange={(e) =>
              setSelectedPatient({
                ...selectedPatient,
                NIN: e.target.value,
              })
            }
          />
        </div>
        <div className="col-span-6 mb-2">
          <label className="text-sm font-semibold">Nom </label>
          <input
            type="text"
            className="primary"
            placeholder="Nom"
            value={selectedPatient.nom}
            onChange={(e) =>
              setSelectedPatient({
                ...selectedPatient,
                nom: e.target.value,
              })
            }
          />
        </div>
        <div className="col-span-4 mb-2">
          <label className="text-sm font-semibold">Prénom </label>
          <input
            type="text"
            className="primary"
            placeholder="Prenom"
            value={selectedPatient.prenom}
            onChange={(e) =>
              setSelectedPatient({
                ...selectedPatient,
                prenom: e.target.value,
              })
            }
          />
        </div>
        <div className="col-span-6 mb-2">
          <label className="text-sm font-semibold">Date de naissance </label>
          <input
            type="date"
            className="primary"
            placeholder="Date"
            value={selectedPatient.date_naissance}
            onChange={(e) =>
              setSelectedPatient({
                ...selectedPatient,
                date_naissance: e.target.value,
              })
            }
          />
        </div>
        <div className="col-span-6 mb-2">
          <label className="text-sm font-semibold">Lieu de naissance </label>
          <input
            type="text"
            className="primary"
            placeholder="Lieu"
            value={selectedPatient.lieu_naissance}
            onChange={(e) =>
              setSelectedPatient({
                ...selectedPatient,
                lieu_naissance: e.target.value,
              })
            }
          />
        </div>
        <div className="col-span-6 mb-2">
          <label className="text-sm font-semibold">Email</label>
          <input
            type="text"
            className="primary"
            placeholder="Email"
            value={selectedPatient.email}
            onChange={(e) =>
              setSelectedPatient({
                ...selectedPatient,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="col-span-6 mb-2">
          <label className="text-sm font-semibold">Téléphone</label>
          <input
            type="text"
            className="primary"
            placeholder="Téléphone"
            value={selectedPatient.telephone}
            onChange={(e) =>
              setSelectedPatient({
                ...selectedPatient,
                telephone: e.target.value,
              })
            }
          />
        </div>
      </CreateModal>
    </>
  );
  const patients = useMemo<Patient[]>(() => {
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

  return (
    <Card
      title="Liste des patients"
      subtitle="Une liste de tous les patients du service"
      className="w-full"
      // action={createModal}
    >
      <Table
        fields={[
          "NIN",
          "Nom",
          "Prénom",
          "Date et lieu de naissance",
          "Téléphone",
          "Email",
          "",
        ]}
      >
        {patients.map((a, i) => (
          <TableRow>
            <TableCell className="pe-3 py-2">{a.NIN} </TableCell>
            <TableCell className="pe-3 py-2"> {a.nom} </TableCell>
            <TableCell className="pe-3 py-2"> {a.prenom} </TableCell>
            <TableCell className="pe-3 py-2">
              {" "}
              {moment(a.date_naissance).format("DD/MM/YYYY")},{" "}
              {a.lieu_naissance}{" "}
            </TableCell>
            <TableCell className="pe-3 py-2"> {a.telephone} </TableCell>
            <TableCell className="pe-3 py-2"> {a.email} </TableCell>
            <TableCell className="flex justify-end gap-2">
              <ViewModal onOpen={() => view_patient(a.NIN)}>
                <h3
                  className="text-lg font-semibold leading-6 text-gray-900 mb-3"
                  id="modal-title"
                >
                  View patient
                </h3>
                <form>
                  <input type="text" value={selectedPatient.NIN}></input>
                </form>
              </ViewModal>

              <EditModal
                onOpen={() => load_edit_patient(a.NIN)}
                onEdit={() => edit_patient(a.NIN)}
                onCancel={() => console.log("Cancelled edit")}
              >
                <h3
                  className="text-lg font-semibold leading-6 text-gray-900 mb-3"
                  id="modal-title"
                >
                  Edit patient
                </h3>
                <p className="text-gray-600">Here is some more more info.</p>
              </EditModal>

              <DeleteModal
                onDelete={() => delete_patient(a.NIN)}
                onCancel={() => console.log("Cancelled delete")}
              >
                <h3
                  className="text-lg font-semibold leading-6 text-gray-900 mb-3"
                  id="modal-title"
                >
                  Delete patient
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

export default MesPatientsPage;
