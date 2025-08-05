import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};

const ProfilePage = () => {
    const { currentUser, isIdentityValidated, setIdentityValidated } = useAuth();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleValidateIdentity = async () => {
        if (!currentUser) {
            setMessage('Error: No se encontró el usuario actual.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);
            const userId = currentUser.uid;

            const identityDocRef = doc(db, `artifacts/${appId}/users/${userId}/identityValidation`, 'data');

            await setDoc(identityDocRef, {
                isValidated: true,
                validationDate: new Date().toISOString(),
                userId: userId,
            });

            setIdentityValidated(true);
            setMessage('¡Tu identidad ha sido validada con éxito!');
        } catch (error) {
            console.error("Error validating identity:", error);
            setMessage('Error al validar la identidad. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">Perfil de Usuario</h1>
                {currentUser && (
                    <p className="text-gray-700">Email: {currentUser.email}</p>
                )}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Estado de Identidad</h2>
                    <p className={`font-bold ${isIdentityValidated ? 'text-green-600' : 'text-red-600'}`}>
                        {isIdentityValidated ? '✔️ Identidad Validada' : '❌ Identidad No Validada'}
                    </p>
                </div>
                {!isIdentityValidated && (
                    <div className="mt-8">
                        <button
                            onClick={handleValidateIdentity}
                            disabled={loading}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow disabled:opacity-50"
                        >
                            {loading ? 'Validando...' : 'Validar Identidad'}
                        </button>
                    </div>
                )}
                {message && (
                    <p className={`mt-4 text-sm font-bold ${message.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
