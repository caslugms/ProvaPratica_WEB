# ProvaPratica_WEB

# Relatório de Análise e Correção de Código (Prova de Programação para Internet)

Este relatório detalha as falhas críticas e discrepâncias encontradas nos arquivos do projeto submetido, com foco especial na **segurança (JWT/bcryptjs)** e **funcionalidade (respostas da API)**.

---

## 1. Falhas Críticas de Segurança e Funcionalidade

Os problemas abaixo são os mais graves, pois comprometem a segurança da aplicação ou resultam em requisições que não respondem corretamente ao cliente.

### Autenticação e Segurança (`routes/auth.js`)

| Rota | Problema Encontrado | Gravidade | Solução Necessária |
| :--- | :--- | :--- | :--- |
| **`POST /register`** | **Senha em Texto Puro (CRÍTICO)**. As senhas estavam sendo salvas diretamente no `db.json` sem qualquer criptografia. | **Crítica** | Implementar `bcrypt.hash(senha, salt)` para **criptografar a senha** antes de salvar, cumprindo o requisito de segurança. |
| **`POST /login`** | **Lógica de Login Quebrada (CRÍTICO)**. O código não realizava a busca do usuário pelo `email` no `db.json` e a comparação da senha estava incorreta. | **Crítica** | Implementar a busca correta no `db.json` e usar **`bcrypt.compare()`** para validar a senha hasheada com a senha fornecida. |

### CRUD de Usuários e Respostas da API (`routes/users.js`)

| Rota/Módulo | Problema Encontrado | Gravidade | Solução Necessária |
| :--- | :--- | :--- | :--- |
| **`GET /`, `PUT /:id`, `DELETE /:id`** | **FALHA DE RESPOSTA (CRÍTICO)**. Todas as rotas usavam **`console.log()`** para tentar enviar dados. O cliente receberia um *timeout* em vez de uma resposta HTTP. | **Crítica** | Substituir **todos os `console.log()`** por **`res.status(CÓDIGO).json(...)`** (ex: `200` para sucesso, `404` para não encontrado). |
| **`POST /`** | **Rota Incorreta/Desnecessária**. Foi implementada uma rota `POST /users` no `users.js` que não estava nos requisitos da prova (`POST /register` é a única rota de criação). | **Média** | A rota `POST /users` deve ser **removida** ou o código deve ser reajustado para usar **UUID** e seguir o padrão de criação de usuário se essa rota fosse mantida. |
| **`GET /users/:id`** | **ROTA FALTANTE**. O requisito de buscar um usuário específico por ID não foi implementado no arquivo `users.js`. | **Média** | Adicionar a rota **`router.get("/:id", verificarToken, ...)`** para realizar a busca por ID e retornar o usuário. |

---

## 2. Discrepâncias de Estrutura e Nomenclatura

| Arquivo/Módulo | Discrepância Encontrada | Contexto/Ajuste |
| :--- | :--- | :--- |
| **`utils/db.js`** | O caminho de persistência era **`../dados/data.json`**, diferente do arquivo **`db.json`** na raiz. | Corrigido o caminho dentro de `db.js` para apontar corretamente para **`../db.json`**. |
| **Rotas de Autenticação** | As rotas de autenticação estavam mapeadas como `/` (login) e `/usuarios` (registro), em vez de `/login` e `/register` (mais explícitas). | As rotas foram padronizadas para serem **`/auth/login`** e **`/auth/register`** (feito no `server.js` e `routes/auth.js`). |
| **Arquivos `controllers/`** | Não foram utilizados arquivos de *Controller* (`authController.js`, `usersController.js`), conforme sugerido na estrutura, colocando a lógica diretamente nas *Routes*. | **Aceitável** para o propósito da prova, mas a criação de *Controllers* é uma **melhor prática (MVC)** para projetos maiores. |