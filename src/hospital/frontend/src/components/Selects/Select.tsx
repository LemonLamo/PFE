import { Combobox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'
import TableLoading from '../UI/Loading'
import { baseURL } from '../../config'

type Props<T> = {
    url: 'maladies-chroniques' | 'maladies' | 'maladies-chroniques' | 'allergenes' | 'vaccins' | 'examens-cliniques' | 'medicaments' | 'bilans' | 'radios' |'interventions' | 'handicaps',
    code: keyof T,
    designation: keyof T,
    onChange: (arg0: T) => void,
    placeholder?: string,
    className?: string,
}

function Select<T>({url, code, designation, onChange, placeholder = '', className = ''}: Props<T>) {
    const [options, setOptions] = useState<T[]>()
    const [selectedOption, setSelectedOption] = useState<T>({} as T);
    const [query, setQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true);
        axios.get(`${baseURL}/api/codifications/${url}?search=${query}`).then((response) => {
            setIsLoading(false);
            setOptions(response.data);
        });
    }, [query])

    const filteredOptions = options ?? []

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
                    <Combobox.Input displayValue={(o: T) => o && o[code] && `${o[code]} - ${o[designation]}`} onChange={(event) => setQuery(event.target.value)} className={`pl-8 w-full select cursor-default ${className}`} placeholder={placeholder} autoComplete="off"/>
                    <ChevronDownIcon className="absolute right-3 top-3 h-4 w-4 text-gray-600 curious-pointer" aria-hidden="true" />
                </Combobox.Button>

                <Transition
                    enter="transition-opacity duration-25" enterFrom="opacity-0" enterTo="opacity-100"
                    leave="transition-opacity duration-50" leaveFrom="opacity-100" leaveTo="opacity-0"
                    className="z-[1]">
                    <Combobox.Options className={`${(options?.length || 0) > 0? 'border ' : ''}cursor-default absolute w-full overflow-y-scroll max-h-[17.5rem] text-gray-700 border-cyan-600 placeholder:text-gray-500 shadow-soft-2xl focus:transition-shadow focus:ring-0 focus:border-sky-600 rounded-sm bg-white z-[1]`}>
                        {
                            isLoading ? <div className='py-2'><TableLoading /></div> :
                            filteredOptions.map((o, i) => (
                                <Combobox.Option key={i} value={o} as={Fragment}>
                                    {({ active }) => (<li className={`px-2 py-1 text-md ${active ? 'bg-sky-500 text-white' : 'bg-white text-slate-800'}`}> {`${o[code]} - ${o[designation]}`}</li>)}
                                </Combobox.Option>
                            ))
                        }
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    )
}

export default Select