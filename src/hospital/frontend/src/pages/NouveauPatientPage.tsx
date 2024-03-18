import Card from "../components/UI/Card"
import Table from "../components/UI/Tables/Table"
import TableRow from "../components/UI/Tables/TableRow"
import TableCell from "../components/UI/Tables/TableCell"
import DeleteModal from "../components/Modals/DeleteModal"
import AddModal from "../components/Modals/AddModal"
import DeleteButton from "../components/Buttons/DeleteButton"
import Button from "../components/Buttons/Button"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"

function NewPatientPage() {
  const [openModal, setOpenModal] = useState('')
  const { register, handleSubmit } = useForm<Patient>()
  const onSubmit: SubmitHandler<Patient> = (data) => console.log(data)
  return (
    <Card title="Nouveau patient" subtitle="Create a new medical record" className="w-full">
      <form className="grid grid-cols-12 gap-x-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-span-4">
          <h6 className="mb-1"> Informations civiles</h6>
          <div className="mb-2">
            <label className="text-sm font-semibold">NIN:</label>
            <input type="text" className="primary" {...register('NIN')} placeholder="ex. 111111111111111111" />
          </div>
          <div className="grid grid-cols-12 gap-x-2">
            <div className="col-span-6 mb-2">
              <label className="text-sm font-semibold">Nom:</label>
              <input type="text" className="primary" {...register('nom')} placeholder="ex. Bouguerra" />
            </div>
            <div className="col-span-6 mb-2">
              <label className="text-sm font-semibold">Prénom:</label>
              <input type="text" className="primary" {...register('prenom')} placeholder="ex. Mohammed" />
            </div>
            <div className="col-span-6 mb-2">
              <label className="text-sm font-semibold">Date de naissance:</label>
              <input type="date" className="primary" {...register('date_naissance')} placeholder="Date" />
            </div>
            <div className="col-span-6 mb-2">
              <label className="text-sm font-semibold">Lieu de naissance:</label>
              <input type="text" className="primary" {...register('lieu_naissance')} placeholder="ex. Alger" />
            </div>
            <div className="col-span-6 mb-2">
              <label className="text-sm font-semibold">Sexe:</label>
              <select {...register('sexe')}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="col-span-6 mb-2">
              <label className="text-sm font-semibold">Situation Familiale:</label>
              <select {...register('situation_familiale')}>
                <option value="Célébataire">Célébataire</option>
                <option value="Marrié(e)">Marrié(e)</option>
                <option value="Divorcé(e)">Divorcé(e)</option>
                <option value="Veuf(ve)">Veuf(e)</option>
              </select>
            </div>
          </div>

          <h6 className="mt-4 mb-1"> Information de contact</h6>
          <div className="mb-2" {...register('email')}>
            <label className="text-sm font-semibold">Email:</label>
            <input type="text" className="primary" placeholder="ex. bouguera.med@gmail.com" />
          </div>
          <div className="mb-2" {...register('telephone')}>
            <label className="text-sm font-semibold">Numéro de téléphone:</label>
            <input type="text" className="primary" placeholder="+213 549297666" />
          </div>
        </div>

        <div className="col-span-4">
          <h6 className="mt-0 mb-1"> Informations d'adresse</h6>
          <div className="grid grid-cols-3 gap-x-2">
            <div className="col-span-3 mb-2">
              <label className="text-sm font-semibold">Adresse:</label>
              <input type="text" className="primary" {...register('adresse')}  placeholder="ex. 22 BD Laichi Abdellah" />
            </div>
            <div className="mb-2">
              <label className="text-sm font-semibold">Commune:</label>
              <input type="text" className="primary" {...register('commune')} placeholder="ex. Bouarfa" />
            </div>
            <div className="mb-2">
              <label className="text-sm font-semibold">Code postale:</label>
              <input type="number" className="primary" {...register('code_postale')}  placeholder="ex. 09000" />
            </div>
            <div className="mb-6">
              <label className="text-sm font-semibold">Wilaya:</label>
              <input type="text" className="primary" {...register('wilaya')} placeholder="ex. Blida" />
            </div>
          </div>
          <h6 className="mb-1"> Informations Medicales</h6>
          <div className="mb-2">
            <label className="text-sm font-semibold">Groupe Sanguin:</label>
            <select {...register('groupage')}>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div className="mb-2">
              <label className="text-sm font-semibold">Taille:</label>
              <div className="flex items-center">
                <input className="primary mb-2" {...register('taille')} placeholder="170" type="number"/>
                <span className="w-6 ms-2 text-right"> cm</span>
              </div>
            </div>
            <div className="mb-2">
              <label className="text-sm font-semibold">Poids:</label>
              <div className="flex items-center">
                <input className="primary mb-2" {...register('poids')} placeholder="72.8" type="number"/>
                <span className="w-6 ms-2 text-right"> kg</span>
              </div>
            </div>
            <div className="mb-2 pl-7 col-span-2">
              <input id="chk" type="checkbox" {...register('donneur_organe')}  className="checkbox"></input>
              <label htmlFor="chk" className="select-none text-slate-700">Donneur d'organes?</label>
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div className="mb-0 flex justify-between">
            <h6 className="mb-0">Antécédants Familiales</h6>
            <Button className="h-8"  onClick={() => setOpenModal('antecedants_familiales')} type="primary-alternate">
              <i className="fa fa-plus" />
              <span className="ms-2">Ajouter</span>
            </Button>
            <AddModal open={openModal === "antecedants_familiales"} close={() => setOpenModal('')} action={() => console.log("")} >
              <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Antécédants Familiales</h3>
              <p className="text-gray-600">Remplissez ce formulaire pour ajouter un antécédants familiales à la consultation courante.</p>
              <div className="grid grid-cols-6 gap-2">

              </div>
            </AddModal>
          </div>
          <Table fields={['#', 'Catégorie', 'Type', '']} className="mb-4">
            <TableRow>
              <TableCell>Idk</TableCell>
              <TableCell>Idk</TableCell>
              <TableCell>Idk</TableCell>
              <TableCell className="text-right">
                <DeleteButton onClick={() => setOpenModal("delete_antecedants_familiales")} />
                <DeleteModal open={openModal === "delete_antecedants_familiales"} close={() => setOpenModal('')} action={() => console.log("")} >
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Delete Antécédant Familiale</h3>
                  <p className="text-gray-600">Are you sure you want to delete this examen clinique? All of your data will be permanently removed. This action cannot be undone.</p>
                </DeleteModal>
              </TableCell>
            </TableRow>
          </Table>

          <div className="mb-0 flex justify-between">
            <h6 className="mb-1">Antécédants Médicales</h6>
            <Button className="h-8"  onClick={() => setOpenModal('antecedants_medicales')} type="primary-alternate">
              <i className="fa fa-plus" />
              <span className="ms-2">Ajouter</span>
            </Button>
            <AddModal open={openModal === "antecedants_medicales"} close={() => setOpenModal('')} action={() => console.log("")} >
              <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Ajouter un radio</h3>
              <p className="text-gray-600">Remplissez ce formulaire pour ajouter un radio à la consultation courante.</p>
              <div className="grid grid-cols-6 gap-2">

              </div>
            </AddModal>
          </div>
          <Table fields={['#', 'Catégorie', 'Type', '']} className="mb-4">
            <TableRow>
              <TableCell>Idk</TableCell>
              <TableCell>Idk</TableCell>
              <TableCell>Idk</TableCell>
              <TableCell className="text-right">
                <DeleteButton onClick={() => setOpenModal("delete_antecedants_medicales")} />
                <DeleteModal open={openModal === "delete_antecedants_medicales"} close={() => setOpenModal('')} action={() => console.log("")} >
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Delete Antécédant Familiale</h3>
                  <p className="text-gray-600">Are you sure you want to delete this examen clinique? All of your data will be permanently removed. This action cannot be undone.</p>
                </DeleteModal>
              </TableCell>
            </TableRow>
          </Table>

          <div className="mb-0 flex justify-between">
            <h6 className="mb-1">Allergies</h6>
            <Button className="h-8"  onClick={() => setOpenModal('allergies')} type="primary-alternate">
              <i className="fa fa-plus" />
              <span className="ms-2">Ajouter</span>
            </Button>
            <AddModal open={openModal === "allergies"} close={() => setOpenModal('')} action={() => console.log("")} >
              <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Ajouter un radio</h3>
              <p className="text-gray-600">Remplissez ce formulaire pour ajouter un radio à la consultation courante.</p>
              <div className="grid grid-cols-6 gap-2">

              </div>
            </AddModal>
          </div>
          <Table fields={['#', 'Catégorie', 'Type', '']} className="mb-4">
            <TableRow>
              <TableCell>Idk</TableCell>
              <TableCell>Idk</TableCell>
              <TableCell>Idk</TableCell>
              <TableCell className="text-right">
                <DeleteButton onClick={() => setOpenModal("delete_allergies")} />
                <DeleteModal open={openModal === "delete_allergies"} close={() => setOpenModal('')} action={() => console.log("")} >
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Delete Antécédant Familiale</h3>
                  <p className="text-gray-600">Are you sure you want to delete this examen clinique? All of your data will be permanently removed. This action cannot be undone.</p>
                </DeleteModal>
              </TableCell>
            </TableRow>
          </Table>

          <div className="mb-0 flex justify-between">
            <h6 className="mb-1">Vaccinations</h6>
            <Button className="h-8"  onClick={() => setOpenModal('vaccinations')} type="primary-alternate">
              <i className="fa fa-plus" />
              <span className="ms-2">Ajouter</span>
            </Button>
            <AddModal open={openModal === "vaccinations"} close={() => setOpenModal('')} action={() => console.log("")} >
              <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Ajouter un radio</h3>
              <p className="text-gray-600">Remplissez ce formulaire pour ajouter un radio à la consultation courante.</p>
              <div className="grid grid-cols-6 gap-2">

              </div>
            </AddModal>
          </div>
          <Table fields={['#', 'Catégorie', 'Type', '']} className="mb-4">
            <TableRow>
              <TableCell>Idk</TableCell>
              <TableCell>Idk</TableCell>
              <TableCell>Idk</TableCell>
              <TableCell className="text-right">
                <DeleteButton onClick={() => setOpenModal("delete_vaccinations")} />
                <DeleteModal open={openModal === "delete_vaccinations"} close={() => setOpenModal('')} action={() => console.log("")} >
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Delete Antécédant Familiale</h3>
                  <p className="text-gray-600">Are you sure you want to delete this examen clinique? All of your data will be permanently removed. This action cannot be undone.</p>
                </DeleteModal>
              </TableCell>
            </TableRow>
          </Table>
        </div>
      <div className="col-span-12 w-full flex justify-end">
        <input type="submit" value="Ajouter" className="flex items-center justify-center py-2 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0"/>
      </div>
      </form>
    </Card>
  )
}

export default NewPatientPage