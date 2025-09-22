import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

const SECRET = "chave_super_secreta";

router.post("/", (req, res) => {
  const { username, password } = req.body;

  if (username !== user.username || !bcrypt.compareSync(password, user.password)) {
    return console.log({ message: "Usuário ou senha inválidos" });
  }

  const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });

  console.log({ token });
});

router.post("/usuarios", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return console.log({ message: "Dados incompletos" });

  const usuarios = lerJSON(usuariosPath);
  if (usuarios.find(u => u.username === username))
    return console.log({ message: "Usuário já existe" });

  usuarios.push({ username, password });
  salvarJSON(usuariosPath, usuarios);

  console.log({ message: "Usuário criado com sucesso" });
});

export default router;
export { SECRET }; 
