import { Combobox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Fragment, useEffect, useState } from 'react'

type SelectProps = {
    options: {key: string, value: string}[],
    state: {key: string, value: string},
    onChange: any
    placeholder?: string,
    className?: string,
}

function Select({ options, onChange, placeholder = '', className = '', state }: SelectProps) {
    const [selectedOption, setSelectedOption] = useState(state)
    const [query, setQuery] = useState('')

    const filteredOptions = query === '' ? options : options.filter((v) => v.value.toLowerCase().includes(query.toLowerCase()))

    useEffect(()=>{
        onChange(selectedOption)
    }, [selectedOption])

    return (
        <Combobox value={selectedOption} onChange={setSelectedOption}>
            <div className={`relative w-full ${className}`}>
                <Combobox.Button className="w-full">
                    <Combobox.Input displayValue={(o: any) => o.value} onChange={(event) => setQuery(event.target.value)} className="w-full select cursor-default" placeholder={placeholder} />
                    <ChevronDownIcon className="absolute right-3 top-[50%] bottom-[50%] mt-[-0.5rem] h-4 w-4 text-gray-600 curious-pointer" aria-hidden="true" />
                </Combobox.Button>

                <Combobox.Options className="absolute w-full overflow-y-scroll max-h-34 text-gray-700 border border-sky-700 placeholder:text-gray-500 shadow-soft-2xl focus:transition-shadow focus:ring-0 focus:border-sky-600 rounded-xs">
                    {filteredOptions.map((o, i) => (
                        <Combobox.Option key={i} value={o} as={Fragment}>
                            {({ active }) => (
                                <li className={`px-2 py-1 text-md ${active ? 'bg-sky-500 text-white' : 'bg-white text-slate-800'}`}> {o.key} - {o.value} </li>
                            
                            )}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </div>
        </Combobox>
    )
}

export default Select