export interface PalavraCategoria {
  palavra: string;
  categoria: string;
}

export const BANCO_DE_PALAVRAS: PalavraCategoria[] = [
  { palavra: 'BANANA', categoria: 'Frutas' },
  { palavra: 'ABACAXI', categoria: 'Frutas' },
  { palavra: 'MORANGO', categoria: 'Frutas' },
  { palavra: 'MELANCIA', categoria: 'Frutas' },
  { palavra: 'MANGA', categoria: 'Frutas' },
  { palavra: 'ELEFANTE', categoria: 'Animais' },
  { palavra: 'GIRAFA', categoria: 'Animais' },
  { palavra: 'TARTARUGA', categoria: 'Animais' },
  { palavra: 'LEOPARDO', categoria: 'Animais' },
  { palavra: 'CROCODILO', categoria: 'Animais' },
  { palavra: 'BRASIL', categoria: 'Paises' },
  { palavra: 'PORTUGAL', categoria: 'Paises' },
  { palavra: 'CANADA', categoria: 'Paises' },
  { palavra: 'JAPAO', categoria: 'Paises' },
  { palavra: 'EGITO', categoria: 'Paises' },
  { palavra: 'MEDICO', categoria: 'Profissoes' },
  { palavra: 'ENGENHEIRO', categoria: 'Profissoes' },
  { palavra: 'PROFESSOR', categoria: 'Profissoes' },
  { palavra: 'BOMBEIRO', categoria: 'Profissoes' },
  { palavra: 'JORNALISTA', categoria: 'Profissoes' },
  { palavra: 'FUTEBOL', categoria: 'Esportes' },
  { palavra: 'BASQUETE', categoria: 'Esportes' },
  { palavra: 'NATACAO', categoria: 'Esportes' },
  { palavra: 'CICLISMO', categoria: 'Esportes' },
  { palavra: 'VOLEIBOL', categoria: 'Esportes' },
  { palavra: 'TECLADO', categoria: 'Tecnologia' },
  { palavra: 'COMPUTADOR', categoria: 'Tecnologia' },
  { palavra: 'INTERNET', categoria: 'Tecnologia' },
  { palavra: 'SOFTWARE', categoria: 'Tecnologia' },
  { palavra: 'ALGORITMO', categoria: 'Tecnologia' },
];

export function sortearPalavra(): PalavraCategoria {
  const indice = Math.floor(Math.random() * BANCO_DE_PALAVRAS.length);
  return BANCO_DE_PALAVRAS[indice];
}
