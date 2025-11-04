import { NavLink, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

// --- Iconos para la interfaz ---
const LogoutIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg> );
const HomeIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a2 2 0 002 2h10a2 2 0 002-2V10M9 20v-6a2 2 0 012-2h2a2 2 0 012 2v6" /></svg> );
const ProfileIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> );


const Header = () => {
  const location = useLocation();
  const activeLinkStyle = { color: '#3B82F6' };

  const handleLogout = async () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      alert("Has cerrado sesión correctamente.");
      window.location.href = '/';
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* --- 1. ELEMENTOS DE LA IZQUIERDA: Navegación --- */}
        <nav className="hidden md:flex items-center space-x-8">
          {location.pathname !== '/home' && (
            <NavLink to="/home" title="Inicio" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
              <HomeIcon />
            </NavLink>
          )}
          {location.pathname !== '/profile' && (
            <NavLink to="/profile" title="Perfil" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
              <ProfileIcon />
            </NavLink>
          )}
        </nav>

        {/* --- 2. ELEMENTO CENTRAL: Logo/Título --- */}
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          <NavLink to="/home">GeSport</NavLink>
        </div>

        {/* --- 3. ELEMENTOS DE LA DERECHA: Acciones --- */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button 
  onClick={handleLogout} 
  className="hidden md:flex items-center justify-center px-4 py-2 
             bg-red-500/80 text-white font-semibold rounded-lg shadow-sm 
             hover:bg-red-600/80 transition-colors">
  <LogoutIcon />
  <span className="hidden lg:inline">Cerrar Sesion</span>
</button>
        </div>
      </div>
    </header>
  );
};

export default Header;