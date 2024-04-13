import { Link } from "react-router-dom";
import logo from "../../assets/chu_beni.png";
import SidebarButton from "./SidebarButton";
import SidebarHeader from "./SidebarHeader";
import AuthContext from "../../hooks/AuthContext";
import { useContext } from "react";

type SidebarProps = {
  setOpen: () => void;
};

function Sidebar({ setOpen }: SidebarProps) {
  const auth = useContext(AuthContext)
  return (
    <aside id="sidenav" className="max-w-62.5 shadow-lg ease-nav-brand z-10 fixed inset-y-0 block w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto border-0 bg-white p-0 antialiased shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-white">
      <div className="flex items-center justify-between flex-shrink-0 px-3 ml-4">
        <Link to="/" className="inline-flex items-center gap-2 mt-6 mb-2 h-10" >
          <img src={logo} className="w-10" />
          <span className="font-semibold transition-all duration-200 ease-nav-brand">
            {auth!.hopital}
          </span>
        </Link>
        <i id="sidenav_close_button" className="absolute top-0 right-0 hidden p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden" onClick={setOpen} />
      </div>
      <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
      <div className="items-center block w-auto max-h-screen">
        <ul className="flex flex-col pl-0 pt-2 pb-4">
          <SidebarButton text="Dashboard Medecin" icon="fa fa-staff-snake" route="/" closeSidebar={setOpen}/>
          <SidebarButton text="Dashboard Admin" icon="fa fa-pie-chart" route="/dashboard_admin" closeSidebar={setOpen}/>
          <SidebarButton text="Dashboard Inf" icon="fa fa-staff-snake" route="/dashboard_inf" closeSidebar={setOpen}/>
          <SidebarButton text="Dashboard Lab" icon="fa fa-vial" route="/dashboard_lab" closeSidebar={setOpen}/>
          <SidebarButton text="Dashboard Radio" icon="fa fa-x-ray" route="/dashboard_radio" closeSidebar={setOpen}/>

          <SidebarHeader text="Bureau d'entrée" />
          <SidebarButton text="Dashboard Entrée" icon="fa fa-staff-snake" route="/dashboard_entree" closeSidebar={setOpen}/>
          <SidebarButton text="Nouveau patient" icon="fa fa-user-plus" route="/patients/new" closeSidebar={setOpen}/>

          <SidebarHeader text="Consultation" />
          <SidebarButton text="Nouvelle consultation" icon="fa fa-folder-plus" route="/consultations/new" closeSidebar={setOpen}/>
          <SidebarButton text="Mes patients" icon="fa fa-user" route="/patients" closeSidebar={setOpen}/>
          <SidebarButton text="Mes rendez-vous" icon="fa fa-calendar-days" route="/rendez_vous" closeSidebar={setOpen}/>

          <SidebarHeader text="Hospitalisations" />
          <SidebarButton text="Nouvelle hospitalisation" icon="fa fa-folder-plus" route="/hospitalisations/new" closeSidebar={setOpen}/>
          <SidebarButton text="Mes patients hospitalisés" icon="fa fa-bed-pulse" route="/hospitalisations" closeSidebar={setOpen}/>

          <SidebarHeader text="Interventions" />
          <SidebarButton text="Nouvelle intervention" icon="fa fa-folder-plus" route="/interventions/new" closeSidebar={setOpen}/>
          <SidebarButton text="Mes interventions" icon="fa fa-bed-pulse" route="/interventions" closeSidebar={setOpen}/>

          <SidebarHeader text="Pharmacie" />
          <SidebarButton text="Gestion des médicaments" icon="fa fa-prescription-bottle-medical" route="/pharmacie" closeSidebar={setOpen}/>

          <SidebarHeader text="Administration" />
          <SidebarButton text="Gestion du personnel" icon="fa fa-users" route="/personnel" closeSidebar={setOpen}/>
          <SidebarButton text="Gestion des chambres" icon="fa fa-bed" route="/chambres" closeSidebar={setOpen}/>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
