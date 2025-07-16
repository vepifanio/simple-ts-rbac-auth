# 🔐 Simple TypeScript RBAC Auth System

Sistema de autenticação simples com RBAC (Role-Based Access Control) construído com TypeScript e Fastify.

## ⚡ Tecnologias

- [Fastify](https://fastify.io/) - Framework web rápido e de baixo overhead
- [MongoDB](https://www.mongodb.com/) - Banco de dados NoSQL
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipagem estática
- [Zod](https://zod.dev/) - Validação de schemas com TypeScript
- [JWT](https://jwt.io/) - JSON Web Tokens para autenticação

## 🚀 Setup

1. **Instale as dependências:**

```bash
# Usando pnpm
pnpm install

# Usando npm
npm install
```

2. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto:

```env
MONGODB_URI=sua_uri_mongodb
JWT_SECRET=seu_secret_jwt
```

3. **Execute as migrações:**

```bash
# Usando pnpm
pnpm migrate:up

# Usando npm
npm run migrate:up
```

4. **Inicie o servidor de desenvolvimento:**

```bash
# Usando pnpm
pnpm dev

# Usando npm
npm run dev
```

## 🏗️ Estrutura do Projeto

- `src/server.ts` - Ponto de entrada da aplicação
- `src/routes` - Definição das rotas da API
- `src/services` - Lógica de negócio
- `src/schemas` - Schemas de validação Zod
- `src/plugins` - Plugins Fastify
- `src/db` - Configurações e migrações do banco de dados

## 🔍 Padrões de Projeto

- **Repository Pattern** - Abstração da camada de dados
- **Service Layer** - Separação da lógica de negócios
- **Schema Validation** - Validação de entrada com Zod
- **RBAC** - Controle de acesso baseado em roles
- **Plugin Architecture** - Estrutura modular com plugins Fastify
