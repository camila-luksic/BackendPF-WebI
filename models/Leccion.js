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

export class LeccionModel {
    static async getAll() {

        const result = await connection.query('SELECT * FROM leccion');
        return result.rows;
    }

    static async create({ leccion }) {
        if (!leccion) {
            throw new Error('Leccion data is undefined');
        }
        console.log(leccion);
        const { curso_id, leccion_id, nombre, link, } = leccion;
        if (!nombre || !link || !curso_id || !leccion_id) {
            throw new Error('All user fields must be provided');
        }
        const cursoResult = await connection.query('SELECT cursos_id FROM cursos WHERE cursos_id=$1 ', [curso_id])
        if (cursoResult.rowCount === 0) {
            throw new Error('Curso no encontrado');
        }
        await connection.query('INSERT INTO leccion (curso_id,leccion_id,nombre_leccion,link) VALUES ($1, $2,$3,$4)', [curso_id, leccion_id, nombre, link]);
    }
    static async updateLeccion(leccionId, cursoId, { nombre, link }) {
        try {
            if (!nombre || !link) {
                throw new Error('All fields must be provided');
            }
    
            const query = {
                text: 'UPDATE leccion SET nombre_leccion = $1, link = $2 WHERE leccion_id = $3 AND curso_id = $4',
                values: [nombre, link, leccionId, cursoId]
            };
    
            const result = await connection.query(query);
    
            if (result.rowCount === 0) {
                throw new Error(`No se encontró ninguna lección con ID ${leccionId} y curso ID ${cursoId}`);
            }
    
            console.log(`Lección con ID ${leccionId} y curso ID ${cursoId} actualizada correctamente`);
            return result.rows[0]; 
        } catch (error) {
            console.error('Error al actualizar la lección:', error);
            throw error; 
        }
    }
    

    static async deleteLeccion(id) {
       
        await connection.query('DELETE from  leccion  WHERE leccion_id=$1', [id]);
        console.log("Eliminado");
    }

    static async getLeccionesByCursoId(id) {
        console.log(id);
        try {
            const result = await connection.query('SELECT * FROM leccion WHERE curso_id = $1', [id]);
            console.log(result.rows);
            return result.rows;
        } catch (error) {
            throw error;
        }
       
    }

}
