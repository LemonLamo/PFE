import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Scaffold from "./pages/Scaffold";
import Dashboard from "./pages/Dashboard";
import NouveauPatient from "./pages/NouveauPatient";

const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/dashboard", element: <Scaffold Content=<Dashboard></Dashboard>/> },
    { path: "/new_patient", element: <Scaffold Content=<NouveauPatient></NouveauPatient> /> },
]);

export default router