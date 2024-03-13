import { Combobox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Fragment, useEffect, useState } from 'react'

type SelectProps = {
    options: {NIN: string, nom: string, prenom: string}[],
    state: {NIN: string, nom: string, prenom:string},
    onChange: any
    placeholder?: string,
    className?: string,
}

function PatientsSelect({ options, onChange, placeholder = '', className = '', state }: SelectProps) {
    const [selectedPatient, setSelectedPatient] = useState(state)
    const [query, setQuery] = useState('')

    const filteredOptions = query === '' ? options : options.filter(
        (v) => v.NIN.toLowerCase().includes(query.toLowerCase()) || 
               `${v.nom} ${v.prenom}`.toLowerCase().includes(query.toLowerCase()) ||
               `${v.prenom} ${v.nom}`.toLowerCase().includes(query.toLowerCase()))

    useEffect(()=>{
        onChange(selectedPatient)
    }, [selectedPatient])

    return (
        <Combobox value={selectedPatient} onChange={setSelectedPatient} nullable>
            <div className={`z-10 relative w-full ${className}`}>
                <span className="text-sm top-3.5 left-2.5 absolute flex text-slate-500">
                    <i className="fas fa-user" aria-hidden="true"></i>
                </span>
                <Combobox.Button className="w-full">
                    <Combobox.Input displayValue={(o: any) => o && o.nom && `${o.nom} ${o.prenom}`} onChange={(event) => setQuery(event.target.value)} className="pl-9 w-full select cursor-default" placeholder={placeholder} />
                    <ChevronDownIcon className="absolute right-3 top-3 h-4 w-4 text-gray-600 curious-pointer" aria-hidden="true" />
                </Combobox.Button>

                <Combobox.Options className="absolute w-full overflow-y-scroll max-h-[17.5rem] text-gray-700 border border-sky-700 placeholder:text-gray-500 shadow-soft-2xl focus:transition-shadow focus:ring-0 focus:border-sky-600 rounded-xs">
                    {filteredOptions.map((o, i) => (
                        <Combobox.Option key={i} value={o} as={Fragment}>
                            {({ active }) => (
                                <li className={`flex px-2 py-1 text-md ${active ? 'bg-sky-500' : 'bg-white'}`}>
                                    <img className="rounded-full w-12 me-2" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"></img>
                                    <div>
                                        <h6 className={`mb-0 ${active ? 'text-white' : 'text-slate-700'}`}>{o.nom} {o.prenom}</h6>
                                        <p className={`mb-0 font-semibold mt-[-0.4rem] ${active ? 'text-white' : 'text-gray-500'}`}>NIN: {o.NIN}</p>
                                    </div>
                                </li>
                            )}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </div>
        </Combobox>
    )
}

export default PatientsSelect