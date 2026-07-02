import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { Estatisticas } from '../types/estatisticas';

async function buscarEstatisticas(): Promise<Estatisticas> {
  const { data } = await api.get<Estatisticas>('/estatisticas');
  return data;
}

export function useEstatisticas() {
  return useQuery({
    queryKey: ['estatisticas'],
    queryFn: buscarEstatisticas,
  });
}
