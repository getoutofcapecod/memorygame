import React, { useContext, useEffect } from 'react';
import MemoryGame from '../pages/MemoryGame.jsx';
import { SettingsContext } from './context/SettingsContext.jsx';
import { COLOR_SCHEMES } from './config/gameConfig.js';
import ErrorBoundary from '../components/common/ErrorBoundary.jsx';

function AppContent() {
  const { colorScheme } = useContext(SettingsContext);

  useEffect(() => {
    const root = document.documentElement;
    const scheme = COLOR_SCHEMES[colorScheme] || COLOR_SCHEMES.classic;
    
    root.style.setProperty('--color-bg', scheme.bg);
    root.style.setProperty('--color-primary', scheme.primary);
    root.style.setProperty('--color-primary-shadow', scheme.primaryShadow);
    root.style.setProperty('--color-secondary', scheme.secondary);
    root.style.setProperty('--color-secondary-shadow', scheme.secondaryShadow);
    root.style.setProperty('--color-accent', scheme.accent);
    root.style.setProperty('--color-accent-shadow', scheme.accentShadow);
    root.style.setProperty('--color-button', scheme.button);
    root.style.setProperty('--color-button-shadow', scheme.buttonShadow);
    root.style.setProperty('--color-button-hover', scheme.buttonHover);
    root.style.setProperty('--color-text', scheme.text);
    root.style.setProperty('--color-text-shadow', scheme.textShadow);
    root.style.setProperty('--color-text-on-accent', scheme.textOnAccent);
    root.style.setProperty('--color-border', scheme.border);
  }, [colorScheme]);

  return (
    <div className="App">
      <MemoryGame />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary fallback={<div className="h-screen w-screen flex items-center justify-center bg-gray-800 text-white font-pixel">The game encountered an issue. Please refresh.</div>}>
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
