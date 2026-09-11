import { motion } from 'framer-motion';

interface CreditsProps {
  onBack: () => void;
}

export function Credits({ onBack }: CreditsProps) {
  return (
    <div className="info-screen">
      <motion.div
        className="info-screen__content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="info-screen__title">CRÉDITOS</h2>

        <div className="credits-card">
          <h3 className="credits-card__title">POD SIMULATOR</h3>

          <div className="credits-card__section">
            <p className="credits-card__label">Criado por</p>
            <p className="credits-card__name">Dev</p>
          </div>

          <div className="credits-card__section">
            <p className="credits-card__label">Tipo de projeto</p>
            <p className="credits-card__type">
              Projeto experimental / jogo satírico
            </p>
          </div>

          <div className="credits-card__disclaimer">
            <p>
              Este jogo é uma sátira educativa sobre o uso de cigarros
              eletrônicos. Não representa marcas reais, não incentiva o
              consumo de nicotina e não retrata pessoas reais.
            </p>
            <p>
              O objetivo é demonstrar, por meio de humor e mecânicas de
              gerenciamento, como o consumo pode virar um ciclo de
              dependência.
            </p>
          </div>
        </div>

        <motion.button
          className="menu-btn menu-btn--secondary"
          onClick={onBack}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          VOLTAR
        </motion.button>
      </motion.div>
    </div>
  );
}
