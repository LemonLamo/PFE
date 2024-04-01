import moment from "moment";
import Modal, { ModalThemes } from "../../components/UI/Modal";

type Props = {
  isOpen: boolean,
  close: () => void,
  selectedRadio: Radio,
}

export default function JoindreResultatsRadio({ isOpen, close, selectedRadio} : Props) {
  return(
    <Modal isOpen={isOpen} theme="primary" size="sm:max-w-2xl">
      <div className="overflow-auto w-full h-full flex flex-col">
        <div className="flex justify-between border-b border-gray-200 pb-2">
          <div className="text-xl font-bold">{selectedRadio.designation}</div>
          <div className="font-bold">{selectedRadio.id}</div>
        </div>

        <div className="flex mb-2 mt-4">
          <div className="w-1/4 font-bold">Patient:</div>
          <div className="w-3/4 font-medium">{selectedRadio.patient.nom} {selectedRadio.patient.prenom} / {selectedRadio.patient.NIN}</div>
        </div>

        <div className="flex mb-2">
          <div className="w-1/4 font-bold">Age:</div>
          <div className="w-3/4 font-medium">{moment(new Date()).diff(moment(selectedRadio.patient.date_de_naissance), "years")} ans</div>
        </div>

        <div className="flex mb-2">
          <div className="w-1/4 font-bold">Sexe:</div>
          <div className="w-3/4 font-medium">{selectedRadio.patient.sexe}</div>
        </div>
        
        <div className="border-dashed border-2 border-gray-400 mt-2 py-4 flex flex-col justify-center items-center">
          <i>
            <svg className="fill-current w-12 h-12 mb-3 text-cyan-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
            </svg>
          </i>
          <p className="mb-3 font-semibold text-gray-900 text-center">
            <div>Glissez-déposez vos fichiers n'importe où</div>
            <div>ou bien</div>
          </p>
          <input id="hidden-input" type="file" multiple className="hidden" />
          <button id="button" className="mt-2 rounded-sm px-3 py-1 bg-gray-100 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
            Upload a file
          </button>
        </div>

        <h1 className="pt-6 pb-3 font-semibold sm:text-lg text-gray-900">
          Lab reports
        </h1>

        <ul id="gallery" className="flex flex-1 flex-wrap ">
          <li id="empty" className="h-full w-full text-center flex flex-col items-center justify-center items-center">
            <img className="mx-auto w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
            <span className="text-small text-gray-500">No files selected</span>
          </li>
        </ul>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button type="button" className={`${ModalThemes['primary'].color} rounded-md px-4 py-2 font-semibold text-white`}>Upload</button>
          <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
        </div>
    </Modal>);
}
  