import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col text-center">
            <h2>Página no encontrada</h2>
            <Link to="/">Volver al inicio</Link>
        </div>
    );
};

export default NotFound;
