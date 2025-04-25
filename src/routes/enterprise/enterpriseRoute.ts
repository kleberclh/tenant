import { Router } from "express";

import enterpriseController from "../../controllers/enterprise/enterpriseController";

const enterpriseRouter = Router();

enterpriseRouter.post("/create", enterpriseController.createEnterprise);
enterpriseRouter.get("/buscar", enterpriseController.getAllEnterprise);

export default enterpriseRouter;
