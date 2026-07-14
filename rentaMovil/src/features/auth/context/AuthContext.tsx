import {
    createContext,
    ReactNode,
    useContext,
    useState
} from "react";

import { User } from "../types/user";

import {
    login as loginService,
    register as registerService,
} from "../services/authService";

import {
    LoginRequest,
    RegisterRequest
} from "../types/auth";


type AuthContextType = {

    user: User | null;

    token: string | null;

    isAuthenticated: boolean;

    login: (
        data: LoginRequest
    ) => Promise<void>;

    register: (
        data: RegisterRequest
    ) => Promise<void>;

    logout: () => void;

};

export const AuthContext =
    createContext<AuthContextType | null>(null);


type Props = {
    children: ReactNode;
};


export function AuthProvider({
    children,
}: Props) {

    const [user, setUser] =
        useState<User | null>(null);


    const [token, setToken] =
        useState<string | null>(null);



    async function login(
        data: LoginRequest
    ) {

        const response =
            await loginService(data);


        setUser(response.user);

        setToken(response.token);

        console.log(response);

    }



    async function register(
        data: RegisterRequest
    ) {

        const response =
            await registerService(data);


        setUser(response.user);

        setToken(response.token);

    }



    function logout() {

        setUser(null);

        setToken(null);

    }


    const isAuthenticated =
        user !== null;



    return (

        <AuthContext.Provider

            value={{

                user,

                token,

                isAuthenticated,

                login,

                register,

                logout,

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}


export function useAuth() {

    const context =
        useContext(AuthContext);


    if (!context) {

        throw new Error(
            "useAuth debe utilizarse dentro de AuthProvider"
        );

    }


    return context;

}