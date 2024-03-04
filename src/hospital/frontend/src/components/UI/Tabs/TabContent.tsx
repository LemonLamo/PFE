import { ReactNode } from "react"

type TabContent = {
    icon?: string
    text: string
    children: ReactNode
}
function TabContent({ children }: TabContent) {
  return (
      <div className="p-6 w-full bg-gray-50/50">
          {children}
      </div>
  )
}

export default TabContent