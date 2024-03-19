import { ReactElement, useState } from "react"
import TabContent from "./TabContent";

type TabsProps = {
    type?: string,
    children: ReactElement<TabContent>[]
}

function Tabs({type="vertical", children} : TabsProps) {
    const [selected, setSelected] = useState(0);
    
    const activeStyle = 'text-cyan-500 hover:text-cyan-600 border-cyan-500 hover:border-cyan-600'
    const inactiveStyle = 'text-gray-600 hover:text-gray-600 hover:border-gray-300 hover:border-gray-500'
    return (
        <div className={`${type == "vertical"? "grid grid-cols-5" : ""} mb-3`}>
            <ul className={`${type == "vertical" ? "col-span-1 space-y-2" : "flex items-center"} mb-3`}>
                {
                    children.map((tab, i)=>{
                        return <li key={`tab${i}`}>
                            <button className={`${selected == i ? activeStyle : inactiveStyle} flex justify-start items-center text-left w-full ps-2 pe-6 py-3 border-b-2 text-sm`} onClick={() => setSelected(i)}>
                                {tab.props.icon && <i className={`${tab.props.icon} sm:me-2`} />}
                                <span className="hidden md:block">{tab.props.text}</span>
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