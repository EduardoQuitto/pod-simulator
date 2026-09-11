export interface Situation {
  id: string;
  timeSlot: string;
  title: string;
  description: string;
}

export const SITUATIONS: Situation[] = [
  {
    id: 'morning_home',
    timeSlot: '07:00',
    title: 'CASA — MANHÃ',
    description:
      'Você acordou e está se preparando para sair. O pod está na gaveta, brilhando como sempre.',
  },
  {
    id: 'school_entrance',
    timeSlot: '09:00',
    title: 'CHEGADA NA ESCOLA',
    description:
      'O portão da escola. Você vê os colegas e sente o cheiro do dia começando.',
  },
  {
    id: 'break_time',
    timeSlot: '11:00',
    title: 'RECREIO',
    description:
      'O intervalo. Todo mundo se encontra no pátio. O clima é de descontração... ou pressão.',
  },
  {
    id: 'lunch',
    timeSlot: '13:00',
    title: 'ALMOÇO',
    description:
      'Hora de comer. Você está sozinho por um momento. Uma pausa para pensar.',
  },
  {
    id: 'afternoon_class',
    timeSlot: '15:00',
    title: 'AULA DA TARDE',
    description:
      'A aula está entediante. O tempo parece não passar. A cabeça começa a latejar.',
  },
  {
    id: 'leaving_school',
    timeSlot: '17:00',
    title: 'SAÍDA DA ESCOLA',
    description:
      'O dia na escola acabou. Você está livre para decidir o que fazer.',
  },
  {
    id: 'evening',
    timeSlot: '19:00',
    title: 'NOITE EM CASA',
    description:
      'Você está em casa. O dia foi longo. É hora de relaxar... ou lidar com as consequências.',
  },
  {
    id: 'night',
    timeSlot: '21:00',
    title: 'ANTES DE DORMIR',
    description:
      'O último momento do dia. O amanhã depende das suas escolhas de hoje.',
  },
];
