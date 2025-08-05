// frontend/src/CourseListPage.js
import React, { useEffect, useState } from 'react';
import courseService from './services/courseService'; // Asegúrate de que la ruta sea correcta
import { Link } from 'react-router-dom';

function CourseListPage() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await courseService.getAllCourses();
                setCourses(data);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar los cursos. Verifica que el servidor de Django esté corriendo y la URL de la API sea correcta.');
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return <div>Cargando cursos...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <div>
            <h1>Lista de Cursos</h1>
            {courses.length === 0 ? (
                <p>No hay cursos disponibles. Crea algunos en el panel de administración de Django.</p>
            ) : (
                <ul>
                    {courses.map(course => (
                        <li key={course.id}>
                            <Link to={`/courses/${course.id}`}>
                                {course.titulo} {/* Asegúrate de usar 'titulo' aquí */}
                            </Link>
                            <p>{course.descripcion}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CourseListPage;