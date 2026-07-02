import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { Partida } from '../types/partida';

async function buscarHistorico(): Promise<Partida[]> {
  const { data } = await api.get<Partida[]>('/historico', { params: { limit: 50 } });
  return data;
}

export function useHistorico() {
  return useQuery({
    queryKey: ['historico'],
    queryFn: buscarHistorico,
  });
}
