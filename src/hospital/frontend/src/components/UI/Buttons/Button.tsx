import React, { ReactNode } from 'react'

type Props = {
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    type?: 'submit' | 'reset' | 'button',
    theme: 'primary' | 'danger' | 'success' | 'primary-alternate',
    children: ReactNode,
    disabled?: boolean
    className?: string
}

const THEMES = {
    'primary': 'border text-cyan-500 border-cyan-500 rounded enabled:hover:bg-cyan-500 enabled:hover:text-white disabled:border-cyan-200 disabled:text-cyan-200',
    'danger': 'border text-red-600 border-red-600 rounded enabled:hover:bg-red-500 enabled:hover:text-white disabled:border-red-200 disabled:text-red-200',
    'success': 'border text-green-600 border-green-600 rounded enabled:hover:bg-green-500 enabled:hover:text-white disabled:border-green-200 disabled:text-green-200',
    'primary-alternate': 'text-sky-600 font-semibold enabled:hover:text-sky-700 disabled:text-cyan-200'
}

function Button({ onClick, type='button', theme, children, disabled=false, className='' }: Props) {
  return (
      <button type={type} onClick={onClick} disabled={disabled} className={`flex items-center justify-center py-2 px-4 font-semibold transition ${THEMES[theme]} ${className}`} >
          {children}
      </button>
  )
}

export default Button