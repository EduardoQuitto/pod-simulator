import { motion } from 'framer-motion';

interface HowItWorksProps {
  onBack: () => void;
}

export function HowItWorks({ onBack }: HowItWorksProps) {
  const rules = [
    {
      icon: '⏰',
      title: 'O dia',
      text: 'Você acompanha um personagem durante 8 horários do dia. Em cada período, uma situação diferente aparece.',
    },
    {
      icon: '📊',
      title: 'Recursos',
      text: 'Gerencie dinheiro, saúde, energia, ansiedade, dependência e líquido. Cada escolha afeta esses valores.',
    },
    {
      icon: '🎲',
      title: 'Eventos',
      text: 'Eventos aleatórios aparecem ao longo do dia. A pressão social, a tentação e as consequências são reais.',
    },
    {
      icon: '🎯',
      title: 'Objetivo',
      text: 'Chegar ao final do dia tomando decisões conscientes. Existem vários finais — cada um reflete suas escolhas.',
    },
    {
      icon: '⚠️',
      title: 'Mensagem',
      text: 'Este jogo é uma sátira educativa. O objetivo é mostrar como pequenas decisões podem criar um ciclo de dependência.',
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
        <h2 className="info-screen__title">COMO FUNCIONA</h2>

        <p className="info-screen__intro">
          O POD SIMULATOR transforma decisões de um dia em uma experiência de
          gerenciamento fictícia.
        </p>

        <div className="info-screen__rules">
          {rules.map((rule, i) => (
            <motion.div
              key={rule.title}
              className="info-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <div className="info-card__icon">{rule.icon}</div>
              <div className="info-card__text">
                <h3>{rule.title}</h3>
                <p>{rule.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="info-screen__note">
          Cada decisão possui consequências. Não existe resposta certa ou
          errada — apenas escolhas e seus resultados.
        </p>

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
