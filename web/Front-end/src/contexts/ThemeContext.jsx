import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto del tema
const ThemeContext = createContext();

// Hook personalizado para usar el contexto del tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};

// Proveedor del contexto del tema
export const ThemeProvider = ({ children }) => {
  // Estado para el tema actual (light/dark)
  const [theme, setTheme] = useState(() => {
    // Intentar obtener el tema del localStorage, si no existe usar 'light'
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // Función para alternar entre temas
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Efecto para aplicar el tema al body y guardar en localStorage
  useEffect(() => {
    // Aplicar clase al body
    document.body.className = theme;

    // Guardar en localStorage
    localStorage.setItem('theme', theme);

    // También actualizar la variable CSS global si es necesario
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Efecto para detectar la preferencia del sistema al cargar
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Solo cambiar si no hay tema guardado en localStorage
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    // Escuchar cambios en la preferencia del sistema
    mediaQuery.addEventListener('change', handleChange);

    // Limpiar listener
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};