import React from 'react';
import { motion } from 'framer-motion';
import PixelButton from '../common/PixelButton';
import { formatTime } from '../../src/utils/time';

export default function GameStats({ moves, timeElapsed, onRestart, onGoToLobby }) {

  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 border-4 font-pixel rounded bg-theme-primary border-theme-text-shadow"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div
        className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-base font-bold text-theme-text"
        style={{
          textShadow: `2px 2px var(--color-primary-shadow)`
        }}
      >
        <span className="text-center">MOVES: {moves}</span>
        <span className="text-center">TIME: {formatTime(timeElapsed)}</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <PixelButton onClick={onGoToLobby} size="small" className="w-full text-center">
          MAIN MENU
        </PixelButton>
        <PixelButton onClick={onRestart} size="small" className="w-full text-center">
          RESTART
        </PixelButton>
      </div>
    </motion.div>
  );
}
