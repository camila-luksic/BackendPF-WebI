import express, { json } from 'express';
import userRoutes from './routes/user.routes.js';
import { corsMiddleware } from './middlewares/cors.js';
import cursoRoutes from './routes/curso.routes.js';
import leccionRoutes from './routes/leccion.routes.js';
import fileUpload from 'express-fileupload';
import userscursoRoutes from './routes/user.curso.routes.js';
import cors from 'cors';
import avanceroutes from './routes/avance,routes.js';

const app = express();

app.use(cors());
app.use(json());
app.disable('x-powered-by');

//app.use(corsMiddleware())


app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './public/imagenes'
}));


app.use('/usuarios', userRoutes);
app.use('/login',userRoutes);
app.use('/cursos',cursoRoutes)
app.use('/lecciones',leccionRoutes)
app.use('/misCursos',userscursoRoutes)
app.use('/avance',avanceroutes)






app.get('/', (req, res) => {
    res.json({ "message": 'Hola mundo' })
});
app.post('/usuarios',(req,res)=>{
    const {name,apellido,email,password,rol}=req.body;
    res.json({name,apellido,email,password,rol});
})

//
app.post('/cursos',(req,res)=>{
    const {nombre,categoria, descripcion, img_name}=req.body;
    res.json({nombre,categoria, descripcion, img_name});
    const courseId = result.rows[0].course_id;

    res.json({ message: 'Usuario creado exitosamente',
        course_id: courseId 
    });
})
app.get('/cursos/:curso_id/lecciones', async (req, res) => {
    const curso_id = req.params.curso_id;

    try {
        const client = await pool.connect();

        
        const query = 'SELECT * FROM leccion WHERE curso_id = $1';
        const { rows } = await client.query(query, [curso_id]);

      
        if (rows.length === 0) {
            return res.status(404).json({ error: 'No se encontraron lecciones para el curso especificado' });
        }

       
        res.json(rows);

      
        client.release();
        
    } catch (error) {
        console.error('Error al obtener lecciones:', error);
        res.status(500).json({ error: 'Error interno al obtener lecciones' });
    }
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
})

//activar el cors para crear cursos 
//desactivarlo para mostrar
