import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/memory/Card';
import GameStats from '../components/memory/GameStats';
import WinCelebration from '../components/memory/WinCelebration';
import GameSettings from '../components/memory/GameSettings';
import GameLobby from '../components/memory/GameLobby';
import PixelButton from '../components/common/PixelButton';
import { useMemoryGame } from '../src/hooks/useMemoryGame';
import { DIFFICULTY_LEVELS } from '../src/config/gameConfig';

export default function MemoryGame() {
  const {
    gameState,
    cards,
    moves,
    timeElapsed,
    difficulty,
    isSettingsOpen,
    flippedCards,
    matchedPairs,
    showingCards,
    disabled,
    actions,
    currentDifficulty,
  } = useMemoryGame();

  const { startGame, goToLobby, setDifficulty, handleCardClick, toggleSettings, restartGame } = actions;

  // Track the gameState before opening settings
  const [preSettingsState, setPreSettingsState] = useState(null);

  // Handler to open settings and record the current state
  const handleOpenSettings = () => {
    setPreSettingsState(gameState);
    toggleSettings();
  };

  // Handler for applying settings: return to lobby or restart game
  const handleApplySettings = () => {
    if (preSettingsState === 'lobby') {
      goToLobby();
    } else {
      restartGame();
    }
  };

  return (
    <div 
      className="h-screen p-2 sm:p-4 font-pixel flex flex-col overflow-hidden transition-colors duration-500 bg-theme-bg text-theme-text"
    >
      <div className="flex-1 flex flex-col max-w-lg mx-auto w-full">
        <motion.div
          className="flex justify-between items-center mb-2 sm:mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-12"></div>
          <div className="text-center flex-1">
            <h1 
              className="text-lg xs:text-xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 text-theme-primary text-shadow leading-none"
            >
              <span className="block">MEMORY</span>
              <span className="block">MATCH</span>
            </h1>
            {gameState === 'lobby' ? (
              <p className="text-xs xs:text-sm sm:text-base text-shadow-sm">
                READY TO PLAY?
              </p>
            ) : (
              <p className="text-xs xs:text-sm sm:text-base text-shadow-sm">
                {gameState === 'initializing' ? "GET READY..." : 
                 gameState === 'paused' ? "GAME PAUSED" : "FIND THE PAIRS!"}
              </p>
            )}
          </div>
          <div className="w-12 flex justify-end">
            <GameSettings
              onOpen={handleOpenSettings}
              onClose={toggleSettings}
              isOpen={isSettingsOpen}
              onApplySettings={handleApplySettings}
            />
          </div>
        </motion.div>

        {gameState === 'lobby' && (
          <GameLobby
            difficulty={difficulty}
            onSetDifficulty={setDifficulty}
            onStartGame={startGame}
          />
        )}

        {(gameState === 'playing' || gameState === 'paused' || gameState === 'initializing') && (
          <div className="mb-2 sm:mb-4">
            <GameStats
              moves={moves}
              timeElapsed={timeElapsed}
              onRestart={startGame}
              onGoToLobby={goToLobby}
            />
          </div>
        )}

        {(gameState === 'initializing' || gameState === 'playing' || gameState === 'paused') && (
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              className="grid gap-1.5 xs:gap-2 sm:gap-3 w-full max-w-sm sm:max-w-md aspect-square"
              style={{ gridTemplateColumns: `repeat(${currentDifficulty.cols}, 1fr)` }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <AnimatePresence>
                {cards.map((card) => (
                  <motion.div
                    key={card.id}
                    layout
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    transition={{ delay: card.id * 0.03 }}
                  >
                    <Card
                      card={card}
                      isFlipped={
                        showingCards ||
                        flippedCards.includes(card.id) ||
                        matchedPairs.includes(card.id)
                      }
                      isMatched={matchedPairs.includes(card.id)}
                      onClick={handleCardClick}
                      disabled={disabled || showingCards || flippedCards.includes(card.id) || gameState === 'paused'}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {gameState === 'initializing' && (
          <motion.div
            className="text-center mt-2 sm:mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: [1, 1.02, 1] }}
            transition={{ delay: 0.3, duration: 1.5, repeat: Infinity }}
          >
            <p className="text-xs xs:text-sm sm:text-base text-shadow-sm">
              MEMORIZE THE CARDS!
            </p>
          </motion.div>
        )}

        <AnimatePresence>
          {gameState === 'won' && (
            <WinCelebration
              moves={moves}
              timeElapsed={timeElapsed}
              onPlayAgain={startGame}
              onGoToLobby={goToLobby}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
