
import { Router } from "express";
import { CursoController  } from "../controllers/curso.controller.js";

const cursosRouter = Router();

cursosRouter.get('/', CursoController.getAll);
cursosRouter.get('/:id',CursoController.getCursoById)
cursosRouter.post('/',CursoController.createCurso);
cursosRouter.put('/:id',CursoController.updateCurso);
cursosRouter.delete('/:id',CursoController.deleteCurso);
cursosRouter.post('/:id/imagen', CursoController.subirImagen);
cursosRouter.post('/name', CursoController.buscarCursosPorNombre);
export default cursosRouter;
