export const DIFFICULTY_LEVELS = {
  easy: { level: 'easy', rows: 3, cols: 4, pairCount: 6 },
  medium: { level: 'medium', rows: 4, cols: 4, pairCount: 8 },
  hard: { level: 'hard', rows: 4, cols: 5, pairCount: 10 },
};

export const PERFORMANCE_RATINGS = [
  { threshold: { moves: 10, time: 30 }, rating: "LEGENDARY!", color: "var(--color-accent)" },
  { threshold: { moves: 15, time: 45 }, rating: "Incredible!", color: "var(--color-primary)" },
  { threshold: { moves: 20, time: 60 }, rating: "Great!", color: "var(--color-button)" },
  { threshold: { moves: Infinity, time: Infinity }, rating: "Good Job!", color: "var(--color-secondary)" },
];

export const EMOJI_SETS = {
  mixed: {
    name: 'Mixed Fun',
    emojis: ['🎨', '🎭', '🎪', '🎯', '🎲', '🎸', '🎺', '🎷', '🍎', '🍌', '🍓', '🍊', '🍇', '🍑', '🍒', '🥝', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '⭐', '🌟', '✨', '💫', '🌙', '☀️', '🌈', '⚡'],
    preview: ['🎨', '🍎', '🐶', '⭐']
  },
  food: {
    name: 'Food Paradise',
    emojis: ['🍕', '🍔', '🍟', '🌭', '🥪', '🌮', '🌯', '🥙', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🍤', '🍰', '🧁', '🍪', '🍩', '🍎', '🍌', '🍓', '🥝', '🍇', '🍊', '🥭', '🍑', '🍒', '🥥', '🥑', '🍅'],
    preview: ['🍕', '🍔', '🍰', '🍎']
  },
  animals: {
    name: 'Animal Kingdom',
    emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐸', '🐷', '🐵', '🐺', '🦝', '🦔', '🐧', '🐦', '🦅', '🦆', '🐥', '🐛', '🦋', '🐌', '🐞', '🐢', '🦎', '🐍', '🐙', '🐠', '🐟'],
    preview: ['🐶', '🐱', '🐰', '🐧']
  },
  space: {
    name: 'Space Adventure',
    emojis: ['🚀', '🛸', '🌍', '🌎', '🌏', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '⭐', '🌟', '✨', '💫', '☄️', '🌌', '🔭', '🛰️', '👽', '🤖', '⚡', '💎', '🔮', '🌈', '☀️', '🪐', '🌙', '💥', '🔥'],
    preview: ['🚀', '🌍', '⭐', '👽']
  },
  art: {
    name: 'Art Studio',
    emojis: ['🎨', '🖌️', '🖍️', '✏️', '🖊️', '🖋️', '✒️', '🖇️', '📎', '📌', '📍', '🎭', '🎪', '🎨', '🎯', '🎲', '🎸', '🎺', '🎷', '🥁', '🎹', '🎤', '🎧', '📷', '📸', '🎬', '🎞️', '📚', '📖', '📝', '📄', '📃'],
    preview: ['🎨', '🖌️', '🎭', '🎸']
  },
  sports: {
    name: 'Sports Arena',
    emojis: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸', '🥅', '⛳', '🏹', '🎣', '🥊', '🥋', '🎽', '🛹', '🛷', '⛷️', '🏂', '🏄', '🚴', '🤸', '🏃', '🏊', '🧗', '🤺', '🏇', '⛹️', '🏋️', '🤾'],
    preview: ['⚽', '🏀', '🎾', '🏓']
  }
};

export const COLOR_SCHEMES = {
  classic: {
    name: 'Classic Arcade',
    bg: '#1a1536',
    primary: '#ff7a51',
    primaryShadow: '#b35639',
    secondary: '#2d5a6b',
    secondaryShadow: '#1a3640',
    accent: '#ffd700',
    accentShadow: '#b8960a',
    button: '#5c4fb8',
    buttonShadow: '#3d3577',
    buttonHover: '#7066d4',
    text: '#ffffff',
    textShadow: '#000000',
    textOnAccent: '#1a1536',
    border: '#ffffff'
  },
  neon: {
    name: 'Neon Cyber',
    bg: '#0a0a1a',
    primary: '#ff1493',
    primaryShadow: '#990d5a',
    secondary: '#1a4d5c',
    secondaryShadow: '#0d2630',
    accent: '#00ff41',
    accentShadow: '#00cc33',
    button: '#8a2be2',
    buttonShadow: '#5a1c94',
    buttonHover: '#9932cc',
    text: '#ffffff',
    textShadow: '#000000',
    textOnAccent: '#000000',
    border: '#ffffff'
  },
  forest: {
    name: 'Forest Retro',
    bg: '#2a1f1a',
    primary: '#8b5a2b',
    primaryShadow: '#5c3c1c',
    secondary: '#2d5a2d',
    secondaryShadow: '#1c3b1c',
    accent: '#ffd700',
    accentShadow: '#ccaa00',
    button: '#654321',
    buttonShadow: '#4a2f18',
    buttonHover: '#7d5436',
    text: '#f0e6d2',
    textShadow: '#2a1f1a',
    textOnAccent: '#5c3c1c',
    border: '#f0e6d2'
  },
  ocean: {
    name: 'Ocean Deep',
    bg: '#0d1b2a',
    primary: '#1b8a8f',
    primaryShadow: '#135e63',
    secondary: '#2d4a5c',
    secondaryShadow: '#1a2e38',
    accent: '#ff8c42',
    accentShadow: '#cc5500',
    button: '#4a5c8a',
    buttonShadow: '#2e3a5c',
    buttonHover: '#5c70a3',
    text: '#e8f4f8',
    textShadow: '#0d1b2a',
    textOnAccent: '#0d1b2a',
    border: '#e8f4f8'
  },
  sunset: {
    name: 'Sunset Vibes',
    bg: '#2e1a2e',
    primary: '#d2553d',
    primaryShadow: '#99402d',
    secondary: '#5a3d8a',
    secondaryShadow: '#3d2a5c',
    accent: '#ffb366',
    accentShadow: '#cc8533',
    button: '#8a5a3d',
    buttonShadow: '#5c3d2a',
    buttonHover: '#a36d4a',
    text: '#f5e6d3',
    textShadow: '#2e1a2e',
    textOnAccent: '#5c3d2a',
    border: '#f5e6d3'
  }
};
