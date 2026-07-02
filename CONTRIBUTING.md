# Contribuindo

Obrigado por contribuir com o Jogo da Forca!

## Fluxo de trabalho

1. Crie um branch a partir de `main`: `git checkout -b feat/minha-feature`.
2. Faça commits seguindo [Conventional Commits](https://www.conventionalcommits.org/pt-br/):
   - `feat: adiciona novo endpoint de ranking`
   - `fix: corrige contagem de tentativas`
   - `chore: atualiza dependências`
   - `docs: atualiza README`
3. Rode lint e build antes de commitar:
   ```bash
   npm run lint
   npm run build:backend
   npm run build:frontend
   ```
4. Abra um Pull Request descrevendo a mudança.

## Padrões de código

- Clean Code, SOLID, DRY, KISS.
- Backend: Repository Pattern, Service Layer e DTOs.
- Sem código duplicado — extraia utilitários/hooks compartilhados quando aplicável.
- TypeScript estrito; evite `any`.

## Commits e Hooks

O projeto usa Husky + lint-staged para rodar lint/format automaticamente antes de
cada commit. Não use `--no-verify` para pular essas checagens.
