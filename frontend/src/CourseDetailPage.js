// frontend/src/CourseDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import courseService from './services/courseService';

function CourseDetailPage() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const data = await courseService.getCourseById(id);
                setCourse(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching course details:", err);
                setError("Curso no encontrado o error al cargar los detalles.");
                setLoading(false);
            }
        };

        if (id) {
            fetchCourse();
        } else {
            setError("ID de curso no proporcionado en la URL.");
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return <div className="text-center py-4">Cargando detalles del curso...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-500">{error}</div>;
    }

    if (!course) {
        return <div className="text-center py-4">Curso no encontrado.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{course.titulo}</h1>
            <p className="text-gray-700 mb-6">{course.descripcion}</p>

            {course.modules && course.modules.length > 0 ? (
                <div className="modules-section">
                    <h2 className="text-2xl font-semibold mb-4">Contenido del Curso</h2>
                    {course.modules.map(module => (
                        <div key={module.id} className="module-item bg-white p-4 rounded-lg shadow mb-4">
                            <h3 className="text-xl font-medium mb-2">{module.titulo}</h3>
                            <p className="text-gray-600 mb-3">{module.descripcion}</p>

                            {module.lessons && module.lessons.length > 0 ? (
                                <div className="lessons-list mt-3">
                                    {module.lessons.map(lesson => (
                                        <div key={lesson.id} className="lesson-item border-t pt-3 mt-3">
                                            <h4 className="text-lg font-normal mb-2">{lesson.titulo}</h4>
                                            <p className="text-sm text-gray-500">Tipo: {lesson.tipo}</p>

                                            {/* Lógica para renderizar contenido según el tipo de lección */}

                                            {/* Tipo: TEXTO */}
                                            {lesson.tipo === 'TEXT' && lesson.contenido && (
                                                <div className="lesson-content text-gray-800 mt-2"
                                                     dangerouslySetInnerHTML={{ __html: lesson.contenido }} />
                                            )}

                                            {/* Tipo: VIDEO */}
                                            {lesson.tipo === 'VIDEO' && lesson.url_recurso && (
                                                <div className="video-container relative" style={{ paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                                                    <iframe
                                                        className="absolute top-0 left-0 w-full h-full"
                                                        src={lesson.url_recurso}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        title={lesson.titulo}
                                                    ></iframe>
                                                </div>
                                            )}

                                            {/* Tipo: SIMULATOR */}
                                            {lesson.tipo === 'SIMULATOR' && lesson.url_recurso && (
                                                <div className="simulator-container mt-2" style={{ width: '100%', height: '600px', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
                                                    <iframe
                                                        src={lesson.url_recurso}
                                                        title={lesson.titulo}
                                                        style={{ width: '100%', height: '100%', border: 'none' }}
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                            )}

                                            {/* ¡NUEVO! Tipo: PDF */}
                                            {lesson.tipo === 'PDF' && lesson.file_resource && (
                                                <div className="pdf-container mt-2" style={{ width: '100%', height: '700px', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
                                                    {/* Usar Google Docs Viewer para incrustar PDF, o simplemente un enlace de descarga */}
                                                    {/* Opción 1: Visor de Google Docs (puede no funcionar con todos los PDF o si Google lo restringe) */}
                                                    <iframe
                                                        src={`https://docs.google.com/gview?url=${encodeURIComponent(lesson.file_resource)}&embedded=true`}
                                                        style={{ width: '100%', height: '100%', border: 'none' }}
                                                        title={lesson.titulo + " PDF"}
                                                        allowFullScreen
                                                    ></iframe>
                                                    {/* Opción 2: Enlace de descarga (más robusto) */}
                                                    <p className="text-center mt-2">
                                                        <a href={lesson.file_resource} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                            Descargar PDF: {lesson.titulo}
                                                        </a>
                                                    </p>
                                                </div>
                                            )}

                                            {/* ¡NUEVO! Tipo: PPT */}
                                            {lesson.tipo === 'PPT' && lesson.file_resource && (
                                                <div className="ppt-container mt-2 text-center">
                                                    <p className="text-gray-800">
                                                        Para ver la presentación, por favor, descárguela:
                                                    </p>
                                                    <a href={lesson.file_resource} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline font-bold">
                                                        Descargar Presentación: {lesson.titulo}
                                                    </a>
                                                    {/* Opcional: Podrías intentar incrustar con Google Docs Viewer si es un formato compatible */}
                                                    {/* <iframe
                                                        src={`https://docs.google.com/gview?url=${encodeURIComponent(lesson.file_resource)}&embedded=true`}
                                                        style={{ width: '100%', height: '600px', border: 'none' }}
                                                        title={lesson.titulo + " PPT"}
                                                        allowFullScreen
                                                    ></iframe> */}
                                                </div>
                                            )}

                                            {/* Si no hay contenido específico para el tipo, puedes mostrar un mensaje */}
                                            {!(lesson.tipo === 'TEXT' || lesson.tipo === 'VIDEO' || lesson.tipo === 'SIMULATOR' || lesson.tipo === 'PDF' || lesson.tipo === 'PPT') && (
                                                <p className="text-gray-500 mt-2">Contenido de lección de tipo '{lesson.tipo}' no disponible para visualización.</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">No hay lecciones en este módulo.</p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 italic">No hay módulos definidos para este curso.</p>
            )}
        </div>
    );
}

export default CourseDetailPage;
