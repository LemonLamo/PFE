import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Scaffold from "./pages/Scaffold";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/dashboard", element: <Scaffold Content=<Dashboard></Dashboard>/> },
]);

export default router