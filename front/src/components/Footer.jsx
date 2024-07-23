const Footer = () => {
    return (
      <footer className="bg-white text-black absolute bottom-0 left-0 right-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <img
                className="h-48 w-48"
                src="/logo_hackaverse.svg"
                alt="Hackaverse"
              />
            </div>
            <p className="text-sm text-gray-600">
              &copy; 2024 Hackaverse. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  