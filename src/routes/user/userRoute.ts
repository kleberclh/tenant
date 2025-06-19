import { Router } from "express";

import userController from "../../controllers/users/userController";
import loginUserController from "../../controllers/auth/loginUserController";
const userRouter = Router();

userRouter.post("/create", userController.createUser);
userRouter.get("/buscar", userController.getAllUsers);
userRouter.put("/editar/:id", userController.updateUser);
userRouter.post("/login", loginUserController.loginUser);

export default userRouter;
