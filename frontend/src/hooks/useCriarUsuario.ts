import { useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { Usuario } from '../types/usuario';

interface CriarUsuarioInput {
  nome: string;
}

async function criarUsuario(input: CriarUsuarioInput): Promise<Usuario> {
  const { data } = await api.post<Usuario>('/usuarios', input);
  return data;
}

export function useCriarUsuario() {
  return useMutation({
    mutationFn: criarUsuario,
  });
}
