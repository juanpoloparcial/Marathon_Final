const Aside = () => {
  // Este componente está preparado para ser una barra lateral.
  // Por ahora, solo es visible en pantallas grandes y se puede ocultar si no se necesita.
  return (
    <aside className="hidden lg:block w-64 bg-white dark:bg-gray-800 p-4 shadow-lg">
      <h2 className="text-lg font-bold mb-4">Navegación</h2>
      {/* Aquí podrías añadir enlaces de navegación adicionales en el futuro */}
      <ul className="space-y-2">
        <li><a href="/home" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Inicio</a></li>
        <li><a href="/profile" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Mi Perfil</a></li>
      </ul>
    </aside>
  );
};

export default Aside;