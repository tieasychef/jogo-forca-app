export type SomId = 'clique' | 'acerto' | 'erro' | 'vitoria' | 'derrota'

let audioContext: AudioContext | null = null
let habilitado = true

function obterContexto(): AudioContext | null {
  try {
    if (!audioContext) {
      const AudioContextCtor =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext
      audioContext = new AudioContextCtor()
    }
    return audioContext
  } catch {
    return null
  }
}

interface TomConfig {
  frequencias: number[]
  duracao: number
  tipo: OscillatorType
}

const CONFIG_SOM: Record<SomId, TomConfig> = {
  clique: { frequencias: [440], duracao: 0.05, tipo: 'sine' },
  acerto: { frequencias: [523, 659], duracao: 0.12, tipo: 'sine' },
  erro: { frequencias: [180], duracao: 0.18, tipo: 'sawtooth' },
  vitoria: { frequencias: [523, 659, 784, 1046], duracao: 0.14, tipo: 'triangle' },
  derrota: { frequencias: [220, 180, 140], duracao: 0.22, tipo: 'sawtooth' },
}

export function setSomHabilitado(valor: boolean) {
  habilitado = valor
}

export function tocarSom(id: SomId) {
  if (!habilitado) return

  try {
    const contexto = obterContexto()
    if (!contexto) return

    const { frequencias, duracao, tipo } = CONFIG_SOM[id]

    frequencias.forEach((frequencia, indice) => {
      const inicio = contexto.currentTime + indice * duracao
      const oscilador = contexto.createOscillator()
      const ganho = contexto.createGain()

      oscilador.type = tipo
      oscilador.frequency.setValueAtTime(frequencia, inicio)

      ganho.gain.setValueAtTime(0.001, inicio)
      ganho.gain.exponentialRampToValueAtTime(0.15, inicio + 0.01)
      ganho.gain.exponentialRampToValueAtTime(0.001, inicio + duracao)

      oscilador.connect(ganho)
      ganho.connect(contexto.destination)

      oscilador.start(inicio)
      oscilador.stop(inicio + duracao)
    })
  } catch {
    // Falha ao reproduzir audio nao deve interromper o jogo
  }
}
