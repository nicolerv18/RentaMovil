const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function request(endpoint, { method = 'GET', body, headers = {} } = {}) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json', ...headers },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        throw new Error(errorBody?.message || `Error ${res.status} en ${endpoint}`);
    }

    if (res.status === 204) return null;
    return res.json();
}

export const httpClient = {
    get: (endpoint) => request(endpoint),
    post: (endpoint, body) => request(endpoint, { method: 'POST', body }),
    put: (endpoint, body) => request(endpoint, { method: 'PUT', body }),
    patch: (endpoint, body) => request(endpoint, { method: 'PATCH', body }),
    delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};