import Modal from "../../../components/UI/Modal";
import TabExamenClinique from "../Tabs/TabExamenClinique";
import TabPrescription from "../Tabs/TabPrescription";
import TabRadio from "../Tabs/TabRadio";
import TabBilan from "../Tabs/TabBilan";
import TabContent from "../../../components/UI/Tabs/TabContent";
import Tabs from "../../../components/UI/Tabs";
import moment from "moment";
import { Link } from "react-router-dom";
import { validation_badge } from "../../../hooks/useBlockchain";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../../config";

const theme = "primary";
type Props = {
  isOpen: boolean;
  close: () => void;
  selectedConsultation: Consultation;
};

export default function DetailsConsultation({isOpen, close, selectedConsultation}: Props) {
  const [consultation, setConsultation] = useState<Consultation>(selectedConsultation);
  useEffect(()=>{
    axios.get(`${baseURL}/api/consultations/${selectedConsultation.id}`).then((response)=>{
      setConsultation(response.data)
    })
  }, [selectedConsultation])

  return (
    <Modal isOpen={isOpen} icon="fa fa-health-snake" theme={theme} size="sm:max-w-6xl">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3">Détails Consultation "{consultation.id}"</h3>
        {validation_badge(consultation.integrite)}
      </div>
      <div className="grid grid-cols-2 gap-2 mb-1">
        <fieldset className="w-full border-solid border-2 border-slate-400 px-4 pt-0 pb-4">
          <legend className="font-semibold text-gray-900">Patient</legend>
          <div className="grid grid-cols-8 gap-2 m-0">
            <div className="col-span-3 font-semibold">NIN:</div>
            <div className="col-span-5 font-semibold">
              {consultation.patient.NIN}
            </div>

            <div className="col-span-3 font-semibold">Nom complet:</div>
            <div className="col-span-5">
              {consultation.patient.nom +
                " " +
                consultation.patient.prenom}
            </div>
            <div className="col-span-3 font-semibold">Date de naissance:</div>
            <div className="col-span-5">
              {moment(consultation.patient.date_de_naissance).format("DD/MM/YYYY")}
              {" "}
              {`(${moment(new Date()).diff(moment(consultation.patient.date_de_naissance), "years")} ans)`}
            </div>

            <div className="col-span-2 font-semibold">Sexe:</div>
            <div className="col-span-3">
              {consultation.patient.sexe}
            </div>
            <div className="col-span-2 font-semibold">Groupage: </div>
            <div className="col-span-1">
              {consultation.patient.groupage}
            </div>
          </div>
        </fieldset>

        <fieldset className="w-full border-solid border-2 border-slate-400 px-4 pt-0 pb-4">
          <legend className="font-semibold text-gray-900">Médecin</legend>
          <div className="grid grid-cols-12 gap-x-2 gap-y-4 m-0">
            <div className="col-span-5">
              <label className="font-semibold">NIN</label>
              <p className="mb-0"> {consultation.medecin.NIN} </p>
            </div>

            <div className="col-span-3">
              <label className="font-semibold">Nom </label>
              <p className="mb-0"> {consultation.medecin.nom}</p>
            </div>

            <div className="col-span-4">
              <label className="font-semibold">Prénom</label>
              <p className="mb-0"> {consultation.medecin.prenom}</p>
            </div>

            <div className="col-span-5">
              <label className="font-semibold">Spécialité</label>
              <p className="mb-0">
                {consultation.medecin.specialite}
              </p>
            </div>

            <div className="col-span-3">
              <label className="font-semibold">Service </label>
              <p className="mb-0"> {consultation.service} </p>
            </div>

            <div className="col-span-4">
              <label className="font-semibold">Hopital</label>
              <p className="mb-0"> {consultation.hopital}</p>
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
              {moment(consultation.date).format("YYYY-MM-DD")}
            </p>
          </div>

          <div className="col-span-4">
            <label className="font-semibold">Type</label>
            <p className="mb-0"> {consultation.type} </p>
          </div>

          <div className="col-span-4">
            <label className="font-semibold">Motif </label>
            <p className="mb-0"> {consultation.motif}</p>
          </div>
          <div className="col-span-7">
            <label className="font-semibold">Symptomes</label>
            <p className="mb-0"> {consultation.symptomes}</p>
          </div>

          <div className="col-span-5">
            <label className="font-semibold"> Arrêt de travail </label>
            <div className="mb-0">
              {consultation.duree_arret_de_travail? 
              <>
                {consultation.duree_arret_de_travail + " jours "}
                <Link to={`/arret_de_travail/${consultation.id}`} target="_blank" className="underline">(View)</Link>
              </> : 
              '-'}
            </div>
          </div>
          <div className="col-span-12">
            <label className="font-semibold">Diagnostique</label>
            <p className="mb-0">
              {consultation.diagnostique + " : " + consultation.diagnostique_details}
            </p>
          </div>

          <div className="col-span-12">
            <label className="font-semibold">Résumé</label>
            <p className="mb-0">{consultation.resume}</p>
          </div>
        </div>
      </fieldset>

      <Tabs type="horizontal">
        <TabContent icon="fa fa-stethoscope" text="Examens Cliniques">
          <TabExamenClinique reference={consultation.id} />
        </TabContent>

        <TabContent icon="fa fa-pills" text="Préscriptions">
          <TabPrescription reference={consultation.id} />
        </TabContent>

        <TabContent icon="fa fa-x-ray" text="Radios">
          <TabRadio reference={consultation.id} />
        </TabContent>

        <TabContent icon="fa fa-vial" text="Bilans">
          <TabBilan reference={consultation.id} />
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
