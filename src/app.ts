import express from "express";
import enterpriseRouter from "./routes/enterprise/enterpriseRoute";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from app!");
});

app.use(enterpriseRouter);

export default app;
