import { Router } from "express";
import enterpriseRouter from "./enterprise/enterpriseRoute";
import userRouter from "./user/userRoute";

const routes = Router();

// Aqui define os prefixos de cada grupo de rota
routes.use("/enterprise", enterpriseRouter);

routes.use("/user", userRouter);

// Exemplo de outras rotas no futuro:
// routes.use("/auth", authRouter);

export default routes;
