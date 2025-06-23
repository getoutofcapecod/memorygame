import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import PixelButton from '../common/PixelButton';
import { formatTime } from '../../src/utils/time';
import { PERFORMANCE_RATINGS } from '../../src/config/gameConfig';
import { usePrefersReducedMotion } from '../../src/hooks/usePrefersReducedMotion';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default function WinCelebration({ moves, timeElapsed, onPlayAgain, onGoToLobby }) {
  const [width, height] = useWindowSize();
  const prefersReducedMotion = usePrefersReducedMotion();

  const getPerformanceRating = (moves, timeInSeconds) => {
    for (const rating of PERFORMANCE_RATINGS) {
      if (moves <= rating.threshold.moves && timeInSeconds <= rating.threshold.time) {
        return { rating: rating.rating, color: rating.color };
      }
    }
    return { rating: "Good Job!", color: "var(--color-secondary)" };
  };

  const performance = getPerformanceRating(moves, timeElapsed);

  const confettiColors = [
    'var(--color-primary)',
    'var(--color-accent)',
    'var(--color-secondary)',
    'var(--color-button)',
    'var(--color-primary-shadow)',
  ];

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 font-pixel overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
    >
      {!prefersReducedMotion && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={200}
          recycle={false}
          colors={confettiColors}
          gravity={0.1}
        />
      )}
      <motion.div
        className="p-6 border-4 w-full max-w-sm text-center space-y-6 rounded-lg relative bg-theme-secondary border-theme-border text-theme-text"
        initial={{ scale: 0.5, rotateY: prefersReducedMotion ? 0 : -180 }}
        animate={{ scale: 1, rotateY: 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                type: 'spring',
                stiffness: 300,
                damping: 20,
                duration: 0.8,
              }
        }
      >
        {/* Victory Title with Glow Effect */}
        <motion.div className="relative">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold relative z-10 text-theme-accent"
            style={{ 
              textShadow: `3px 3px var(--color-text-shadow), 0 0 20px var(--color-accent-shadow)` 
            }}
            animate={!prefersReducedMotion ? { 
              scale: [1, 1.05, 1],
              textShadow: [
                `3px 3px var(--color-text-shadow), 0 0 20px var(--color-accent-shadow)`,
                `3px 3px var(--color-text-shadow), 0 0 30px var(--color-accent-shadow)`,
                `3px 3px var(--color-text-shadow), 0 0 20px var(--color-accent-shadow)`
              ]
            } : {}}
            transition={!prefersReducedMotion ? { duration: 1.5, repeat: Infinity } : {}}
          >
            VICTORY!
          </motion.h2>
        </motion.div>

        {/* Performance Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg font-bold"
          style={{ 
            color: performance.color,
            textShadow: `2px 2px var(--color-text-shadow)`
          }}
        >
          {performance.rating}
        </motion.div>

        {/* Game Stats */}
        <motion.div 
          className="space-y-3 text-base sm:text-lg font-bold" 
          style={{
            textShadow: `2px 2px var(--color-secondary-shadow)`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.p
            whileHover={{ scale: 1.05 }}
            className="p-2 rounded border-2 bg-theme-secondary-shadow border-theme-border/40"
          >
            MOVES: <span className="font-bold text-xl text-theme-accent">{moves}</span>
          </motion.p>
          
          <motion.p
            whileHover={{ scale: 1.05 }}
            className="p-2 rounded border-2 bg-theme-secondary-shadow border-theme-border/40"
          >
            TIME: <span className="font-bold text-xl text-theme-accent">{formatTime(timeElapsed)}</span>
          </motion.p>
        </motion.div>

        {/* Play Again Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex gap-4">
            <PixelButton 
              onClick={onGoToLobby} 
              className="w-full transform hover:scale-105 active:scale-95"
            >
              MAIN MENU
            </PixelButton>
            <PixelButton 
              onClick={onPlayAgain} 
              className="w-full transform hover:scale-105 active:scale-95"
            >
              PLAY AGAIN
            </PixelButton>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -left-2 w-4 h-4 border-4 border-current opacity-50 text-theme-accent" />
        <div className="absolute -top-2 -right-2 w-4 h-4 border-4 border-current opacity-50 text-theme-accent" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-4 border-current opacity-50 text-theme-accent" />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-4 border-current opacity-50 text-theme-accent" />
      </motion.div>
    </motion.div>
  );
}
