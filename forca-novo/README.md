# Jogo da Forca

Jogo da forca moderno, bonito e responsivo, construído com React, Vite e TypeScript. Sem
backend: todo o progresso (estatísticas, ranking, conquistas, preferências) é salvo no
`localStorage` do navegador.

## Tecnologias

- React 19
- Vite
- TypeScript
- Tailwind CSS 4
- Framer Motion
- canvas-confetti

## Funcionalidades

- Mais de 560 palavras distribuídas em 13 categorias (Animais, Filmes, Tecnologia, Países,
  Estados brasileiros, Profissões, Objetos, Comidas, Esportes, Música, Marcas, Jogos e
  Ciência), cada uma com dica
- 3 níveis de dificuldade (Fácil, Médio, Difícil), calculados pelo tamanho da palavra
- Forca ilustrada em SVG, com o boneco surgindo parte a parte a cada erro
- Teclado virtual animado e suporte completo ao teclado físico
- Sistema de pontuação com combo por sequência de acertos
- Efeitos sonoros sintetizados (sem arquivos de áudio externos)
- Modo claro/escuro com preferência salva
- Modos de jogo extras: Infinito, Contra o tempo e Desafio
- Estatísticas, ranking local (Top 10) e sistema de conquistas

## Estrutura de pastas

```txt
src/
  assets/       arquivos estáticos
  components/   componentes de UI organizados por domínio (game, home, ranking, stats, conquistas, ui)
  data/         banco de palavras
  hooks/        hooks reutilizáveis (useGame, useKeyboard, useLocalStorage, useSom, useTheme, ...)
  pages/        telas da aplicação (HomePage, GamePage)
  types/        tipos e constantes compartilhadas
  utils/        funções utilitárias (busca de palavras, pontuação, sons, ícones)
```

## Como instalar

```bash
npm install
```

## Como rodar localmente

```bash
npm run dev
```

## Como gerar build de produção

```bash
npm run build
npm run preview
```

## Como publicar na Vercel

Este é um projeto Vite estático, sem backend. Na Vercel:

1. Crie um novo projeto apontando para este repositório.
2. Defina o **Root Directory** como `forca-novo` (o app fica dentro dessa pasta).
3. O framework preset "Vite" é detectado automaticamente (`npm run build`, saída em `dist`).
4. Não é necessária nenhuma variável de ambiente — não há backend nem banco de dados remoto.

## Modos de jogo

- **Clássico**: uma palavra por partida, dentro dos 6 erros permitidos.
- **Infinito**: ao acertar uma palavra o jogo avança automaticamente para a próxima,
  mantendo pontuação e combo, até você errar demais.
- **Contra o tempo**: 60 segundos para acertar cada palavra; o tempo esgotado conta como
  derrota.
- **Desafio**: joga-se sem exibir a dica da palavra.

## Estatísticas

Salvas automaticamente no `localStorage` a cada partida: partidas jogadas, vitórias,
derrotas, taxa de vitória, maior sequência de vitórias, melhor pontuação, total de
palavras acertadas e partidas vencidas sem nenhum erro. Acessíveis pelo ícone 📊 na tela
inicial.

## Ranking local

Ao terminar uma partida com pontuação suficiente para entrar no Top 10, o jogo pede um
nome e salva a entrada (nome, pontuação, categoria, dificuldade e data) no `localStorage`.
Acessível pelo ícone 🏆 na tela inicial.
