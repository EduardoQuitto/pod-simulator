import { motion } from 'framer-motion';

interface MainMenuProps {
  onPlay: () => void;
  onHowItWorks: () => void;
  onStats: () => void;
  onCredits: () => void;
}

export function MainMenu({
  onPlay,
  onHowItWorks,
  onStats,
  onCredits,
}: MainMenuProps) {
  return (
    <div className="menu-screen">
      <div className="menu-bg">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="menu-bg__particle"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0.3, 0],
              y: [
                Math.random() * 100 + '%',
                Math.random() * 100 + '%',
              ],
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.div
        className="menu-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="menu-logo">
          <motion.div
            className="menu-logo__icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              damping: 10,
              stiffness: 100,
              delay: 0.5,
            }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="28"
                y="10"
                width="24"
                height="50"
                rx="12"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <rect
                x="32"
                y="55"
                width="16"
                height="8"
                rx="4"
                fill="currentColor"
                opacity="0.3"
              />
              <line
                x1="40"
                y1="18"
                x2="40"
                y2="38"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="40" cy="18" r="3" fill="currentColor" opacity="0.6" />
            </svg>
          </motion.div>

          <motion.h1
            className="menu-logo__title"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            POD SIMULATOR
          </motion.h1>

          <motion.p
            className="menu-logo__subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            "Era só uma brincadeira..."
          </motion.p>
        </div>

        <motion.div
          className="menu-buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            className="menu-btn menu-btn--primary"
            onClick={onPlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            JOGAR
          </motion.button>

          <motion.button
            className="menu-btn menu-btn--secondary"
            onClick={onHowItWorks}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            COMO FUNCIONA
          </motion.button>

          <motion.button
            className="menu-btn menu-btn--secondary"
            onClick={onStats}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            ESTATÍSTICAS
          </motion.button>

          <motion.button
            className="menu-btn menu-btn--tertiary"
            onClick={onCredits}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            CRÉDITOS
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="menu-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2 }}
      >
        <p>Jogo satírico educativo — Não incentive o consumo</p>
      </motion.div>
    </div>
  );
}
