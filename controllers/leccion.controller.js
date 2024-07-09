
import { LeccionModel } from "../models/Leccion.js";
export class LeccionController {
    static async getAll(req, res) {
        const lecciones = await LeccionModel.getAll();
        res.json(lecciones);
    }

    static async createLeccion(req, res) {
        try {
            console.log('Request body:', req.body);
            const { leccion } = req.body;

            if (!leccion) {
                throw new Error('Leccion data is missing from the request body');
            }

            await LeccionModel.create({ leccion });
            res.status(201).send({ message: 'Leccion created successfully' });
        } catch (error) {
            console.error(error);
            res.status(400).send({ error: error.message });
        }
    }
    static async updateLeccion(req, res) {
        try {
            const cursoId = req.params.cursoId;
            console.log(cursoId);
            const leccionId = req.params.id;
            console.log(leccionId);
            const  {nombre,link}  = req.body;
            console.log(nombre,link)
        
            console.log(req.body);

            await LeccionModel.updateLeccion(leccionId, cursoId, { nombre, link });

            res.json({ message: `Lección con ID ${leccionId} actualizada correctamente` });
        } catch (error) {
            console.error('Error al actualizar lección:', error);
            res.status(500).json({ error: 'Error al actualizar lección' });
        }
    };
    
    static async deleteLeccion(req, res) {
        try {
            const { id } = req.params;
            console.log('ID de la lección:', id);

            await LeccionModel.deleteLeccion(id);
            res.status(201).send({ message: 'Leccion deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(400).send({ error: error.message });
        }
    }

    static async getLeccionesByCursoId(req, res) {
        const { id } = req.params;

        try {
            const lecciones = await LeccionModel.getLeccionesByCursoId(id);
            console.log(lecciones);
            res.json(lecciones);
        } catch (error) {
            console.error('Error al obtener las lecciones:', error);
            res.status(500).json({ error: 'Error interno al obtener las lecciones' });
        }

    }

};
