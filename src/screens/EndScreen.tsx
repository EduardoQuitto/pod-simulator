import { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { GameState, Ending, Stats } from '../types/game';

interface EndScreenProps {
  state: GameState;
  ending: Ending;
  duration: number;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

const STORAGE_KEY = 'pod-simulator-stats';

function saveStats(state: GameState, ending: Ending) {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const stats: Stats = data
      ? JSON.parse(data)
      : {
          totalGames: 0,
          bestScore: 0,
          lowestDependency: 100,
          highestMoney: 0,
          bestEnding: 'Nenhum',
        };

    const score = Math.round(
      state.resources.health +
        state.resources.energy +
        (100 - state.resources.dependency) +
        state.resources.money * 2 +
        (100 - state.resources.anxiety)
    );

    stats.totalGames += 1;
    stats.bestScore = Math.max(stats.bestScore, score);
    stats.lowestDependency = Math.min(
      stats.lowestDependency,
      state.resources.dependency
    );
    stats.highestMoney = Math.max(
      stats.highestMoney,
      state.resources.money
    );

    const endingRank: Record<string, number> = {
      'EU NÃO PRECISO DISSO': 5,
      PAROU: 4,
      'SÓ DE VEZ EM QUANDO': 3,
      'FIM DO DIA': 2,
      CICLO: 1,
      EXCESSO: 0,
    };

    const currentRank = endingRank[ending.name] ?? 0;
    const bestRank =
      endingRank[stats.bestEnding] ?? 0;

    if (currentRank > bestRank) {
      stats.bestEnding = ending.name;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {}
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function getClassificationStyle(
  classification: string
): { emoji: string; text: string; className: string } {
  switch (classification) {
    case 'green':
      return {
        emoji: '🟢',
        text: 'VOCÊ ESCAPOU',
        className: 'classification--green',
      };
    case 'yellow':
      return {
        emoji: '🟡',
        text: 'QUASE ENTROU NO CICLO',
        className: 'classification--yellow',
      };
    case 'red':
      return {
        emoji: '🔴',
        text: 'O POD VENCEU',
        className: 'classification--red',
      };
    default:
      return { emoji: '⚪', text: '', className: '' };
  }
}

export function EndScreen({
  state,
  ending,
  duration,
  onPlayAgain,
  onMainMenu,
}: EndScreenProps) {
  useEffect(() => {
    saveStats(state, ending);
  }, [state, ending]);

  const classification = getClassificationStyle(ending.classification);

  const statItems = [
    { label: 'Dinheiro restante', value: `R$ ${state.resources.money},00` },
    { label: 'Dependência', value: `${Math.round(state.resources.dependency)}%` },
    { label: 'Saúde', value: `${Math.round(state.resources.health)}%` },
    { label: 'Energia', value: `${Math.round(state.resources.energy)}%` },
    { label: 'Ansiedade', value: `${Math.round(state.resources.anxiety)}%` },
    { label: 'Usos', value: state.uses.toString() },
    { label: 'Compras', value: state.buys.toString() },
    { label: 'Duração', value: formatDuration(duration) },
  ];

  return (
    <div className="end-screen">
      <motion.div
        className="end-screen__content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className={`classification ${classification.className}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="classification__emoji">{classification.emoji}</span>
          <span className="classification__text">{classification.text}</span>
        </motion.div>

        <motion.h1
          className="end-screen__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          FINAL: {ending.name}
        </motion.h1>

        <motion.div
          className="end-screen__message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {ending.message.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </motion.div>

        <motion.div
          className="end-screen__stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h3>RESUMO DA PARTIDA</h3>
          <div className="end-stats-grid">
            {statItems.map((item, i) => (
              <motion.div
                key={item.label}
                className="end-stat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + i * 0.1 }}
              >
                <span className="end-stat__label">{item.label}</span>
                <span className="end-stat__value">{item.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="end-screen__buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            className="menu-btn menu-btn--primary"
            onClick={onPlayAgain}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            JOGAR NOVAMENTE
          </motion.button>

          <motion.button
            className="menu-btn menu-btn--secondary"
            onClick={onMainMenu}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            TELA INICIAL
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
