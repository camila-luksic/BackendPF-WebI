
import pg from 'pg';
const { Client } = pg;

const config = {
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'postgres',
    database: 'PF-Web'
};

const connection = new Client(config);

await connection.connect()
.then(() => console.log('Conectado a PostgreSQL'))
.catch(err => console.error('Error al conectar a PostgreSQL', err));

export class AvanceModel{
    static async getByLeccionCurso({ leccion_id, mis_cursos_id }) {
        const completos = await connection.query('SELECT completo FROM avance WHERE leccion_id = $1 AND mi_curso_id = $2', [leccion_id, mis_cursos_id]);
        return  completos.rows[0];
    }

    static async create({ leccion_id, mis_cursos_id}) {
        await connection.query('INSERT INTO avance (leccion_id, mi_curso_id, completo) VALUES ($1, $2, $3)', [leccion_id, mis_cursos_id, true]);
    }

    static async getLeccionesCompletadas({ curso_id, usuario_id }) {
        try {
            const query = `
                SELECT l.leccion_id, m.miscursos_id, a.completo
                FROM leccion l
                JOIN miscursos m ON l.curso_id = m.curso
                JOIN avance a ON l.leccion_id = a.leccion_id AND m.miscursos_id = a.mi_curso_id
                WHERE m.curso = $1 AND m.usuario = $2 AND a.completo = true;
            `;
            const values = [curso_id, usuario_id];
            const lecciones = await connection.query(query, values);
    
            console.log("Resultado de la consulta:", lecciones.rows);
    
            if (lecciones.rows && lecciones.rows.length > 0) {
                return lecciones.rows;
            } else {
                console.log("No se encontraron lecciones completadas para el usuario y curso proporcionados.");
                return []; 
            }
        } catch (err) {
            console.error('Error al obtener lecciones completadas:', err);
            throw err;
        }
    }
    
    
}