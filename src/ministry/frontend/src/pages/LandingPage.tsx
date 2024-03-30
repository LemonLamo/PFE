import logo from "../assets/logo.svg"
import doctor from "../assets/doctor.png"
import doctor2 from "../assets/doctor2.png"
import preventive_health_care from "../assets/preventive-health-care.gif"

function LandingPage() {
  return (<>
    <div className="ud-header absolute top-0 left-0 z-40 flex w-full items-center bg-transparent">
        <div className="container">
            <div className="relative -mx-4 flex items-center justify-between">
                <div className="w-20 max-w-full px-4">
                    <a href="index.html" className="navbar-logo block w-full py-5">
                        <img src={logo} alt="logo2" className="header-logo w-11/12 h-12" />
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
                                <li className="group relative">
                                    <a href="#home" className="text-cyan-900 hover:text-cyan-600 ud-menu-scroll mx-8 flex py-2 text-base text-dark group-hover:text-primary lg:mr-0 lg:inline-flex lg:py-6 lg:px-0 lg:text-primaryTextColor lg:group-hover:text-primary lg:group-hover:opacity-70"> Accueil </a>
                                </li>
                                <li className="group relative">
                                    <a href="#about" className="text-cyan-900 hover:text-cyan-600 ud-menu-scroll mx-8 flex py-2 text-base text-dark group-hover:text-primary lg:mr-0 lg:ml-7 lg:inline-flex lg:py-6 lg:px-0 lg:text-primaryTextColor lg:group-hover:text-primary lg:group-hover:opacity-70 xl:ml-12"> À propos </a>
                                </li>
                                <li className="group relative">
                                    <a href="#feature" className="text-cyan-900 hover:text-cyan-600 ud-menu-scroll mx-8 flex py-2 text-base text-dark group-hover:text-primary lg:mr-0 lg:ml-7 lg:inline-flex lg:py-6 lg:px-0 lg:text-primaryTextColor lg:group-hover:text-primary lg:group-hover:opacity-70 xl:ml-12"> Fonctionalités </a>
                                </li>
                                <li className="group relative">
                                    <a href="#mission" className="text-cyan-900 hover:text-cyan-600 ud-menu-scroll mx-8 flex py-2 text-base text-dark group-hover:text-primary lg:mr-0 lg:ml-7 lg:inline-flex lg:py-6 lg:px-0 lg:text-primaryTextColor lg:group-hover:text-primary lg:group-hover:opacity-70 xl:ml-12"> Notre mission </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
        <div id="home" className="relative overflow-hidden bg-gradient-to-r from-[#ecfef5] to-[#fee5d3] pt-[120px] md:pt-[130px] lg:pt-[160px] h-[100vh]">
        <div className="container">
            <div className="-mx-4 flex flex-wrap items-center">
                <div className="w-full md:w-1/2 px-4">
                    <div className="hero-content wow fadeInUp mx-auto max-w-[780px]" data-wow-delay=".2s">
                        <h1 className="mb-8 text-3xl font-bold leading-snug text-primaryTextColor sm:text-4xl sm:leading-snug md:text-[45px] md:leading-snug">
                            À tout moment et en tout lieu
                        </h1>
                        <p className="mx-auto mb-10 max-w-[600px] text-sm text-primaryTextColor sm:text-lg sm:leading-normal">
                            Autonomiser les professionnels de la santé et améliorer les
                            soins aux patients grâce à une intégration numérique fluide !
                        </p>

                        <ul className="mb-10 flex flex-wrap items-center justify-start gap-3">
                            <li>
                                <a href="login" className="flex items-center py-2 px-4 text-base rounded-full border border-primary bg-white font-medium text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-white sm:px-6"> Se connecter</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="w-full md:w-1/2 px-4">
                    <div className="wow fadeInUp relative z-10 mx-auto max-w-[845px] -top-14" data-wow-delay=".25s">
                        <div className="">
                            <img src={doctor} alt="hero"
                                className="mx-auto h-[70%] max-h-min max-w-full rounded-t-xl rounded-tr-xl" />
                        </div>
                        <div className="absolute bottom-0 -left-9 z-[-1]">
                            <svg width="134" height="106" viewBox="0 0 134 106" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <circle cx="1.66667" cy="104" r="1.66667" transform="rotate(-90 1.66667 104)"
                                    fill="white" />
                                <circle cx="16.3333" cy="104" r="1.66667" transform="rotate(-90 16.3333 104)"
                                    fill="white" />
                                <circle cx="31" cy="104" r="1.66667" transform="rotate(-90 31 104)" fill="white" />
                                <circle cx="45.6667" cy="104" r="1.66667" transform="rotate(-90 45.6667 104)"
                                    fill="white" />
                                <circle cx="60.3333" cy="104" r="1.66667" transform="rotate(-90 60.3333 104)"
                                    fill="white" />
                                <circle cx="88.6667" cy="104" r="1.66667" transform="rotate(-90 88.6667 104)"
                                    fill="white" />
                                <circle cx="117.667" cy="104" r="1.66667" transform="rotate(-90 117.667 104)"
                                    fill="white" />
                                <circle cx="74.6667" cy="104" r="1.66667" transform="rotate(-90 74.6667 104)"
                                    fill="white" />
                                <circle cx="103" cy="104" r="1.66667" transform="rotate(-90 103 104)" fill="white" />
                                <circle cx="132" cy="104" r="1.66667" transform="rotate(-90 132 104)" fill="white" />
                                <circle cx="1.66667" cy="89.3333" r="1.66667" transform="rotate(-90 1.66667 89.3333)"
                                    fill="white" />
                                <circle cx="16.3333" cy="89.3333" r="1.66667" transform="rotate(-90 16.3333 89.3333)"
                                    fill="white" />
                                <circle cx="31" cy="89.3333" r="1.66667" transform="rotate(-90 31 89.3333)"
                                    fill="white" />
                                <circle cx="45.6667" cy="89.3333" r="1.66667" transform="rotate(-90 45.6667 89.3333)"
                                    fill="white" />
                                <circle cx="60.3333" cy="89.3338" r="1.66667" transform="rotate(-90 60.3333 89.3338)"
                                    fill="white" />
                                <circle cx="88.6667" cy="89.3338" r="1.66667" transform="rotate(-90 88.6667 89.3338)"
                                    fill="white" />
                                <circle cx="117.667" cy="89.3338" r="1.66667" transform="rotate(-90 117.667 89.3338)"
                                    fill="white" />
                                <circle cx="74.6667" cy="89.3338" r="1.66667" transform="rotate(-90 74.6667 89.3338)"
                                    fill="white" />
                                <circle cx="103" cy="89.3338" r="1.66667" transform="rotate(-90 103 89.3338)"
                                    fill="white" />
                                <circle cx="132" cy="89.3338" r="1.66667" transform="rotate(-90 132 89.3338)"
                                    fill="white" />
                                <circle cx="1.66667" cy="74.6673" r="1.66667" transform="rotate(-90 1.66667 74.6673)"
                                    fill="white" />
                                <circle cx="1.66667" cy="31.0003" r="1.66667" transform="rotate(-90 1.66667 31.0003)"
                                    fill="white" />
                                <circle cx="16.3333" cy="74.6668" r="1.66667" transform="rotate(-90 16.3333 74.6668)"
                                    fill="white" />
                                <circle cx="16.3333" cy="31.0003" r="1.66667" transform="rotate(-90 16.3333 31.0003)"
                                    fill="white" />
                                <circle cx="31" cy="74.6668" r="1.66667" transform="rotate(-90 31 74.6668)"
                                    fill="white" />
                                <circle cx="31" cy="31.0003" r="1.66667" transform="rotate(-90 31 31.0003)"
                                    fill="white" />
                                <circle cx="45.6667" cy="74.6668" r="1.66667" transform="rotate(-90 45.6667 74.6668)"
                                    fill="white" />
                                <circle cx="45.6667" cy="31.0003" r="1.66667" transform="rotate(-90 45.6667 31.0003)"
                                    fill="white" />
                                <circle cx="60.3333" cy="74.6668" r="1.66667" transform="rotate(-90 60.3333 74.6668)"
                                    fill="white" />
                                <circle cx="60.3333" cy="31.0001" r="1.66667" transform="rotate(-90 60.3333 31.0001)"
                                    fill="white" />
                                <circle cx="88.6667" cy="74.6668" r="1.66667" transform="rotate(-90 88.6667 74.6668)"
                                    fill="white" />
                                <circle cx="88.6667" cy="31.0001" r="1.66667" transform="rotate(-90 88.6667 31.0001)"
                                    fill="white" />
                                <circle cx="117.667" cy="74.6668" r="1.66667" transform="rotate(-90 117.667 74.6668)"
                                    fill="white" />
                                <circle cx="117.667" cy="31.0001" r="1.66667" transform="rotate(-90 117.667 31.0001)"
                                    fill="white" />
                                <circle cx="74.6667" cy="74.6668" r="1.66667" transform="rotate(-90 74.6667 74.6668)"
                                    fill="white" />
                                <circle cx="74.6667" cy="31.0001" r="1.66667" transform="rotate(-90 74.6667 31.0001)"
                                    fill="white" />
                                <circle cx="103" cy="74.6668" r="1.66667" transform="rotate(-90 103 74.6668)"
                                    fill="white" />
                                <circle cx="103" cy="31.0001" r="1.66667" transform="rotate(-90 103 31.0001)"
                                    fill="white" />
                                <circle cx="132" cy="74.6668" r="1.66667" transform="rotate(-90 132 74.6668)"
                                    fill="white" />
                                <circle cx="132" cy="31.0001" r="1.66667" transform="rotate(-90 132 31.0001)"
                                    fill="white" />
                                <circle cx="1.66667" cy="60.0003" r="1.66667" transform="rotate(-90 1.66667 60.0003)"
                                    fill="white" />
                                <circle cx="1.66667" cy="16.3336" r="1.66667" transform="rotate(-90 1.66667 16.3336)"
                                    fill="white" />
                                <circle cx="16.3333" cy="60.0003" r="1.66667" transform="rotate(-90 16.3333 60.0003)"
                                    fill="white" />
                                <circle cx="16.3333" cy="16.3336" r="1.66667" transform="rotate(-90 16.3333 16.3336)"
                                    fill="white" />
                                <circle cx="31" cy="60.0003" r="1.66667" transform="rotate(-90 31 60.0003)"
                                    fill="white" />
                                <circle cx="31" cy="16.3336" r="1.66667" transform="rotate(-90 31 16.3336)"
                                    fill="white" />
                                <circle cx="45.6667" cy="60.0003" r="1.66667" transform="rotate(-90 45.6667 60.0003)"
                                    fill="white" />
                                <circle cx="45.6667" cy="16.3336" r="1.66667" transform="rotate(-90 45.6667 16.3336)"
                                    fill="white" />
                                <circle cx="60.3333" cy="60.0003" r="1.66667" transform="rotate(-90 60.3333 60.0003)"
                                    fill="white" />
                                <circle cx="60.3333" cy="16.3336" r="1.66667" transform="rotate(-90 60.3333 16.3336)"
                                    fill="white" />
                                <circle cx="88.6667" cy="60.0003" r="1.66667" transform="rotate(-90 88.6667 60.0003)"
                                    fill="white" />
                                <circle cx="88.6667" cy="16.3336" r="1.66667" transform="rotate(-90 88.6667 16.3336)"
                                    fill="white" />
                                <circle cx="117.667" cy="60.0003" r="1.66667" transform="rotate(-90 117.667 60.0003)"
                                    fill="white" />
                                <circle cx="117.667" cy="16.3336" r="1.66667" transform="rotate(-90 117.667 16.3336)"
                                    fill="white" />
                                <circle cx="74.6667" cy="60.0003" r="1.66667" transform="rotate(-90 74.6667 60.0003)"
                                    fill="white" />
                                <circle cx="74.6667" cy="16.3336" r="1.66667" transform="rotate(-90 74.6667 16.3336)"
                                    fill="white" />
                                <circle cx="103" cy="60.0003" r="1.66667" transform="rotate(-90 103 60.0003)"
                                    fill="white" />
                                <circle cx="103" cy="16.3336" r="1.66667" transform="rotate(-90 103 16.3336)"
                                    fill="white" />
                                <circle cx="132" cy="60.0003" r="1.66667" transform="rotate(-90 132 60.0003)"
                                    fill="white" />
                                <circle cx="132" cy="16.3336" r="1.66667" transform="rotate(-90 132 16.3336)"
                                    fill="white" />
                                <circle cx="1.66667" cy="45.3336" r="1.66667" transform="rotate(-90 1.66667 45.3336)"
                                    fill="white" />
                                <circle cx="1.66667" cy="1.66683" r="1.66667" transform="rotate(-90 1.66667 1.66683)"
                                    fill="white" />
                                <circle cx="16.3333" cy="45.3336" r="1.66667" transform="rotate(-90 16.3333 45.3336)"
                                    fill="white" />
                                <circle cx="16.3333" cy="1.66683" r="1.66667" transform="rotate(-90 16.3333 1.66683)"
                                    fill="white" />
                                <circle cx="31" cy="45.3336" r="1.66667" transform="rotate(-90 31 45.3336)"
                                    fill="white" />
                                <circle cx="31" cy="1.66683" r="1.66667" transform="rotate(-90 31 1.66683)"
                                    fill="white" />
                                <circle cx="45.6667" cy="45.3336" r="1.66667" transform="rotate(-90 45.6667 45.3336)"
                                    fill="white" />
                                <circle cx="45.6667" cy="1.66683" r="1.66667" transform="rotate(-90 45.6667 1.66683)"
                                    fill="white" />
                                <circle cx="60.3333" cy="45.3338" r="1.66667" transform="rotate(-90 60.3333 45.3338)"
                                    fill="white" />
                                <circle cx="60.3333" cy="1.66707" r="1.66667" transform="rotate(-90 60.3333 1.66707)"
                                    fill="white" />
                                <circle cx="88.6667" cy="45.3338" r="1.66667" transform="rotate(-90 88.6667 45.3338)"
                                    fill="white" />
                                <circle cx="88.6667" cy="1.66707" r="1.66667" transform="rotate(-90 88.6667 1.66707)"
                                    fill="white" />
                                <circle cx="117.667" cy="45.3338" r="1.66667" transform="rotate(-90 117.667 45.3338)"
                                    fill="white" />
                                <circle cx="117.667" cy="1.66707" r="1.66667" transform="rotate(-90 117.667 1.66707)"
                                    fill="white" />
                                <circle cx="74.6667" cy="45.3338" r="1.66667" transform="rotate(-90 74.6667 45.3338)"
                                    fill="white" />
                                <circle cx="74.6667" cy="1.66707" r="1.66667" transform="rotate(-90 74.6667 1.66707)"
                                    fill="white" />
                                <circle cx="103" cy="45.3338" r="1.66667" transform="rotate(-90 103 45.3338)"
                                    fill="white" />
                                <circle cx="103" cy="1.66707" r="1.66667" transform="rotate(-90 103 1.66707)"
                                    fill="white" />
                                <circle cx="132" cy="45.3338" r="1.66667" transform="rotate(-90 132 45.3338)"
                                    fill="white" />
                                <circle cx="132" cy="1.66707" r="1.66667" transform="rotate(-90 132 1.66707)"
                                    fill="white" />
                            </svg>
                        </div>
                        <div className="absolute -top-6 -right-6 z-[-1]">
                            <svg width="134" height="106" viewBox="0 0 134 106" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <circle cx="1.66667" cy="104" r="1.66667" transform="rotate(-90 1.66667 104)"
                                    fill="white" />
                                <circle cx="16.3333" cy="104" r="1.66667" transform="rotate(-90 16.3333 104)"
                                    fill="white" />
                                <circle cx="31" cy="104" r="1.66667" transform="rotate(-90 31 104)" fill="white" />
                                <circle cx="45.6667" cy="104" r="1.66667" transform="rotate(-90 45.6667 104)"
                                    fill="white" />
                                <circle cx="60.3333" cy="104" r="1.66667" transform="rotate(-90 60.3333 104)"
                                    fill="white" />
                                <circle cx="88.6667" cy="104" r="1.66667" transform="rotate(-90 88.6667 104)"
                                    fill="white" />
                                <circle cx="117.667" cy="104" r="1.66667" transform="rotate(-90 117.667 104)"
                                    fill="white" />
                                <circle cx="74.6667" cy="104" r="1.66667" transform="rotate(-90 74.6667 104)"
                                    fill="white" />
                                <circle cx="103" cy="104" r="1.66667" transform="rotate(-90 103 104)" fill="white" />
                                <circle cx="132" cy="104" r="1.66667" transform="rotate(-90 132 104)" fill="white" />
                                <circle cx="1.66667" cy="89.3333" r="1.66667" transform="rotate(-90 1.66667 89.3333)"
                                    fill="white" />
                                <circle cx="16.3333" cy="89.3333" r="1.66667" transform="rotate(-90 16.3333 89.3333)"
                                    fill="white" />
                                <circle cx="31" cy="89.3333" r="1.66667" transform="rotate(-90 31 89.3333)"
                                    fill="white" />
                                <circle cx="45.6667" cy="89.3333" r="1.66667" transform="rotate(-90 45.6667 89.3333)"
                                    fill="white" />
                                <circle cx="60.3333" cy="89.3338" r="1.66667" transform="rotate(-90 60.3333 89.3338)"
                                    fill="white" />
                                <circle cx="88.6667" cy="89.3338" r="1.66667" transform="rotate(-90 88.6667 89.3338)"
                                    fill="white" />
                                <circle cx="117.667" cy="89.3338" r="1.66667" transform="rotate(-90 117.667 89.3338)"
                                    fill="white" />
                                <circle cx="74.6667" cy="89.3338" r="1.66667" transform="rotate(-90 74.6667 89.3338)"
                                    fill="white" />
                                <circle cx="103" cy="89.3338" r="1.66667" transform="rotate(-90 103 89.3338)"
                                    fill="white" />
                                <circle cx="132" cy="89.3338" r="1.66667" transform="rotate(-90 132 89.3338)"
                                    fill="white" />
                                <circle cx="1.66667" cy="74.6673" r="1.66667" transform="rotate(-90 1.66667 74.6673)"
                                    fill="white" />
                                <circle cx="1.66667" cy="31.0003" r="1.66667" transform="rotate(-90 1.66667 31.0003)"
                                    fill="white" />
                                <circle cx="16.3333" cy="74.6668" r="1.66667" transform="rotate(-90 16.3333 74.6668)"
                                    fill="white" />
                                <circle cx="16.3333" cy="31.0003" r="1.66667" transform="rotate(-90 16.3333 31.0003)"
                                    fill="white" />
                                <circle cx="31" cy="74.6668" r="1.66667" transform="rotate(-90 31 74.6668)"
                                    fill="white" />
                                <circle cx="31" cy="31.0003" r="1.66667" transform="rotate(-90 31 31.0003)"
                                    fill="white" />
                                <circle cx="45.6667" cy="74.6668" r="1.66667" transform="rotate(-90 45.6667 74.6668)"
                                    fill="white" />
                                <circle cx="45.6667" cy="31.0003" r="1.66667" transform="rotate(-90 45.6667 31.0003)"
                                    fill="white" />
                                <circle cx="60.3333" cy="74.6668" r="1.66667" transform="rotate(-90 60.3333 74.6668)"
                                    fill="white" />
                                <circle cx="60.3333" cy="31.0001" r="1.66667" transform="rotate(-90 60.3333 31.0001)"
                                    fill="white" />
                                <circle cx="88.6667" cy="74.6668" r="1.66667" transform="rotate(-90 88.6667 74.6668)"
                                    fill="white" />
                                <circle cx="88.6667" cy="31.0001" r="1.66667" transform="rotate(-90 88.6667 31.0001)"
                                    fill="white" />
                                <circle cx="117.667" cy="74.6668" r="1.66667" transform="rotate(-90 117.667 74.6668)"
                                    fill="white" />
                                <circle cx="117.667" cy="31.0001" r="1.66667" transform="rotate(-90 117.667 31.0001)"
                                    fill="white" />
                                <circle cx="74.6667" cy="74.6668" r="1.66667" transform="rotate(-90 74.6667 74.6668)"
                                    fill="white" />
                                <circle cx="74.6667" cy="31.0001" r="1.66667" transform="rotate(-90 74.6667 31.0001)"
                                    fill="white" />
                                <circle cx="103" cy="74.6668" r="1.66667" transform="rotate(-90 103 74.6668)"
                                    fill="white" />
                                <circle cx="103" cy="31.0001" r="1.66667" transform="rotate(-90 103 31.0001)"
                                    fill="white" />
                                <circle cx="132" cy="74.6668" r="1.66667" transform="rotate(-90 132 74.6668)"
                                    fill="white" />
                                <circle cx="132" cy="31.0001" r="1.66667" transform="rotate(-90 132 31.0001)"
                                    fill="white" />
                                <circle cx="1.66667" cy="60.0003" r="1.66667" transform="rotate(-90 1.66667 60.0003)"
                                    fill="white" />
                                <circle cx="1.66667" cy="16.3336" r="1.66667" transform="rotate(-90 1.66667 16.3336)"
                                    fill="white" />
                                <circle cx="16.3333" cy="60.0003" r="1.66667" transform="rotate(-90 16.3333 60.0003)"
                                    fill="white" />
                                <circle cx="16.3333" cy="16.3336" r="1.66667" transform="rotate(-90 16.3333 16.3336)"
                                    fill="white" />
                                <circle cx="31" cy="60.0003" r="1.66667" transform="rotate(-90 31 60.0003)"
                                    fill="white" />
                                <circle cx="31" cy="16.3336" r="1.66667" transform="rotate(-90 31 16.3336)"
                                    fill="white" />
                                <circle cx="45.6667" cy="60.0003" r="1.66667" transform="rotate(-90 45.6667 60.0003)"
                                    fill="white" />
                                <circle cx="45.6667" cy="16.3336" r="1.66667" transform="rotate(-90 45.6667 16.3336)"
                                    fill="white" />
                                <circle cx="60.3333" cy="60.0003" r="1.66667" transform="rotate(-90 60.3333 60.0003)"
                                    fill="white" />
                                <circle cx="60.3333" cy="16.3336" r="1.66667" transform="rotate(-90 60.3333 16.3336)"
                                    fill="white" />
                                <circle cx="88.6667" cy="60.0003" r="1.66667" transform="rotate(-90 88.6667 60.0003)"
                                    fill="white" />
                                <circle cx="88.6667" cy="16.3336" r="1.66667" transform="rotate(-90 88.6667 16.3336)"
                                    fill="white" />
                                <circle cx="117.667" cy="60.0003" r="1.66667" transform="rotate(-90 117.667 60.0003)"
                                    fill="white" />
                                <circle cx="117.667" cy="16.3336" r="1.66667" transform="rotate(-90 117.667 16.3336)"
                                    fill="white" />
                                <circle cx="74.6667" cy="60.0003" r="1.66667" transform="rotate(-90 74.6667 60.0003)"
                                    fill="white" />
                                <circle cx="74.6667" cy="16.3336" r="1.66667" transform="rotate(-90 74.6667 16.3336)"
                                    fill="white" />
                                <circle cx="103" cy="60.0003" r="1.66667" transform="rotate(-90 103 60.0003)"
                                    fill="white" />
                                <circle cx="103" cy="16.3336" r="1.66667" transform="rotate(-90 103 16.3336)"
                                    fill="white" />
                                <circle cx="132" cy="60.0003" r="1.66667" transform="rotate(-90 132 60.0003)"
                                    fill="white" />
                                <circle cx="132" cy="16.3336" r="1.66667" transform="rotate(-90 132 16.3336)"
                                    fill="white" />
                                <circle cx="1.66667" cy="45.3336" r="1.66667" transform="rotate(-90 1.66667 45.3336)"
                                    fill="white" />
                                <circle cx="1.66667" cy="1.66683" r="1.66667" transform="rotate(-90 1.66667 1.66683)"
                                    fill="white" />
                                <circle cx="16.3333" cy="45.3336" r="1.66667" transform="rotate(-90 16.3333 45.3336)"
                                    fill="white" />
                                <circle cx="16.3333" cy="1.66683" r="1.66667" transform="rotate(-90 16.3333 1.66683)"
                                    fill="white" />
                                <circle cx="31" cy="45.3336" r="1.66667" transform="rotate(-90 31 45.3336)"
                                    fill="white" />
                                <circle cx="31" cy="1.66683" r="1.66667" transform="rotate(-90 31 1.66683)"
                                    fill="white" />
                                <circle cx="45.6667" cy="45.3336" r="1.66667" transform="rotate(-90 45.6667 45.3336)"
                                    fill="white" />
                                <circle cx="45.6667" cy="1.66683" r="1.66667" transform="rotate(-90 45.6667 1.66683)"
                                    fill="white" />
                                <circle cx="60.3333" cy="45.3338" r="1.66667" transform="rotate(-90 60.3333 45.3338)"
                                    fill="white" />
                                <circle cx="60.3333" cy="1.66707" r="1.66667" transform="rotate(-90 60.3333 1.66707)"
                                    fill="white" />
                                <circle cx="88.6667" cy="45.3338" r="1.66667" transform="rotate(-90 88.6667 45.3338)"
                                    fill="white" />
                                <circle cx="88.6667" cy="1.66707" r="1.66667" transform="rotate(-90 88.6667 1.66707)"
                                    fill="white" />
                                <circle cx="117.667" cy="45.3338" r="1.66667" transform="rotate(-90 117.667 45.3338)"
                                    fill="white" />
                                <circle cx="117.667" cy="1.66707" r="1.66667" transform="rotate(-90 117.667 1.66707)"
                                    fill="white" />
                                <circle cx="74.6667" cy="45.3338" r="1.66667" transform="rotate(-90 74.6667 45.3338)"
                                    fill="white" />
                                <circle cx="74.6667" cy="1.66707" r="1.66667" transform="rotate(-90 74.6667 1.66707)"
                                    fill="white" />
                                <circle cx="103" cy="45.3338" r="1.66667" transform="rotate(-90 103 45.3338)"
                                    fill="white" />
                                <circle cx="103" cy="1.66707" r="1.66667" transform="rotate(-90 103 1.66707)"
                                    fill="white" />
                                <circle cx="132" cy="45.3338" r="1.66667" transform="rotate(-90 132 45.3338)"
                                    fill="white" />
                                <circle cx="132" cy="1.66707" r="1.66667" transform="rotate(-90 132 1.66707)"
                                    fill="white" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
        <div className="container text-center pt-20 lg:pt-[120px]">
        <div className="flex justify-center">
            <img src={logo} className="w-30" alt="" />
        </div>
        <div className="-mx-4 flex flex-wrap relative">
            <div className="w-full px-4">
                <div className="mb-12 lg:mb-20">
                    
                </div>
            </div>
        </div>
    </div>
    <div className="p-12 mt-16 md:p-24 bg-gradient-to-r from-cyan-500 to-blue-500">
        <section id="about" className="bg-/assets/img/about.webp bg-cover bg-no-repeat bg-center">
            <h2 className="mb-12 text-3xl text-white text-center font-bold sm:text-4xl md:text-[42px]">
                A propos de nous
            </h2>
            <p className="text-white sm:text-xl sm:leading-relaxed">
                MEDICLife est un service de santé numérique, destiné aux prestataires
                qui utilisent ses services médicaux Il vise également à faciliter la
                communication entre les travailleurs et les prestataires de services
                médicaux dans un environnement sécurisé.
            </p>
            <p className="mt-4 text-white sm:text-xl sm:leading-relaxed">
                Nous nous engageons à fournir les meilleurs services de prévention à
                chacun, à tout moment et en tout lieu. Notre objectif principal est de
                fournir un service que nous existons toujours pour vous servir.
            </p>
        </section>
    </div>
    
        <section id="feature" className="pt-12 pb-8">
        <div className="container">
            <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4 text-center">
                    <div className="mb-12 lg:mb-20">
                        <span className="mb-2 block text-lg font-semibold text-primary">
                            Fonctionnalités
                        </span>
                        <h2 className="mb-4 text-3xl font-bold text-primaryTextColor sm:text-4xl md:text-[42px]">
                            Fonctionnalités pour votre santé
                        </h2>
                        <p className="text-lg leading-relaxed text-body-color sm:text-xl sm:leading-relaxed">
                            Nous tirons notre enthousiasme pour améliorer la qualité des
                            indicateurs de santé publique en Algérie
                        </p>
                    </div>
                </div>
            </div>
            <div className="-mx-4 flex flex-wrap justify-center px-4">
                <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                    <div className="wow fadeInUp group mb-12 bg-white ud-single-testimonial wow fadeInUp mb-12 bg-white p-8 shadow-testimonial"
                        data-wow-delay=".1s">
                        <div
                            className="relative z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-primary">
                            <span
                                className="absolute top-0 left-0 z-[-1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-2xl bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"></span>
                            <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48"
                                height="48">
                                <g id="Layer">
                                    <path id="Layer" className="s0"
                                        d="m12 10c1.1 0 2-0.9 2-2 0-1.1-0.9-2-2-2-0.7 0-1.4 0.4-1.7 1h-0.3c-1.7 0-3 1.3-3 3v9h2v-9c0-0.6 0.4-1 1-1h0.3c0.3 0.6 1 1 1.7 1z" />
                                    <path id="Layer" fill-rule="evenodd" className="s0"
                                        d="m11.2 20c0.2 1.2 0.8 2.3 1.7 3.1 1.1 1.1 2.6 1.7 4.1 1.7 1.5 0 3-0.6 4.1-1.7 0.9-0.8 1.5-1.9 1.7-3.1 0-0.5 0.5-1 1-1h1.2v-9c0-0.6-0.4-1-1-1h-0.3c-0.3 0.6-1 1-1.7 1-1.1 0-2-0.9-2-2 0-1.1 0.9-2 2-2 0.7 0 1.4 0.4 1.7 1h0.3c1.7 0 3 1.3 3 3v9c0.6 0 1 0.4 1 1-0.3 2.5-1.4 5-3.2 6.8-1.4 1.3-3 2.3-4.8 2.8v2.4c0 1.3-0.8 2.4-2 2.8 0 2.9 2.4 5.2 5.3 5.2 2.8 0 5.2-2.4 5.2-5.3v-4c0-3.1 2.6-5.7 5.8-5.7 3.1 0 5.7 2.6 5.7 5.7v2.5c1.2 0.4 2 1.5 2 2.8 0 1.7-1.3 3-3 3-1.7 0-3-1.3-3-3 0-1.3 0.8-2.4 2-2.8v-2.4c0-2.1-1.7-3.8-3.7-3.8-2.1 0-3.8 1.7-3.8 3.8v4c0 4-3.2 7.2-7.2 7.2-4 0-7.3-3.2-7.3-7.2-1.2-0.4-2-1.5-2-2.8v-2.4c-1.8-0.5-3.4-1.5-4.8-2.8-1.8-1.8-2.9-4.3-3.2-6.8 0-0.6 0.4-1 1-1h3.2c0.5 0 1 0.5 1 1zm11.3 4.5c-1.4 1.5-3.4 2.3-5.5 2.3-2.1 0-4.1-0.8-5.5-2.3-1-0.9-1.7-2.2-2.1-3.5h-1.2c0.4 1.6 1.2 3.2 2.4 4.4 1.7 1.7 4 2.6 6.4 2.6 2.4 0 4.7-0.9 6.4-2.6 1.2-1.2 2-2.8 2.4-4.4h-1.2c-0.4 1.3-1.1 2.6-2.1 3.5zm15.5 11.5c0 0.6 0.4 1 1 1 0.6 0 1-0.4 1-1 0-0.6-0.4-1-1-1-0.6 0-1 0.4-1 1zm-22-6v2c0 0.6 0.4 1 1 1 0.6 0 1-0.4 1-1v-2z" />
                                </g>
                            </svg>
                        </div>
                        <h4 className="mb-3 text-xl font-bold text-dark">
                            Obtenez le service
                        </h4>
                        <p className="mb-8 text-body-color lg:mb-11">
                            Incapacité de fournir le service l'état de santé nécessaire au
                            moment et à l'endroit voulus adéquat
                        </p>
                    </div>
                </div>
                <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                    <div className="wow fadeInUp group mb-12 bg-white ud-single-testimonial wow fadeInUp mb-12 bg-white p-8 shadow-testimonial"
                        data-wow-delay=".1s">
                        <div
                            className="relative z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-primary">
                            <span
                                className="absolute top-0 left-0 z-[-1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-2xl bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"></span>

                            <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1002" width="48"
                                height="48">
                                <path id="Layer" className="s0"
                                    d="m850 956.5c-4-39-5-77-9-116-5-57-14-115-31-170-9-30-23-56-51-72-26-16-55-25-85-34-10-3-8 4-7 9 2 25 0 50-5 75-2 7 1 11 8 15 28 16 45 41 47 74 1 34-6 68-8 102-1 23-4 46-13 68-12 26-32 36-60 31-10-2-17-7-16-19 2-11 10-15 21-13 13 3 20-3 26-14q6-12 6-24c4-39 8-77 12-115 2-35-16-61-47-68-32-8-59 7-72 39-11 26-19 53-29 79-6 15-11 30-14 45-4 20 0 28 19 36 9 4 13 11 10 20-3 10-10 12-20 11-27-6-43-25-43-53 0-12 2-23 5-34 12-41 28-80 43-120 15-35 43-55 81-57 8-1 11-3 13-10 4-25 5-49 3-73-1-12-6-18-18-20-10-2-19-5-29-9-9-4-13-2-16 8-11 38-27 74-45 109-9 17-19 33-31 53-4-25-8-46-12-67-2-10-2-18 2-27 3-5 9-11 3-17-10-9-21-16-31-24 0-1-2 0-2 1-10 8-22 16-30 26-4 6 5 14 7 21 0 2 1 4 1 5-4 26-9 52-13 80-4-4-5-5-6-7-27-43-48-87-64-135-4-10-3-25-12-28-7-3-19 5-29 8-5 1-10 3-12 9-4 12-9 23-12 35-18 77-14 153 10 228 4 11 8 17 21 20 25 5 38 32 30 56-9 25-36 37-60 26-24-11-34-40-20-62 5-8 4-14 2-22-26-72-33-147-21-223 3-18 9-35 13-53-35 10-69 18-99 36-22 13-39 30-49 54-12 30-19 60-24 91-14 72-18 146-24 218-1 20 8 33 23 42h739c19-9 26-23 24-44zm-559-616c7 2 10 6 13 12 15 36 34 71 62 99 22 23 48 40 81 43 41 5 73-14 100-41 29-29 48-63 64-100 2-5 2-11 10-12 27-2 49-45 44-72-1-7-4-14-12-15-10 0-9-6-7-12 5-23 8-46 9-65 0-21-1-37-5-53-7-24-19-45-42-57-13-7-23-14-28-29-2-6-7-10-12-14-17-14-38-20-59-23-65-6-124 8-177 45-37 26-62 60-67 106-3 30-2 60 4 90 1 6 4 13-7 13-6 0-9 4-11 9-9 27 13 69 40 76z" />
                            </svg>
                        </div>
                        <h4 className="mb-3 text-xl font-bold text-dark">Effectifs</h4>
                        <p className="mb-8 text-body-color lg:mb-11">
                            Le recours au papier pour la conservation des données relatives
                            aux patients reste l'apanage des bons services de santé
                        </p>
                    </div>
                </div>
                <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                    <div className="wow fadeInUp group mb-12 bg-white ud-single-testimonial wow fadeInUp mb-12 bg-white p-8 shadow-testimonial"
                        data-wow-delay=".1s">
                        <div className="relative z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-primary">
                            <span className="absolute top-0 left-0 z-[-1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-2xl bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"></span>
                            <svg className="h-12 w-12 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"></path>
                                <path d="M3 7v11m0 -4h18m0 4v-8a2 2 0 0 0 -2 -2h-8v6"></path>
                                <circle cx="7" cy="10" r="1"></circle>
                            </svg>
                        </div>
                        <h4 className="mb-3 text-xl font-bold text-dark">
                            Charge de morbidité
                        </h4>
                        <p className="mb-8 text-body-color lg:mb-11">
                            Les taux élevés de maladies chroniques et le danger permanent
                            d'épidémies et des maladies infectieuses.
                        </p>
                    </div>
                </div>

                <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                    <div className="wow fadeInUp group mb-12 bg-white ud-single-testimonial wow fadeInUp mb-12 bg-white p-8 shadow-testimonial"
                        data-wow-delay=".1s">
                        <div
                            className="relative z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-primary">
                            <span
                                className="absolute top-0 left-0 z-[-1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-2xl bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"></span>

                            <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 218 217" width="48"
                                height="48">
                                <path id="Layer" className="s0"
                                    d="m200.6 136.8c-2.4 6.4-5.5 12.4-9.2 18.1 0 0 0 0.1-0.1 0.2-5.2 8.1-12.4 14.7-20.7 19.7-3.1 1.8-6.7 4.3-10 7.5h-35.8v-12.8c0-17.4 6.3-34.2 17.8-47.3l13.2-15.2c1.7-1.9 4.9-1.1 5.5 1.4 0.8 3.5 1.3 7.1 1.3 10.7 0 7.9-2.1 15.8-6.1 22.8 0 0 7.6-1.3 15.3-7.3 10.1-7.9 20.2-23.8 12.7-55.2 2.2-1.6 4.6-2.3 7.1-2.3 7 0 13.9 5.9 14.3 13.6 1 15.5 0.2 33.7-5.3 46.1z" />
                                <path id="Layer" className="s0"
                                    d="m165 193.1v10c0 2.2-1.8 4-4 4h-39.8c-2.2 0-4-1.8-4-4v-10c0-2.2 1.8-3.9 4-3.9h39.8c2.2-0.1 4 1.7 4 3.9z" />
                                <path id="Layer" className="s0"
                                    d="m93.1 169.5v12.8h-35.8c-3.3-3.2-6.8-5.7-10-7.5-8.3-5-15.4-11.6-20.7-19.7 0-0.1 0-0.2-0.1-0.2-3.7-5.7-6.7-11.7-9.2-18.1-5.5-12.4-6.2-30.6-5.3-46.1 0.5-7.7 7.4-13.6 14.4-13.6 2.5 0 4.9 0.7 7.1 2.3-7.4 31.4 2.6 47.3 12.7 55.2 7.6 6 15.3 7.3 15.3 7.3-4-7-6.1-14.9-6.1-22.8 0-3.6 0.5-7.2 1.3-10.7 0.6-2.5 3.8-3.3 5.5-1.4l13.2 15.2c11.4 13.1 17.7 29.9 17.7 47.3z" />
                                <path id="Layer" className="s0"
                                    d="m53 193.1v10c0 2.2 1.8 4 4 4h39.8c2.2 0 4-1.8 4-4v-10c0-2.2-1.8-3.9-4-3.9h-39.8c-2.2-0.1-4 1.7-4 3.9z" />
                                <path id="Layer" className="s0"
                                    d="m122 53.6l-17.1 17-8.9-8.9c-1.3-1.3-3.4-1.3-4.7 0-1.4 1.3-1.4 3.5 0 4.8l11.2 11.2c0.7 0.7 1.5 1 2.4 1 0.9 0 1.8-0.3 2.4-1l19.5-19.4c1.3-1.3 1.3-3.5 0-4.8-1.4-1.2-3.5-1.2-4.8 0.1z" />
                                <path id="Layer" fill-rule="evenodd" className="s0"
                                    d="m109 121.7c-61.7-19.6-54.9-79.6-55.3-89.4q1.4 0.2 2.7 0.2c8.6 0 15.9-5.2 19.1-12.6 1.1-2.5 1.7-5.3 1.7-8.2 0-0.6 0-1.3-0.1-2h63.9q-0.1 1-0.1 2c0 2.9 0.6 5.7 1.6 8.2 3.2 7.4 10.5 12.6 19.1 12.6q1.4 0 2.7-0.2c-0.3 9.8 6.4 69.8-55.3 89.4zm32.3-56c0-17.9-14.5-32.3-32.3-32.3-17.8 0-32.3 14.4-32.3 32.3 0 17.8 14.5 32.3 32.3 32.3 17.8 0 32.3-14.5 32.3-32.3z" />
                            </svg>
                        </div>
                        <h4 className="mb-3 text-xl font-bold text-dark">
                            Qualité et sécurité
                        </h4>
                        <p className="mb-8 text-body-color lg:mb-11">
                            En tant que prestataires de soins de santé, nous sommes
                            responsables de la protection des informations médicales
                            confidentielles de nos patients
                        </p>
                    </div>
                </div>
                <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                    <div className="wow fadeInUp group mb-12 bg-white ud-single-testimonial wow fadeInUp mb-12 bg-white p-8 shadow-testimonial"
                        data-wow-delay=".1s">
                        <div
                            className="relative z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-primary">
                            <span
                                className="absolute top-0 left-0 z-[-1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-2xl bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"></span>

                            <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 394 394" width="45"
                                height="45">
                                <g id="Layer">
                                    <path id="Layer" className="s0"
                                        d="m236.1 200.8c1.3 1 2.8 1.6 4.3 1.6 2.1 0 4.1-0.9 5.5-2.7 8.9-11 13.8-24.9 13.8-39.1 0-14.2-4.7-27.6-13.5-38.8-2.4-3-6.9-3.5-9.9-1.1-3 2.4-3.5 6.8-1.1 9.8 6.9 8.7 10.5 19.1 10.5 30.1 0 11.2-3.7 21.7-10.7 30.4-2.4 3-1.9 7.4 1.1 9.8z" />
                                    <path id="Layer" className="s0"
                                        d="m157.1 120.7c-3-2.4-7.4-1.9-9.8 1.1-8.9 11-13.8 24.9-13.8 39.1 0 14.2 4.7 27.7 13.5 38.8 1.4 1.7 3.5 2.7 5.5 2.7 1.5 0 3.1-0.5 4.4-1.6 3-2.4 3.5-6.8 1.1-9.8-6.9-8.6-10.5-19.1-10.5-30.1 0-11.2 3.7-21.6 10.7-30.3 2.4-3 1.9-7.5-1.1-9.9z" />
                                    <path id="Layer" className="s0"
                                        d="m180.4 163.1c4.7-4.6 11.4-7.3 18.4-7.3 12.8 0 22.6 8.5 24 20.8l0.3 2.6c0.2 1.9 0.2 2.4 0.5 5.3-0.1 3.5 1.9-0.2 2.6-1.2 3.7-5.6 5.8-12.2 5.8-19.4 0-19.5-15.9-35.4-35.4-35.4-19.5 0-35.4 15.9-35.4 35.4 0 9 4.4 16.5 9 23.5 3.2 5 3.7 0.8 3.5-1.8v-6c0-6.2 2.4-12.1 6.7-16.5z" />
                                    <path id="Layer" fill-rule="evenodd" className="s0"
                                        d="m306.8 20v236.1c0 3.6-1.7 2.6-3 0.5-3.4-5.7-9-11-16.3-13.3-0.8-0.2-3.5-0.8-3.5-5.6v-194.2c0-2.7-2.3-5-5-5h-164.8c-2.7 0-5 2.3-5 5v228.4c0 2.7 2.3 5 5 5h4.5c5.2 0 4.4 3 4.4 4.5q0 2.2 0.4 4.5c1.9 11.7 10.2 30.4 24.3 50.3 1.1 1.4 4.2 4.3-3.4 4.3h-38c-11 0-20-9-20-20v-300.5c0-11 9-20 20-20h180.4c11 0 20 9 20 20zm-89.9 0.5c0-2.8-2.2-5-5-5h-30.7c-2.7 0-5 2.2-5 5 0 2.7 2.3 5 5 5h30.7c2.8 0 5-2.3 5-5z" />
                                    <path id="Layer" className="s0"
                                        d="m283.3 251c-2.3-0.4-6.7-1.9-11-3.3-5.3-1.7-10.8-3.5-14.8-4.3-2-0.4-6.3-1.8-10.4-3.1-5.5-1.7-11.1-3.5-15-4.3-3.8-0.8-7.7-0.7-11 0-1.8-15.5-6.1-52.8-6.8-58.5-0.9-7.8-7.2-13.2-15.5-13.2-4.8 0-9.2 1.8-12.3 4.9-2.8 2.8-4.3 6.4-4.3 10.5v107.9c-3.7-0.8-10.6-3.1-15.7-10.5l-0.7-1q-1.3-1.9-2.5-3.6c-3.7-5.3-9.2-8.4-15.1-8.4-4.9 0-9.5 2.1-12.6 5.8-3.3 3.9-4.6 9.1-3.7 14.6 2.2 13.1 15.6 42.6 43.5 71.4l0.1 26.8c0 5.8 4.6 10.5 10.4 10.5h87.9c5.8 0 10.5-4.7 10.5-10.5l-0.1-27.4 9.3-15.6c4-6.7 6.1-14.5 6.1-22.3v-47.3c-0.1-6.4-6.7-17.2-16.3-19.1z" />
                                </g>
                            </svg>
                        </div>
                        <h4 className="mb-3 text-xl font-bold text-dark">
                            Précision et intégrité des données
                        </h4>
                        <p className="mb-8 text-body-color lg:mb-11">
                            La gestion numérique des données des patients réduit les risques
                            d'erreurs et de pertes de données
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
        <section id="mission" className="bg-[#f3f4fe] pt-20 pb-20 lg:pt-[120px] lg:pb-[120px]">
        <div className="container">
            <div className="wow fadeInUp bg-white" data-wow-delay=".2s">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="items-center justify-between overflow-hidden border lg:flex">
                            <div className="w-full py-12 px-7 sm:px-12 md:p-16 lg:max-w-[565px] lg:py-9 lg:px-16 xl:max-w-[640px] xl:p-[70px]">
                                <span className="mb-5 block text-lg font-semibold text-cyan-500">
                                    Notre mission
                                </span>
                                <h2 className="mb-6 text-3xl font-bold text-primaryTextColor sm:text-4xl sm:leading-snug 2xl:text-[40px]">
                                    Améliorer la vie des gens
                                </h2>
                                <p className="mb-9 text-base leading-relaxed text-body-color">
                                    <span className="font-semibold">MEDICALife</span> NEOMED
                                    s'engage à respecter sa mission suprême, l'Aloha, et à
                                    améliorer la vie des gens en fournissant des conseils de
                                    qualité et des services de santé préventifs. C'est le moteur
                                    qui permet à toute l'équipe de travailler dur et d'accomplir
                                    davantage.
                                </p>
                            </div>
                            <img src={doctor2} alt="image" className="max-w-[720px] mx-auto lg:ml-auto rtl:lg:mr-auto" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section id="certificate">
        <div className="container">
            <div className="-mx-4 flex flex-wrap">
                <div className="mx-auto mb-[10px] max-w-full text-center">
                    <img className="rounded-full object-cover" src={preventive_health_care} alt="" />
                </div>
            </div>
        </div>
    </section>

    <a href="javascript:void(0)"
        className="back-to-top fixed bottom-8 right-8 left-auto z-[999] hidden h-10 w-10 items-center justify-center rounded-md bg-primary text-white shadow-md transition duration-300 ease-in-out hover:bg-dark">
        <span className="mt-[6px] h-3 w-3 rotate-45 border-t border-l border-white"></span>
    </a>
  </>)
}

export default LandingPage