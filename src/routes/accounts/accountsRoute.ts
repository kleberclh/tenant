import { Router } from "express";
import clientsController from "../../controllers/clients/clientsController";
import accountController from "../../controllers/accounts/accountController";

const accountRouter = Router();

accountRouter.post("/create", accountController.createAccounts);

export default accountRouter;
