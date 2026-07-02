import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { Usuario } from '../types/usuario';

async function buscarRanking(): Promise<Usuario[]> {
  const { data } = await api.get<Usuario[]>('/ranking', { params: { limit: 20 } });
  return data;
}

export function useRanking() {
  return useQuery({
    queryKey: ['ranking'],
    queryFn: buscarRanking,
  });
}
