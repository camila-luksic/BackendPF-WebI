import { AvanceModel} from '../models/avance.js';
export class AvanceController {
    static async getByLeccionCurso(req, res) {
        const { leccion_id, mis_cursos_id } = req.params;
        console.log(leccion_id, mis_cursos_id);
        const vistos = await AvanceModel.getByLeccionCurso({ leccion_id, mis_cursos_id });
        res.json(vistos);
    }

    static async create(req, res) {
        const { leccion_id, mis_cursos_id } = req.body;

        console.log('Datos recibidos en la solicitud:', req.body);
        console.log('leccion_id:', leccion_id);
        console.log('mis_cursos_id:', mis_cursos_id);

        if (!leccion_id || !mis_cursos_id) {
            return res.status(400).json({ error: 'Faltan datos necesarios' });
        }

        await AvanceModel.create({ leccion_id, mis_cursos_id });
        res.status(201).json({ message: ' Creado' });
    }

    static async getLeccionesCompletadas(req, res) {
        const { curso_id, usuario_id } = req.params;
        console.log(curso_id,usuario_id);
        const lecciones = await AvanceModel.getLeccionesCompletadas({ curso_id, usuario_id });
        console.log("leeciones:"+lecciones);
        res.json(lecciones);
    }
}