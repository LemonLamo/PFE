import { PrinterIcon, BookmarkIcon } from "@heroicons/react/24/outline";

function ModalEdit({ labels, modalFields }) {
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box min-h-min w-full">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-red-600">
            ✕
          </button>
        </form>
        <div className="min-h-min w-full">
          {labels.map((item, index) => (
            <>
              <h1 className="text-left text-xl text-black"> {labels[index]}</h1>
              <input
                className="w-full mb-3"
                placeholder={modalFields[index]}
                type="text"
              />
            </>
          ))}
          <div className="min-h-min mt-10 w-full flex justify-center item-center">
            <button
              className="px-6 py-3 rounded-md text-white"
              style={{ backgroundColor: "#3ea1ec" }}
            >
              Save <PrinterIcon className="ml-2 h-[2vh]" />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default ModalEdit;
