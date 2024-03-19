import axios from "axios";
import { ReactNode } from "react";
import { Navigate, NavigateFunction } from 'react-router-dom'
import { baseURL } from ".";
import secureLocalStorage from "react-secure-storage";

type Props = {
    children: ReactNode
}

export function isAuthenticated(){
    return secureLocalStorage.getItem("NIN") !== null
}
export async function login(data : any){
    secureLocalStorage.setItem("NIN", data.NIN);
    secureLocalStorage.setItem("prenom", data.prenom);
    secureLocalStorage.setItem("permissions", JSON.stringify(data.permissions));
}

export async function logout(navigate : NavigateFunction){
    await axios.post(`${baseURL}/api/auth/logout`);
    secureLocalStorage.clear();
    navigate(0)
}

export function getPermissions() {
    return JSON.parse(secureLocalStorage.getItem('permissions') as string);
}

export function hasPermissions(permissions: string[]){
    const user_permissions = JSON.parse(secureLocalStorage.getItem('permissions') as string)
    for (let x of permissions)
        if (!user_permissions.includes(x))
            return false;

    return true;
}

export function PrivateRouteOnly({ children } : Props) {
    return isAuthenticated() ? children : <Navigate to="/" />;
}

export function PublicOrPrivateRoute({ loggedIn, notLoggedIn } : {loggedIn: ReactNode, notLoggedIn: ReactNode}) {
    return isAuthenticated() ? loggedIn : notLoggedIn;
}