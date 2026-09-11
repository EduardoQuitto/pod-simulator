import { motion, AnimatePresence } from 'framer-motion';
import type { GameEvent } from '../types/game';

interface EventCardProps {
  event: GameEvent;
  onDismiss: () => void;
}

export function EventCard({ event, onDismiss }: EventCardProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="event-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="event-card"
          initial={{ scale: 0.8, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 30 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          <div className="event-card__icon">{event.icon}</div>
          <h3 className="event-card__title">{event.title}</h3>
          <p className="event-card__description">{event.description}</p>
          <button className="event-card__dismiss" onClick={onDismiss}>
            ENTENDI
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
