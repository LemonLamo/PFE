import { useMemo, useState } from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Card from "../components/UI/Card";
import Table from "../components/UI/Tables/Table";
import TableRow from "../components/UI/Tables/TableRow";
import TableCell from "../components/UI/Tables/TableCell";
import Select from "../components/Select";
import Badge from "../components/UI/Badge";
import RemplirModal from "../components/Modals/RemplirModal";
import DepenserModal from "../components/Modals/DepenserModal";
import ViewModal from "../components/Modals/ViewModal";
import DeleteModal from "../components/Modals/DeleteModal";

function Medicaments() {
  const medicaments = useMemo<StockMedicament[]>(() => {
    let data = [
      { code: "PC123", nom: "Paracétamol", quantite: 5 },
      { code: "PC124", nom: "Paracétamol", quantite: 10 },
      { code: "PC125", nom: "Paracétamol", quantite: 0 },
    ];
    return data;
  }, []);
  const dictionnaire_medicaments = medicaments.map((f) => ({
    key: f.code,
    value: f.nom,
  }));
  const [selectedMedicament, setSelectedMedicament] = useState<StockMedicament>(
    { code: "", nom: "", quantite: 0 }
  );

  function view_medicament(code: string) {
    // use NIN to get the medicament data into the state variable
    console.log(`Viewing medicament ${code}`);
    setSelectedMedicament((m) => ({
      ...m,
      code: code,
      nom: "Paracétamol",
      quantite: 5,
    }));
  }

  function update_quantite_medicament() {
    console.log("Updating quantity medicament");
    // use state variable to submit medicament data
  }

  function delete_medicament(code: string) {
    console.log(`Removing medicament ${code}`);
  }

  function build_badge(qte: number) {
    if (qte >= 10)
      return (
        <Badge bgColor="#dcfce7" textColor="#267142">
          <CheckCircleIcon className="h-[2vh] mr-1" />
          En stock
        </Badge>
      );
    else if (qte > 0)
      return (
        <Badge bgColor="#fdba74" textColor="#9a3412">
          <ExclamationTriangleIcon className="h-[2vh] mr-1" />
          Près de repture
        </Badge>
      );
    else
      return (
        <Badge bgColor="#fee2e2" textColor="#991b1b">
          <ExclamationTriangleIcon className="h-[2vh] mr-1" />
          Repture de stock
        </Badge>
      );
  }

  function select_medicament({ key, value }: { key: string; value: string }) {
    setSelectedMedicament({ ...selectedMedicament, code: key, nom: value });
  }

  const createModal = (
    <div className="flex gap-2">
      <RemplirModal
        onAdd={update_quantite_medicament}
        onCancel={() => console.log("Cancelled create")}
      >
        <h3
          className="text-lg font-semibold leading-6 text-gray-900 mb-3"
          id="modal-title"
        >
          Remplir un médicament
        </h3>
        <p className="text-gray-600">
          Remplissez ce formulaire pour ajouter une prescription à la
          consultation courante.
        </p>
        <div className="mb-2">
          <label className="text-sm font-semibold">Code:</label>
          <Select
            options={dictionnaire_medicaments}
            placeholder="Médicament"
            onChange={select_medicament}
            state={{
              key: selectedMedicament.code,
              value: selectedMedicament.nom!,
            }}
          />
        </div>
        <div className="col-span-4 mb-2">
          <label className="text-sm font-semibold">Quantité à ajouter:</label>
          <input
            type="number"
            className="primary"
            placeholder="Qte"
            value={selectedMedicament.quantite}
            onChange={(e) =>
              setSelectedMedicament({
                ...selectedMedicament,
                quantite: e.target.valueAsNumber,
              })
            }
          />
        </div>
      </RemplirModal>
      <DepenserModal
        onSubstract={update_quantite_medicament}
        onCancel={() => console.log("Cancelled create")}
      >
        <h3
          className="text-lg font-semibold leading-6 text-gray-900 mb-3"
          id="modal-title"
        >
          Consommer un médicament
        </h3>
        <p className="text-gray-600">
          Remplissez ce formulaire pour ajouter une prescription à la
          consultation courante.
        </p>
        <div className="mb-2">
          <label className="text-sm font-semibold">Code:</label>
          <Select
            options={dictionnaire_medicaments}
            placeholder="Médicament"
            onChange={select_medicament}
            state={{
              key: selectedMedicament.code,
              value: selectedMedicament.nom!,
            }}
          />
        </div>
        <div className="col-span-4 mb-2">
          <label className="text-sm font-semibold">Quantité à retirer:</label>
          <input
            type="number"
            className="primary"
            placeholder="Qte"
            value={selectedMedicament.quantite}
            onChange={(e) =>
              setSelectedMedicament({
                ...selectedMedicament,
                quantite: e.target.valueAsNumber,
              })
            }
          />
        </div>
      </DepenserModal>
    </div>
  );

  return (
    <>
      <Card title="Stock Medicaments" action={createModal} className="w-full">
        <Table
          fields={[
            "Code",
            "Nom",
            "Quantité en stock",
            "Niveau de disponibilité",
            "",
          ]}
        >
          {medicaments.map((m, i) => (
            <TableRow key={i}>
              <TableCell className="pe-3 py-2 font-bold"> {m.code} </TableCell>
              <TableCell className="pe-3 py-2"> {m.nom} </TableCell>
              <TableCell className="pe-3 py-2"> {m.quantite} Unités </TableCell>
              <TableCell className="pe-3 py-2">
                {" "}
                {build_badge(m.quantite)}{" "}
              </TableCell>
              <TableCell className="flex justify-end gap-2">
                <ViewModal onOpen={() => view_medicament(m.code)}>
                  <h3
                    className="text-lg font-semibold leading-6 text-gray-900 mb-3"
                    id="modal-title"
                  >
                    Détails sur "{m.nom} ({m.code})"
                  </h3>
                  <p className="text-gray-600">
                    Remplissez ce formulaire pour ajouter une prescription à la
                    consultation courante.
                  </p>
                  <div className="grid grid-cols-12 gap-x-4">
                    <div className="col-span-4 mb-2">
                      <label className="text-sm font-semibold">Code:</label>
                      <input
                        type="text"
                        className="primary"
                        placeholder="Code"
                        value={selectedMedicament.code}
                        disabled
                      />
                    </div>
                    <div className="col-span-4 mb-2">
                      <label className="text-sm font-semibold">Nom:</label>
                      <input
                        type="text"
                        className="primary"
                        placeholder="Nom"
                        value={selectedMedicament.nom}
                        disabled
                      />
                    </div>
                    <div className="col-span-4 mb-2">
                      <label className="text-sm font-semibold">
                        Quantité actuelle:
                      </label>
                      <input
                        type="number"
                        className="primary"
                        placeholder="Qte"
                        value={selectedMedicament.quantite}
                        disabled
                      />
                    </div>

                    <h6 className="mt-4 mb-1 col-span-12">
                      Liste des transactions{" "}
                    </h6>
                    <Table
                      fields={[
                        "#",
                        "Date",
                        "Type",
                        "Avant",
                        "Après",
                        "Différence",
                        "Utilisateur",
                      ]}
                      className="mb-4 col-span-12 max-h-72"
                    >
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>07/03/2024 08:00</TableCell>
                        <TableCell>Dépense</TableCell>
                        <TableCell>50</TableCell>
                        <TableCell>15</TableCell>
                        <TableCell>-35</TableCell>
                        <TableCell>@abderrazak1307</TableCell>
                      </TableRow>
                    </Table>
                  </div>
                </ViewModal>
                <DeleteModal
                  onDelete={() => delete_medicament(m.code)}
                  onCancel={() => console.log("Cancelled delete")}
                >
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">
                    Supprimer le médicament "{m.nom} ({m.code})"
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

export default Medicaments;
