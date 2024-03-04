function Modal({ labels, modalFields }) {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box min-h-min w-full">
        <div className="min-h-min w-full">
          {labels.map((item, index) => (
            <>
              <h1 className="text-left text-xl text-black"> {labels[index]}</h1>
              <h1 className="text-left text-lg text-gray">
                {modalFields[index]}
              </h1>
            </>
          ))}
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;
