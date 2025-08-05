// frontend/src/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function Navbar() {
    const { isAuthenticated, currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirigir al login después de cerrar sesión
    };

    // No renderizar la Navbar si no está autenticado (o si está en la página de login/validación)
    // Esto lo controlaremos con las rutas protegidas en App.js
    // Aquí, simplemente renderizamos la barra si isAuthenticated es true
    if (!isAuthenticated) {
        return null;
    }

    return (
        <nav className="bg-gray-800 p-4 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/courses" className="text-xl font-bold">
                    Plataforma Educativa
                </Link>
                <div className="flex items-center space-x-4">
                    {isAuthenticated && (
                        <>
                            <Link to="/courses" className="hover:text-gray-300">Cursos</Link>
                            <Link to="/profile" className="hover:text-gray-300">Mi Perfil</Link>
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-300">Bienvenido, {currentUser?.username || 'Usuario'}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
                            >
                                Cerrar Sesión
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

