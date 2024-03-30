import Modal from "../../components/UI/Modal";
import moment from "moment";

type Props = {
  isOpen: boolean,
  close: () => void,
  selectedPersonnel: Personnel,
}

export default function ViewPersonnelModal({ isOpen, close, selectedPersonnel} : Props) {
  return(
    <Modal isOpen={isOpen} icon="fa fa-user" theme="primary" size="sm:max-w-5xl">
      <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Visualiser une personnel </h3>
      <p className="text-gray-600"> Remplissez ce formulaire pour ajouter une nouvelle chambre </p>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="mb-2">
            <label className="text-sm font-semibold">NIN</label>
            <input type="text" className="primary" placeholder="NIN" disabled value={selectedPersonnel.NIN} />
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Nom </label>
            <input type="text" className="primary" placeholder="Nom" disabled value={selectedPersonnel.nom} />
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Prénom </label>
            <input type="text" className="primary" placeholder="Prénom" disabled value={selectedPersonnel.prenom} />
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Sexe </label>
            <input type="text" className="primary" placeholder="Sexe" disabled value={selectedPersonnel.sexe} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm font-semibold">Date de naissance</label>
              <input type="date" className="primary" placeholder="Date de naissance" disabled value={moment(selectedPersonnel.date_de_naissance).format( "YYYY-MM-DD")} />
            </div>
            <div>
              <label className="text-sm font-semibold">Lieu de naissance</label>
              <input type="text" className="primary" placeholder="Lieu de naissance" disabled value={selectedPersonnel.lieu_de_naissance} />
            </div>
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Service</label>
            <input type="text" className="primary" placeholder="Service" disabled value={selectedPersonnel.service} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="mb-2">
              <label className="text-sm font-semibold">Fonction</label>
              <input type="text" className="primary" placeholder="Fonction" disabled value={selectedPersonnel.fonction} />
            </div>
            <div className="mb-2">
              <label className="text-sm font-semibold">Specialité</label>
              <input type="text" className="primary" placeholder="Spécialité" disabled value={selectedPersonnel.specialite} />
            </div>
            <div className="mb-2">
              <label className="text-sm font-semibold">Grade</label>
              <input type="text" className="primary" placeholder="Grade" disabled value={selectedPersonnel.grade} />
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Email </label>
            <input type="email" className="primary" placeholder="Email" value={selectedPersonnel.email} disabled />
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold"> Numero de téléphone </label>
            <input type="tel" className="primary" placeholder="Numero de telephone" disabled value={selectedPersonnel.telephone} />
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Adresse</label>
            <input type="text" className="primary" placeholder="Adresse" disabled value={selectedPersonnel.adresse} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-sm font-semibold">Commune</label>
              <input type="text" className="primary" placeholder="Commune" disabled value={selectedPersonnel.commune} />
            </div>
            <div>
              <label className="text-sm font-semibold">Wilaya</label>
              <input type="text" className="primary" placeholder="Wilaya" disabled value={selectedPersonnel.wilaya} />
            </div>
            <div>
              <label className="text-sm font-semibold">Code postale</label>
              <input type="text" className="primary" placeholder="Code Postale" disabled value={selectedPersonnel.code_postale} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
          <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Fermer</button>
      </div>
    </Modal>);
}
  