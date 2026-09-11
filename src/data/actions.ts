import type { ActionType } from '../types/game';
import type { Resources } from '../types/game';

export interface ActionDef {
  id: ActionType;
  label: string;
  description: string;
  cost?: number;
  baseEffect: Partial<Resources>;
  feedback: string;
  disabled?: boolean;
  disabledReason?: string;
}

export function getAvailableActions(
  money: number,
  liquid: number,
  dependency: number,
  hasStopped: boolean
): ActionDef[] {
  const actions: ActionDef[] = [
    {
      id: 'use',
      label: 'USAR',
      description: 'Usar o pod mais uma vez',
      baseEffect: {
        dependency: 8,
        health: -4,
        anxiety: -10,
        energy: 3,
        liquid: -15,
      },
      feedback: 'Você usou. A ansiedade baixou... por agora.',
      disabled: liquid <= 0 || hasStopped,
      disabledReason: liquid <= 0 ? 'Sem líquido' : 'Você parou',
    },
    {
      id: 'notUse',
      label: 'NÃO USAR',
      description: 'Resistir à tentação',
      baseEffect: {
        anxiety: 8,
        health: 3,
        dependency: -2,
      },
      feedback: 'Difícil, mas você resistiu. Seu corpo agradece.',
    },
    {
      id: 'buyNew',
      label: 'COMPRAR OUTRO',
      description: 'Comprar um novo pod',
      cost: 15,
      baseEffect: {
        money: -15,
        liquid: 80,
        dependency: 5,
      },
      feedback: 'Novo pod comprado. O ciclo continua...',
      disabled: money < 15 || hasStopped,
      disabledReason:
        money < 15 ? 'Dinheiro insuficiente' : 'Você parou',
    },
    {
      id: 'save',
      label: 'GUARDAR',
      description: 'Guardar o pod para depois',
      baseEffect: {
        anxiety: 5,
        energy: -2,
      },
      feedback: 'Você guardou. A tentação continua ali.',
    },
    {
      id: 'talk',
      label: 'CONVERSAR',
      description: 'Conversar com alguém de confiança',
      baseEffect: {
        anxiety: -12,
        health: 2,
        energy: -3,
      },
      feedback: 'Conversar ajudou. Você se sente mais leve.',
    },
    {
      id: 'stop',
      label: 'PARAR',
      description: 'Parar de vez com o ciclo',
      baseEffect: {
        dependency: -15,
        anxiety: -8,
        health: 5,
        energy: -5,
      },
      feedback: 'Você decidiu parar. Não vai ser fácil, mas é o certo.',
      disabled: dependency < 10 && hasStopped,
      disabledReason: 'Você já parou',
    },
  ];

  return actions;
}
