import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  return (
    // --- CONTENEDOR PRINCIPAL MODIFICADO ---
    // 1. Se cambia 'min-h-screen' por 'h-screen' para forzar la altura al 100% de la pantalla.
    // 2. Se añade 'overflow-hidden' para asegurar que este div nunca muestre una barra de scroll.
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      
      <Header />
      
      {/* --- CONTENIDO PRINCIPAL MODIFICADO --- */}
      {/* 3. Se añade 'overflow-y-auto' para que esta sección tenga scroll si su contenido es muy alto. */}
      {/* 4. Se añade 'hide-scrollbar' para ocultar la barra de scroll que acabamos de crear. */}
      <main className="flex-grow overflow-y-auto hide-scrollbar">
        {/* Outlet renderizará aquí Home.jsx o Profile.jsx, y podrán crecer tanto como quieran */}
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;