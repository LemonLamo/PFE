import { ReactElement, useState } from "react"
import TabContent from "./TabContent";

type TabsProps = {
    children: ReactElement<TabContent>[]
}

function Tabs({children} : TabsProps) {
    const [selected, setSelected] = useState(0);
    
    const activeStyle = 'text-cyan-500 hover:text-cyan-600 border-cyan-500 hover:border-cyan-700'
    const inactiveStyle = 'text-gray-600 hover:text-gray-700 hover:border-gray-300 hover:border-gray-600'
    return (
        <div className="md:flex">
            <ul className="flex-column space-y-2 text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 me-1">
                {
                    children.map((tab, i)=>{
                        return <li className="space-y-4">
                            <button className={`${selected == i ? activeStyle : inactiveStyle} flex items-center w-full ps-2 pe-8 py-4 border-b-2`} onClick={() => setSelected(i)}>
                                {tab.props.icon && <i className={`${tab.props.icon} me-2`} />}
                                {tab.props.text}
                            </button>
                        </li>
                    })
                }
            </ul>
            { 
                children[selected]
            }
        </div>


  )
}

export default Tabs