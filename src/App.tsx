import { AnimatePresence, motion } from 'framer-motion';
import { useGameState } from './hooks/useGameState';
import { MainMenu } from './screens/MainMenu';
import { HowItWorks } from './screens/HowItWorks';
import { Credits } from './screens/Credits';
import { StatsScreen } from './screens/StatsScreen';
import { GameScreen } from './screens/GameScreen';
import { EndScreen } from './screens/EndScreen';
import './App.css';

function App() {
  const {
    state,
    currentSituation,
    currentTime,
    isGameOver,
    ending,
    duration,
    setScreen,
    startGame,
    dismissEvent,
    takeAction,
    nextTurn,
    resetGame,
  } = useGameState();

  const handlePlay = () => {
    startGame();
  };

  const handlePlayAgain = () => {
    startGame();
  };

  const handleMainMenu = () => {
    resetGame();
    setScreen('menu');
  };

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {state.screen === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MainMenu
              onPlay={handlePlay}
              onHowItWorks={() => setScreen('howItWorks')}
              onStats={() => setScreen('stats')}
              onCredits={() => setScreen('credits')}
            />
          </motion.div>
        )}

        {state.screen === 'howItWorks' && (
          <motion.div
            key="howItWorks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HowItWorks onBack={() => setScreen('menu')} />
          </motion.div>
        )}

        {state.screen === 'credits' && (
          <motion.div
            key="credits"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Credits onBack={() => setScreen('menu')} />
          </motion.div>
        )}

        {state.screen === 'stats' && (
          <motion.div
            key="stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <StatsScreen onBack={() => setScreen('menu')} />
          </motion.div>
        )}

        {state.screen === 'game' && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GameScreen
              state={state}
              currentSituation={currentSituation}
              currentTime={currentTime}
              onTakeAction={takeAction}
              onNextTurn={nextTurn}
              onDismissEvent={dismissEvent}
            />
          </motion.div>
        )}

        {state.screen === 'end' && ending && (
          <motion.div
            key="end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EndScreen
              state={state}
              ending={ending}
              duration={duration}
              onPlayAgain={handlePlayAgain}
              onMainMenu={handleMainMenu}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
