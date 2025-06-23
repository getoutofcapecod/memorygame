# Memory Match - Retro Game 🎮

A beautifully crafted retro-styled memory matching game built with React, Framer Motion, and Tailwind CSS. Features multiple color themes, emoji sets, smooth animations, and retro sound effects.

## 🎯 Features

- **5 Color Themes**: Classic Arcade, Neon Cyber, Forest Retro, Ocean Deep, Sunset Vibes
- **6 Emoji Sets**: Mixed Fun, Food Paradise, Animal Kingdom, Space Adventure, Art Studio, Sports Arena
- **Retro Sound Effects**: Generated using Web Audio API
- **Smooth Animations**: Powered by Framer Motion
- **Responsive Design**: Perfect mobile experience
- **User Preferences**: Automatically saves theme choices
- **Performance Tracking**: Moves counter, timer, and performance ratings
- **3D Card Flips**: Beautiful card flip animations

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Navigate to the project directory:
   ```bash
   cd memory-game
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000`

## 🎮 How to Play

1. **Setup Phase**: All cards are shown face-up for 2 seconds - memorize them!
2. **Game Phase**: Cards flip face-down and shuffle. Click to find matching pairs.
3. **Victory**: Complete all pairs to win and see your performance rating!

### Performance Ratings

- **LEGENDARY!** - ≤10 moves in ≤30 seconds
- **EXCELLENT!** - ≤12 moves in ≤45 seconds  
- **GREAT!** - ≤15 moves in ≤60 seconds
- **GOOD!** - ≤20 moves in ≤90 seconds
- **COMPLETED!** - Any completion

## 🎨 Customization

### Color Themes

- **Classic Arcade**: Traditional retro gaming colors
- **Neon Cyber**: Bright cyberpunk aesthetics
- **Forest Retro**: Earth tones with retro flair
- **Ocean Deep**: Cool blues and aquatic vibes
- **Sunset Vibes**: Warm oranges and purples

### Emoji Sets

- **Mixed Fun**: Variety of fun emojis
- **Food Paradise**: Delicious food items
- **Animal Kingdom**: Cute animals
- **Space Adventure**: Cosmic exploration
- **Art Studio**: Creative and artistic items
- **Sports Arena**: Athletic and sports themes

## 🛠️ Technical Stack

- **React 18** - Modern React with hooks
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **react-confetti** - Performant confetti animation
- **Vite** - Fast build tool and dev server
- **Web Audio API** - Retro sound generation

## 📱 Mobile Optimized

The game is fully responsive and optimized for mobile devices:
- Touch-friendly card interactions
- Responsive typography and spacing
- Optimized for various screen sizes
- No horizontal scrolling required

## 🔧 Build Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
memory-game/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── components/
│   │   ├── common/
│   │   │   └── PixelButton.jsx
│   │   └── memory/
│   │       ├── Card.jsx
│   │       ├── GameSettings.jsx
│   │       ├── GameStats.jsx
│   │       └── WinCelebration.jsx
│   ├── config/
│   │   └── gameConfig.js
│   ├── context/
│   │   └── SettingsContext.jsx
│   ├── hooks/
│   │   └── useMemoryGame.js
│   └── utils/
│       ├── audio.js
│       └── time.js
├── pages/
│   └── MemoryGame.jsx
└── schemas/
    ├── GameSession.js
    └── User.js
```

## 🎵 Sound Effects

The game generates retro-style sound effects using the Web Audio API:
- Card flip sounds
- Match success tones
- Error feedback
- Victory fanfare

## 🏆 Game Statistics

The game tracks and saves:
- Number of moves
- Time elapsed
- Difficulty level
- Completion status
- Theme preferences

## 🎯 Future Enhancements

- Multiple difficulty levels (3x3, 5x5, 6x6 grids)
- Multiplayer mode
- Leaderboards
- More themes and emoji sets
- Achievement system

## 📄 License

MIT License - feel free to use this project for learning or personal use.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new themes or emoji sets
- Improve animations
- Add new features
- Fix bugs
- Improve documentation

---

**Enjoy the game!** 🎮✨
"# memorygame" 
