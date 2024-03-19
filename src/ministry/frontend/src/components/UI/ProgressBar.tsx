type ProgressBarProps = {
    title?: string,
    color: string,
    perc: number
}

function ProgressBar({title, color, perc} : ProgressBarProps) {
  return (
        <div className="w-full mb-5">
            { title && 
                <div className="flex mb-2">
                    <span className="mr-2 font-semibold leading-normal capitalize text-sm">{title}</span>
                    <span className="ml-auto font-semibold leading-normal text-sm">{perc}%</span>
                </div>
            }
            <div>
                <div className="h-0.75 text-xs flex overflow-visible rounded-lg bg-gray-200">
                  <div style={{ "width": `${perc}%` }} className={`${color} transition-width duration-600 ease-soft rounded-1 -mt-0.4 -ml-px flex h-1.5 flex-col justify-center overflow-hidden whitespace-nowrap text-center text-white`}></div>
                </div>
            </div>
        </div>
  )
}

export default ProgressBar