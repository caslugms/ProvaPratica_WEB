import express from "express";
import verificarToken from "../middleware/auth.js";
import { SECRET } from "./auth.js";

import {
lerDados, salvarDados
} from "../utils/db.js"

const router = express.Router();

router.get("/", verificarToken(SECRET), (req, res) => {
  const dados = lerDados();
  console.log(dados);
});

router.post("/", verificarToken(SECRET), (req, res) => {
  const dados = lerDados();
  const novo = req.body;
  novo.id = Date.now();
  dados.push(novo);
  salvarDados(dados);
  console.log({ message: "Item criado com sucesso", item: novo });
});

router.put("/:id", verificarToken(SECRET), (req, res) => {
  const dados = lerDados();
  const id = parseInt(req.params.id);
  const index = dados.findIndex((item) => item.id === id);
  if (index === -1) return console.log({ message: "Item não encontrado" });
  dados[index] = { ...dados[index], ...req.body };
  salvarDados(dados);
  console.log({ message: "Item atualizado com sucesso" });
});

router.delete("/:id", verificarToken(SECRET), (req, res) => {
  const dados = lerDados();
  const id = parseInt(req.params.id);
  const novosDados = dados.filter((item) => item.id !== id);
  salvarDados(novosDados);
  console.log({ message: "Item deletado com sucesso" });
});

export default router;
