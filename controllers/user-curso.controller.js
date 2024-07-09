
import { UsercursoModel } from "../models/user-curso.js";
export class UsercursoController {
    static async getAll(req, res) {
        try {
            console.log(req.body);
            console.log(req.params.id);
            
            const idUsuario = parseInt(req.params.id);
            console.log('Usuario ID:', idUsuario);
            
            if (isNaN(idUsuario)) {
                throw new Error('ID de usuario no válido');
            }
            
            const users = await UsercursoModel.getAll(idUsuario);
            res.json(users);
        } catch (error) {
            console.error('Error al obtener usuarios:', error.message);
            res.status(400).json({ success: false, message: error.message });
        }
    } 
    static async matricularUsuario(req, res) {
        try {
            console.log('Request body:', req.body);  

            const { usuario: idUsuario, curso: idCurso } = req.body;
            console.log(`${idCurso} - ${idUsuario}`);  
            await UsercursoModel.verificarMatricula(idUsuario,idCurso);

            await UsercursoModel.matricularUsuario(idUsuario, idCurso);
            res.status(200).json({ success: true, message: 'Matrícula exitosa.' });
        } catch (error) {
            console.error('Error al matricular usuario:', error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async getMisCursosId(req, res) {
        const { cursoId, usuarioId } = req.params;
        console.log("**"+cursoId,usuarioId)
    
        try {
            const usercurso = await UsercursoModel.findOne(cursoId,usuarioId);
    
            if (!usercurso) {
                return res.status(404).json({ error: 'No se encontró el curso para el usuario' });
            }
           
            res.json( usercurso);
            console.log(usercurso );
        } catch (error) {
            console.error('Error al obtener ID de mis cursos:', error);
            res.status(500).json({ error: 'Error al obtener ID de mis cursos' });
        }
    }
    
}
