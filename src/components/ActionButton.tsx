import { motion } from 'framer-motion';

interface ActionButtonProps {
  label: string;
  description: string;
  onClick: () => void;
  variant?: 'primary' | 'danger' | 'warning' | 'success' | 'neutral';
  disabled?: boolean;
  disabledReason?: string;
  cost?: number;
  icon?: string;
}

const VARIANT_CLASSES: Record<string, string> = {
  primary: 'btn--primary',
  danger: 'btn--danger',
  warning: 'btn--warning',
  success: 'btn--success',
  neutral: 'btn--neutral',
};

export function ActionButton({
  label,
  description,
  onClick,
  variant = 'neutral',
  disabled = false,
  disabledReason,
  cost,
  icon,
}: ActionButtonProps) {
  return (
    <motion.button
      className={`btn ${VARIANT_CLASSES[variant]} ${disabled ? 'btn--disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="btn__content">
        {icon && <span className="btn__icon">{icon}</span>}
        <div className="btn__text">
          <span className="btn__label">{label}</span>
          <span className="btn__description">{description}</span>
        </div>
        {cost !== undefined && (
          <span className="btn__cost">-R$ {cost},00</span>
        )}
      </div>
      {disabled && disabledReason && (
        <span className="btn__disabled-reason">{disabledReason}</span>
      )}
    </motion.button>
  );
}
