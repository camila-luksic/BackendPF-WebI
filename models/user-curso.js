import { query } from 'express';
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
export class UsercursoModel {
    static async getAll(idUsuario) {
        console.log(idUsuario);
        const userId = parseInt(idUsuario, 10);
        console.log(userId);
        

        const query = 'SELECT * FROM misCursos WHERE usuario = $1';
        const values = [userId];

        const result = await connection.query(query, values);

        console.log(result.rows);
        return result.rows;
    }

    static async verificarMatricula(idUsuario, idCurso) {
        const query = {
            text: 'SELECT * FROM misCursos WHERE usuario = $1 AND curso = $2',
            values: [idUsuario, idCurso]
        };

        const result = await connection.query(query);
        return result.rows.length > 0;
    }
    static async matricularUsuario(idUsuario, idCurso) {
        console.log(idCurso, "-" + idUsuario)
        await connection.query('INSERT INTO misCursos (usuario, curso) VALUES ($1, $2)',
            [idUsuario, idCurso]
        );

    }
    static async findOne( curso_id, usuario_id ) {
        console.log("--"+curso_id,usuario_id)
        const id = await connection.query('SELECT miscursos_id FROM misCursos WHERE curso = $1 AND usuario = $2', [curso_id, usuario_id]);
       console.log(id.rows[0]);
        return id.rows[0];
    }
    
}


