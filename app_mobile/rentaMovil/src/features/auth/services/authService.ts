import { mockCredentials } from "../data/auth";
import { mockUser } from "../data/user";

import {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
} from "../types/auth";

export async function login(
    data: LoginRequest
): Promise<AuthResponse> {

    await new Promise(resolve =>
        setTimeout(resolve, 500)
    );

    if (
        data.email !== mockCredentials.email ||
        data.password !== mockCredentials.password
    ) {

        throw new Error(
            "Correo o contraseña incorrectos."
        );

    }

    return {

        user: mockUser,

        token: "mock-jwt-token",

    };

}

export async function register(
    data: RegisterRequest
): Promise<AuthResponse> {

    await new Promise(resolve =>
        setTimeout(resolve, 500)
    );

    return {

        user: {

            ...mockUser,

            firstName: data.firstName,

            lastName: data.lastName,

            email: data.email,

            phone: data.phone,

        },

        token: "mock-jwt-token",

    };

}
export async function logout(): Promise<void> {

    return;

}

export async function getCurrentUser() {

    return mockUser;

}