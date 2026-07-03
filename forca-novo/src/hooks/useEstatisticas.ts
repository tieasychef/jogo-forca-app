import { useCallback } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { ESTATISTICAS_INICIAIS, type Estatisticas } from '@/types/estatisticas'
import type { ModoJogo } from '@/types/modo'

interface RegistrarPartidaParams {
  venceu: boolean
  pontuacao: number
  erros: number
  modo?: ModoJogo
}

export function useEstatisticas() {
  const [estatisticas, setEstatisticas] = useLocalStorage<Estatisticas>(
    'forca:estatisticas',
    ESTATISTICAS_INICIAIS,
  )

  const registrarPartida = useCallback(
    ({ venceu, pontuacao, erros, modo }: RegistrarPartidaParams) => {
      setEstatisticas((atual) => {
        const sequenciaAtual = venceu ? atual.sequenciaAtual + 1 : 0

        return {
          partidasJogadas: atual.partidasJogadas + 1,
          vitorias: atual.vitorias + (venceu ? 1 : 0),
          derrotas: atual.derrotas + (venceu ? 0 : 1),
          sequenciaAtual,
          maiorSequenciaVitorias: Math.max(atual.maiorSequenciaVitorias, sequenciaAtual),
          melhorPontuacao: Math.max(atual.melhorPontuacao, pontuacao),
          totalPalavrasAcertadas: atual.totalPalavrasAcertadas + (venceu ? 1 : 0),
          partidasSemErro: atual.partidasSemErro + (venceu && erros === 0 ? 1 : 0),
          venceuModoDesafio: atual.venceuModoDesafio || (venceu && modo === 'desafio'),
          venceuModoTempo: atual.venceuModoTempo || (venceu && modo === 'tempo'),
        }
      })
    },
    [setEstatisticas],
  )

  const taxaVitoria =
    estatisticas.partidasJogadas === 0
      ? 0
      : Math.round((estatisticas.vitorias / estatisticas.partidasJogadas) * 100)

  return { estatisticas, taxaVitoria, registrarPartida }
}
