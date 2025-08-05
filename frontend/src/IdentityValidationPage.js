// frontend/src/IdentityValidationPage.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import SignatureCanvas from 'react-signature-canvas';

// Importa las funciones de Firebase
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function IdentityValidationPage() {
    const { setIdentityValidated, currentUser } = useAuth();
    const navigate = useNavigate();

    const [dni, setDni] = useState('');
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [photoId, setPhotoId] = useState(null);
    const [photoIdPreview, setPhotoIdPreview] = useState('');
    const sigCanvas = useRef({});
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Obtener instancias de Firebase
    const db = getFirestore();
    const auth = getAuth();

    // Determinar el userId para Firestore
    const userId = auth.currentUser?.uid || 'anonymous'; // Usar UID de Firebase Auth o un ID anónimo/generado

    useEffect(() => {
        // Cargar datos existentes si el usuario ya validó su identidad
        const fetchExistingValidation = async () => {
            if (userId && userId !== 'anonymous') {
                const docRef = doc(db, `artifacts/${appId}/users/${userId}/identityValidation`, 'data');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    // Si ya existe, redirigir al usuario (o mostrar mensaje de ya validado)
                    setIdentityValidated(true);
                    navigate('/courses');
                }
            }
        };
        fetchExistingValidation();
    }, [userId, db, navigate, setIdentityValidated]);


    const handlePhotoIdChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoId(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoIdPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPhotoId(null);
            setPhotoIdPreview('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsSubmitting(true);

        if (!dni || !fullName || !address || !photoId || sigCanvas.current.isEmpty()) {
            setError('Por favor, complete todos los campos y proporcione la foto y la firma.');
            setIsSubmitting(false);
            return;
        }

        const signatureBase64 = sigCanvas.current.toDataURL(); // Obtener la firma como Base64

        // Datos a guardar en Firestore
        const validationData = {
            dni: dni,
            fullName: fullName,
            address: address,
            // Guardamos la foto y firma como Base64 directamente en Firestore por simplicidad.
            // En una aplicación real, se subirían a Firebase Storage y se guardarían las URLs.
            photoIdBase64: photoIdPreview,
            signatureBase64: signatureBase64,
            timestamp: new Date(),
            validatedBy: currentUser ? currentUser.username : 'anonymous', // Quien valida (simulado)
        };

        try {
            // Referencia al documento en Firestore
            // Path: /artifacts/{appId}/users/{userId}/identityValidation/data
            const docRef = doc(db, `artifacts/${appId}/users/${userId}/identityValidation`, 'data');
            await setDoc(docRef, validationData);

            setIdentityValidated(true); // Marcar como validado en el contexto
            setSuccessMessage('¡Identidad validada exitosamente! Redirigiendo a cursos...');
            setTimeout(() => {
                navigate('/courses');
            }, 2000);
        } catch (err) {
            console.error("Error al guardar la validación de identidad en Firestore:", err);
            setError('Error al validar la identidad. Intente de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const clearSignature = () => {
        sigCanvas.current.clear();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-center mb-6">Validación de Identidad Obligatoria</h2>
                <p className="text-gray-700 text-sm mb-6 text-center">
                    Por motivos de seguridad, es necesario validar su identidad. Esta información será almacenada de forma segura y no podrá ser modificada posteriormente.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dni">
                            DNI
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="dni"
                            type="text"
                            placeholder="Ingrese su DNI"
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                            Nombre Completo
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="fullName"
                            type="text"
                            placeholder="Ingrese su nombre completo"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                            Dirección de Domicilio
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="address"
                            placeholder="Ingrese su dirección"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            rows="3"
                            required
                            disabled={isSubmitting}
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photoId">
                            Foto ID (Rostro con DNI a la altura de pómulos/al costado de la cara)
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="photoId"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoIdChange}
                            required
                            disabled={isSubmitting}
                        />
                        {photoIdPreview && (
                            <div className="mt-2">
                                {/* La foto no se mostrará después de la validación final, solo en la vista previa de carga */}
                                <img src={photoIdPreview} alt="Vista previa Foto ID" className="max-w-xs h-auto rounded-md shadow-sm" />
                            </div>
                        )}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Firma Digital
                        </label>
                        <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
                            <SignatureCanvas
                                ref={sigCanvas}
                                penColor='black'
                                canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                                backgroundColor='rgb(240, 240, 240)'
                                disabled={isSubmitting}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={clearSignature}
                            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline text-sm"
                            disabled={isSubmitting}
                        >
                            Limpiar Firma
                        </button>
                    </div>

                    {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                    {successMessage && <p className="text-green-500 text-xs italic mb-4">{successMessage}</p>}

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Validando...' : 'Validar Identidad'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default IdentityValidationPage;

