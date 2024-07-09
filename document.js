document.addEventListener('DOMContentLoaded', async () => {
    const cursosContainer = document.getElementById('cursos-container');

    try {
        const response = await fetch('http://localhost:3000/cursos');
        if (!response.ok) {
            throw new Error('Error al obtener los cursos');
        }
        const cursos = await response.json();

        cursos.forEach(curso => {
            const cursoElement = document.createElement('div');
            cursoElement.innerHTML = `
                <h2>${curso.nombrecurso}</h2>
                <img src="${curso.img_name}" alt="${curso.nombreCurso}" width="200">
                <p>${curso.descripcion}</p>
            `;
            cursosContainer.appendChild(cursoElement);
        });
    } catch (error) {
        console.error('Error:', error);
        cursosContainer.innerHTML = '<p>Error al cargar los cursos</p>';
    }
});
