import moment from "moment";
import Modal, { ModalThemes } from "../../components/UI/Modal";

type Props = {
  isOpen: boolean,
  close: () => void,
  selectedRadio: Radio,
}

export default function LabelRadio({ isOpen, close, selectedRadio} : Props) {
  return(
    <Modal isOpen={isOpen} theme="primary" size="sm:max-w-2xl">
      <div className="invoice w-full p-4 mx-auto bg-white rounded-sm border-black border-2 border-dashed">
        <div className="flex justify-between border-b border-gray-200 pb-2">
          <div className="text-xl font-bold">Radio</div>
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

        <div className="flex mb-2">
          <div className="w-1/4 font-bold">Date:</div>
          <div className="w-3/4 font-medium">{moment(selectedRadio.date).format("DD/MM/YYYY HH:mm")}</div>
        </div>

        <div className="flex mb-2">
          <div className="w-1/4 font-bold">Demandé par:</div>
          <div className="w-3/4 font-medium"> </div>
        </div>

        <div className="text-center text-xl font-bold mt-2 mb-2">{selectedRadio.designation}</div>

        <div className="flex mb-2">
          <div className="w-1/4 font-bold">Détails:</div>
          <div className="w-3/4 font-medium">{selectedRadio.remarques ?? '-'}</div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button type="button" className={`${ModalThemes['primary'].color} rounded-md px-4 py-2 font-semibold text-white`}>Print</button>
        <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Fermer</button>
      </div>
    </Modal>);
}
  