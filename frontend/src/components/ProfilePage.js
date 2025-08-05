import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    if (!currentUser) {
        return <div className="flex items-center justify-center min-h-screen text-xl font-bold">Cargando perfil...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Perfil de Usuario</h1>
                <p className="text-lg text-gray-600 mb-2">
                    <span className="font-semibold">ID de Usuario:</span> {currentUser.uid}
                </p>
                <p className="text-lg text-gray-600 mb-6">
                    <span className="font-semibold">Email:</span> {currentUser.email || 'N/A'}
                </p>
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 shadow-md"
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
