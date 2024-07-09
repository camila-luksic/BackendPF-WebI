
import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const usersRouter = Router();

usersRouter.get('/', UserController.getAll);
usersRouter.post('/', UserController.createUser);
usersRouter.post('/login', UserController.login);


export default usersRouter;
