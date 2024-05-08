import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import SidebarButton from "./SidebarButton";
type SidebarProps = {
  setOpen: () => void;
};

function Sidebar({ setOpen }: SidebarProps) {
  return (
    <aside id="sidenav" className="max-w-62.5 shadow-lg ease-nav-brand z-10 fixed inset-y-0 block w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto border-0 bg-white p-0 antialiased shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-white">
      <div className="flex items-center justify-between flex-shrink-0 px-3 ml-4">
        <Link to="/" className="inline-flex items-center gap-2 mt-6 mb-2 h-10" >
          <img src={logo} className="w-10" />
          <span className="font-semibold transition-all duration-200 ease-nav-brand ml-2">
            MedicaLife
          </span>
        </Link>
        <i id="sidenav_close_button" className="absolute top-0 right-0 hidden p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden" onClick={setOpen} />
      </div>
      <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
      <div className="items-center block w-auto max-h-screen">
        <ul className="flex flex-col pl-0 pt-2 pb-4 gap-2">
          <SidebarButton text="Dashboard" icon="fa fa-staff-snake" route="/" closeSidebar={setOpen}/>
          <SidebarButton text="Mon dossier" icon="fa fa-folder" route="/dossier" closeSidebar={setOpen}/>
          <SidebarButton text="Mes rendez-vous" icon="fa fa-calendar-days" route="/rendez-vous" closeSidebar={setOpen}/>
          <SidebarButton text="Historique d'autorisations" icon="fa fa-calendar-days" route="/historique" closeSidebar={setOpen}/>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
