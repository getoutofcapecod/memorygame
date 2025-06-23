import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../src/hooks/usePrefersReducedMotion';

const PixelBox = ({ children, className, style, ...props }) => (
  <div 
    className={`relative p-0.5 sm:p-1 ${className}`} 
    style={{
      imageRendering: 'pixelated',
      ...style
    }}
    {...props}
  >
    {children}
  </div>
);

const Card = ({ card, isFlipped, isMatched, onClick, disabled }) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleClick = () => {
    if (!disabled && !isFlipped && !isMatched) {
      onClick(card.id);
    }
  };

  const cardVariants = {
    hover: {
      y: -2,
      transition: { type: 'spring', stiffness: 300 }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.button
      className="relative w-full aspect-square select-none bg-transparent border-none p-0 font-inherit cursor-pointer"
      onClick={handleClick}
      disabled={disabled || isFlipped || isMatched}
      variants={!disabled && !prefersReducedMotion ? cardVariants : {}}
      whileHover="hover"
      whileTap="tap"
      aria-label={isFlipped || isMatched ? `Card showing ${card.emoji}` : 'Hidden card'}
      aria-pressed={isFlipped || isMatched}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Card Back */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <PixelBox 
            className="w-full h-full flex items-center justify-center border-2 bg-theme-secondary border-theme-text-shadow shadow-card"
          >
             <span 
               className="font-pixel text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-theme-text" 
               style={{
                 textShadow: `2px 2px var(--color-secondary-shadow)`
               }}
             >
               ?
             </span>
          </PixelBox>
        </div>
        
        {/* Card Front */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          <PixelBox 
             className={`w-full h-full flex items-center justify-center border-2 border-theme-text-shadow ${isMatched ? 'bg-theme-accent shadow-card-matched' : 'bg-gray-100 shadow-card-front'}`}
          >
            <span 
              className={`flex items-center justify-center text-2xl xs:text-3xl sm:text-4xl md:text-5xl ${isMatched ? 'animate-pulse' : ''}`}
              style={{
                textShadow: isMatched ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none',
                transform: 'translateY(-20%)'
              }}
            >
              {card.emoji}
            </span>
          </PixelBox>
        </div>
      </motion.div>
    </motion.button>
  );
};

export default memo(Card);
