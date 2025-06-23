import React from 'react';
import { motion } from 'framer-motion';
import PixelButton from '../common/PixelButton';
import { DIFFICULTY_LEVELS } from '../../src/config/gameConfig';

const GameLobby = ({ difficulty, onSetDifficulty, onStartGame }) => (
  <motion.div
    className="flex-1 flex flex-col items-center justify-center space-y-6"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
  >
    <div className="w-full max-w-xs text-center">
      <h2 className="text-lg mb-4 text-shadow">CHOOSE DIFFICULTY</h2>
      <div className="grid grid-cols-3 gap-2">
        {Object.keys(DIFFICULTY_LEVELS).map((level) => (
          <PixelButton
            key={level}
            onClick={() => onSetDifficulty(level)}
            className={`py-2 px-1 text-xs sm:text-sm flex items-center justify-center ${difficulty === level ? 'bg-theme-accent text-black text-shadow-sm' : 'bg-theme-secondary'} ${level === 'medium' ? 'text-[10px] sm:text-xs' : ''}`}
          >
            {level.toUpperCase()}
          </PixelButton>
        ))}
      </div>
    </div>
    <motion.button
      onClick={onStartGame}
      className="px-8 py-4 text-lg sm:text-xl font-bold border-4 rounded-lg transition-all duration-200 bg-theme-accent text-theme-text-on-accent border-theme-border shadow-[inset_0px_-4px_0px_0px_var(--color-accent-shadow)] text-shadow"
      whileHover={{ 
        scale: 1.05,
        y: -2,
        backgroundColor: 'var(--color-accent-shadow)'
      }}
      whileTap={{ scale: 0.95 }}
    >
      START GAME
    </motion.button>
    <motion.p 
      className="text-xs sm:text-sm text-center max-w-xs text-shadow-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      Match all the pairs to win! Use the settings button to customize your experience.
    </motion.p>
  </motion.div>
);

export default GameLobby;
