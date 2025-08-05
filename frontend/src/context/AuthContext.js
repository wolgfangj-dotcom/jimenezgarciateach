import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Intentamos cargar el token del almacenamiento local al inicio
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Si hay un token, asumimos que el usuario está autenticado y decodificamos los datos si es necesario
      // En una aplicación real, probablemente harías una llamada a la API para verificar el token
      // Para este ejemplo, solo asumiremos que el usuario está logueado
      setIsAuthenticated(true);
      // Para simular la información del usuario, puedes almacenarla junto con el token
      // O hacer una llamada a un endpoint de /api/me/
      setUser(JSON.parse(localStorage.getItem('user')) || { username: 'Usuario', role: 'admin' });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Aquí hacemos la llamada a tu API de Django
      // Reemplaza 'https://tu-dominio-django.com/api/login/' con la URL real de tu backend
      const response = await fetch('http://127.0.0.1:8000/admin/login/?next=/admin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Inicio de sesión fallido');
      }

      const data = await response.json();
      
      // La API de Django debería devolver un token y la información del usuario
      const { token, user: userData } = data;

      // Almacenamos el token y los datos del usuario
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));

      setIsAuthenticated(true);
      setUser(userData);
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Error en el inicio de sesión:', err);
      setLoading(false);
      throw err;
    }
  };

  const logout = () => {
    // Borramos el token y la información del usuario del almacenamiento local
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
