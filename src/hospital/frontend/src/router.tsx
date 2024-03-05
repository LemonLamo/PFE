import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Scaffold from "./pages/Scaffold";
import Dashboard from "./pages/Dashboard";
import NewVisitPage from "./pages/NewVisitPage";
import PatientsPage from "./pages/PatientsPage";
import NewPatientPage from "./pages/NewPatientPage";
import Test from "./pages/Test";
import RendezVousPage from "./pages/RendezVousPage";
import Medicaments from "./pages/Medicaments";
import Chambres from "./pages/Chambres";
import Agents from "./pages/Agents";
import Infirmiers from "./pages/Infirmiers";
import Medecins from "./pages/Medecins";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/dashboard",
    element: (
      <Scaffold>
        {" "}
        <Dashboard />{" "}
      </Scaffold>
    ),
  },
  {
    path: "/new_visit",
    element: (
      <Scaffold>
        {" "}
        <NewVisitPage />{" "}
      </Scaffold>
    ),
  },
  {
    path: "/new_patient",
    element: (
      <Scaffold>
        {" "}
        <NewPatientPage />{" "}
      </Scaffold>
    ),
  },
  {
    path: "/patients",
    element: (
      <Scaffold>
        {" "}
        <PatientsPage />{" "}
      </Scaffold>
    ),
  },
  {
    path: "/rendez_vous",
    element: (
      <Scaffold>
        {" "}
        <RendezVousPage />{" "}
      </Scaffold>
    ),
  },
  {
    path: "/medicaments",
    element: (
      <Scaffold>
        {" "}
        <Medicaments />{" "}
      </Scaffold>
    ),
  },
  {
    path: "/chambres",
    element: (
      <Scaffold>
        {" "}
        <Chambres />{" "}
      </Scaffold>
    ),
  },
  {
    path: "/medecins",
    element: (
      <Scaffold>
        {" "}
        <Medecins />{" "}
      </Scaffold>
    ),
  },
  {
    path: "/agents",
    element: (
      <Scaffold>
        {" "}
        <Agents />{" "}
      </Scaffold>
    ),
  },
  {
    path: "/infirmiers",
    element: (
      <Scaffold>
        {" "}
        <Infirmiers />{" "}
      </Scaffold>
    ),
  },
  {
    path: "/test",
    element: (
      <Scaffold>
        {" "}
        <Test />{" "}
      </Scaffold>
    ),
  },
]);

export default router;
