
import { Router } from "express";
import { CategoriaController  } from "../controllers/categoria.controller.js";

const catRouter = Router();
catRouter.get('/', CategoriaController.getAll);
catRouter.post('/',CategoriaController.createCategoria);
catRouter.put('/:id',CategoriaController.updateCategoria);
catRouter.delete('/:id',CategoriaController.deleteCategoria);

export default catRouter;
