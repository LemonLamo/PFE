import { ReactNode} from "react"

type ModalProps = {
  icon?: string,
  color: string,
  offColor?: string,
  iconColor?: string,
  children : ReactNode,
  actionText?: string,
  cancelText?: string,
  onAction?: () => void,
  onCancel: () => void
}

function Modal({ icon, color, offColor, iconColor, children, actionText='Submit', cancelText='Cancel', onAction, onCancel } : ModalProps) {
  return (
    <div className="z-10 fixed inset-0 bg-black/50 transition-opacity">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              { icon &&
              <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${offColor} sm:mx-0 sm:h-10 sm:w-10`}>
                <i className={`${icon} ${iconColor}`} />
              </div>
              }
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                {children}
              </div>
            </div>
          </div>
          <div className="pe-3 py-3 flex justify-end gap-3">
            {onAction && <button className={`${color} w-full rounded-md px-3 py-2 font-semibold text-white sm:w-auto`} onClick={onAction}>{actionText}</button>}
            <button className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={onCancel}>{cancelText}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal