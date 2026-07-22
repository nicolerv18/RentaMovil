    import { useState } from "react";
    import { changePasswordService } from "../services/changePasswordService.js";
    import { isPasswordValid } from "../utils/passWorrdValidation.js";
    import {
    buildPasswordRules,
    getConfirmPasswordClassName,
    getPasswordClassName,
    } from "../utils/changePasswordUtils.js";

    function useChangePasswordLogin(t) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const passwordsMatch = password === confirmPassword;
    const isValid = isPasswordValid(password) && passwordsMatch;
    const rules = buildPasswordRules(password, t);

    const getPasswordClass = () => getPasswordClassName(password, isPasswordValid(password));
    const getConfirmClass = () => getConfirmPasswordClassName(confirmPassword, passwordsMatch);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
        await changePasswordService(
            {
            newPassword: password,
            confirmPassword,
            },
            t("changePassword.errorPassword")
        );

        window.alert(t("changePassword.successPassword"));

        setPassword("");
        setConfirmPassword("");
        } catch (err) {
        setError(err.message || t("changePassword.errorRequest"));
        console.error("Error:", err);
        } finally {
        setLoading(false);
        }
    };

    return {
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        showPassword,
        setShowPassword,
        showConfirm,
        setShowConfirm,
        loading,
        error,
        passwordsMatch,
        isValid,
        rules,
        getPasswordClass,
        getConfirmClass,
        handleChangePassword,
    };
    }

    export default useChangePasswordLogin;
