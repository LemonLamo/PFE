import { useEffect, useState } from "react";
import Modal from "../../../components/UI/Modal";
import Tabs from "../../../components/UI/Tabs";
import TabContent from "../../../components/UI/Tabs/TabContent";
import TabBilan from "../Tabs/TabBilan";
import TabExamenClinique from "../Tabs/TabExamenClinique";
import TabPrescription from "../Tabs/TabPrescription";
import TabRadio from "../Tabs/TabRadio";
import moment from "moment";
import { baseURL } from "../../../config";
import axios from "axios";

type Props = {
  isOpen: boolean;
  close: () => void;
  selectedHospitalisation: Hospitalisation;
};

const theme = "primary";
export default function DetailsHospitalisation({ isOpen, close, selectedHospitalisation }: Props) {
  const [hospitalisation, setHospitalisation] = useState<Hospitalisation>(selectedHospitalisation);

  useEffect(() => {
    if (!selectedHospitalisation.id) return
    axios.get(`${baseURL}/api/hospitalisations/${selectedHospitalisation.id}`).then((response) => {
      setHospitalisation(response.data)
    })
  }, [selectedHospitalisation]);

  return (
    <Modal isOpen={isOpen} icon="fa fa-health-snake" theme={theme} size="sm:max-w-6xl">
      <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3">
        Détails Hospitalisation "{hospitalisation.id}"
      </h3>
      <div className="grid grid-cols-2 gap-2 mb-1">
        <fieldset className="w-full border-solid border-2 border-slate-400 px-4 pt-0 pb-4">
          <legend className="font-semibold text-gray-900">Patient</legend>
          <div className="grid grid-cols-8 gap-2 m-0">
            <div className="col-span-3 font-semibold">NIN:</div>
            <div className="col-span-5 font-semibold">
              {hospitalisation.patient.NIN}
            </div>

            <div className="col-span-3 font-semibold">Nom complet:</div>
            <div className="col-span-5">
              {hospitalisation.patient.nom +
                " " +
                hospitalisation.patient.prenom}
            </div>
            <div className="col-span-3 font-semibold">Date de naissance:</div>
            <div className="col-span-5">
              {moment(hospitalisation.patient.date_de_naissance).format("DD/MM/YYYY")}
              {" "}
              {`(${moment(new Date()).diff(moment(hospitalisation.patient.date_de_naissance), "years")} ans)`}
            </div>

            <div className="col-span-2 font-semibold">Sexe:</div>
            <div className="col-span-3">
              {hospitalisation.patient.sexe}
            </div>
            <div className="col-span-2 font-semibold">Groupage: </div>
            <div className="col-span-1">
              {hospitalisation.patient.groupage}
            </div>
          </div>
        </fieldset>

        <fieldset className="w-full border-solid border-2 border-slate-400 px-4 pt-0 pb-4">
          <legend className="font-semibold text-gray-900">Médecin</legend>
          <div className="grid grid-cols-12 gap-x-2 gap-y-4 m-0">
            <div className="col-span-5">
              <label className="font-semibold">NIN</label>
              <p className="mb-0"> {hospitalisation.medecin.NIN} </p>
            </div>

            <div className="col-span-3">
              <label className="font-semibold">Nom </label>
              <p className="mb-0"> {hospitalisation.medecin.nom} </p>
            </div>

            <div className="col-span-4">
              <label className="font-semibold">Prénom</label>
              <p className="mb-0"> {hospitalisation.medecin.prenom} </p>
            </div>

            <div className="col-span-5">
              <label className="font-semibold">Spécialité</label>
              <p className="mb-0">
                {hospitalisation.medecin.specialite}
              </p>
            </div>

            <div className="col-span-3">
              <label className="font-semibold">Service </label>
              <p className="mb-0">
                {hospitalisation.service}
              </p>
            </div>

            <div className="col-span-4">
              <label className="font-semibold">Hopital</label>
              <p className="mb-0">
                {hospitalisation.hopital}
              </p>
            </div>
          </div>
        </fieldset>
      </div>

      <fieldset className="w-full border-solid border-2 border-slate-400 px-4 py-2 mb-3">
        <legend className="font-semibold">Hospiltaisation</legend>
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-3">
            <label className="font-semibold">Date entrée</label>
            <p className="mb-0">
              {moment(hospitalisation.date_entree).format("DD/MM/YYYY HH:mm")}
            </p>
          </div>

          <div className="col-span-3">
            <label className="font-semibold">Mode entrée</label>
            <p className="mb-0"> {hospitalisation.mode_entree} </p>
          </div>

          <div className="col-span-3">
            <label className="font-semibold">Date sortie </label>
            <p className="mb-0">
              {hospitalisation.date_sortie? moment(hospitalisation.date_sortie).format("DD/MM/YYYY HH:mm") : '-'}
            </p>
          </div>

          <div className="col-span-3">
            <label className="font-semibold">Mode sortie </label>
            <p className="mb-0"> {hospitalisation.mode_sortie ?? '-'}</p>
          </div>

          <div className="col-span-9">
            <label className="font-semibold">Motif d'hospitalisation</label>
            <p className="mb-0">
              {hospitalisation.motif_hospitalisation}
            </p>
          </div>

          <div className="col-span-3">
            <label className="font-semibold">Chambre </label>
            <p className="mb-0">
              {`Chambre ${hospitalisation.chambre}, Lit N°${hospitalisation.lit}`}
            </p>
          </div>

          <div className="col-span-12">
            <label className="font-semibold">Résumé d'hospitalisation</label>
            <p className="mb-0 whitespace-pre-wrap">
              {hospitalisation.resume_hospitalisation}
            </p>
          </div>
        </div>
      </fieldset>
      <Tabs type="horizontal">
        <TabContent icon="fa fa-stethoscope" text="Examens Cliniques">
          <TabExamenClinique reference={hospitalisation.id} />
        </TabContent>

        <TabContent icon="fa fa-pills" text="Préscriptions">
          <TabPrescription reference={hospitalisation.id} />
        </TabContent>

        <TabContent icon="fa fa-x-ray" text="Radios">
          <TabRadio reference={hospitalisation.id} />
        </TabContent>

        <TabContent icon="fa fa-vial" text="Bilans">
          <TabBilan reference={hospitalisation.id} />
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
