import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../dados/data.json");

export function lerDados() {
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify([]));
  }
  const dados = fs.readFileSync(dataPath);
  return JSON.parse(dados);
}

export function salvarDados(dados) {
  fs.writeFileSync(dataPath, JSON.stringify(dados, null, 2));
}
