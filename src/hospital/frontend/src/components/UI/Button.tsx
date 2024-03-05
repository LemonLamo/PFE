import { MouseEvent, ReactNode } from "react"

type ButtonProps = {
    type: 'primary' | 'secondary' | 'primary-alternate' | 'danger' | 'danger-alternate' | 'no-style',
    onClick: (e?: MouseEvent) => void,
    children: ReactNode
    className?: string,
}

const BUTTON_STYLES : Record<string, string> = {
    'primary': 'text-sky-600 border border-sky-600 hover:bg-sky-400 hover:text-white',
    'primary-alternate': 'font-semibold bg-cyan-500 text-white hover:bg-cyan-600',
    'secondary': 'text-black-600 hover:text-black',
    'danger': 'text-red-600 border border-red-600 hover:bg-red-500 hover:text-white',
    'danger-alternate': 'font-semibold bg-red-500 text-white hover:bg-red-600',
    'no-style': 'font-semibold',
}

function Button({type, onClick, className, children} : ButtonProps) {

    return (
        <button onClick={(e) => onClick(e)} className={`flex items-center justify-center py-2 px-4 rounded font-semibold transition duration-50 ${BUTTON_STYLES[type]} ${className}`}>
            {children}
        </button>
    )
}

export default Button