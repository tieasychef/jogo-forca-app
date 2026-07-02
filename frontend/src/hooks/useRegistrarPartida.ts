import { useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';

export interface RegistrarPartidaInput {
  usuarioId: string;
  palavra: string;
  categoria: string;
  resultado: 'VITORIA' | 'DERROTA';
  tentativas: number;
  erros: number;
  tempoPartida: number;
  pontosGanhos: number;
}

async function registrarPartida(input: RegistrarPartidaInput) {
  const { data } = await api.post('/partidas', input);
  return data;
}

export function useRegistrarPartida() {
  return useMutation({
    mutationFn: registrarPartida,
  });
}
