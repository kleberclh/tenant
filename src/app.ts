import express from "express";
import cors from "cors";
import routes from "./routes/routes";

const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello from app!");
});

app.use("/api", routes);

export default app;
