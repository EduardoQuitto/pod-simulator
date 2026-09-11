import { ResourceBar } from './ResourceBar';
import { STAGE_NAMES } from '../data/events';
import { TIME_SLOTS } from '../data/events';
import type { Resources, GameStage } from '../types/game';
import { motion } from 'framer-motion';

interface HUDProps {
  resources: Resources;
  stage: GameStage;
  timeSlotIndex: number;
  stoppedAt: string | null;
}

export function HUD({
  resources,
  stage,
  timeSlotIndex,
  stoppedAt,
}: HUDProps) {
  const progress = ((timeSlotIndex + 1) / TIME_SLOTS.length) * 100;

  return (
    <motion.div
      className="hud"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="hud__header">
        <div className="hud__stage">
          <span className="hud__stage-number">ESTÁGIO {stage}</span>
          <span className="hud__stage-name">{STAGE_NAMES[stage]}</span>
        </div>
        {stoppedAt && (
          <div className="hud__stopped">
            PAROU às {stoppedAt}
          </div>
        )}
      </div>

      <div className="hud__progress">
        <div className="hud__progress-bar">
          <motion.div
            className="hud__progress-fill"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="hud__time-slots">
          {TIME_SLOTS.map((slot, i) => (
            <span
              key={slot}
              className={`hud__time-dot ${
                i <= timeSlotIndex ? 'active' : ''
              }`}
              title={slot}
            />
          ))}
        </div>
      </div>

      <div className="hud__resources">
        <ResourceBar
          label="Dinheiro"
          value={resources.money}
          max={30}
          icon="💰"
          color="#4ade80"
          suffix=""
          showValue={true}
        />
        <ResourceBar
          label="Saúde"
          value={resources.health}
          icon="❤️"
          color="#f87171"
        />
        <ResourceBar
          label="Energia"
          value={resources.energy}
          icon="⚡"
          color="#facc15"
        />
        <ResourceBar
          label="Ansiedade"
          value={resources.anxiety}
          icon="😰"
          color="#fb923c"
        />
        <ResourceBar
          label="Dependência"
          value={resources.dependency}
          icon="🔗"
          color="#a78bfa"
        />
        <ResourceBar
          label="Líquido"
          value={resources.liquid}
          icon="💧"
          color="#60a5fa"
        />
      </div>
    </motion.div>
  );
}
