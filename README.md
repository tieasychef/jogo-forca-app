# Jogo da Forca

Sistema web completo do clássico Jogo da Forca, com backend em Node.js/Express/Prisma
e frontend em React 19/Vite, persistência no PostgreSQL do Supabase.

> ⚠️ Projeto em desenvolvimento por etapas. Este README será expandido conforme cada
> etapa (backend, API, frontend, ranking, estatísticas) for concluída.

## Stack

**Frontend:** React 19, Vite, TypeScript, Tailwind CSS, React Router, TanStack Query,
Axios, React Hook Form, Zod, Framer Motion, Lucide React.

**Backend:** Node.js, Express, TypeScript, Prisma ORM.

**Banco de dados:** PostgreSQL (Supabase).

## Estrutura do repositório

```
jogo_forca_app/
├── backend/          # API REST (Express + Prisma)
├── frontend/         # SPA (React + Vite)
├── .env.local        # credenciais locais (nunca commitado)
├── .env.example      # placeholders das variáveis de ambiente
└── .github/          # workflows de CI e Dependabot
```

## Pré-requisitos

- Node.js 20+
- npm 10+
- Uma instância Supabase (PostgreSQL)

## Configuração

1. Copie `.env.example` para `.env.local` (raiz) e `frontend/.env.example` para
   `frontend/.env.local`, preenchendo com suas credenciais do Supabase.
2. Instale as dependências:
   ```bash
   npm install
   ```

## Scripts

| Comando                  | Descrição                                 |
| ------------------------ | ----------------------------------------- |
| `npm run dev:backend`    | Inicia a API em modo desenvolvimento      |
| `npm run dev:frontend`   | Inicia o frontend em modo desenvolvimento |
| `npm run build:backend`  | Build de produção da API                  |
| `npm run build:frontend` | Build de produção do frontend             |
| `npm run lint`           | Executa o lint em backend e frontend      |
| `npm run format`         | Formata o código com Prettier             |

## Deploy

O deploy é manual (Vercel para o frontend). Este repositório não realiza deploy
automático.

## Licença

MIT — veja [LICENSE](LICENSE).
