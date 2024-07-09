
import { Router } from "express";
import { UsercursoController } from "../controllers/user-curso.controller.js";

const userscursoRouter = Router();

userscursoRouter.get('/:id', UsercursoController.getAll);
userscursoRouter.post('/', UsercursoController.matricularUsuario);
userscursoRouter.get('/curso/:cursoId/usuario/:usuarioId/id', UsercursoController.getMisCursosId);



export default userscursoRouter;
