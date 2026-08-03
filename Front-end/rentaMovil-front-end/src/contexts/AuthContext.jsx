import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "user_session";
const USERS_KEY = "registered_users";

const DEFAULT_USERS = [
  {
    id: 1,
    nombre: "Thiago",
    email: "thiago@gmail.com",
    password: "123456",
    telefono: "3001234567",
  },
];

const normalizeUser = (user) => {
  if (!user) return null;

  const password = user.password ?? user.pass ?? "";
  const fullName = user.nombre || user.name || "";

  return {
    ...user,
    password,
    pass: password,
    nombre: fullName,
  };
};

const readStoredUsers = () => {
  if (typeof window === "undefined") return DEFAULT_USERS.map(normalizeUser);

  try {
    const storedUsers = localStorage.getItem(USERS_KEY);
    if (storedUsers) {
      const parsed = JSON.parse(storedUsers);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeUser);
      }
    }
  } catch (error) {
    console.error("No se pudieron cargar los usuarios:", error);
  }

  localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
  return DEFAULT_USERS.map(normalizeUser);
};

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => readStoredUsers());
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const session = localStorage.getItem(STORAGE_KEY);
    if (session) {
      try {
        const parsedUser = normalizeUser(JSON.parse(session));
        setCurrentUser(parsedUser);
        setIsAuthenticated(Boolean(parsedUser));
      } catch (error) {
        console.error("No se pudo restaurar la sesión:", error);
      }
    }
  }, []);

  const login = ({ email, password }) => {
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const foundUser = users.find(
      (user) =>
        String(user.email || "").trim().toLowerCase() === normalizedEmail &&
        String(user.password || "") === String(password || "")
    );

    if (!foundUser) {
      throw new Error("Credenciales inválidas");
    }

    const sessionUser = normalizeUser(foundUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
    localStorage.setItem("user", JSON.stringify(sessionUser));
    setCurrentUser(sessionUser);
    setIsAuthenticated(true);
    return sessionUser;
  };

  const register = (data) => {
    const normalizedEmail = String(data.email || "").trim().toLowerCase();
    const existingUser = users.some(
      (user) => String(user.email || "").trim().toLowerCase() === normalizedEmail
    );

    if (existingUser) {
      throw new Error("El correo ya está registrado");
    }

    const newUser = normalizeUser({
      id: Date.now(),
      nombre: data.nombre || `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      email: normalizedEmail,
      password: data.password,
      telefono: data.telefono || "",
      username: data.username || normalizedEmail.split("@")[0],
    });

    const updatedUsers = [...users, newUser];
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    localStorage.setItem("user", JSON.stringify(newUser));
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    return newUser;
  };

  const updateProfile = (profileData) => {
    if (!currentUser) {
      return null;
    }

    const updatedUser = normalizeUser({
      ...currentUser,
      ...profileData,
      email: profileData.email || currentUser.email,
      nombre: profileData.nombre || currentUser.nombre || profileData.name || currentUser.name,
      telefono: profileData.telefono || currentUser.telefono || "",
      password: profileData.password || currentUser.password || currentUser.pass || "",
    });

    const updatedUsers = users.map((user) =>
      String(user.email || "").trim().toLowerCase() === String(currentUser.email || "").trim().toLowerCase()
        ? updatedUser
        : user
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setCurrentUser(updatedUser);
    return updatedUser;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("user");
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated,
      users,
      login,
      register,
      updateProfile,
      logout,
    }),
    [currentUser, isAuthenticated, users]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}
