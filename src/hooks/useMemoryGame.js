import { useReducer, useCallback, useEffect, useContext, useMemo, useRef } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import { DIFFICULTY_LEVELS, EMOJI_SETS } from '../config/gameConfig';
import { playBeep } from '../utils/audio';

const initialState = {
  gameState: 'lobby', // 'lobby', 'initializing', 'playing', 'paused', 'won'
  cards: [],
  flippedCards: [],
  matchedPairs: [],
  moves: 0,
  timeElapsed: 0,
  showingCards: true,
  disabled: false,
  difficulty: 'medium',
  isSettingsOpen: false,
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE_GAME':
      return {
        ...state,
        cards: action.payload.cards,
        flippedCards: [],
        matchedPairs: [],
        moves: 0,
        timeElapsed: 0,
        showingCards: true,
        disabled: true,
        gameState: 'initializing',
      };
    case 'START_PLAYING':
      return {
        ...state,
        showingCards: false,
        disabled: false,
        gameState: 'playing',
      };
    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.payload };
    case 'FLIP_CARD':
      return {
        ...state,
        flippedCards: [...state.flippedCards, action.payload.cardId],
        disabled: state.flippedCards.length + 1 === 2
      };
    case 'INCREMENT_MOVES':
      return { ...state, moves: state.moves + 1 };
    case 'MATCH_FOUND':
      return {
        ...state,
        matchedPairs: [...state.matchedPairs, ...state.flippedCards],
        flippedCards: [],
        disabled: false,
      };
    case 'NO_MATCH':
      return { ...state, flippedCards: [], disabled: false };
    case 'TICK':
      return { ...state, timeElapsed: state.timeElapsed + 1 };
    case 'TOGGLE_SETTINGS':
      return { ...state, isSettingsOpen: !state.isSettingsOpen };
    case 'PAUSE_GAME':
      return { ...state, gameState: 'paused' };
    case 'RESUME_GAME':
      return { ...state, gameState: 'playing' };
    case 'WIN_GAME':
      return { ...state, gameState: 'won' };
    case 'GO_TO_LOBBY':
      return { ...initialState, difficulty: state.difficulty, isSettingsOpen: false };
    default:
      return state;
  }
}

/**
 * @typedef {'lobby' | 'initializing' | 'playing' | 'paused' | 'won'} GameState
 * @typedef {'easy' | 'medium' | 'hard'} Difficulty
 *
 * @typedef {Object} CardData
 * @property {number} id
 * @property {string} emoji
 * @property {boolean} isFlipped
 * @property {boolean} isMatched
 *
 * @typedef {Object} GameActions
 * @property {() => void} startGame - Starts a new game.
 * @property {() => void} goToLobby - Returns to the main menu/lobby.
 * @property {(level: Difficulty) => void} setDifficulty - Sets the game difficulty.
 * @property {(cardId: number) => void} handleCardClick - Handles the logic for a card click.
 * @property {() => void} toggleSettings - Toggles the settings modal.
 * @property {() => void} restartGame - Restarts the game with current settings.
 *
 * @typedef {Object} MemoryGameHook
 * @property {GameState} gameState - The current state of the game.
 * @property {CardData[]} cards - The array of cards for the current game.
 * @property {number} moves - The number of moves made in the current game.
 * @property {number} timeElapsed - The time elapsed in seconds.
 * @property {Difficulty} difficulty - The current difficulty level.
 * @property {boolean} isSettingsOpen - Whether the settings modal is open.
 * @property {number[]} flippedCards - An array of IDs of the currently flipped cards.
 * @property {number[]} matchedPairs - An array of IDs of the cards that have been matched.
 * @property {boolean} showingCards - True if cards are being shown at the start of the game.
 * @property {boolean} disabled - True if player input should be disabled.
 * @property {GameActions} actions - An object containing all the actions to interact with the game.
 * @property {object} currentDifficulty - The configuration object for the current difficulty.
 */

/**
 * Custom hook to manage the state and logic of the memory game.
 * @param {Difficulty} initialDifficulty - The initial difficulty level.
 * @param {string} initialEmojiSet - The initial emoji set.
 * @returns {MemoryGameHook}
 */
export function useMemoryGame(initialDifficulty = 'medium', initialEmojiSet = 'mixed') {
  const { emojiSet } = useContext(SettingsContext);
  const [state, dispatch] = useReducer(gameReducer, {
    ...initialState,
    difficulty: initialDifficulty,
  });
  const timerRef = useRef({
    init: null,
    match: null,
    win: [],
    tick: null,
  });

  const {
    gameState,
    cards,
    flippedCards,
    matchedPairs,
    moves,
    timeElapsed,
    showingCards,
    disabled,
    difficulty,
    isSettingsOpen,
  } = state;

  const currentDifficulty = DIFFICULTY_LEVELS[difficulty];
  const currentEmojiSet = EMOJI_SETS[emojiSet] || EMOJI_SETS[initialEmojiSet];

  const createCards = useCallback(() => {
    const { pairCount } = currentDifficulty;
    const selectedEmojis = currentEmojiSet.emojis.slice(0, pairCount);
    const cardPairs = [...selectedEmojis, ...selectedEmojis];
    const shuffled = cardPairs.sort(() => Math.random() - 0.5);
    return shuffled.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false
    }));
  }, [currentDifficulty, currentEmojiSet]);

  const cleanupTimers = useCallback(() => {
    if (timerRef.current.init) clearTimeout(timerRef.current.init);
    if (timerRef.current.match) clearTimeout(timerRef.current.match);
    if (timerRef.current.tick) clearInterval(timerRef.current.tick);
    timerRef.current.win.forEach(clearTimeout);
    timerRef.current = { init: null, match: null, win: [], tick: null };
  }, []);

  const initializeGame = useCallback(() => {
    cleanupTimers();
    const newCards = createCards();
    dispatch({ type: 'INITIALIZE_GAME', payload: { cards: newCards } });

    timerRef.current.init = setTimeout(() => {
      dispatch({ type: 'START_PLAYING' });
    }, 2000);
  }, [createCards, cleanupTimers]);

  const startGame = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  const goToLobby = useCallback(() => {
    cleanupTimers();
    dispatch({ type: 'GO_TO_LOBBY' });
  }, [cleanupTimers]);

  const setDifficulty = useCallback((level) => {
    dispatch({ type: 'SET_DIFFICULTY', payload: level });
  }, []);

  const handleCardClick = useCallback((cardId) => {
    if (disabled || flippedCards.length >= 2 || showingCards || gameState !== 'playing') return;
    
    playBeep(600, 150);
    dispatch({ type: 'FLIP_CARD', payload: { cardId } });
  }, [disabled, flippedCards.length, showingCards, gameState]);

  const toggleSettings = useCallback(() => {
    dispatch({ type: 'TOGGLE_SETTINGS' });
  }, []);

  useEffect(() => {
    if (isSettingsOpen && gameState === 'playing') {
      dispatch({ type: 'PAUSE_GAME' });
    } else if (!isSettingsOpen && gameState === 'paused') {
      dispatch({ type: 'RESUME_GAME' });
    }
  }, [isSettingsOpen, gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current.tick = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 1000);
    }
    return () => {
      if (timerRef.current.tick) clearInterval(timerRef.current.tick);
    };
  }, [gameState]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      dispatch({ type: 'INCREMENT_MOVES' });
      const [firstCardId, secondCardId] = flippedCards;
      const firstCard = cards[firstCardId];
      const secondCard = cards[secondCardId];

      timerRef.current.match = setTimeout(() => {
        if (firstCard.emoji === secondCard.emoji) {
          playBeep(800, 300);
          dispatch({ type: 'MATCH_FOUND' });
        } else {
          playBeep(200, 300);
          dispatch({ type: 'NO_MATCH' });
        }
      }, 800);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matchedPairs.length > 0 && matchedPairs.length === currentDifficulty.pairCount * 2 && gameState === 'playing') {
      dispatch({ type: 'WIN_GAME' });
      
      timerRef.current.win = [
        setTimeout(() => playBeep(523, 200), 0),
        setTimeout(() => playBeep(659, 200), 200),
        setTimeout(() => playBeep(784, 400), 400)
      ];
    }
  }, [matchedPairs.length, currentDifficulty.pairCount, gameState]);

  const restartGame = useCallback(() => {
    dispatch({ type: 'TOGGLE_SETTINGS' });
    cleanupTimers();
    initializeGame();
  }, [initializeGame, cleanupTimers]);

  const actions = useMemo(() => ({
    startGame,
    goToLobby,
    setDifficulty,
    handleCardClick,
    toggleSettings,
    restartGame,
  }), [startGame, goToLobby, setDifficulty, handleCardClick, toggleSettings, restartGame]);

  return {
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
  };
}
