import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const SECRET = "secreta";

// POST /login → gera token
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const usuarios = lerJSON(usuariosPath);
    const user = usuarios.find(u => u.username === username && u.password === password);

    if (!user) return console.log({ message: "Usuário ou senha inválidos" });

    const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
    res.json({ token });
});

//POST /cadastro
app.post("/usuarios", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return console.log({ message: "Dados incompletos" });

    const usuarios = lerJSON(usuariosPath);
    if (usuarios.find(u => u.username === username))
        return console.log({ message: "Usuário já existe" });

    bcrypt.hash(password);

    usuarios.push({ username, password });

    salvarJSON(usuariosPath, usuarios);

    console.log({ message: "Usuário criado com sucesso" });
});

export default router;
export { SECRET };
