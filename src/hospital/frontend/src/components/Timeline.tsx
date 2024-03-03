function Timeline() {
  return (
      <div className="w-full max-w-full md:w-1/2 md:flex-none lg:w-1/3 lg:flex-none mb-4">
          <div className="border-black/12.5 shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-lg border-0 border-solid bg-white bg-clip-border">
              <div className="border-black/12.5 mb-0 rounded-lg border-b-0 border-solid bg-white p-6 pb-0">
                  <h6>Cool Timeline</h6>
                  <p className="leading-normal text-sm">
                      <i className="fa fa-arrow-up text-lime-500" aria-hidden="true"></i>
                      <span className="font-semibold">24%</span> this month
                  </p>
              </div>
              <div className="flex-auto p-4">
                  <div className="before:border-r-solid relative before:absolute before:top-0 before:left-4 before:h-full before:border-r-2 before:border-r-slate-100 before:content-[''] before:lg:-ml-px">
                      <div className="relative mb-4 mt-0 after:clear-both after:table after:content-['']">
                          <span className="w-6.5 h-6.5 text-base absolute left-4 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white text-center font-semibold">
                              <i className="fa fa-bell relative text-transparent leading-none leading-pro bg-gradient-to-tl from-green-600 to-lime-400 bg-clip-text fill-transparent"></i>
                          </span>
                          <div className="ml-11.252 pt-1.4 lg:max-w-120 relative -top-1.5 w-auto">
                              <h6 className="mb-0 font-semibold leading-normal text-sm text-slate-700">$2400, Design changes</h6>
                              <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">22 DEC 7:20 PM</p>
                          </div>
                      </div>
                      <div className="relative mb-4 after:clear-both after:table after:content-['']">
                          <span
                              className="w-6.5 h-6.5 text-base absolute left-4 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white text-center font-semibold">
                              <i className="fa fa-bell relative text-transparent leading-none leading-pro bg-gradient-to-tl from-red-600 to-rose-400 bg-clip-text fill-transparent"></i>
                          </span>
                          <div className="ml-11.252 pt-1.4 lg:max-w-120 relative -top-1.5 w-auto">
                              <h6 className="mb-0 font-semibold leading-normal text-sm text-slate-700">New order
                                  #1832412</h6>
                              <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">21 DEC
                                  11 PM</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Timeline