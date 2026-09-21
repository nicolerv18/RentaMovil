export function toLoginPayload({ email, password }) {
    return {
        email: email.trim().toLowerCase(),
        password,
    };
}

export function toRegisterPayload(formData) {
    return {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        username: formData.username.trim(),
        password: formData.password,
    };
}

export function toAuthUserViewModel(user) {
    return {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role,
    };
}