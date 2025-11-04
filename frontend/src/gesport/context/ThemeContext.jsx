"use client";
import { createContext, useState, useEffect, useContext } from 'react';

// Se mantiene la creación del contexto
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Detección SSR-safe del tema inicial (localStorage > media query > 'light')
  const getInitialTheme = () => {
    try {
      if (typeof window === 'undefined') return 'light';
      const stored = window.localStorage?.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } catch {
      return 'light';
    }
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Solo actualizar automáticamente si no hay preferencia guardada
      const stored = window.localStorage?.getItem('theme');
      if (!stored) setTheme(e.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = window.document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    try { window.localStorage?.setItem('theme', theme); } catch {}
  }, [theme]);

  // 4. MODIFICACIÓN: El valor proveído ahora es solo 'theme'.
  //    Ya no existe 'darkMode' ni 'toggleTheme'.
  const value = {
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};


// 5. NUEVO (RECOMENDADO): Crear un hook personalizado para consumir el contexto.
//    Esto hace el código en otros componentes más limpio.
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
    }
    return context;
}