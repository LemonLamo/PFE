import logo from '../assets/logo.svg'
import ConsuSidebar from './ConsuSidebar'
import TitleSidebar from './TitleSidebar'


function Sidebar(){
    return <aside className="max-w-62.5 shadow-lg ease-nav-brand z-10 fixed inset-y-0 block w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto border-0 bg-white p-0 antialiased shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-white">
        <div className="flex items-center justify-between flex-shrink-0 px-3 ml-4">
            <a href="/dashboard" className="inline-flex items-center gap-2 mt-6 mb-2 h-10">
                <img src={logo} className="w-10"></img>
                    <span className="ml-4 font-semibold transition-all duration-200 ease-nav-brand">MedicaLife</span>
            </a>
            <i className="absolute top-0 right-0 hidden p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 lg:hidden"></i>
        </div>
        <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
        <div className="items-center block w-auto max-h-screen overflow-hidden grow basis-full">
            <ul className="flex flex-col pl-0 mb-0">
                <li className="w-full mt-4">
                    <a className="py-2 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors" href="../pages/dashboard.html">
                        <div className="bg-cyan-400 mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                            <i className="text-white cursor-pointer fa fa-bell text-xl"></i>
                        </div>
                        <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Dashboard</span>
                    </a>
                </li>
                <TitleSidebar text="Consultation"></TitleSidebar>
                <ConsuSidebar text="Nouveau Patient" icon="user" route="/nouveauPatient"></ConsuSidebar>
                <ConsuSidebar text="Liste des patients" icon="user" route="/nouveauPatient"></ConsuSidebar>
                <ConsuSidebar text="Rendez-vous" icon="user" route="/nouveauPatient"></ConsuSidebar>
                <TitleSidebar text="Patient admis"></TitleSidebar>
                <ConsuSidebar text="Hospitalisation" icon="user" route="/nouveauPatient"></ConsuSidebar>  
                <TitleSidebar text="Laboratoire"></TitleSidebar>
                <ConsuSidebar text="Bilans" icon="user" route="/nouveauPatient"></ConsuSidebar>
                <TitleSidebar text="Radiologie"></TitleSidebar>
                <ConsuSidebar text="Imageries Médicales" icon="user" route="/nouveauPatient"></ConsuSidebar>    
                <TitleSidebar text="Pharmacie"></TitleSidebar>
                <ConsuSidebar text="Médicaments" icon="user" route="/nouveauPatient"></ConsuSidebar>  
                <TitleSidebar text="Administration"></TitleSidebar>     
                <ConsuSidebar text="Personnel" icon="user" route="/nouveauPatient"></ConsuSidebar> 
                <ConsuSidebar text="Rôles et Permissions" icon="user" route="/nouveauPatient"></ConsuSidebar> 
                <ConsuSidebar text="Paramètres" icon="user" route="/nouveauPatient"></ConsuSidebar> 
            </ul>
        </div>
    </aside>
}

export default Sidebar