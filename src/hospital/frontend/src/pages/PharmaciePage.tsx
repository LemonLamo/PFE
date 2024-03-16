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
import TableLoading from "../components/UI/Tables/TableLoading";
import TableError from "../components/UI/Tables/TableError";
import axios, { AxiosError } from "axios";
import moment from "moment";
import DataTable from "../components/UI/Tables/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import ViewButton from "../components/Buttons/ViewButton";
import DeleteButton from "../components/Buttons/DeleteButton";
import dictionnaire_medicaments from "../codifications/medicaments.json";
import Button from "../components/Buttons/Button";
import { useQuery } from "@tanstack/react-query";

const build_badge = (qte: number) => {
  if (qte >= 10)
    return (
      <Badge bgColor="#dcfce7" textColor="#267142">
        <CheckCircleIcon className="h-4 mr-1" />
        En stock
      </Badge>
    );
  else if (qte > 0)
    return (
      <Badge bgColor="#fdba74" textColor="#9a3412">
        <ExclamationTriangleIcon className="h-4 mr-1" />
        Près de repture
      </Badge>
    );
  else
    return (
      <Badge bgColor="#fee2e2" textColor="#991b1b">
        <ExclamationTriangleIcon className="h-4 mr-1" />
        Repture de stock
      </Badge>
    );
};

function PharmacyPage() {
  const [selectedMedicament, setSelectedMedicament] = useState<Medicament>({ code: "", nom: "", quantite: 0 });
  const [openModal, setOpenModal] = useState('');
  const query = useQuery<Medicament[]>({
    queryKey: ['medicaments'],
    queryFn: async () => {
      let data = (await axios.get('http://localhost:8080/api/medicaments/')).data;
      return data;
    }
  });
  const query2 = useQuery<Transaction[]>({
    queryKey: ['transactions', selectedMedicament.code],
    queryFn: async () => {
      let data = (await axios.get(`http://localhost:8080/api/medicaments/${selectedMedicament.code}/transactions`)).data;
      return data;
    }
  });

  const tableDefinition = useMemo(
    () => [
      { header: "Code", accessorKey: "code" },
      { header: "Nom", accessorKey: "nom" },
      { header: "Quantité en stock", accessorKey: "quantite" },
      {
        header: "Niveau de disponibilité",
        id: "badge",
        cell: (info) => build_badge(info.row.original.quantite!),
      },
      {
        header: "",
        id: "actions",
        cell: (info) => {
          const m = info.row.original;
          return (
            <div className="flex justify-end gap-2">
              <ViewButton
                onClick={() => {
                  setSelectedMedicament(m);
                  setOpenModal("view");
                }}
              />
              <DeleteButton
                onClick={() => {
                  setSelectedMedicament(m);
                  setOpenModal("delete");
                }}
              />
            </div>
          );
        },
      },
    ],
    []
  ) as ColumnDef<Medicament>[];

  function select_medicament({ key, value }: { key: string; value: string }) {
    setSelectedMedicament({ ...selectedMedicament, code: key, nom: value });
  }

  async function updateMedicamentQuantite(AddOrSubstract = 1) {
    const code = selectedMedicament.code;
    const quantite = AddOrSubstract * selectedMedicament.quantite!;
    try {
      await axios.put(`http://localhost:8080/api/medicaments/${code}`, {
        code: code,
        quantite: quantite,
      });
      query.refetch();
      query2.refetch();
      setOpenModal("");
    } catch (err: AxiosError | any) {
      if (err.response)
        alert(err.response.data.errorCode + " - " + err.response.data.errorMessage);
      else alert("Network error!");
    }
  }

  async function deleteMedicament() {
    try {
      await axios.delete(
        `http://localhost:8080/api/medicaments/${selectedMedicament.code}`
      );
      query.refetch();
      setOpenModal("");
    } catch (err: AxiosError | any) {
      if (err.response)
        alert(
          err.response.data.errorCode + " - " + err.response.data.errorMessage
        );
      else alert("Network error!");
    }
  }

  const actions = (
    <div className="flex gap-2">
      <Button type="success" onClick={() => setOpenModal("plus")}>
        <i className="fa fa-plus" />
        <span className="ms-2">Ajouter</span>
      </Button>

      <Button type="danger" onClick={() => setOpenModal("minus")}>
        <i className="fa fa-plus" />
        <span className="ms-2">Retirer</span>
      </Button>
    </div>
  );

  return (
    <>
      <Card title="Gestion des médicaments" action={actions} className="w-full">
        <DataTable
          tableDefinition={tableDefinition}
          query={query}
          className="mt-2"
        />

        <RemplirModal
          open={openModal === "plus"}
          close={() => setOpenModal("")}
          action={() => updateMedicamentQuantite(1)}
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
          open={openModal === "minus"}
          close={() => setOpenModal("")}
          action={() => updateMedicamentQuantite(-1)}
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

        <ViewModal open={openModal === "view"} close={() => setOpenModal("")}>
          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3">
            Détails sur "{selectedMedicament.nom} ({selectedMedicament.code})"
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
          </div>

          <h6 className="mt-4 mb-1"> Liste des transactions </h6>
          {query2.isError ? (
            <div className="block w-full ">
              {" "}
              <TableError />{" "}
            </div>
          ) : query2.isLoading ? (
            <div className="block w-full ">
              {" "}
              <TableLoading />{" "}
            </div>
          ) : (
            <Table
              fields={["#", "Date", "Avant", "Après", "Différence"]}
              className="mb-4 col-span-12 max-h-72"
            >
              {query2.data?.map((t, i) => (
                <TableRow key={i}>
                  <TableCell className="font-bold">{i + 1}</TableCell>
                  <TableCell>
                    {moment(t.date).format("DD/MM/YYYY HH:mm")}
                  </TableCell>
                  <TableCell>{t.avant}</TableCell>
                  <TableCell>{t.avant + t.difference}</TableCell>
                  <TableCell
                    className={`${
                      t.difference > 0 ? "text-green-500" : "text-red-500"
                    } font-bold`}
                  >
                    {t.difference}
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          )}
        </ViewModal>

        <DeleteModal
          open={openModal === "delete"}
          close={() => setOpenModal("")}
          action={deleteMedicament}
        >
          <h3
            className="text-lg font-semibold leading-6 text-gray-900 mb-3"
            id="modal-title"
          >
            Supprimer le médicament "{selectedMedicament.nom} (
            {selectedMedicament.code})"
          </h3>
          <p className="text-gray-600">
            Êtes-vous sûr de vouloir supprimer cet enregistrement? Toutes vos
            données seront définitivement supprimées. Cette action ne peut pas
            être annulée.
          </p>
        </DeleteModal>
      </Card>
    </>
  );
}

export default PharmacyPage;
