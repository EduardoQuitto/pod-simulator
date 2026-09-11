import { motion, AnimatePresence } from 'framer-motion';

interface FeedbackToastProps {
  message: string | null;
  onDone: () => void;
}

export function FeedbackToast({ message, onDone }: FeedbackToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="feedback-toast"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onAnimationComplete={() => {
            setTimeout(onDone, 2000);
          }}
        >
          <p>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
