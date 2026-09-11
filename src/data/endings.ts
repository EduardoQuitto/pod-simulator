import type { Ending } from '../types/game';

export const ENDINGS: Ending[] = [
  {
    id: 'stopped',
    name: 'PAROU',
    message:
      'Não foi fácil.\n\nMas você conseguiu sair do ciclo.\n\nÀs vezes, a melhor decisão é a mais difícil.',
    classification: 'green',
  },
  {
    id: 'occasional',
    name: 'SÓ DE VEZ EM QUANDO',
    message:
      'Você acha que está no controle.\n\nTalvez esteja.\nTalvez não.\n\nMas o ciclo continua.',
    classification: 'yellow',
  },
  {
    id: 'cycle',
    name: 'CICLO',
    message:
      'POD ACABOU.\n\nComprar outro?\n\n...Ou parar?\n\nO ciclo sempre oferece mais uma chance. Mas a cada volta, fica mais difícil sair.',
    classification: 'red',
  },
  {
    id: 'excess',
    name: 'EXCESSO',
    message:
      'Sua partida terminou.\n\nSaúde crítica.\n\nO jogo não valeu a pena.\n\nO consumo excessivo sempre tem um preço.',
    classification: 'red',
  },
  {
    id: 'secret',
    name: 'EU NÃO PRECISO DISSO',
    message:
      'Você descobriu que o objetivo nunca foi consumir mais.\n\nEra conseguir sair.\n\nParabéns. Você viu além do ciclo.',
    classification: 'green',
  },
  {
    id: 'default',
    name: 'FIM DO DIA',
    message:
      'O dia acabou.\n\nVocê passou por várias decisões.\n\nCada escolha te trouxe até aqui.\n\nAmanhã começa de novo.',
    classification: 'yellow',
  },
];

export function determineEnding(
  dependency: number,
  health: number,
  uses: number,
  stoppedAt: string | null,
  positiveDecisions: number
): Ending {
  if (health <= 15) {
    return ENDINGS.find((e) => e.id === 'excess')!;
  }

  if (stoppedAt && dependency < 25) {
    return ENDINGS.find((e) => e.id === 'stopped')!;
  }

  if (dependency === 0 && positiveDecisions >= 4) {
    return ENDINGS.find((e) => e.id === 'secret')!;
  }

  if (dependency < 30 && uses <= 2) {
    return ENDINGS.find((e) => e.id === 'occasional')!;
  }

  if (dependency >= 50 || uses >= 5) {
    return ENDINGS.find((e) => e.id === 'cycle')!;
  }

  return ENDINGS.find((e) => e.id === 'default')!;
}
