import { ReactNode } from "react";
import { Navigate, NavigateFunction } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
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

type Props = {
    children: ReactNode
}

export function PrivateRouteOnly({ children } : Props) {
    return isAuthenticated() ? children : <Navigate to="/" />;
}

export function PublicOrPrivateRoute({ loggedIn, notLoggedIn } : {loggedIn: ReactNode, notLoggedIn: ReactNode}) {
    return isAuthenticated() ? loggedIn : notLoggedIn;
}