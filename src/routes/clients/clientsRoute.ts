import { Router } from "express";
import clientsController from "../../controllers/clients/clientsController";

const clientRouter = Router();

clientRouter.post("/create", clientsController.createClient);
clientRouter.get("/get/:id", clientsController.getAccountsByClient);

export default clientRouter;
