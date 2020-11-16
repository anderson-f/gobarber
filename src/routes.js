import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import SessionController from "./app/controllers/SessionController";
import UserController from "./app/controllers/UserController";
import FileController from "./app/controllers/FileController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.use(authMiddleware); // só define o middleware após as duas rotas de cima
routes.put("/users", UserController.update);

// middleware upload.single esperando o atributo file
routes.post("/files", upload.single("file", FileController.store));
export default routes;
