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

export class UserModel {
    static async getAll() {
        
        const result = await connection.query('SELECT * FROM usuario');
        return result.rows;
    }
 
    static async create({ user }) {
        if (!user) {
            throw new Error('User data is undefined');
        }
        console.log(user);
        const { name,apellido, email, password ,rol} = user;
        if (!name || !apellido || !email || !password || !rol) {
            throw new Error('All user fields must be provided');
        }
        
        await connection.query('INSERT INTO usuario (nombre_usuario,apellido_usuario,email,contrasena,rol) VALUES ($1, $2, $3,$4,$5)', [name,apellido, email, password,rol]);
    }
    
    static async login({ email, password }) {
        const result = await connection.query( 'SELECT usuario_id, nombre_usuario, email FROM usuario WHERE email = $1 AND contrasena = $2'
           , [email, password]);
        console.log("---");
        console.log(result.rows);
        if (result.rowCount !== 1) {
            return null;
        }
        console.log("id:" + result.rows[0].usuario_id);
        
        return {
            id: result.rows[0].usuario_id,
            nombre: result.rows[0].nombre_usuario,
            email: result.rows[0].email
        };
    }
    
}

