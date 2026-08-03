    import { useState } from "react";
    import { changePasswordService } from "../services/changePasswordService.js";
    import { isPasswordValid } from "../utils/passWorrdValidation.js";
    import {
    buildPasswordRules,
    getConfirmPasswordClassName,
    getCurrentPasswordClassName,
    getPasswordClassName,
    } from "../utils/changePasswordUtils.js";
    import { useAuth } from "../../../contexts/AuthContext.jsx";

    function useChangePassword(t) {
    const { currentUser, updateProfile } = useAuth();
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const passwordsMatch = password === confirmPassword;
    const isValid = isPasswordValid(password) && passwordsMatch && currentPassword.length > 0;
    const rules = buildPasswordRules(password, t);

    const getCurrentPasswordClass = () => getCurrentPasswordClassName(currentPassword);
    const getPasswordClass = () => getPasswordClassName(password, isPasswordValid(password));
    const getConfirmClass = () => getConfirmPasswordClassName(confirmPassword, passwordsMatch);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
        if (currentUser && currentPassword !== currentUser.password && currentPassword !== currentUser.pass) {
            throw new Error(t("changePassword.errorPassword") || "La contraseña actual no coincide");
        }

        if (currentUser) {
            updateProfile({ password });
        }

        window.alert(t("changePassword.successPassword"));

        setCurrentPassword("");
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
        currentPassword,
        setCurrentPassword,
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
        getCurrentPasswordClass,
        getPasswordClass,
        getConfirmClass,
        handleChangePassword,
    };
    }

    export default useChangePassword;
