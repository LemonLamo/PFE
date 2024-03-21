import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useMemo, useState } from "react";
import DataTable from "../UI/Tables/DataTable";
import { baseURL } from "../../hooks";
import Button from "../Buttons/Button";
import CreateModal from "../Modals/CreateModal";
import Card from "../UI/Card";
type Props = {
  NIN: string;
};

function TabMedicaments({ NIN }: Props) {
  const [selectedMedicament, setSelectedMedicament] = useState<Medicament>({
    code: "",
    nom: "",
    quantite: 0,
  });
  const [openModal, setOpenModal] = useState("");
  const medicaments = useQuery<Medicament[]>({
    queryKey: ["medicaments" + NIN],
    queryFn: async () => {
      const data = (
        await axios.get(`${baseURL}/api/patients/${NIN}/medicaments`)
      ).data;
      return data;
    },
  });
  const medicamentsTableDefinition = useMemo(
    () => [
      { header: "#", id: "index", cell: (info) => info.row.index + 1 },
      { header: "Code", accessorKey: "code_medicament" },
      { header: "Nom", accessorKey: "nom" },
      { header: "Date début", accessorKey: "date_debut" },
      { header: "Posologie", accessorKey: "posologie" },
      { header: "Fréquence", accessorKey: "frequence" },
      { header: "Durée", accessorKey: "duree" },
      { header: "Remarques", accessorKey: "remarques" },
    ],
    []
  ) as ColumnDef<Medicament>[];
  async function createMedicament() {}
  const action = (
    <Button
      onClick={() => {
        setSelectedMedicament({
          code: "",
          nom: "",
          quantite: 0,
        });
        setOpenModal("create");
      }}
      type="primary"
    >
      <i className="fa fa-plus" />
      <span className="ms-2">Ajouter</span>
    </Button>
  );
  return (
    <>
      <h3 className="text-lg mb-0">Medicaments</h3>
      <p className="mb-4">
        This is some placeholder content the Profile tab's associated content,
        clicking another tab will toggle the visibility of this one for the
        next.
      </p>
      <Card title="Medicaments" action={action} className="w-full">
        <DataTable
          tableDefinition={medicamentsTableDefinition}
          query={medicaments}
          className="mt-2"
        />

        <CreateModal
          open={openModal === "create"}
          action={createMedicament}
          close={() => {
            setSelectedMedicament({
              code: "",
              nom: "",
              quantite: 0,
            });
            setOpenModal("");
          }}
        >
          <h3
            className="text-lg font-semibold leading-6 text-gray-900 mb-3"
            id="modal-title"
          >
            Ajouter un medicaments
          </h3>
          <p className="text-gray-600">
            Remplissez ce formulaire pour ajouter une nouveau medicament
          </p>
          <div className="grid grid-cols-8 gap-2">
            <div className="col-span-8">
              <label className="text-sm font-semibold">ID</label>
              <input
                type="number"
                className="primary"
                placeholder="id"
                min="0"
                value={selectedMedicament.id}
                onChange={(e) =>
                  setSelectedMedicament({
                    ...selectedMedicament,
                    id: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">Code</label>
              <input
                type="text"
                className="primary"
                placeholder="code"
                value={selectedMedicament.code}
                onChange={(e) =>
                  setSelectedMedicament({
                    ...selectedMedicament,
                    code: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">Nom</label>
              <input
                type="text"
                className="primary"
                placeholder="nom"
                value={selectedMedicament.nom}
                onChange={(e) =>
                  setSelectedMedicament({
                    ...selectedMedicament,
                    nom: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-8">
              <label className="text-sm font-semibold">Date début</label>
              <input
                type="Date"
                className="primary"
                placeholder="date"
                value={selectedMedicament.date_debut}
                onChange={(e) =>
                  setSelectedMedicament({
                    ...selectedMedicament,
                    date_debut: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-3">
              <label className="text-sm font-semibold">Posologie</label>
              <input
                type="text"
                className="primary"
                placeholder="remarque"
                value={selectedMedicament.posologie}
                onChange={(e) =>
                  setSelectedMedicament({
                    ...selectedMedicament,
                    posologie: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-semibold">Fréquence</label>
              <input
                type="number"
                className="primary"
                placeholder="frequence"
                min="0"
                value={selectedMedicament.frequence}
                onChange={(e) =>
                  setSelectedMedicament({
                    ...selectedMedicament,
                    frequence: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-3">
              <label className="text-sm font-semibold">Durée</label>
              <input
                type="number"
                className="primary"
                placeholder="duree"
                min="0"
                value={selectedMedicament.duree}
                onChange={(e) =>
                  setSelectedMedicament({
                    ...selectedMedicament,
                    duree: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-8">
              <label className="text-sm font-semibold">Remarques</label>
              <input
                type="text"
                className="primary"
                placeholder="remarques"
                value={selectedMedicament.remarques}
                onChange={(e) =>
                  setSelectedMedicament({
                    ...selectedMedicament,
                    remarques: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </CreateModal>
      </Card>
    </>
  );
}

export default TabMedicaments;
