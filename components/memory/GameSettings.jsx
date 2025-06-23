import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Palette, Smile, RefreshCw } from 'lucide-react';
import { SettingsContext } from '../../src/context/SettingsContext';
import { EMOJI_SETS, COLOR_SCHEMES } from '../../src/config/gameConfig';
import PixelButton from '../common/PixelButton';
import { usePrefersReducedMotion } from '../../src/hooks/usePrefersReducedMotion';

export default function GameSettings({ onOpen, onClose, isOpen, onApplySettings }) {
  const { colorScheme, emojiSet, handleColorChange, handleEmojiChange } = useContext(SettingsContext);
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const [activeTab, setActiveTab] = useState('colors');
  const [pendingColorScheme, setPendingColorScheme] = useState(colorScheme);
  const [pendingEmojiSet, setPendingEmojiSet] = useState(emojiSet);

  const hasChanges = pendingColorScheme !== colorScheme || pendingEmojiSet !== emojiSet;

  useEffect(() => {
    if (isOpen) {
      setPendingColorScheme(colorScheme);
      setPendingEmojiSet(emojiSet);
    }
  }, [isOpen, colorScheme, emojiSet]);

  const handleApply = () => {
    handleColorChange(pendingColorScheme);
    handleEmojiChange(pendingEmojiSet);
    onApplySettings?.();
  };

  const handleToggle = () => {
    if (isOpen) {
      onClose?.();
    } else {
      onOpen?.();
    }
  };

  return (
    <>
      {/* Settings Button */}
      <motion.button
        onClick={handleToggle}
        className="p-3 rounded-lg transition-all duration-200 border-2 bg-theme-secondary/80 border-theme-border/25 text-theme-text"
        whileHover={{ 
          scale: 1.05,
          backgroundColor: `var(--color-secondary)`
        }}
        whileTap={{ scale: 0.95 }}
      >
        <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
      </motion.button>

      {/* Settings Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 font-pixel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          >
            <motion.div
              className="border-4 p-4 w-full max-w-md max-h-[90vh] overflow-y-auto bg-theme-secondary border-theme-border text-theme-text"
              style={{
                ...(COLOR_SCHEMES[pendingColorScheme] && {
                  '--color-bg': COLOR_SCHEMES[pendingColorScheme].bg,
                  '--color-primary': COLOR_SCHEMES[pendingColorScheme].primary,
                  '--color-primary-shadow': COLOR_SCHEMES[pendingColorScheme].primaryShadow,
                  '--color-secondary': COLOR_SCHEMES[pendingColorScheme].secondary,
                  '--color-secondary-shadow': COLOR_SCHEMES[pendingColorScheme].secondaryShadow,
                  '--color-accent': COLOR_SCHEMES[pendingColorScheme].accent,
                  '--color-accent-shadow': COLOR_SCHEMES[pendingColorScheme].accentShadow,
                  '--color-button': COLOR_SCHEMES[pendingColorScheme].button,
                  '--color-button-shadow': COLOR_SCHEMES[pendingColorScheme].buttonShadow,
                  '--color-button-hover': COLOR_SCHEMES[pendingColorScheme].buttonHover,
                  '--color-text': COLOR_SCHEMES[pendingColorScheme].text,
                  '--color-text-shadow': COLOR_SCHEMES[pendingColorScheme].textShadow,
                  '--color-text-on-accent': COLOR_SCHEMES[pendingColorScheme].textOnAccent,
                  '--color-border': COLOR_SCHEMES[pendingColorScheme].border,
                })
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 
                  className="text-lg font-bold text-theme-text" 
                  style={{ 
                    textShadow: `2px 2px var(--color-secondary-shadow)` 
                  }}
                >
                  GAME SETTINGS
                </h2>
                <button
                  onClick={handleToggle}
                  className="p-1 rounded transition-colors duration-200 text-theme-text bg-transparent hover:bg-theme-secondary-shadow"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div 
                className="flex mb-4 p-1 rounded border-2 bg-theme-secondary-shadow border-theme-border/40"
              >
                <button
                  onClick={() => setActiveTab('colors')}
                  className={`flex-1 py-2 px-3 text-xs sm:text-sm transition-all duration-200 rounded font-bold ${activeTab === 'colors' ? 'bg-theme-accent text-theme-text-on-accent' : 'bg-transparent text-theme-text'}`}
                  style={{
                    textShadow: activeTab === 'colors' ? 'none' : `1px 1px var(--color-text-shadow)`
                  }}
                >
                  <Palette className="w-4 h-4 inline mr-1" />
                  COLORS
                </button>
                <button
                  onClick={() => setActiveTab('emojis')}
                  className={`flex-1 py-2 px-3 text-xs sm:text-sm transition-all duration-200 rounded font-bold ${activeTab === 'emojis' ? 'bg-theme-accent text-theme-text-on-accent' : 'bg-transparent text-theme-text'}`}
                  style={{
                    textShadow: activeTab === 'emojis' ? 'none' : `1px 1px var(--color-text-shadow)`
                  }}
                >
                  <Smile className="w-4 h-4 inline mr-1" />
                  EMOJIS
                </button>
              </div>

              {/* Tab Content Container */}
              <div className="h-48 overflow-y-auto pr-2">
                {/* Color Schemes */}
                {activeTab === 'colors' && (
                  <div className="space-y-3">
                  {Object.entries(COLOR_SCHEMES).map(([key, scheme]) => (
                    <motion.button
                      key={key}
                      onClick={() => setPendingColorScheme(key)}
                      className={`w-full h-12 px-3 flex items-center border-2 transition-all duration-200 rounded ${pendingColorScheme === key ? 'border-theme-accent bg-theme-accent text-theme-text-on-accent' : 'border-theme-border/40 bg-transparent text-theme-text'}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        {/* Color Preview */}
                        <div className="flex gap-1">
                          <div 
                            className="w-4 h-4 border-2 rounded"
                            style={{ 
                              backgroundColor: scheme.primary, 
                              borderColor: 'var(--color-text-shadow)'
                            }}
                          />
                          <div 
                            className="w-4 h-4 border-2 rounded"
                            style={{ 
                              backgroundColor: scheme.secondary, 
                              borderColor: 'var(--color-text-shadow)'
                            }}
                          />
                          <div 
                            className="w-4 h-4 border-2 rounded"
                            style={{ 
                              backgroundColor: scheme.accent, 
                              borderColor: 'var(--color-text-shadow)'
                            }}
                          />
                        </div>
                        <span 
                          className="text-sm font-bold" 
                          style={{ 
                            textShadow: `1px 1px var(--color-text-shadow)` 
                          }}
                        >
                          {scheme.name}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Emoji Sets */}
              {activeTab === 'emojis' && (
                <div className="space-y-3">
                  {Object.entries(EMOJI_SETS).map(([key, set]) => (
                    <motion.button
                      key={key}
                      onClick={() => setPendingEmojiSet(key)}
                      className={`w-full h-12 px-3 flex items-center border-2 transition-all duration-200 rounded ${pendingEmojiSet === key ? 'border-theme-accent bg-theme-accent text-theme-text-on-accent' : 'border-theme-border/40 bg-transparent text-theme-text'}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        {/* Emoji Preview */}
                        <div className="flex gap-1 text-lg">
                          {set.preview.map((emoji, index) => (
                            <span key={index}>{emoji}</span>
                          ))}
                        </div>
                        <span 
                          className="text-sm font-bold" 
                          style={{ 
                            textShadow: `1px 1px var(--color-text-shadow)` 
                          }}
                        >
                          {set.name}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
              </div>

              {/* Footer with Apply Button */}
              <div className="mt-6 pt-4 border-t-2 border-theme-border/40">
                <PixelButton
                  onClick={handleApply}
                  disabled={!hasChanges}
                  className="w-full py-3"
                >
                  <RefreshCw className="w-4 h-4 inline mr-2" />
                  Apply & Restart
                </PixelButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
