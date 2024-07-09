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

export class CursoModel {
    static async getAll() {

        const result = await connection.query('SELECT * FROM cursos');
        return result.rows;
    }
    static async create(curso) {
        if (!curso) {
            throw new Error('Curso data is undefined');
        }

        const { cursos_id, nombre, categoria, descripcion, img_name } = curso;
        console.log("--");
        console.log(curso);

        if (!cursos_id || !nombre || !categoria || !descripcion || !img_name) {
            throw new Error('All fields must be provided');
        }

        const result = await connection.query(
            'INSERT INTO cursos (cursos_id, nombreCurso, categoria, descripcion, img_name) VALUES ($1, $2, $3, $4, $5) RETURNING cursos_id',
            [cursos_id, nombre, categoria, descripcion, img_name]
        );

        return result.rows[0].cursos_id;
    }

    static async updateCurso(id,{ curso }) {
        if (!curso) {
            throw new Error('Curso data is undefined');
        }
        console.log(curso);
        const { nombre,categoria, descripcion, img_name } = curso;
        if (!nombre || !categoria || !descripcion || !img_name ) {
            throw new Error('All user fields must be provided');
        }
        
        await connection.query('UPDATE  cursos SET  nombreCurso=$1,categoria=$2,descripcion=$3,img_name=$4  WHERE cursos_id=$5', [nombre,categoria,descripcion,img_name,id]);
    }
    
    static async deleteCurso(id) {
        await connection.query('DELETE from  cursos  WHERE cursos_id=$1', [id]);
     console.log("Eliminado");
    }
    
    static async subirImagen({ id, ruta }) {
        const queryUser = {
            text: 'SELECT * FROM cursos WHERE cursos_id = $1;',
            values: [id]
        }
        const user = await connection.query(queryUser);
        if (user.rows.length === 0) {
            return null;
        }
        
        const query = {
            text: `UPDATE cursos SET img_name = $1 WHERE cursos_id = $2 RETURNING cursos_id,nombreCurso,categoria,descripcion,img_name ;`,
            values: [ruta, id]
        }
        const result = await connection.query(query);
        return result.rows[0];
    }
    
    static async getCursoById(id) {
        try {
            const result = await connection.query('SELECT * FROM cursos WHERE cursos_id = $1', [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
    static async findByTitulo(titulo) {
        try {
            const query = {
                text: 'SELECT * FROM cursos WHERE nombreCurso ILIKE $1',
                values: [`%${titulo}%`]
            };
            const result = await connection.query(query);
            return result.rows;
        } catch (error) {
            throw new Error('Error al buscar cursos por título');
        }
    }
    


}