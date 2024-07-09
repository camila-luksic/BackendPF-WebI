
import { Router } from "express";
import { LeccionController } from "../controllers/leccion.controller.js";

const LeccionRouter = Router();

LeccionRouter.get('/', LeccionController.getAll);
LeccionRouter.get('/:id',LeccionController.getLeccionesByCursoId);
LeccionRouter.post('/',LeccionController.createLeccion);
LeccionRouter.put('/:cursoId/:id', LeccionController.updateLeccion);
LeccionRouter.delete('/:id',LeccionController.deleteLeccion)

export default LeccionRouter;
