import moment from "moment";
import Modal from "../../../components/UI/Modal";

type Props = {
  isOpen: boolean;
  close: () => void;
  selectedIntervention: Intervention;
};

const theme = "primary";

export default function DetailsIntervention({
  isOpen,
  close,
  selectedIntervention,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      icon="fa fa-health-snake"
      theme={theme}
      size="sm:max-w-6xl"
    >
      <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3">
        Détails Intervention "{selectedIntervention.id}"
      </h3>
      <div className="grid grid-cols-2 gap-2 mb-1">
        <fieldset className="w-full border-solid border-2 border-slate-400 px-4 pt-0 pb-4">
          <legend className="font-semibold text-gray-900">Patient</legend>
          <div className="grid grid-cols-8 gap-2 m-0">
            <div className="col-span-3 font-semibold">NIN:</div>
            <div className="col-span-5 font-semibold">
              {selectedIntervention.patient.NIN}
            </div>

            <div className="col-span-3 font-semibold">Nom complet:</div>
            <div className="col-span-5">
              {selectedIntervention.patient.nom +
                " " +
                selectedIntervention.patient.prenom}
            </div>
            <div className="col-span-3 font-semibold">Date de naissance:</div>
            <div className="col-span-5">
              {moment(selectedIntervention.patient.date_de_naissance).format("DD/MM/YYYY")}
              {" "}
              {`(${moment(new Date()).diff(moment(selectedIntervention.patient.date_de_naissance), "years")} ans)`}
            </div>

            <div className="col-span-2 font-semibold">Sexe:</div>
            <div className="col-span-3">
              {selectedIntervention.patient.sexe}
            </div>
            <div className="col-span-2 font-semibold">Groupage: </div>
            <div className="col-span-1">
              {selectedIntervention.patient.groupage}
            </div>
          </div>
        </fieldset>

        <fieldset className="w-full border-solid border-2 border-slate-400 px-4 pt-0 pb-4">
          <legend className="font-semibold text-gray-900">Médecin</legend>
          <div className="grid grid-cols-12 gap-x-2 gap-y-4 m-0">
            <div className="col-span-5">
              <label className="font-semibold">NIN</label>
              <p className="mb-0"> {selectedIntervention.medecin.NIN} </p>
            </div>

            <div className="col-span-3">
              <label className="font-semibold">Nom </label>
              <p className="mb-0"> {selectedIntervention.medecin.nom}</p>
            </div>

            <div className="col-span-4">
              <label className="font-semibold">Prénom</label>
              <p className="mb-0"> {selectedIntervention.medecin.prenom}</p>
            </div>

            <div className="col-span-5">
              <label className="font-semibold">Spécialité</label>
              <p className="mb-0">
                {selectedIntervention.medecin.specialite}
              </p>
            </div>

            <div className="col-span-3">
              <label className="font-semibold">Service </label>
              <p className="mb-0"> {selectedIntervention.service} </p>
            </div>

            <div className="col-span-4">
              <label className="font-semibold">Hopital</label>
              <p className="mb-0"> {selectedIntervention.hopital} </p>
            </div>
          </div>
        </fieldset>
      </div>

      <fieldset className="w-full border-solid border-2 border-slate-400 px-4 py-2 mb-3">
        <legend className="font-semibold">Intervention</legend>
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-9">
            <label className="font-semibold">Intervention</label>
            <p className="mb-0"> [{selectedIntervention.code_intervention}] : {selectedIntervention.designation}</p>
          </div>
          <div className="col-span-3">
            <label className="font-semibold">Date </label>
            <p className="mb-0">
              {moment(selectedIntervention.date).format("DD/MM/YYYY HH:mm")}
            </p>
          </div>

          <div className="col-span-12">
            <label className="font-semibold">Remarques</label>
            <p className="mb-0"> {selectedIntervention.remarques} </p>
          </div>
          <div className="col-span-12">
            <label className="font-semibold">Protocole opératoire</label>
            <p className="mb-0">
              {selectedIntervention.protocole_operatoire}
            </p>
          </div>
        </div>
      </fieldset>

      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50"
          onClick={close}
        >
          Annuler
        </button>
      </div>
    </Modal>
  );
}
