import { Combobox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'
import { baseURL } from '../../config'
import TableLoading from '../UI/Loading'

type SelectProps = {
    state: {NIN: string, nom: string, prenom:string},
    onChange: any
    placeholder?: string,
    className?: string,
}

function InfirmiersSelect({ onChange, placeholder = '', className = '', state }: SelectProps) {
    const [options, setOptions] = useState<Personnel[]>()
    const [selectedOption, setSelectedOption] = useState(state)
    const [query, setQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        if (query.length >= 3){
            setIsLoading(true);
            axios.get(`${baseURL}/api/personnel?fonction=Infirmier&search=${query}`).then((response) => {
                setIsLoading(false);
                setOptions(response.data);
            });
        }
        else{
            setIsLoading(false);
            setOptions([])
        }
    }, [query])

    const filteredOptions = options === undefined ? [] : options.filter(
        (v) => v.NIN.toLowerCase().includes(query.toLowerCase()) ||
            `${v.nom} ${v.prenom}`.toLowerCase().includes(query.toLowerCase()) ||
            `${v.prenom} ${v.nom}`.toLowerCase().includes(query.toLowerCase()))

    useEffect(()=>{
        onChange(selectedOption)
    }, [selectedOption])

    return (
        <Combobox value={selectedOption} onChange={setSelectedOption} nullable>
            <div className={`relative w-full ${className}`}>
                <span className="text-sm top-3.5 left-2.5 absolute flex text-slate-500">
                    <i className="fas fa-user" aria-hidden="true"></i>
                </span>
                <Combobox.Button className="w-full">
                    <Combobox.Input displayValue={(o: any) => o && o.nom && `${o.nom} ${o.prenom}`} onChange={(event) => setQuery(event.target.value)} className="pl-8 w-full select cursor-default" placeholder={placeholder} autoComplete="off"/>
                    <ChevronDownIcon className="absolute right-3 top-3 h-4 w-4 text-gray-600 curious-pointer" aria-hidden="true" />
                </Combobox.Button>

                <Transition
                    enter="transition-opacity duration-25" enterFrom="opacity-0" enterTo="opacity-100"
                    leave="transition-opacity duration-50" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Combobox.Options className={`${(options?.length || 0) > 0? 'border ' : ''}cursor-default absolute w-full overflow-y-scroll max-h-[17.5rem] text-gray-700 border-cyan-600 placeholder:text-gray-500 shadow-soft-2xl focus:transition-shadow focus:ring-0 focus:border-sky-600 rounded-sm bg-white`}>
                        {
                            isLoading ? <div className='py-2'><TableLoading /></div> :
                            filteredOptions.map((o, i) => (
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
                            ))
                        }
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    )
}

export default InfirmiersSelect