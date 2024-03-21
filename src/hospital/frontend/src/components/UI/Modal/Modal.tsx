import { ReactNode} from "react"

type ModalProps = {
  icon?: string,
  theme?: 'primary' | 'success' | 'danger',
  children : ReactNode,
  actionText?: string,
  cancelText?: string,
  onAction?: () => void,
  onCancel: () => void
  size?: string
}

const THEMES = {
  'primary': { color: "bg-cyan-500", offColor: "bg-cyan-100", iconColor: "text-cyan-500" },
  'success': { color: "bg-green-500", offColor: "bg-green-100", iconColor: "text-green-500" },
  'danger': { color: "bg-red-500", offColor: "bg-red-100", iconColor: "text-red-500" }
}

function Modal({ icon, theme='primary', children, actionText = 'Submit', cancelText = 'Cancel', onAction, onCancel, size ="sm:max-w-lg" } : ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className={`relative transform rounded-md bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full ${size}`}>
          <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start w-full">
              { icon &&
              <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${THEMES[theme].offColor} sm:mx-0 sm:h-10 sm:w-10`}>
                <i className={`${icon} ${THEMES[theme].iconColor}`} />
              </div>
              }
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                {children}
              </div>
            </div>
          </div>
          <div className="pe-3 py-3 flex justify-end gap-3">
            {onAction && <button className={`${THEMES[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={onAction}>{actionText}</button>}
            <button className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={onCancel}>{cancelText}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal