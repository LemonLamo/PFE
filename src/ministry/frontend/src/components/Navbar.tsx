import logo from "../assets/logo.svg"
type Props = {
    setOpen: () => void,
    className: string
}

function Navbar({ setOpen, className='' } : Props) {
  return (
    <div className={`ud-header flex w-full items-center bg-transparent container ${className}`}>
        <div className="container">
            <div className="relative -mx-4 flex items-center justify-between">
                <div className="w-20 max-w-full px-4">
                    <a href="index.html" className="navbar-logo block w-full py-5">
                        <img src={logo} alt="logo2" className="header-logo w-11/12" />
                    </a>
                </div>
                <div className="flex w-full items-center justify-between px-4">
                    <div>
                        <button id="navbarToggler"
                            className="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden">
                            <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                            <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                            <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                        </button>
                        <nav id="navbarCollapse" className="absolute right-4 top-full hidden w-full max-w-[250px] rounded-lg bg-white py-5 shadow-lg lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:py-0 lg:px-4 lg:shadow-none xl:px-6">
                            <ul className="blcok lg:flex">
                                <li className="group relative active">
                                    <a href="#home" className="text-cyan-900 hover:text-cyan-600 ud-menu-scroll mx-8 flex py-2 text-base text-dark group-hover:text-primary lg:mr-0 lg:inline-flex lg:py-6 lg:px-0 lg:text-primaryTextColor lg:group-hover:text-primary lg:group-hover:opacity-70"> Accueil </a>
                                </li>
                                <li className="group relative">
                                    <a href="#feature" className="text-cyan-900 hover:text-cyan-600 ud-menu-scroll mx-8 flex py-2 text-base text-dark group-hover:text-primary lg:mr-0 lg:ml-7 lg:inline-flex lg:py-6 lg:px-0 lg:text-primaryTextColor lg:group-hover:text-primary lg:group-hover:opacity-70 xl:ml-12"> Fonctionalité 2 </a>
                                </li>
                                <li className="group relative">
                                    <a href="#feature" className="text-cyan-900 hover:text-cyan-600 ud-menu-scroll mx-8 flex py-2 text-base text-dark group-hover:text-primary lg:mr-0 lg:ml-7 lg:inline-flex lg:py-6 lg:px-0 lg:text-primaryTextColor lg:group-hover:text-primary lg:group-hover:opacity-70 xl:ml-12"> Fonctionalité 3 </a>
                                </li>
                            </ul>
                        </nav>
                        <div className="flex items-center xl:hidden">
                            <a className="block p-0 transition-all ease-nav-brand text-sm text-slate-500">
                                <div className="w-4.5 overflow-hidden" onClick={setOpen}>
                                    <i id="top_bread" className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                                    <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                                    <i id="bottom_bread" className="ease-soft relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar