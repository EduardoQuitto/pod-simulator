import type { GameEvent, GameStage } from '../types/game';

export const TIME_SLOTS = [
  '07:00',
  '09:00',
  '11:00',
  '13:00',
  '15:00',
  '17:00',
  '19:00',
  '21:00',
] as const;

export const STAGE_NAMES: Record<GameStage, string> = {
  1: 'Só uma brincadeira',
  2: 'Só mais uma',
  3: 'Preciso comprar outro',
  4: 'Não consigo ignorar',
  5: 'E agora?',
};

export const POD_COST = 15;

export const EVENTS: GameEvent[] = [
  {
    id: 'professor',
    icon: '📚',
    title: 'PROFESSOR ENTROU NA SALA',
    description:
      'O professor está passando perto. Você precisa decidir rapidamente o que fazer com o pod na sua bolsa.',
    effect: { anxiety: 8 },
  },
  {
    id: 'friends_using',
    icon: '👥',
    title: 'SEUS AMIGOS ESTÃO USANDO',
    description:
      'O grupo está reunido e todos estão com o pod. A pressão social aumenta.',
    effect: { anxiety: 12, dependency: 5 },
  },
  {
    id: 'pod_empty',
    icon: '💨',
    title: 'O POD ACABOU',
    description:
      'O líquido acabou no pior momento. Você precisa decidir: comprar outro ou resistir.',
    effect: { liquid: -30, anxiety: 10 },
  },
  {
    id: 'feeling_bad',
    icon: '🤢',
    title: 'VOCÊ NÃO ESTÁ SE SENTINDO BEM',
    description:
      'Tontura leve e dor de cabeça. Seu corpo está avisando que algo não vai bem.',
    effect: { health: -8, energy: -5 },
  },
  {
    id: 'message_parent',
    icon: '📱',
    title: 'RESPONSÁVEL MANDOU MENSAGEM',
    description:
      '"Tudo bem por aí? Me conta como foi o dia!" Você precisa decidir como responder.',
    effect: { anxiety: 15 },
  },
  {
    id: 'friend_advice',
    icon: '🧑‍🤝‍🧑',
    title: 'UM AMIGO DISSE PARA PARAR',
    description:
      '"Mano, tá fazendo mal. Para com isso." Seu amigo parece preocupado.',
    effect: { anxiety: -5 },
  },
  {
    id: 'sponsor_ad',
    icon: '💸',
    title: 'VÍDEO DE PROPAGANDA',
    description:
      'Um vídeo de marketing aparece no seu feed. "Sabor novo! Edição limitada!" A tentação é real.',
    effect: { dependency: 8, anxiety: 5 },
  },
  {
    id: 'bathroom',
    icon: '🚻',
    title: 'PRECISOU IR AO BANHEIRO',
    description:
      'Você aproveitou para usar o pod escondido. Ninguém viu... mas e agora?',
    effect: { dependency: 5, health: -3 },
  },
  {
    id: 'test',
    icon: '📝',
    title: 'SURPRESA: PROVA HOJE',
    description:
      'O professor avisou que terá prova. A ansiedade está lá em cima.',
    effect: { anxiety: 20, energy: -5 },
  },
  {
    id: 'found_money',
    icon: '💰',
    title: 'ACHOU DINHEIRO NO BOLSO',
    description:
      'R$ 8,00 esquecidos na calça. Dinheiro extra para gastar — ou guardar.',
    effect: { money: 8 },
  },
  {
    id: 'cough',
    icon: '🫁',
    title: 'TOSSE PERSISTENTE',
    description:
      'Você está tossindo sem parar. As pessoas ao redor estão olhando.',
    effect: { health: -10, anxiety: 8 },
  },
  {
    id: 'good_grade',
    icon: '⭐',
    title: 'NOTA BOA NA PROVA',
    description:
      'Você tirou uma nota boa! O dia parece estar melhorando.',
    effect: { anxiety: -10, energy: 5 },
  },
  {
    id: 'social_media',
    icon: '📱',
    title: 'POST NO INSTAGRAM',
    description:
      'Você postou uma foto e seus amigos comentaram. A pressão para se encaixar aumenta.',
    effect: { dependency: 6, anxiety: 5 },
  },
  {
    id: 'cravings',
    icon: '⚡',
    title: 'WAVE DE CRAVING',
    description:
      'De repente, uma vontade forte de usar. Seu cérebro está pedindo nicotina.',
    effect: { dependency: 8, anxiety: 15 },
  },
  {
    id: 'exercise',
    icon: '🏃',
    title: 'FEZ EXERCÍCIO',
    description:
      'Você caminhou um pouco. O corpo agradece, mas a pulga atrás da orelha continua.',
    effect: { health: 8, energy: -5, anxiety: -5 },
  },
  {
    id: 'sleepy',
    icon: '😴',
    title: 'SONO BATENDO',
    description:
      'A nicotina está te deixando cansado. Foco difíceis de manter.',
    effect: { energy: -12 },
  },
];

export function getRandomEvent(dependency: number): GameEvent | null {
  const chance = Math.min(0.9, 0.3 + dependency * 0.006);
  if (Math.random() > chance) return null;

  const filtered = EVENTS.filter((e) => {
    if (dependency < 20 && e.id === 'cravings') return false;
    if (dependency < 30 && e.id === 'bathroom') return false;
    if (dependency < 15 && e.id === 'sponsor_ad') return false;
    return true;
  });

  return filtered[Math.floor(Math.random() * filtered.length)];
}
