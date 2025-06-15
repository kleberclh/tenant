import express from "express";

import routes from "./routes/routes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from app!");
});

app.use("/api", routes);

export default app;
