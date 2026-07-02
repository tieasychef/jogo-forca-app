import { createApp } from './app';

const app = createApp();
const port = Number(process.env.PORT) || 3333;

app.listen(port, () => {
  console.log(`API do Jogo da Forca rodando em http://localhost:${port}`);
});
