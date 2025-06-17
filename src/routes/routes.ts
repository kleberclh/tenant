import { Router } from "express";
import enterpriseRouter from "./enterprise/enterpriseRoute";
import userRouter from "./user/userRoute";
import clientRouter from "./clients/clientsRoute";
import accountRouter from "./accounts/accountsRoute";

const routes = Router();

// Aqui define os prefixos de cada grupo de rota
routes.use("/enterprise", enterpriseRouter);

routes.use("/user", userRouter);

// Exemplo de outras rotas no futuro:
routes.use("/client", clientRouter);

routes.use("/account", accountRouter);

export default routes;
