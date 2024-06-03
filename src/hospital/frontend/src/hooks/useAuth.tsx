import { ReactNode } from "react";
import { Navigate, NavigateFunction } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import DashboardMedecin from "../pages/DashboardMedecin";
import DashboardAdmin from "../pages/DashboardAdmin";
import DashboardInfirmier from "../pages/DashboardInfirmier";
import DashboardLab from "../pages/DashboardLab";
import DashboardRadio from "../pages/DasshboardRadio";
import Scaffold from "../components/Scaffold";
import axios from "axios";
import { baseURL } from "../config";
export type JWTToken = {
    NIN: string,
    nom: string,
    prenom: string,
    specialite: string,
    hopital: string,
    service: string,
    role: string,
    permissions: string[],
}

export function getJWTContent(){
    const jwt = sessionStorage.getItem("jwt") ?? localStorage.getItem('jwt')
    return jwt? jwtDecode<JWTToken>(jwt) : null
}

export function isAuthenticated(){
    return getJWTContent()?.NIN !== undefined
}
export async function login(jwt : string, rememberme: boolean){
    if(!rememberme)
        sessionStorage.setItem("jwt", jwt);
    else
        localStorage.setItem("jwt", jwt);
}

export async function logout(navigate : NavigateFunction){
    sessionStorage.removeItem('jwt');
    localStorage.removeItem('jwt');
    navigate(0)
}

export function hasPermissions(permissions: string[]){
    const user_permissions = getJWTContent()?.permissions ?? []
    for (let x of permissions)
        if (!user_permissions.includes(x))
            return false;

    return true;
}

export function Dashboard() {
    switch(getJWTContent()?.role){
        case 'admin':
            return <Scaffold> <DashboardAdmin /> </Scaffold>
        case 'medecin':
            return <Scaffold>  <DashboardMedecin /> </Scaffold>
        case 'infirmier':
            return <Scaffold>  <DashboardInfirmier /> </Scaffold>
        case 'lab':
            return <Scaffold>  <DashboardLab /> </Scaffold>
        case 'radio':
            return <Scaffold>  <DashboardRadio /> </Scaffold>
    }
}

type RequireRoleProps = {
    roles: string[],
    children: ReactNode
}

export function RequireRole({ roles, children } : RequireRoleProps) {
    if(!isAuthenticated())
        return <Navigate to="/" />
    
    if(!roles.includes(getJWTContent()?.role!))
        return <Navigate to="/" />
    
    return children;
}

export function ShowOnlyIfRole({ roles, children } : RequireRoleProps) {
    if(!isAuthenticated())
        return null
    
    if(!roles.includes(getJWTContent()?.role!))
        return null
    
    return children;
}

type Props = {
    children: ReactNode
}

export function PrivateRouteOnly({ children } : Props) {
    return isAuthenticated() ? children : <Navigate to="/" />;
}

export function PublicOrPrivateRoute({ loggedIn, notLoggedIn } : {loggedIn: ReactNode, notLoggedIn: ReactNode}) {
    return isAuthenticated() ? loggedIn : notLoggedIn;
}

export async function checkEHRAuth(NIN: Patient["NIN"], motif: string){
    try{
        const data ={
            medecin: getJWTContent()?.NIN,
            patient: NIN,
            motif: motif
        }
        await axios.post(`${baseURL}/api/auth/authorisations/isAuthorized`, data);
        return true;
    }catch(err){
        return false;
    }
}

export async function requestEHRAuth(NIN: Patient["NIN"], motif: string){
    const data ={
        medecin: getJWTContent()?.NIN,
        patient: NIN,
        motif: motif
    }
    await axios.post(`${baseURL}/api/auth/authorisations`, data);
}