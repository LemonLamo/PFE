import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import SidebarButton from "./SidebarButton";
import SidebarHeader from "./SidebarHeader";

type SidebarProps = {
  setOpen: () => void;
};

function Sidebar({ setOpen }: SidebarProps) {
  return (
    <aside id="sidenav" className="max-w-62.5 shadow-lg ease-nav-brand z-10 fixed inset-y-0 block w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto border-0 bg-white p-0 antialiased shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-white">
      <div className="flex items-center justify-between flex-shrink-0 px-3 ml-4">
        <Link to="/" className="inline-flex items-center gap-2 mt-6 mb-2 h-10" >
          <img src={logo} className="w-10" />
          <span className="ml-4 font-semibold transition-all duration-200 ease-nav-brand">
            MedicaLife
          </span>
        </Link>
        <i id="sidenav_close_button" className="absolute top-0 right-0 hidden p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 lg:hidden" onClick={setOpen} />
      </div>
      <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
      <div className="items-center block w-auto max-h-screen overflow-hidden grow basis-full">
        <ul className="flex flex-col pl-0 mb-3 pt-2">
          <SidebarButton text="Dashboard" icon="fa fa-bell" route="/" closeSidebar={setOpen}/>

          <SidebarButton text="Nouveau patient" icon="fa fa-user" route="/nouveau_patient" closeSidebar={setOpen}/>
          
          <SidebarHeader text="Consultation" />
          <SidebarButton text="Dashboard Inf" icon="fa fa-bell" route="/dashboard_inf" closeSidebar={setOpen}/>

          <SidebarHeader text="Consultation" />
          <SidebarButton text="Nouvelle consultation" icon="fa fa-user" route="/nouvelle_consultation" closeSidebar={setOpen}/>
          <SidebarButton text="Mes patients" icon="fa fa-user" route="/mes_patients" closeSidebar={setOpen}/>
          <SidebarButton text="Mes rendez-vous" icon="fa fa-user" route="/mes_rendez_vous" closeSidebar={setOpen}/>

          <SidebarHeader text="Hospitalisation" />
          <SidebarButton text="Nouvelle hospitalisation" icon="fa fa-user" route="/nouvelle_hospitalisation" closeSidebar={setOpen}/>
          <SidebarButton text="Mes patients admis" icon="fa fa-user" route="/mes_patients_admis" closeSidebar={setOpen}/>

          <SidebarHeader text="Pharmacie" />
          <SidebarButton text="Gestion des médicaments" icon="fa fa-user" route="/pharmacie" closeSidebar={setOpen}/>

          <SidebarHeader text="Administration" />
          <SidebarButton text="Gestion du personnel" icon="fa fa-user" route="/personnel" closeSidebar={setOpen}/>
          <SidebarButton text="Gestion des chambres" icon="fa fa-user" route="/chambres" closeSidebar={setOpen}/>
          <SidebarButton text="Rôles et permissions" icon="fa fa-user" route="/roles" closeSidebar={setOpen}/>
          {/*<SidebarButton text="Paramètres" icon="fa fa-user" route="/parametres" closeSidebar={setOpen}/>*/}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
