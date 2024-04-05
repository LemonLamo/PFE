import Modal from "../../../components/UI/Modal";
import TabExamenClinique from "../Tabs/TabExamenClinique";
import TabPrescription from "../Tabs/TabPrescription";
import TabRadio from "../Tabs/TabRadio";
import TabBilan from "../Tabs/TabBilan";
import TabContent from "../../../components/UI/Tabs/TabContent";
import Tabs from "../../../components/UI/Tabs";

const theme = "primary";
type Props = {
  isOpen: boolean,
  close: () => void,
  selectedConsultation: Consultation
}

export default function DetailsConsultation({isOpen, close, selectedConsultation} : Props) {
  return (
    <Modal isOpen={isOpen} icon="fa fa-health-snake" theme={theme} size="sm:max-w-6xl">
      <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3">
        Détails Consultation "cons-XNDHDBZ"
      </h3>
      <div className="grid grid-cols-2 gap-2 mb-1">
        <fieldset className="w-full border-solid border-2 border-slate-400 px-4 pt-0 pb-4">
          <legend className="font-semibold text-gray-900">Patient</legend>
          <div className="grid grid-cols-6 gap-2 m-0">
            <div className="col-span-2 font-semibold">NIN:</div>
            <div className="col-span-4 font-semibold">111111111111111111 </div>

            <div className="col-span-2 font-semibold">Nom complet:</div>
            <div className="col-span-4">NADIL Aicha Marwa </div>

            <div className="col-span-2 font-semibold">Sexe:</div>
            <div className="col-span-4">Femme</div>
            
            <div className="col-span-2 font-semibold">Age:</div>
            <div className="col-span-4">22ans</div>
          </div>
        </fieldset>

        <fieldset className="w-full border-solid border-2 border-slate-400 px-4 pt-0 pb-4">
          <legend className="font-semibold text-gray-900">Médecin</legend>
          <div className="grid grid-cols-12 gap-x-2 gap-y-4 m-0">
            <div className="col-span-5">
              <label className="font-semibold">NIN</label>
              <p className="mb-0"> 111111111111111111 </p>
            </div>

            <div className="col-span-3">
              <label className="font-semibold">Nom </label>
              <p className="mb-0"> NADIL</p>
            </div>

            <div className="col-span-4">
              <label className="font-semibold">Prénom</label>
              <p className="mb-0"> Marwa</p>
            </div>

            <div className="col-span-5">
              <label className="font-semibold">Spécialité</label>
              <p className="mb-0"> IDK </p>
            </div>

            <div className="col-span-3">
              <label className="font-semibold">Service </label>
              <p className="mb-0"> IDK </p>
            </div>

            <div className="col-span-4">
              <label className="font-semibold">Hopital</label>
              <p className="mb-0"> idk </p>
            </div>
          </div>
        </fieldset>
      </div>

      <fieldset className="w-full border-solid border-2 border-slate-400 px-4 pt-0 pb-4 mb-3">
        <legend className="font-semibold text-gray-900">Consultation</legend>
        <div className="grid grid-cols-11 gap-3">
          <div className="col-span-2">
            <label className="font-semibold">Date</label>
            <p className="mb-0"> 05/04/2024 15:44 </p>
          </div>

          <div className="col-span-3">
            <label className="font-semibold">Type</label>
            <p className="mb-0"> Évaluation d'un nouveau patient </p>
          </div>

          <div className="col-span-2">
            <label className="font-semibold">Motif </label>
            <p className="mb-0"> 05/04/2024 15:44 </p>
          </div>

          <div className="col-span-4">
            <label className="font-semibold">Symptomes</label>
            <p className="mb-0"> Fièvre, Frissons, Toux sèche, Mal de gorge </p>
          </div>

          <div className="col-span-12">
            <label className="font-semibold">Diagnostique</label>
            <p className="mb-0"> H1N1 Influenza, details, idk </p>
          </div>

          <div className="col-span-12">
            <label className="font-semibold">Résumé</label>
            <p className="mb-0"> Le patient s'est présenté avec des symptômes typiques de la grippe, notamment de la fièvre, des frissons, une toux sèche, un mal de gorge, un nez qui coule ou congestionné, des courbatures, de la fatigue et des maux de tête. Il n'y a pas d'antécédents de voyage récent ou de contact avec des personnes malades. Le patient rapporte que les symptômes ont commencé il ya 5 semaines </p>
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
        <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>
          Annuler
        </button>
      </div>
    </Modal>
  );
}
