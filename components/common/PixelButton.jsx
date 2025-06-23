import React from 'react';
import clsx from 'clsx';

export default function PixelButton({
  children,
  onClick,
  className = '',
  size = 'medium',
  disabled = false,
  ...props
}) {
  const sizeClasses = {
    small: 'px-2 py-1 text-[10px] sm:text-xs',
    medium: 'px-6 py-3 text-sm sm:text-base',
    large: 'px-8 py-4 text-base sm:text-lg'
  };

  const shadowClass = size === 'small' ? 'shadow-pixel-sm' : 'shadow-pixel-md';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'font-pixel',
        sizeClasses[size],
        'font-bold',
        'transition-all duration-200 border-2 rounded',
        'bg-theme-button text-theme-text border-theme-text-shadow',
        {
          'opacity-50 cursor-not-allowed': disabled,
          'hover:bg-theme-button-hover': !disabled
        },
        shadowClass,
        className
      )}
      style={{
        textShadow: `1px 1px var(--color-text-shadow)`
      }}
      {...props}
    >
      {children}
    </button>
  );
}
