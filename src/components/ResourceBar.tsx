import { motion } from 'framer-motion';

interface ResourceBarProps {
  label: string;
  value: number;
  max?: number;
  icon: string;
  color: string;
  showValue?: boolean;
  suffix?: string;
}

export function ResourceBar({
  label,
  value,
  max = 100,
  icon,
  color,
  showValue = true,
  suffix = '%',
}: ResourceBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const isLow = percentage < 25;
  const isCritical = percentage < 10;

  return (
    <div className="resource-bar">
      <div className="resource-bar__header">
        <span className="resource-bar__icon">{icon}</span>
        <span className="resource-bar__label">{label}</span>
        {showValue && (
          <span
            className={`resource-bar__value ${
              isCritical ? 'critical' : isLow ? 'low' : ''
            }`}
          >
            {Math.round(value)}
            {suffix}
          </span>
        )}
      </div>
      <div className="resource-bar__track">
        <motion.div
          className={`resource-bar__fill ${isCritical ? 'critical' : ''}`}
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
