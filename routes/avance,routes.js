import { Router } from "express";
import { AvanceController } from "../controllers/avance.controller.js";

const AvanceRouter = Router();

AvanceRouter.get('/leccion/:leccion_id/curso/:mis_cursos_id', AvanceController.getByLeccionCurso);
AvanceRouter.post('/', AvanceController.create);
AvanceRouter.get('/curso/:curso_id/usuario/:usuario_id', AvanceController.getLeccionesCompletadas);

export default AvanceRouter;