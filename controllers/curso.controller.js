
import { LeccionModel } from "../models/Leccion.js";
import { CursoModel } from "../models/curso.js";
import { guardarImagen } from "../utils/image.js";

export class CursoController {
    static async getAll(req, res) {
        const cursos = await CursoModel.getAll();
        res.json(cursos);
    }
    static async createCurso(req, res) {
        try {
            const curso = req.body;
            if (!curso) {
                throw new Error('Curso data is missing from the request body');
            }
            const courseId = await CursoModel.create(curso);
            res.json({
                message: 'Curso creado exitosamente',
                course_id: courseId
            });
        } catch (error) {
            console.error(error);
            res.status(400).send({ error: error.message });
        }
    }

    static async updateCurso(req,res){
     try{
         const{id}=req.params;
         console.log('Request body:', req.body);
         const curso  = req.body;
         console.log("---");
         console.log(curso);
         if (!curso) {
            throw new Error('Curso data is missing from the request body');
        }
         await CursoModel.updateCurso(id,{ curso });
         res.status(201).send({ message: 'Curso updated successfully' });
        }catch (error) {
            console.error(error);
            res.status(400).send({ error: error.message });
        }
    }
    static async deleteCurso(req,res){
        try{
            const{id}=req.params;
            console.log(id);
            
            await CursoModel.deleteCurso(id);
            res.status(201).send({ message: 'Curso deleted successfully' });
           }catch (error) {
               console.error(error);
               res.status(400).send({ error: error.message });
           }
       } 
       
    static async subirImagen(req, res) {
        console.log("holi");
        const { id } = req.params;
        console.log(id);
        if (!req.files || Object.keys(req.files).length === 0) {
            console.log("No hay archivo")
            return res.status(400).json({ message: 'No hay archivos para subir' });
        }
        const imagen = req.files.imagen;
        try {
            let prefijo="C:/Users/Camila/Downloads/Postgres/"
            const ruta = prefijo+await guardarImagen('', imagen, id);
            const usuario = await CursoModel.subirImagen({ id, ruta });
            console.log("se guarda");
            console.log(ruta);
            res.json({ ruta });

        } catch (e) {
            console.log(e);
        }
        console.log("listo");
    }
    static async getCursoById(req, res) {
        const { id } = req.params;
        try {
            const curso = await CursoModel.getCursoById(id);
            if (!curso) {
                return res.status(404).json({ message: 'Curso no encontrado' });
            }
            res.json(curso);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el curso' });
        }
    }
    static async  updateAvance  (req, res) {
        const { cursoId, leccionId } = req.body;
        const userId = req.user.id; 
    
        try {
          
            const curso = await CursoModel.findById(cursoId);
            if (!curso) {
                return res.status(404).json({ message: 'Curso no encontrado' });
            }
    
            
            const leccion = await LeccionModel.find(l => l.id === leccionId);
            if (!leccion) {
                return res.status(404).json({ message: 'Lección no encontrada' });
            }
    
            res.status(200).json({ message: 'Avance actualizado correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el avance del curso' });
        }
    };
    static async buscarCursosPorNombre(req, res) {
        const { titulo } = req.body;

        try {
            const cursosEncontrados = await CursoModel.findByTitulo(titulo); 
            res.json(cursosEncontrados);
        } catch (error) {
            console.error('Error al buscar cursos por nombre:', error);
            res.status(500).json({ message: 'Error al buscar cursos por nombre' });
        }
    }
    
    
    
}
