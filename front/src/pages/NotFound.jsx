import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <main className="text-lg">
            <div className="mt-10 mx-auto flex flex-col bg-white px-6 py-10 rounded-lg shadow-md w-full sm:px-6 sm:w-full max-w-sm text-center">
                <h2 className="text-3xl font-bold mb-6">Página no encontrada</h2>
                <p className="mb-6 text-lg">
                    Lo sentimos, pero la página que estás buscando no existe.
                </p>
                <Link to="/" className="mt-4 mx-auto w-44 bg-black text-white py-2 rounded-lg font-bold text-lg hover:scale-105 transition-transform duration-300">
                    Volver al inicio
                </Link>
            </div>
        </main>
    );
};

export default NotFound;


