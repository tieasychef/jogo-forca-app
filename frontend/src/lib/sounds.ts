let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) audioContext = new AudioContext();
  return audioContext;
}

function tocarTom(
  frequencia: number,
  duracaoMs: number,
  atrasoMs = 0,
  tipo: OscillatorType = 'sine',
) {
  const ctx = getAudioContext();
  const inicio = ctx.currentTime + atrasoMs / 1000;
  const fim = inicio + duracaoMs / 1000;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = tipo;
  oscillator.frequency.setValueAtTime(frequencia, inicio);
  gain.gain.setValueAtTime(0.15, inicio);
  gain.gain.exponentialRampToValueAtTime(0.0001, fim);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(inicio);
  oscillator.stop(fim);
}

export const sons = {
  acerto: () => tocarTom(660, 120),
  erro: () => tocarTom(160, 200, 0, 'sawtooth'),
  vitoria: () => {
    [523, 659, 784, 1047].forEach((freq, indice) => tocarTom(freq, 180, indice * 120));
  },
  derrota: () => {
    [392, 349, 293, 220].forEach((freq, indice) => tocarTom(freq, 220, indice * 140, 'triangle'));
  },
};
