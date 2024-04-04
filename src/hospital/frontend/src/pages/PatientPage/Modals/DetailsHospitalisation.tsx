import Modal from "../../../components/UI/Modal";

type Props = {
  isOpen: boolean;
  close: () => void;
  action: (arg0: Allergie) => void;
};

const theme = "primary";
export default function DetailsHospitalisation() {
  return (
    <Modal
      isOpen={true}
      icon="fa fa-health-snake"
      theme={theme}
      size="sm:w-[50%]"
    >
      <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3">
        Détails Hospitalisation
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
        <div className="col-span-6">
          <label className="text-sm font-semibold">Date d'entrée</label>
          <h1 className="text-[1.8vh] text-slate-400 m-0.5"> Date </h1>
        </div>

        <div className="col-span-6">
          <label className="text-sm font-semibold">Mode d'entrée</label>
          <h1 className="text-[1.8vh] text-slate-400 m-0.5"> idk </h1>
        </div>
        <div className="col-span-6">
          <label className="text-sm font-semibold">Date de sortie</label>
          <h1 className="text-[1.8vh] text-slate-400 m-0.5"> Date </h1>
        </div>

        <div className="col-span-6">
          <label className="text-sm font-semibold">Mode de sortie </label>
          <h1 className="text-[1.8vh] text-slate-400 m-0.5"> idk </h1>
        </div>

        <div className="col-span-12">
          <label className="text-sm font-semibold">
            Motif d'Hospitalisation
          </label>
          <h1 className="text-[1.8vh] text-slate-400 m-0.5"> Marwa</h1>
        </div>
        <div className="col-span-12">
          <label className="text-sm font-semibold">
            Résumé d'Hospitalisation
          </label>
          <p className="text-[1.5vh] text-slate-400 m-0.5"> Marwa</p>
        </div>
      </div>

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
