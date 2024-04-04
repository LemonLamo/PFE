import Modal from "../../../components/UI/Modal";
import { useState } from "react";
import TabExamenClinique from "../Tabs/TabExamenClinique";
import TabPrescription from "../Tabs/TabPrescription";
import TabRadio from "../Tabs/TabRadio";
import TabBilan from "../Tabs/TabBilan";

type Props = {
  isOpen: boolean;
  close: () => void;
  action: (arg0: Allergie) => void;
};

const theme = "primary";

export default function DetailsConsultation() {
  const [selectedTable, setSelectedTable] = useState(0);
  return (
    <Modal
      isOpen={true}
      icon="fa fa-health-snake"
      theme={theme}
      size="sm:w-[50%]"
    >
      <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3">
        Détails Consultation
      </h3>
      <div className="flex flex-col gap-1">
        <fieldset className="w-full min-h-min border-solid border-2 border-slate-300 pl-4 pb-4 pr-4 pt-2 mb-1">
          <legend>Patient</legend>
          <div className="grid grid-cols-12 gap-2 m-0">
            <div className="col-span-4">
              <label className="text-sm font-semibold">NIN</label>
              <h1 className="text-[1.8vh] text-slate-400 m-0.5">
                1111111111111111
              </h1>
            </div>

            <div className="col-span-4">
              <label className="text-sm font-semibold">Nom </label>
              <h1 className="text-[1.8vh] text-slate-400 m-0.5"> NADIL</h1>
            </div>

            <div className="col-span-4">
              <label className="text-sm font-semibold">Prénom</label>
              <h1 className="text-[1.8vh] text-slate-400 m-0.5"> Marwa</h1>
            </div>
          </div>
        </fieldset>

        <fieldset className="w-full min-h-min border-solid border-2 border-slate-300 pl-4 pb-4 pr-4 pt-2 mb-3">
          <legend>Medecin</legend>
          <div className="grid grid-cols-12 gap-2 m-0">
            <div className="col-span-4">
              <label className="text-sm font-semibold">NIN</label>
              <h1 className="text-[1.8vh] text-slate-400 m-0.5">
                1111111111111111
              </h1>
            </div>

            <div className="col-span-4">
              <label className="text-sm font-semibold">Nom </label>
              <h1 className="text-[1.8vh] text-slate-400 m-0.5"> NADIL</h1>
            </div>

            <div className="col-span-4">
              <label className="text-sm font-semibold">Prénom</label>
              <h1 className="text-[1.8vh] text-slate-400 m-0.5"> Marwa</h1>
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">Spécialité</label>
              <h1 className="text-[1.8vh] text-slate-400 m-0.5"> IDK</h1>
            </div>

            <div className="col-span-4">
              <label className="text-sm font-semibold">Service </label>
              <h1 className="text-[1.8vh] text-slate-400 m-0.5"> IDK </h1>
            </div>

            <div className="col-span-4">
              <label className="text-sm font-semibold">Hopital</label>
              <h1 className="text-[1.8vh] text-slate-400 m-0.5"> idk </h1>
            </div>
          </div>
        </fieldset>
      </div>

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-4">
          <label className="text-sm font-semibold">Date</label>
          <h1 className="text-[1.8vh] text-slate-400 m-0.5"> xxxx </h1>
        </div>
        <div className="col-span-4">
          <label className="text-sm font-semibold">
            Prochaine consultation
          </label>
          <h1 className="text-[1.8vh] text-slate-400 m-0.5"> xxxx </h1>
        </div>
        <div className="col-span-4">
          <label className="text-sm font-semibold">
            Durée d'arret de travail
          </label>
          <h1 className="text-[1.8vh] text-slate-400 m-0.5"> xxxx </h1>
        </div>

        <div className="col-span-4">
          <label className="text-sm font-semibold">Type</label>
          <h1 className="text-[1.8vh] text-slate-400 m-0.5"> xxxx </h1>
        </div>
        <div className="col-span-4">
          <label className="text-sm font-semibold">Motif </label>
          <h1 className="text-[1.8vh] text-slate-400 m-0.5"> xxxx </h1>
        </div>
        <div className="col-span-4">
          <label className="text-sm font-semibold">Symptomes</label>
          <h1 className="text-[1.8vh] text-slate-400 m-0.5"> xxxx </h1>
        </div>

        <div className="col-span-12">
          <label className="text-sm font-semibold">Diagnostique</label>
          <p className="text-[1.5vh] text-slate-400 m-0.5"> xxxx </p>
        </div>
        <div className="col-span-12 mb-3">
          <label className="text-sm font-semibold">Résumé</label>
          <p className="text-[1.5vh] text-slate-400 m-0.5"> xxxx </p>
        </div>
      </div>
      <button
        className={
          selectedTable === 0
            ? "w-[15vh] py-3 bg-cyan-500 text-white rounded-md m-2"
            : "w-[15vh] py-3 text-black rounded-md m-2 border-solid border-2 border-gray-500"
        }
        onClick={(e) => {
          e.preventDefault;
          setSelectedTable(0);
        }}
      >
        Examen clinique
      </button>
      <button
        className={
          selectedTable === 1
            ? "w-[15vh] py-3 bg-cyan-500 text-white rounded-md m-2"
            : "w-[15vh] py-3 text-black rounded-md m-2 border-solid border-2 border-gray-500"
        }
        onClick={(e) => {
          e.preventDefault;
          setSelectedTable(1);
        }}
      >
        {" "}
        Prescription
      </button>
      <button
        className={
          selectedTable === 2
            ? "w-[15vh] py-3 bg-cyan-500 text-white rounded-md m-2"
            : "w-[15vh] py-3 text-black rounded-md m-2 border-solid border-2 border-gray-500"
        }
        onClick={(e) => {
          e.preventDefault;
          setSelectedTable(2);
        }}
      >
        {" "}
        Radio
      </button>
      <button
        className={
          selectedTable === 3
            ? "w-[15vh] py-3 bg-cyan-500 text-white rounded-md m-2"
            : "w-[15vh] py-3 text-black rounded-md m-2 border-solid border-2 border-gray-500"
        }
        onClick={(e) => {
          e.preventDefault;
          setSelectedTable(3);
        }}
      >
        {" "}
        Bilan
      </button>
      {selectedTable === 0 ? (
        <TabExamenClinique NIN="XXXX"></TabExamenClinique>
      ) : selectedTable === 1 ? (
        <TabPrescription NIN="XXXX"></TabPrescription>
      ) : selectedTable === 2 ? (
        <TabRadio NIN="XXX"></TabRadio>
      ) : (
        <TabBilan NIN="XXXX"></TabBilan>
      )}
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
