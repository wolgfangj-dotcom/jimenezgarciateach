import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { isAuthenticated, loadingAuth } = useAuth();

    if (loadingAuth) {
        return <div className="flex items-center justify-center min-h-screen text-xl font-bold">Cargando...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">Bienvenido a la aplicación</h1>
                <p className="text-lg text-gray-600 mb-6">
                    Esta es una página de inicio simple.
                </p>
                {!isAuthenticated ? (
                    <Link
                        to="/login"
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
                    >
                        Iniciar Sesión
                    </Link>
                ) : (
                    <div className="flex flex-col items-center space-y-4">
                        <Link
                            to="/dashboard"
                            className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 shadow-md w-full"
                        >
                            Ir al Dashboard
                        </Link>
                        <Link
                            to="/profile"
                            className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300 shadow-md w-full"
                        >
                            Ver Perfil
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
