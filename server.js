import express from "express";
import bodyParser from "body-parser";

import rotasusuarios from "./routes/users.js";
import rotasAuth from "./routes/auth.js";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/auth", rotasAuth);
app.use("/users", rotasusuarios);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
