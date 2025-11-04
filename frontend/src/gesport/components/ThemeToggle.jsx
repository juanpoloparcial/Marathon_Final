import React from 'react';
// 1. MODIFICACIÓN: Importamos nuestro nuevo hook 'useTheme'
import { useTheme } from "../context/ThemeContext";

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <circle cx="12" cy="12" r="4" />
    <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.364 -14.364l.707 .707m12.728 0l-.707 .707m0 12.728l.707 .707m-12.728 0l-.707 -.707" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
  </svg>
);

const ThemeToggle = () => {
  // 2. MODIFICACIÓN: Usamos el hook y obtenemos 'theme'.
  //    Ya no hay 'darkMode' ni 'toggleTheme'.
  const { theme } = useTheme();

  return (
    // 3. MODIFICACIÓN: Ya no es un <button>, sino un <div> no interactivo.
    <div
      aria-label={`Modo actual: ${theme === 'light' ? 'claro' : 'oscuro'}`}
      className="p-2 rounded-full text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 cursor-default"
    >
      {/* 4. LÓGICA DE INDICADOR:
          - Si el tema actual es 'light' (claro), muestra el Sol.
          - Si el tema actual es 'dark' (oscuro), muestra la Luna.
      */}
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
    </div>
  );
};

export default ThemeToggle;