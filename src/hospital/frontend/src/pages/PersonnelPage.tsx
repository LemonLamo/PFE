import { useMemo, useState } from "react";
import moment from "moment";
import Card from "../components/UI/Card";
import CreateModal from "../components/Modals/CreateModal";
import ViewModal from "../components/Modals/ViewModal";
import EditModal from "../components/Modals/EditModal";
import DeleteModal from "../components/Modals/DeleteModal";
import { ColumnDef } from "@tanstack/react-table";
import ViewButton from "../components/Buttons/ViewButton";
import DeleteButton from "../components/Buttons/DeleteButton";
import EditButton from "../components/Buttons/EditButton";
import DataTable from "../components/UI/Tables/DataTable";
import { useQuery } from "@tanstack/react-query";
import Button from "../components/Buttons/Button";
import axios from "axios";
import { baseURL } from "../hooks";

function PersonnelPage() {
  const [selectedAgent, setSelectedAgent] = useState<Personnel>({
    NIN: "",
    nom: "",
    prenom: "",
    nom_user: "",
    date_de_naissance: new Date(),
    lieu_de_naissance: "",
    sexe: "",
    email: "",
    telephone: "",
    fonction: "",
    specialite: "",
    grade: "",
    adresse: "",
    code_postale: 0,
    commune: "",
    wilaya: "",
  });
  const [openModal, setOpenModal] = useState("");
  const query = useQuery({
    queryKey: ["personnel"],
    queryFn: async () => {
      let data = (await axios.get(`${baseURL}api/personnel`)).data;
      return data;
    },
  });

  const tableDefinition = useMemo(
    () => [
      {
        header: "Profile",
        id: "profile",
        cell: (info) => {
          const p = info.row.original;
          return (
            <div className="flex w-68">
              <img
                className="rounded-full w-12 me-2"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              ></img>
              <div>
                <h6 className="mb-0">
                  {p.nom} {p.prenom}
                </h6>
                <p className="mb-0 font-semibold mt-[-0.4rem]">NIN: {p.NIN}</p>
              </div>
            </div>
          );
        },
      },
      { header: "Nom d'utilisateur", accessorKey: "nom_user" },
      { header: "Fonction", accessorKey: "fonction" },
      { header: "Spécialité", accessorKey: "specialite" },
      { header: "Grade", accessorKey: "grade" },
      { header: "Email", accessorKey: "email" },
      { header: "Telephone", accessorKey: "telephone" },
      {
        header: "",
        id: "actions",
        cell: (info) => {
          const a = info.row.original;
          return (
            <div className="flex justify-end gap-2">
              <ViewButton
                onClick={() => {
                  setSelectedAgent(a);
                  setOpenModal("view");
                }}
              />
              <EditButton
                onClick={() => {
                  setSelectedAgent(a);
                  setOpenModal("edit");
                }}
              />
              <DeleteButton
                onClick={() => {
                  setSelectedAgent(a);
                  setOpenModal("delete");
                }}
              />
            </div>
          );
        },
      },
    ],
    []
  ) as ColumnDef<Personnel>[];

  async function createAgent() {
    try {
      await axios.post(`${baseURL}api/personnel`, selectedAgent);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async function editAgent() {
    try {
      const data = {
        NIN: selectedAgent.NIN,
        email: selectedAgent.email,
        telephone: selectedAgent.telephone,
        fonction: selectedAgent.fonction,
        specialite: selectedAgent.specialite,
        grade: selectedAgent.grade,
        adresse: selectedAgent.adresse,
        code_postale: selectedAgent.code_postale,
        commune: selectedAgent.commune,
        wilaya: selectedAgent.wilaya,
      };
      await axios.put(`${baseURL}api/personnel`, data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteAgent() {
    try {
      await axios.delete(`${baseURL}api/personnel/${selectedAgent.NIN}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const action = (
    <Button onClick={() => setOpenModal("create")} type="primary">
      <i className="fa fa-plus" />
      <span className="ms-2">Ajouter</span>
    </Button>
  );

  return (
    <>
      <Card title="Personnel" action={action} className="w-full">
        <DataTable
          tableDefinition={tableDefinition}
          query={query}
          className="mt-2"
        />

        <CreateModal
          open={openModal === "create"}
          action={createAgent}
          close={() => setOpenModal("")}
        >
          <h3
            className="text-lg font-semibold leading-6 text-gray-900 mb-3"
            id="modal-title"
          >
            Créer un nouveau personnel
          </h3>
          <p className="text-gray-600">
            Veuillez remplir les informations nécessaires
          </p>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12">
              <label className="text-sm font-semibold">NIN</label>
              <input
                type="text"
                className="primary"
                placeholder="NIN"
                value={selectedAgent.NIN}
                onChange={(e) =>
                  setSelectedAgent({ ...selectedAgent, NIN: e.target.value })
                }
              />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Nom </label>
              <input
                type="text"
                className="primary"
                placeholder="Nom"
                value={selectedAgent.nom}
                onChange={(e) =>
                  setSelectedAgent({ ...selectedAgent, nom: e.target.value })
                }
              />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Prénom </label>
              <input
                type="text"
                className="primary"
                placeholder="Prenom"
                value={selectedAgent.prenom}
                onChange={(e) =>
                  setSelectedAgent({ ...selectedAgent, prenom: e.target.value })
                }
              />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Nom d'utilisateur</label>
              <input
                type="text"
                className="primary"
                placeholder="Nom d'utilisateur"
                value={selectedAgent.nom_user}
                onChange={(e) =>
                  setSelectedAgent({
                    ...selectedAgent,
                    nom_user: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Sexe </label>
              <select
                onChange={(e) =>
                  setSelectedAgent({ ...selectedAgent, sexe: e.target.value })
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">
                Date de naissance{" "}
              </label>
              <input
                type="date"
                className="primary"
                placeholder="Date de naissance"
                value={moment(selectedAgent.date_de_naissance).format(
                  "YYYY-MM-DD"
                )}
                onChange={(e) =>
                  setSelectedAgent({
                    ...selectedAgent,
                    date_de_naissance: e.target.valueAsDate!,
                  })
                }
              />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Lieu de naissance</label>
              <input
                type="text"
                className="primary"
                placeholder="Lieu de naissance"
                value={selectedAgent.lieu_de_naissance}
                onChange={(e) =>
                  setSelectedAgent({
                    ...selectedAgent,
                    lieu_de_naissance: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-span-12">
              <label className="text-sm font-semibold">Email </label>
              <input
                type="email"
                className="primary"
                placeholder="Email"
                value={selectedAgent.email}
                onChange={(e) =>
                  setSelectedAgent({ ...selectedAgent, email: e.target.value })
                }
              />
            </div>
            <div className="col-span-12">
              <label className="text-sm font-semibold">
                Numero de téléphone{" "}
              </label>
              <input
                type="tel"
                className="primary"
                placeholder="Numero de telephone"
                value={selectedAgent.telephone}
                onChange={(e) =>
                  setSelectedAgent({
                    ...selectedAgent,
                    telephone: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-12">
              <label className="text-sm font-semibold"> Fonction</label>
              <input
                type="text"
                className="primary"
                placeholder="Fonction"
                value={selectedAgent.fonction}
                onChange={(e) =>
                  setSelectedAgent({
                    ...selectedAgent,
                    fonction: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold"> Spécialité</label>
              <input
                type="text"
                className="primary"
                placeholder="Spécialité"
                value={selectedAgent.specialite}
                onChange={(e) =>
                  setSelectedAgent({
                    ...selectedAgent,
                    specialite: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold"> Grade</label>
              <input
                type="text"
                className="primary"
                placeholder="Grade"
                value={selectedAgent.grade}
                onChange={(e) =>
                  setSelectedAgent({
                    ...selectedAgent,
                    grade: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-12">
              <label className="text-sm font-semibold"> Adresse</label>
              <input
                type="text"
                className="primary"
                placeholder="Adresse"
                value={selectedAgent.adresse}
                onChange={(e) =>
                  setSelectedAgent({
                    ...selectedAgent,
                    adresse: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold"> Commune</label>
              <input
                type="text"
                className="primary"
                placeholder="Fonction"
                value={selectedAgent.commune}
                onChange={(e) =>
                  setSelectedAgent({
                    ...selectedAgent,
                    commune: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold"> Wilaya</label>
              <input
                type="text"
                className="primary"
                placeholder="wilaya"
                value={selectedAgent.wilaya}
                onChange={(e) =>
                  setSelectedAgent({
                    ...selectedAgent,
                    wilaya: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold"> Code postal </label>
              <input
                type="number"
                className="primary"
                placeholder="Code postal"
                value={selectedAgent.code_postale}
                onChange={(e) =>
                  setSelectedAgent({
                    ...selectedAgent,
                    code_postale: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>
        </CreateModal>

        <ViewModal open={openModal === "view"} close={() => setOpenModal("")}>
          <h3
            className="text-lg font-semibold leading-6 text-gray-900 mb-3"
            id="modal-title"
          >
            Détail personnel
          </h3>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12">
              <label className="text-sm font-semibold">NIN</label>
              <input
                type="text"
                className="primary"
                placeholder="NIN"
                disabled
                value={selectedAgent.NIN}
              />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Nom </label>
              <input
                type="text"
                className="primary"
                placeholder="Nom"
                disabled
                value={selectedAgent.nom}
              />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Prénom </label>
              <input
                type="text"
                className="primary"
                placeholder="Prenom"
                disabled
                value={selectedAgent.prenom}
              />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">
                Nom d'utilisateur{" "}
              </label>
              <input
                type="text"
                className="primary"
                placeholder="Prenom"
                disabled
                value={selectedAgent.nom_user}
              />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Sexe </label>
              <input
                type="text"
                className="primary"
                placeholder="Sexe"
                disabled
                value={selectedAgent.sexe}
              />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Date de naissance</label>
              <input
                type="date"
                className="primary"
                placeholder="Date de naissance"
                disabled
                value={moment(selectedAgent.date_de_naissance).format(
                  "YYYY-MM-DD"
                )}
              />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Lieu de naissance</label>
              <input
                type="text"
                className="primary"
                placeholder="Lieu de naissance"
                disabled
                value={selectedAgent.lieu_de_naissance}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-4">
              <label className="text-sm font-semibold">Fonction</label>
              <input
                type="text"
                className="primary"
                placeholder="fonction"
                disabled
                value={selectedAgent.fonction}
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">Specialité</label>
              <input
                type="text"
                className="primary"
                placeholder="specialité"
                disabled
                value={selectedAgent.specialite}
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">Grade</label>
              <input
                type="text"
                className="primary"
                placeholder="grade"
                disabled
                value={selectedAgent.grade}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12">
              <label className="text-sm font-semibold">Email </label>
              <input
                type="email"
                className="primary"
                placeholder="Email"
                value={selectedAgent.email}
                disabled
              />
            </div>
            <div className="col-span-12">
              <label className="text-sm font-semibold">
                Numero de téléphone
              </label>
              <input
                type="tel"
                className="primary"
                placeholder="Numero de telephone"
                disabled
                value={selectedAgent.telephone}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12">
              <label className="text-sm font-semibold">Adresse</label>
              <input
                type="text"
                className="primary"
                placeholder="adresse"
                disabled
                value={selectedAgent.adresse}
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">Commune</label>
              <input
                type="text"
                className="primary"
                placeholder="commune"
                disabled
                value={selectedAgent.commune}
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">Wilaya</label>
              <input
                type="text"
                className="primary"
                placeholder="wilaya"
                disabled
                value={selectedAgent.wilaya}
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">Code postal</label>
              <input
                type="text"
                className="primary"
                placeholder="code postal"
                disabled
                value={selectedAgent.code_postale}
              />
            </div>
          </div>
        </ViewModal>

        <EditModal
          open={openModal === "edit"}
          action={editAgent}
          close={() => setOpenModal("")}
        >
          <h3
            className="text-lg font-semibold leading-6 text-gray-900 mb-3"
            id="modal-title"
          >
            Modifier personnel
          </h3>
          <p className="text-gray-600">
            Veuillez changer les informations que vous désirez
          </p>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12">
              <label className="text-sm font-semibold">NIN</label>
              <input
                type="text"
                className="primary"
                placeholder="NIN"
                value={selectedAgent.NIN}
                disabled
              />
            </div>
            <div className="col-span-12">
              <label className="text-sm font-semibold">Email </label>
              <input
                type="email"
                className="primary"
                placeholder="Email"
                value={selectedAgent.email}
                onChange={(e) =>
                  setSelectedAgent({ ...selectedAgent, email: e.target.value })
                }
              />
            </div>
            <div className="col-span-12">
              <label className="text-sm font-semibold">
                Numero de téléphone
              </label>
              <input
                type="tel"
                className="primary"
                placeholder="Numero de telephone"
                value={selectedAgent.telephone}
                onChange={(e) =>
                  setSelectedAgent({
                    ...selectedAgent,
                    telephone: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-12">
              <label className="text-sm font-semibold">Fonction</label>
              <input
                type="text"
                className="primary"
                placeholder="fonction"
                value={selectedAgent.fonction}
                onChange={(e) =>
                  setSelectedAgent({
                    ...selectedAgent,
                    fonction: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Spécialité</label>
              <input
                type="text"
                className="primary"
                placeholder="specialite"
                value={selectedAgent.specialite}
                onChange={(e) =>
                  setSelectedAgent({
                    ...selectedAgent,
                    specialite: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Grade</label>
              <input
                type="text"
                className="primary"
                placeholder="grade"
                value={selectedAgent.grade}
                onChange={(e) =>
                  setSelectedAgent({
                    ...selectedAgent,
                    grade: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-12">
              <label className="text-sm font-semibold">Adresse</label>
              <input
                type="text"
                className="primary"
                placeholder="grade"
                value={selectedAgent.adresse}
                onChange={(e) =>
                  setSelectedAgent({
                    ...selectedAgent,
                    adresse: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">Commune</label>
              <input
                type="text"
                className="primary"
                placeholder="wilaya"
                value={selectedAgent.commune}
                onChange={(e) =>
                  setSelectedAgent({
                    ...selectedAgent,
                    commune: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">Wilaya</label>
              <input
                type="text"
                className="primary"
                placeholder="wilaya"
                value={selectedAgent.wilaya}
                onChange={(e) =>
                  setSelectedAgent({
                    ...selectedAgent,
                    wilaya: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">Code postal</label>
              <input
                type="number"
                className="primary"
                placeholder="code postal"
                value={selectedAgent.code_postale}
                onChange={(e) =>
                  setSelectedAgent({
                    ...selectedAgent,
                    code_postale: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>
        </EditModal>

        <DeleteModal
          open={openModal === "delete"}
          action={deleteAgent}
          close={() => setOpenModal("")}
        >
          <h3
            className="text-lg font-semibold leading-6 text-gray-900 mb-3"
            id="modal-title"
          >
            Supprimer le personnel "{selectedAgent.nom} {selectedAgent.prenom}"
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

export default PersonnelPage;
