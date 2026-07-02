# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Added

- Estrutura inicial do monorepo (`backend/` + `frontend/`) com npm workspaces.
- Configuração de qualidade: ESLint, Prettier, Husky, lint-staged, EditorConfig.
- Arquivos de ambiente (`.env.local` / `.env.example`) para integração com Supabase.
- LICENSE (MIT), README e CONTRIBUTING.
- Schema Prisma (`usuarios`, `partidas`) e migration inicial aplicada no Supabase.
- Camadas de Repository, Service e DTO no backend.
- Endpoints REST: usuários, partidas, ranking, histórico e estatísticas.
- Scaffold do frontend (Vite + React 19 + TypeScript + Tailwind CSS v4).
- Tela inicial com identificação do jogador.
- Tela do jogo completa: forca em SVG, teclado virtual, cronômetro, pontuação,
  tentativas e letras erradas, com integração de registro de partida na API.
- Dark mode persistente, toasts, confete e sons sintetizados (Web Audio API).
- Páginas de Ranking, Histórico e Estatísticas consumindo a API.
