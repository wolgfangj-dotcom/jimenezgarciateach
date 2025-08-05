import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { isAuthenticated, loadingAuth } = useAuth();
    return (
        <header className="bg-white text-gray-800 shadow-md p-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">Mi App</Link>
            <nav>
                <ul className="flex space-x-4">
                    <li><Link to="/" className="hover:text-blue-500 transition duration-300">Inicio</Link></li>
                    {!loadingAuth && isAuthenticated && (
                        <>
                            <li><Link to="/dashboard" className="hover:text-blue-500 transition duration-300">Dashboard</Link></li>
                            <li><Link to="/profile" className="hover:text-blue-500 transition duration-300">Perfil</Link></li>
                        </>
                    )}
                    {!loadingAuth && !isAuthenticated && (
                        <li><Link to="/login" className="bg-blue-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-300">Iniciar Sesión</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
