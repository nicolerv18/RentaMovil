import { httpClient } from "../../../shared/api/httpClient";
import { tokenStore } from "../../../shared/api/tokenStore";
import { toLoginPayload, toRegisterPayload, toAuthUserViewModel } from "./authMapper";
import { saveSession, getStoredUser, clearSession } from "./sessionStorage";

const RESOURCE = "/auth";

export const authService = {
    async login(credentials) {
        const response = await httpClient.post(`${RESOURCE}/login`, toLoginPayload(credentials));
        tokenStore.setAccessToken(response.accessToken);
        const user = toAuthUserViewModel(response.user);
        saveSession({ accessToken: response.accessToken, refreshToken: response.refreshToken, user });
        return { user };
    },

    async register(formData) {
        const response = await httpClient.post(`${RESOURCE}/register`, toRegisterPayload(formData));
        tokenStore.setAccessToken(response.accessToken);
        const user = toAuthUserViewModel(response.user);
        saveSession({ accessToken: response.accessToken, refreshToken: response.refreshToken, user });
        return { user };
    },

    async logout() {
        const refreshToken = localStorage.getItem('rentamovil_refresh_token');
        try {
            await httpClient.post(`${RESOURCE}/logout`, { refreshToken });
        } catch {
            // si falla, igual limpiamos la sesión local
        }
        tokenStore.clear();
        clearSession();
    },

    async getProfile() {
        const response = await httpClient.get(`${RESOURCE}/me`);
        return toAuthUserViewModel(response);
    },

    getStoredUser, // re-exportado para que el componente sepa si ya hay sesión al recargar

    forgotPassword: (email) => httpClient.post(`${RESOURCE}/forgot-password`, { email }),
    verifyCode: (email, code) => httpClient.post(`${RESOURCE}/verify-code`, { email, code }),
    resetPassword: (payload) => httpClient.post(`${RESOURCE}/reset-password`, payload),
    changePassword: (currentPassword, newPassword) => httpClient.patch(`${RESOURCE}/me/password`, { currentPassword, newPassword }),
};