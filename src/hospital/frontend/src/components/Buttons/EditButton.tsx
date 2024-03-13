import React from 'react'

function EditButton({ onClick }) {
  return (
      <button onClick={onClick} className="w-4 text-yellow-500 hover:text-yellow-700 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
          </svg>
      </button>
  )
}

export default EditButton