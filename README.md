# Jogo da Forca

Sistema web completo do clássico Jogo da Forca, com backend em Node.js/Express/Prisma
e frontend em React 19/Vite, persistência no PostgreSQL do Supabase.

## Funcionalidades

- Tela inicial com identificação do jogador
- Jogo da forca completo: SVG progressivo, teclado virtual, cronômetro, pontuação
  e contagem de tentativas/erros
- Sons sintetizados (Web Audio API), confete e toasts de feedback
- Dark mode com persistência da preferência
- Ranking dos jogadores, histórico de partidas e estatísticas globais
- API REST com Repository, Service e DTO layers

## Stack

**Frontend:** React 19, Vite, TypeScript, Tailwind CSS, React Router, TanStack Query,
Axios, React Hook Form, Zod, Framer Motion, Lucide React, sonner (toasts),
canvas-confetti.

**Backend:** Node.js, Express, TypeScript, Prisma ORM.

**Banco de dados:** PostgreSQL (Supabase).

## Estrutura do repositório

```
jogo_forca_app/
├── backend/          # API REST (Express + Prisma)
│   ├── prisma/        # schema e migrations
│   └── src/
│       ├── controllers/
│       ├── services/       # regras de negocio
│       ├── repositories/   # acesso a dados (Prisma)
│       ├── dtos/            # validacao (Zod) e mapeamento
│       ├── middlewares/
│       └── routes/
├── frontend/         # SPA (React + Vite)
│   └── src/
│       ├── components/     # UI e componentes de jogo
│       ├── hooks/           # logica de jogo e chamadas a API (TanStack Query)
│       ├── pages/            # Home, Jogo, Ranking, Historico, Estatisticas
│       └── lib/
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
3. Aplique as migrations do Prisma (schema `usuarios`/`partidas`):
   ```bash
   npm run --workspace backend prisma:deploy
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

## API

Endpoints disponíveis sob `/api`:

| Rota                            | Descrição                           |
| ------------------------------- | ----------------------------------- |
| `POST /api/usuarios`            | Cria um jogador                     |
| `GET /api/usuarios/:id`         | Busca um jogador                    |
| `POST /api/partidas`            | Registra o resultado de uma partida |
| `GET /api/partidas/usuario/:id` | Histórico de partidas de um jogador |
| `GET /api/ranking?limit=`       | Ranking por pontuação               |
| `GET /api/historico?limit=`     | Histórico geral de partidas         |
| `GET /api/estatisticas`         | Estatísticas agregadas do jogo      |

## Deploy

O deploy é manual (Vercel para o frontend). Este repositório não realiza deploy
automático.

## Roadmap

Arquitetura preparada para evoluções futuras: login com Supabase Auth, multiplayer,
painel administrativo com CRUD de palavras/categorias, sistema de conquistas,
rankings por período (diário/semanal/mensal), PWA e app React Native.

## Licença

MIT — veja [LICENSE](LICENSE).
