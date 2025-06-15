import { Router } from "express";

import userController from "../../controllers/users/userController";

const userRouter = Router();

userRouter.post("/create", userController.createUser);
userRouter.get("/buscar", userController.getAllUsers);
userRouter.put("/editar/:id", userController.updateUser);

export default userRouter;
