const REFRESH_TOKEN_KEY = 'rentamovil_refresh_token';
const USER_KEY = 'rentamovil_user';

export function saveSession({ accessToken, refreshToken, user }) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getStoredUser() {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
}

export function clearSession() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}