import { UsuarioRepository } from '../repositories/usuario.repository';
import { toUsuarioResponseDto, type UsuarioResponseDto } from '../dtos/usuario.dto';

export class UsuarioNotFoundError extends Error {
  constructor(id: string) {
    super(`Usuario com id "${id}" nao encontrado`);
    this.name = 'UsuarioNotFoundError';
  }
}

export class UsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepository = new UsuarioRepository()) {}

  async criar(nome: string): Promise<UsuarioResponseDto> {
    const usuario = await this.usuarioRepository.create(nome);
    return toUsuarioResponseDto(usuario);
  }

  async buscarPorId(id: string): Promise<UsuarioResponseDto> {
    const usuario = await this.usuarioRepository.findById(id);
    if (!usuario) throw new UsuarioNotFoundError(id);
    return toUsuarioResponseDto(usuario);
  }

  async listarRanking(limit = 20): Promise<UsuarioResponseDto[]> {
    const usuarios = await this.usuarioRepository.findRanking(limit);
    return usuarios.map(toUsuarioResponseDto);
  }

  async totalJogadores(): Promise<number> {
    return this.usuarioRepository.count();
  }

  async maiorPontuacao(): Promise<number> {
    return this.usuarioRepository.maiorPontuacao();
  }
}
