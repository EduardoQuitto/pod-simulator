import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HUD } from '../components/HUD';
import { ActionButton } from '../components/ActionButton';
import { EventCard } from '../components/EventCard';
import { FeedbackToast } from '../components/FeedbackToast';
import { getAvailableActions } from '../data/actions';
import type { GameState } from '../types/game';
import type { ActionType } from '../types/game';

interface GameScreenProps {
  state: GameState;
  currentSituation: { title: string; description: string } | undefined;
  currentTime: string;
  onTakeAction: (actionType: ActionType) => void;
  onNextTurn: () => void;
  onDismissEvent: () => void;
}

export function GameScreen({
  state,
  currentSituation,
  currentTime,
  onTakeAction,
  onNextTurn,
  onDismissEvent,
}: GameScreenProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [animatingNext, setAnimatingNext] = useState(false);

  const actions = getAvailableActions(
    state.resources.money,
    state.resources.liquid,
    state.resources.dependency,
    !!state.stoppedAt
  );

  const handleAction = useCallback(
    (actionType: ActionType) => {
      onTakeAction(actionType);
      setShowFeedback(true);
    },
    [onTakeAction]
  );

  const handleFeedbackDone = useCallback(() => {
    setShowFeedback(false);
    setAnimatingNext(true);
    setTimeout(() => {
      onNextTurn();
      setAnimatingNext(false);
    }, 300);
  }, [onNextTurn]);

  useEffect(() => {
    setShowFeedback(false);
  }, [state.timeSlotIndex]);

  const getActionVariant = (id: string): 'danger' | 'warning' | 'success' | 'neutral' | 'primary' => {
    switch (id) {
      case 'use': return 'danger';
      case 'buyNew': return 'warning';
      case 'stop': return 'success';
      case 'talk': return 'primary';
      default: return 'neutral';
    }
  };

  const getActionIcon = (id: string): string => {
    switch (id) {
      case 'use': return '💨';
      case 'notUse': return '🚫';
      case 'buyNew': return '🛒';
      case 'save': return '📦';
      case 'talk': return '💬';
      case 'stop': return '🛑';
      default: return '•';
    }
  };

  return (
    <div className="game-screen">
      <HUD
        resources={state.resources}
        stage={state.stage}
        timeSlotIndex={state.timeSlotIndex}
        stoppedAt={state.stoppedAt}
      />

      <AnimatePresence mode="wait">
        {!state.actionTaken && (
          <motion.div
            key={`situation-${state.timeSlotIndex}`}
            className="game-content"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="time-display">
              <span className="time-display__day">SEGUNDA-FEIRA</span>
              <span className="time-display__time">{currentTime}</span>
            </div>

            {currentSituation && (
              <div className="situation-card">
                <h2 className="situation-card__title">
                  {currentSituation.title}
                </h2>
                <p className="situation-card__description">
                  {currentSituation.description}
                </p>
              </div>
            )}

            <div className="actions-grid">
              {actions.map((action) => (
                <ActionButton
                  key={action.id}
                  label={action.label}
                  description={action.description}
                  icon={getActionIcon(action.id)}
                  onClick={() => handleAction(action.id)}
                  variant={getActionVariant(action.id)}
                  disabled={action.disabled}
                  disabledReason={action.disabledReason}
                  cost={action.cost}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {state.currentEvent && state.eventShown && (
        <EventCard
          event={state.currentEvent}
          onDismiss={onDismissEvent}
        />
      )}

      {showFeedback && state.actionFeedback && (
        <FeedbackToast
          message={state.actionFeedback}
          onDone={handleFeedbackDone}
        />
      )}

      {animatingNext && (
        <div className="game-transition">
          <div className="game-transition__spinner" />
        </div>
      )}
    </div>
  );
}
