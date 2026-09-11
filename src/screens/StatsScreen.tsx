import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Stats } from '../types/game';

interface StatsScreenProps {
  onBack: () => void;
}

const STORAGE_KEY = 'pod-simulator-stats';

function loadStats(): Stats {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return {
    totalGames: 0,
    bestScore: 0,
    lowestDependency: 100,
    highestMoney: 0,
    bestEnding: 'Nenhum',
  };
}

export function StatsScreen({ onBack }: StatsScreenProps) {
  const [stats, setStats] = useState<Stats>(loadStats);

  useEffect(() => {
    setStats(loadStats());
  }, []);

  const resetStats = () => {
    const fresh: Stats = {
      totalGames: 0,
      bestScore: 0,
      lowestDependency: 100,
      highestMoney: 0,
      bestEnding: 'Nenhum',
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    setStats(fresh);
  };

  const statItems = [
    {
      icon: '🎮',
      label: 'Total de partidas',
      value: stats.totalGames.toString(),
    },
    {
      icon: '🏆',
      label: 'Maior pontuação',
      value: stats.bestScore.toString(),
    },
    {
      icon: '🔗',
      label: 'Menor dependência',
      value: `${stats.lowestDependency}%`,
    },
    {
      icon: '💰',
      label: 'Maior dinheiro restante',
      value: `R$ ${stats.highestMoney},00`,
    },
    {
      icon: '🏅',
      label: 'Melhor final',
      value: stats.bestEnding,
    },
  ];

  return (
    <div className="info-screen">
      <motion.div
        className="info-screen__content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="info-screen__title">ESTATÍSTICAS</h2>

        <div className="stats-grid">
          {statItems.map((item, i) => (
            <motion.div
              key={item.label}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
            >
              <div className="stat-card__icon">{item.icon}</div>
              <div className="stat-card__info">
                <p className="stat-card__label">{item.label}</p>
                <p className="stat-card__value">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="stats-actions">
          <motion.button
            className="menu-btn menu-btn--secondary"
            onClick={onBack}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            VOLTAR
          </motion.button>

          <motion.button
            className="menu-btn menu-btn--danger"
            onClick={resetStats}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            LIMPAR DADOS
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
