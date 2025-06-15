import { Router } from "express";
import enterpriseRouter from "./enterprise/enterpriseRoute";

const routes = Router();

// Aqui define os prefixos de cada grupo de rota
routes.use("/enterprise", enterpriseRouter);

// Exemplo de outras rotas no futuro:
// routes.use("/user", userRouter);
// routes.use("/auth", authRouter);

export default routes;
