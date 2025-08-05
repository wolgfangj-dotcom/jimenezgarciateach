import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">¡Bienvenido al Dashboard!</h1>
                {user && (
                    <>
                        <p className="text-xl text-gray-600 mb-2">Hola, {user.username || 'Usuario'}</p>
                        <p className="text-lg font-semibold text-blue-500 mb-6">Tu rol es: {user.role || 'sin rol'}</p>
                    </>
                )}
                <div className="mt-8 space-y-4">
                    {/* Ejemplo de renderizado condicional según el rol */}
                    {user && user.role === 'admin' && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded" role="alert">
                            <p className="font-bold">Acceso de Administrador</p>
                            <p>Puedes ver contenido exclusivo para administradores.</p>
                        </div>
                    )}
                    {user && user.role === 'teacher' && (
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded" role="alert">
                            <p className="font-bold">Acceso de Profesor</p>
                            <p>Puedes ver y gestionar los cursos.</p>
                        </div>
                    )}
                    {user && user.role === 'student' && (
                        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded" role="alert">
                            <p className="font-bold">Acceso de Estudiante</p>
                            <p>Puedes ver tus cursos asignados.</p>
                        </div>
                    )}
                </div>
                <button
                    onClick={handleLogout}
                    className="mt-8 bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 shadow-md"
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
