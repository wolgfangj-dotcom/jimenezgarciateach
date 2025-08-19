import React, { useState } from 'react';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

// Main component of the React application
const App = () => {
  // State variables for managing the user's authentication status and data
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');

  // The base URL for the Django API. Update this with your actual domain in production.
  // CORRECCI\u00d3N: Usar la URL de Render para tu backend.
  const API_BASE_URL = 'https://jimenezgarciateach.onrender.com';

  /**
   * Handles the login process by sending user credentials to the Django API.
   * @param {object} event - The form submission event.
   */
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    setError(''); // Clear any previous errors
    setLoading(true); // Show a loading indicator

    try {
      // Perform the POST request to the Django login endpoint
      const response = await fetch(`${API_BASE_URL}/api/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Check if the response was successful
      if (!response.ok) {
        // Parse the error from the server
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Credenciales inv\u00e1lidas.');
      }

      // Parse the successful response to get the token
      const data = await response.json();
      setToken(data.access); // Store the access token
      setLoggedInUsername(username); // Store the username for display
      setUsername(''); // Clear the form
      setPassword(''); // Clear the form

    } catch (err) {
      // Handle any errors that occurred during the fetch call
      setError(err.message || 'Ocurri\u00f3 un error inesperado.');
      console.error('Error de login:', err);
    } finally {
      setLoading(false); // Hide the loading indicator
    }
  };

  /**
   * Handles the logout process by clearing the authentication state.
   */
  const handleLogout = () => {
    setToken(null);
    setLoggedInUsername('');
  };

  // Render the login form if the user is not authenticated
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-105">
          <div className="flex justify-center mb-6">
            <LogIn className="w-12 h-12 text-indigo-600 animate-pulse" />
          </div>
          <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Iniciar Sesi\u00f3n
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
                Nombre de usuario
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                Contrase\u00f1a
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center mb-4 font-medium animate-pulse">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Cargando...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Iniciar Sesi\u00f3n
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render the dashboard/welcome screen if the user is authenticated
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 text-center transform transition-all duration-300 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 animate-fade-in">
          \u00a1Bienvenido, {loggedInUsername}!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Has iniciado sesi\u00f3n correctamente. Tu token es:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg break-all text-sm font-mono text-gray-800 shadow-inner">
          {token}
        </div>
        <button
          onClick={handleLogout}
          className="mt-8 bg-red-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Cerrar Sesi\u00f3n
        </button>
      </div>
    </div>
  );
};

export default App;
