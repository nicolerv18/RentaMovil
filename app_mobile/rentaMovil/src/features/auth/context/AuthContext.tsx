import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "../types/user";

import {
    login as loginService,
    register as registerService,
} from "../services/authService";

import {
    LoginRequest,
    RegisterRequest,
} from "../types/auth";


type AuthContextType = {

    user: User | null;

    token: string | null;

    isAuthenticated: boolean;

    isLoading: boolean;

    login: (
        data: LoginRequest
    ) => Promise<void>;

    register: (
        data: RegisterRequest
    ) => Promise<void>;

    updateUser: (
        user: User
    ) => Promise<void>;

    logout: () => Promise<void>;

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


    const [isLoading, setIsLoading] =
        useState(true);


    useEffect(() => {

        async function restoreSession() {

            try {

                const storedUser =
                    await AsyncStorage.getItem("user");


                const storedToken =
                    await AsyncStorage.getItem("token");


                if (
                    storedUser &&
                    storedToken
                ) {

                    setUser(
                        JSON.parse(storedUser)
                    );


                    setToken(
                        storedToken
                    );

                }

            } catch (error) {

                console.log(
                    "Error restaurando sesión:",
                    error
                );

            } finally {

                setIsLoading(false);

            }

        }


        restoreSession();

    }, []);


    async function login(
        data: LoginRequest
    ) {

        const response =
            await loginService(data);


        setUser(response.user);

        setToken(response.token);


        await AsyncStorage.setItem(
            "user",
            JSON.stringify(response.user)
        );


        await AsyncStorage.setItem(
            "token",
            response.token
        );


        console.log(response);

    }


    async function register(
        data: RegisterRequest
    ) {

        const response =
            await registerService(data);


        setUser(response.user);

        setToken(response.token);


        await AsyncStorage.setItem(
            "user",
            JSON.stringify(response.user)
        );


        await AsyncStorage.setItem(
            "token",
            response.token
        );

    }

    async function updateUser(
    updatedUser: User
) {

    setUser(updatedUser);


    await AsyncStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
    );

}


    async function logout() {

        setUser(null);

        setToken(null);


        await AsyncStorage.removeItem(
            "user"
        );


        await AsyncStorage.removeItem(
            "token"
        );

    }


    const isAuthenticated =
        user !== null;


    return (

        <AuthContext.Provider

            value={{

                user,

                token,

                isAuthenticated,

                isLoading,

                login,

                register,

                updateUser,

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