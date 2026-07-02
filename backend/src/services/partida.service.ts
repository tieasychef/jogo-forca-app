import { prisma } from '../lib/prisma';
import { PartidaRepository } from '../repositories/partida.repository';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { UsuarioNotFoundError } from './usuario.service';
import {
  toPartidaResponseDto,
  type CreatePartidaDto,
  type PartidaResponseDto,
} from '../dtos/partida.dto';

export class PartidaService {
  constructor(
    private readonly partidaRepository: PartidaRepository = new PartidaRepository(),
    private readonly usuarioRepository: UsuarioRepository = new UsuarioRepository(),
  ) {}

  async registrar(data: CreatePartidaDto): Promise<PartidaResponseDto> {
    const usuario = await this.usuarioRepository.findById(data.usuarioId);
    if (!usuario) throw new UsuarioNotFoundError(data.usuarioId);

    const partida = await prisma.$transaction(async (tx) => {
      const partidaRepo = new PartidaRepository(tx);
      const usuarioRepo = new UsuarioRepository(tx);

      const novaPartida = await partidaRepo.create(data);
      await usuarioRepo.registrarResultadoPartida(data.usuarioId, {
        pontosGanhos: data.pontosGanhos,
        venceu: data.resultado === 'VITORIA',
      });

      return novaPartida;
    });

    return toPartidaResponseDto(partida);
  }

  async historicoPorUsuario(usuarioId: string): Promise<PartidaResponseDto[]> {
    const partidas = await this.partidaRepository.findByUsuario(usuarioId);
    return partidas.map(toPartidaResponseDto);
  }

  async historicoGeral(limit = 50): Promise<PartidaResponseDto[]> {
    const partidas = await this.partidaRepository.findAll(limit);
    return partidas.map(toPartidaResponseDto);
  }

  async totalPartidas(): Promise<number> {
    return this.partidaRepository.count();
  }

  async taxaVitoria(): Promise<number> {
    const [total, vitorias] = await Promise.all([
      this.partidaRepository.count(),
      this.partidaRepository.countVitorias(),
    ]);
    return total === 0 ? 0 : Number(((vitorias / total) * 100).toFixed(2));
  }

  async categoriaMaisJogada() {
    return this.partidaRepository.categoriaMaisJogada();
  }

  async palavraMaisSorteada() {
    return this.partidaRepository.palavraMaisSorteada();
  }
}
