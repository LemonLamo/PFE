import { ReactNode } from 'react'
import Card from './UI/Card'
type Props = {
    title: string,
    icon: string,
    children: ReactNode,
}

function StatisticsCard({title, icon, children} : Props) {
  return (
    <Card className="col-span-12 sm:col-span-6 lg:col-span-3 px-3">
        <div className="flex justify-between w-full">
            <div className="flex-none max-w-full px-3">
                <p className="mb-0 font-sans font-semibold leading-normal uppercase dark:text-white dark:opacity-60">{title}</p>
                {children}
                
            </div>
            <div className="px-3 text-right">
                <div className="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-blue-500 to-violet-500">
                    <i className={`${icon} text-2xl relative top-2 text-white`}></i>
                </div>
            </div>
        </div>
    </Card>
  )
}

export default StatisticsCard