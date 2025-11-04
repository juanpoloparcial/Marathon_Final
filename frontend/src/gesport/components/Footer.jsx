const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner mt-auto">
      <div className="container mx-auto px-4 py-4">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} GeSport. Todos los derechos reservados.
        </p>
      </div>
    </footer>   
  );
};

export default Footer;