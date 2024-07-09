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

export class CategoriaModel {
    static async getAll() {

        const result = await connection.query('SELECT * FROM categoria');
        return result.rows;
    }
    static async create(categoria) {
        if (!categoria) {
            throw new Error('Curso data is undefined');
        }

        const { nombreCategoria } = categoria;
        console.log("--");
        console.log(curso);

        if (!nombreCategoria) {
            throw new Error('All fields must be provided');
        }

        const result = await connection.query(
            'INSERT INTO categoria (categoria_nombre) VALUES ($1) ',
            [nombreCategoria]
        );

        return result.rows[0];
    }

    static async updateCategoria(id,{ categoria }) {
        if (!categoria) {
            throw new Error('Curso data is undefined');
        }
        console.log(categoria);
        const { idCategoria,nombreCategoria } = categoria;
        if (!idCategoria|| !nombreCategoria ) {
            throw new Error('All user fields must be provided');
        }
        
        await connection.query('UPDATE  categoria SET  categoria_nombre=$1 WHERE categoria_id=$2', [nombreCategoria,idCategoria]);
    }
    
    static async deleteCategoria(id) {
        await connection.query('DELETE from  categoria  WHERE categoria_id=$1', [id]);
     console.log("Eliminado");
    }


}