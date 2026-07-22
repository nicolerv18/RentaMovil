    export const changePasswordService = async (
    payload,
    fallbackErrorMessage
    ) => {
    const response = await fetch("http://tu-backend.com/api/auth/change-password", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        // quitar si el back-end requiere autenticación para cambiar la contraseña
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || fallbackErrorMessage);
    }

    return response.json();
    };
