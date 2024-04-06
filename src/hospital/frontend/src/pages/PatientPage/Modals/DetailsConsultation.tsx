import Modal from "../../../components/UI/Modal";
import TabExamenClinique from "../Tabs/TabExamenClinique";
import TabPrescription from "../Tabs/TabPrescription";
import TabRadio from "../Tabs/TabRadio";
import TabBilan from "../Tabs/TabBilan";
import TabContent from "../../../components/UI/Tabs/TabContent";
import Tabs from "../../../components/UI/Tabs";
import moment from "moment";

const theme = "primary";
type Props = {
  isOpen: boolean;
  close: () => void;
  selectedConsultation: Consultation;
};

export default function DetailsConsultation({
  isOpen,
  close,
  selectedConsultation,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      icon="fa fa-health-snake"
      theme={theme}
      size="sm:max-w-6xl"
    >
      <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3">
        Détails Consultation "{selectedConsultation.id}"
      </h3>
      <div className="grid grid-cols-2 gap-2 mb-1">
        <fieldset className="w-full border-solid border-2 border-slate-400 px-4 pt-0 pb-4">
          <legend className="font-semibold text-gray-900">Patient</legend>
          <div className="grid grid-cols-6 gap-2 m-0">
            <div className="col-span-2 font-semibold">NIN:</div>
            <div className="col-span-4 font-semibold">
              {" "}
              {selectedConsultation.patient.NIN}
            </div>

            <div className="col-span-2 font-semibold">Nom complet:</div>
            <div className="col-span-4">
              {" "}
              {selectedConsultation.patient.nom +
                " " +
                selectedConsultation.patient.prenom}{" "}
            </div>

            <div className="col-span-2 font-semibold">Date de naissance:</div>
            <div className="col-span-4">
              {moment(selectedConsultation.patient.date_de_naissance).format(
                "YYYY-MM-DD"
              )}
            </div>

            <div className="col-span-1 font-semibold">Sexe:</div>
            <div className="col-span-2">
              {selectedConsultation.patient.sexe}
            </div>
            <div className="col-span-1 font-semibold">Groupage: </div>
            <div className="col-span-2">
              &nbsp; &nbsp;
              {selectedConsultation.patient.groupage}
            </div>
          </div>
        </fieldset>

        <fieldset className="w-full border-solid border-2 border-slate-400 px-4 pt-0 pb-4">
          <legend className="font-semibold text-gray-900">Médecin</legend>
          <div className="grid grid-cols-12 gap-x-2 gap-y-4 m-0">
            <div className="col-span-5">
              <label className="font-semibold">NIN</label>
              <p className="mb-0"> {selectedConsultation.medecin.NIN} </p>
            </div>

            <div className="col-span-3">
              <label className="font-semibold">Nom </label>
              <p className="mb-0"> {selectedConsultation.medecin.nom}</p>
            </div>

            <div className="col-span-4">
              <label className="font-semibold">Prénom</label>
              <p className="mb-0"> {selectedConsultation.medecin.prenom}</p>
            </div>

            <div className="col-span-5">
              <label className="font-semibold">Spécialité</label>
              <p className="mb-0">
                {" "}
                {selectedConsultation.medecin.specialite}{" "}
              </p>
            </div>

            <div className="col-span-3">
              <label className="font-semibold">Service </label>
              <p className="mb-0"> {selectedConsultation.medecin.service} </p>
            </div>

            <div className="col-span-4">
              <label className="font-semibold">Hopital</label>
              <p className="mb-0"> {selectedConsultation.medecin.hopital}</p>
            </div>
          </div>
        </fieldset>
      </div>

      <fieldset className="w-full border-solid border-2 border-slate-400 px-4 pt-0 pb-4 mb-3">
        <legend className="font-semibold text-gray-900">Consultation</legend>
        <div className="grid grid-cols-11 gap-3">
          <div className="col-span-3">
            <label className="font-semibold">Date</label>
            <p className="mb-0">
              {" "}
              {moment(selectedConsultation.date).format("YYYY-MM-DD")}{" "}
            </p>
          </div>

          <div className="col-span-4">
            <label className="font-semibold">Type</label>
            <p className="mb-0"> {selectedConsultation.type} </p>
          </div>

          <div className="col-span-4">
            <label className="font-semibold">Motif </label>
            <p className="mb-0"> {selectedConsultation.motif}</p>
          </div>
          <div className="col-span-3">
            <label className="font-semibold"> Prochaine consultation</label>
            <p className="mb-0">
              {" "}
              {moment(selectedConsultation.prochaine_consultation).format(
                "YYYY-MM-DD"
              )}{" "}
            </p>
          </div>
          <div className="col-span-4">
            <label className="font-semibold">Symptomes</label>
            <p className="mb-0"> {selectedConsultation.symptomes}</p>
          </div>

          <div className="col-span-4">
            <label className="font-semibold"> Durée d'arret de travail </label>
            <p className="mb-0">
              {selectedConsultation.duree_arret_de_travail}
            </p>
          </div>
          <div className="col-span-12">
            <label className="font-semibold">Diagnostique</label>
            <p className="mb-0">
              {" "}
              {selectedConsultation.diagnostique +
                " : " +
                selectedConsultation.diagnostique_details}{" "}
            </p>
          </div>

          <div className="col-span-12">
            <label className="font-semibold">Résumé</label>
            <p className="mb-0">{selectedConsultation.resume}</p>
          </div>
        </div>
      </fieldset>

      <Tabs type="horizontal">
        <TabContent icon="fa fa-stethoscope" text="Examens Cliniques">
          <TabExamenClinique NIN="XXXX" />
        </TabContent>

        <TabContent icon="fa fa-pills" text="Prescriptions">
          <TabPrescription NIN="XXXX" />
        </TabContent>

        <TabContent icon="fa fa-x-ray" text="Radios">
          <TabRadio NIN="XXX" />
        </TabContent>

        <TabContent icon="fa fa-vial" text="Bilans">
          <TabBilan NIN="XXXX" />
        </TabContent>
      </Tabs>
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
