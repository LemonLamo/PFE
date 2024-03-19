import React, { ReactNode } from 'react'

type Props = {
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    type: 'primary' | 'danger' | 'success' | 'primary-alternate',
    children: ReactNode,
    className?: string
}

const THEMES = {
    'primary': 'border text-cyan-500 border-cyan-500 rounded hover:bg-cyan-500 hover:text-white',
    'danger': 'border text-red-600 border-red-600 rounded hover:bg-red-500 hover:text-white',
    'success': 'border text-green-600 border-green-600 rounded hover:bg-green-500 hover:text-white',
    'primary-alternate': 'text-sky-600 font-semibold hover:text-sky-700'
}

function Button({ onClick, type, children, className='' }: Props) {
  return (
      <button onClick={onClick} className={`flex items-center justify-center py-2 px-4 font-semibold transition ${THEMES[type]} ${className}`} >
          {children}
      </button>
  )
}

export default Button