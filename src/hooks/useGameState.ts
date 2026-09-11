import { useReducer, useCallback } from 'react';
import type { GameState, GameStage, Resources } from '../types/game';
import { TIME_SLOTS } from '../data/events';
import { SITUATIONS } from '../data/situations';
import { getRandomEvent } from '../data/events';
import { getAvailableActions } from '../data/actions';
import { determineEnding } from '../data/endings';
import type { ActionType } from '../types/game';

const INITIAL_RESOURCES: Resources = {
  money: 30,
  dependency: 0,
  health: 100,
  energy: 100,
  anxiety: 10,
  liquid: 100,
};

const initialState: GameState = {
  screen: 'menu',
  resources: { ...INITIAL_RESOURCES },
  timeSlotIndex: 0,
  uses: 0,
  buys: 0,
  stoppedAt: null,
  startTime: 0,
  currentEvent: null,
  eventShown: false,
  actionTaken: false,
  actionFeedback: null,
  stage: 1,
  history: [],
  positiveDecisions: 0,
};

type GameAction =
  | { type: 'SET_SCREEN'; screen: GameState['screen'] }
  | { type: 'START_GAME' }
  | { type: 'SHOW_EVENT' }
  | { type: 'DISMISS_EVENT' }
  | { type: 'TAKE_ACTION'; actionType: ActionType }
  | { type: 'NEXT_TURN' }
  | { type: 'RESET_GAME' }
  | { type: 'APPLY_ENDING_EFFECTS' };

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function getStage(dependency: number): GameStage {
  if (dependency < 15) return 1;
  if (dependency < 30) return 2;
  if (dependency < 50) return 3;
  if (dependency < 70) return 4;
  return 5;
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, screen: action.screen };

    case 'START_GAME': {
      const event = getRandomEvent(0);
      return {
        ...initialState,
        screen: 'game',
        resources: { ...INITIAL_RESOURCES },
        timeSlotIndex: 0,
        uses: 0,
        buys: 0,
        stoppedAt: null,
        startTime: Date.now(),
        currentEvent: event,
        eventShown: !!event,
        actionTaken: false,
        actionFeedback: null,
        stage: 1,
        history: [],
        positiveDecisions: 0,
      };
    }

    case 'SHOW_EVENT': {
      const event = getRandomEvent(state.resources.dependency);
      return {
        ...state,
        currentEvent: event,
        eventShown: !!event,
      };
    }

    case 'DISMISS_EVENT':
      return { ...state, eventShown: false, currentEvent: null };

    case 'TAKE_ACTION': {
      const actions = getAvailableActions(
        state.resources.money,
        state.resources.liquid,
        state.resources.dependency,
        !!state.stoppedAt
      );
      const actionDef = actions.find((a) => a.id === action.actionType);
      if (!actionDef || actionDef.disabled) return state;

      let newResources = { ...state.resources };

      // Apply base effect
      for (const [key, value] of Object.entries(actionDef.baseEffect)) {
        if (value !== undefined) {
          (newResources as Record<string, number>)[key] = clamp(
            (newResources as Record<string, number>)[key] + value,
            0,
            key === 'money' ? 999 : 100
          );
        }
      }

      // Apply event effect if present
      if (state.currentEvent) {
        const eventEffect = state.currentEvent.effect;
        if (eventEffect) {
          for (const [key, value] of Object.entries(eventEffect)) {
            if (value !== undefined) {
              (newResources as Record<string, number>)[key] = clamp(
                (newResources as Record<string, number>)[key] + value,
                0,
                key === 'money' ? 999 : 100
              );
            }
          }
        }
      }

      // Anxiety naturally goes up with dependency
      newResources.anxiety = clamp(
        newResources.anxiety + state.resources.dependency * 0.05,
        0,
        100
      );

      // Liquid decreases slowly over time
      newResources.liquid = clamp(newResources.liquid - 3, 0, 100);

      const newUses = state.uses + (action.actionType === 'use' ? 1 : 0);
      const newBuys = state.buys + (action.actionType === 'buyNew' ? 1 : 0);
      const newStoppedAt =
        action.actionType === 'stop' && !state.stoppedAt
          ? TIME_SLOTS[state.timeSlotIndex]
          : state.stoppedAt;
      const positiveDecisions =
        state.positiveDecisions +
        (['notUse', 'talk', 'stop'].includes(action.actionType) ? 1 : 0);

      return {
        ...state,
        resources: newResources,
        uses: newUses,
        buys: newBuys,
        stoppedAt: newStoppedAt,
        actionTaken: true,
        actionFeedback: actionDef.feedback,
        stage: getStage(newResources.dependency),
        positiveDecisions,
        history: [
          ...state.history,
          `${TIME_SLOTS[state.timeSlotIndex]}: ${actionDef.label}`,
        ],
      };
    }

    case 'NEXT_TURN': {
      const nextIndex = state.timeSlotIndex + 1;
      if (nextIndex >= TIME_SLOTS.length) {
        // Game over
        return { ...state, screen: 'end' };
      }
      const event = getRandomEvent(state.resources.dependency);
      return {
        ...state,
        timeSlotIndex: nextIndex,
        currentEvent: event,
        eventShown: !!event,
        actionTaken: false,
        actionFeedback: null,
      };
    }

    case 'APPLY_ENDING_EFFECTS':
      return state;

    case 'RESET_GAME':
      return { ...initialState };

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const setScreen = useCallback(
    (screen: GameState['screen']) => dispatch({ type: 'SET_SCREEN', screen }),
    []
  );

  const startGame = useCallback(
    () => dispatch({ type: 'START_GAME' }),
    []
  );

  const showEvent = useCallback(
    () => dispatch({ type: 'SHOW_EVENT' }),
    []
  );

  const dismissEvent = useCallback(
    () => dispatch({ type: 'DISMISS_EVENT' }),
    []
  );

  const takeAction = useCallback(
    (actionType: ActionType) =>
      dispatch({ type: 'TAKE_ACTION', actionType }),
    []
  );

  const nextTurn = useCallback(
    () => dispatch({ type: 'NEXT_TURN' }),
    []
  );

  const resetGame = useCallback(
    () => dispatch({ type: 'RESET_GAME' }),
    []
  );

  const currentSituation = SITUATIONS[state.timeSlotIndex];
  const currentTime = TIME_SLOTS[state.timeSlotIndex];
  const isGameOver = state.screen === 'end';

  const ending = isGameOver
    ? determineEnding(
        state.resources.dependency,
        state.resources.health,
        state.uses,
        state.stoppedAt,
        state.positiveDecisions
      )
    : null;

  const duration = state.startTime
    ? Math.floor((Date.now() - state.startTime) / 1000)
    : 0;

  return {
    state,
    currentSituation,
    currentTime,
    isGameOver,
    ending,
    duration,
    setScreen,
    startGame,
    showEvent,
    dismissEvent,
    takeAction,
    nextTurn,
    resetGame,
  };
}
