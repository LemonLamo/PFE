import { ReactElement, useState } from "react"
import TabContent from "./TabContent";

type TabsProps = {
    children: ReactElement<TabContent>[]
}

function Tabs({children} : TabsProps) {
    const [selected, setSelected] = useState(0);
    
    const activeStyle = 'text-cyan-500 hover:text-cyan-600 border-cyan-500 hover:border-cyan-600'
    const inactiveStyle = 'text-gray-600 hover:text-gray-600 hover:border-gray-300 hover:border-gray-500'
    return (
        <div className="grid grid-cols-5 mb-3">
            <ul className="space-y-2 col-span-1">
                {
                    children.map((tab, i)=>{
                        return <li key={`tab${i}`}>
                            <button className={`${selected == i ? activeStyle : inactiveStyle} flex justify-start text-left w-full ps-2 py-3 border-b-2 text-sm`} onClick={() => setSelected(i)}>
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