    export const isPasswordValid = (pass) => {
        return pass.length >= 8 &&
            /[A-Z]/.test(pass) &&
            /[#@!$%^&*]/.test(pass);
    };
