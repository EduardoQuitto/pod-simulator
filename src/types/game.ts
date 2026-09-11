export type Screen =
  | 'menu'
  | 'howItWorks'
  | 'credits'
  | 'stats'
  | 'game'
  | 'end';

export type GameStage = 1 | 2 | 3 | 4 | 5;

export type ActionType =
  | 'use'
  | 'notUse'
  | 'buyNew'
  | 'save'
  | 'talk'
  | 'stop';

export interface Resources {
  money: number;
  dependency: number;
  health: number;
  energy: number;
  anxiety: number;
  liquid: number;
}

export interface GameEvent {
  id: string;
  icon: string;
  title: string;
  description: string;
  effect?: Partial<Resources>;
  actionOverrides?: Partial<Record<ActionType, Partial<Resources>>>;
}

export interface Situation {
  id: string;
  timeSlot: string;
  title: string;
  description: string;
  event?: GameEvent;
}

export interface Ending {
  id: string;
  name: string;
  message: string;
  classification: 'green' | 'yellow' | 'red';
}

export interface GameState {
  screen: Screen;
  resources: Resources;
  timeSlotIndex: number;
  uses: number;
  buys: number;
  stoppedAt: string | null;
  startTime: number;
  currentEvent: GameEvent | null;
  eventShown: boolean;
  actionTaken: boolean;
  actionFeedback: string | null;
  stage: GameStage;
  history: string[];
  positiveDecisions: number;
}

export interface Stats {
  totalGames: number;
  bestScore: number;
  lowestDependency: number;
  highestMoney: number;
  bestEnding: string;
}
