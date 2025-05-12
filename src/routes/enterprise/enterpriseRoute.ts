import { Router } from "express";

import enterpriseController from "../../controllers/enterprise/enterpriseController";

const enterpriseRouter = Router();

enterpriseRouter.post("/create", enterpriseController.createEnterprise);
enterpriseRouter.get("/buscar", enterpriseController.getAllEnterprise);
enterpriseRouter.get("/buscar/:id", enterpriseController.getEnterprise);

export default enterpriseRouter;
