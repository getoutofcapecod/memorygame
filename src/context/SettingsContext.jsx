import React, { createContext, useState, useMemo } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState('classic');
  const [emojiSet, setEmojiSet] = useState('animals');

  const handleColorChange = (scheme) => {
    setColorScheme(scheme);
    document.documentElement.setAttribute('data-theme', scheme);
  };

  const handleEmojiChange = (set) => {
    setEmojiSet(set);
  };

  const value = useMemo(() => ({
    colorScheme,
    emojiSet,
    handleColorChange,
    handleEmojiChange,
  }), [colorScheme, emojiSet]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
