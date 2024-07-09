
async function getUsers() {
    try {
        const response = await fetch('http://localhost:3000/usuarios');
        const users = await response.json();
        const userList = document.getElementById('userList');
        userList.innerHTML = users.map(user => `<li><a href="/users/${user.usuario_id}">${user.nombre_usuario}</a></li>`).join('');
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        alert('Error al obtener usuarios');
    }
}

getUsers();
async function getCourses() {
    try {
        const response = await fetch('http://localhost:3000/cursos');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const courses = await response.json();
        const courseList = document.getElementById('courseList');
        if (!courseList) {
            throw new Error('Elemento con ID courseList no encontrado en el DOM');
        }

      
        for (let course of courses) {
            try {
                const lessonsResponse = await fetch(`http://localhost:3000/cursos/${course.cursos_id}/lecciones`);
                if (!lessonsResponse.ok) {
                  
                    if (lessonsResponse.status === 404) {
                        console.warn(`No se encontraron lecciones para el curso ${course.cursos_id}.`);
                        continue; 
                    } else {
                        throw new Error(`HTTP error al obtener lecciones para el curso ${course.cursos_id}! Status: ${lessonsResponse.status}`);
                    }
                }
                const lessons = await lessonsResponse.json();
                
               
                const lessonsHTML = lessons.map(lesson => `
                    <li>
                        ${lesson.nombre_leccion} - <a href="${lesson.link}" target="_blank">Ver lección</a>
                    </li>
                `).join('');

                
                const courseHTML = `
                    <li>
                        <strong>${course.nombreCurso}</strong><br>
                        Categoría: ${course.categoria}<br>
                        Descripción: ${course.descripcion}<br>
                        <ul>${lessonsHTML}</ul>
                    </li>
                `;

             
                courseList.innerHTML += courseHTML;
            } catch (error) {
                console.error(`Error al obtener lecciones para el curso ${course.cursos_id}:`, error);
            
            }
        }
    } catch (error) {
        console.error('Error al obtener cursos y lecciones:', error);
        alert('Error al obtener cursos y lecciones. Consulta la consola para más detalles.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    getCourses();
});
///