import React from 'react';
import { motion } from 'motion/react';

interface OpenLetterButtonProps {
  onClick: () => void;
  isLetterHovered?: boolean;
}

export const OpenLetterButton: React.FC<OpenLetterButtonProps> = ({
  onClick,
  isLetterHovered = false,
}) => {
  return (
    <div id="open-letter-button-wrapper" className="relative flex items-center justify-center">
      {/* Handcrafted Old Paper / Wood Plaque Button */}
      <motion.button
        id="open-letter-main-button"
        onClick={onClick}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        animate={{
          boxShadow: isLetterHovered
            ? '0 6px 25px rgba(245, 186, 88, 0.45)'
            : '0 4px 18px rgba(15, 10, 7, 0.65)',
        }}
        className="group relative cursor-pointer px-9 py-3 bg-[#e4cf9f] text-[#2c1d13] wood-tag-edge border border-[#b29158] transition-all duration-300 select-none"
        title="展开并阅读信件"
      >
        {/* Subtle aged paper / wood texture inside */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 50% 30%, #f6e6c4 0%, transparent 80%), radial-gradient(circle at 10% 90%, #b89758 0%, transparent 50%)',
          }}
        />

        {/* Vintage double thread border */}
        <div className="absolute inset-[3px] border border-[#9b7a46]/50 pointer-events-none" />

        {/* Tiny Red Vermilion Seal Mark on the left of the button */}
        <div className="relative z-10 flex items-center space-x-2.5 whitespace-nowrap">
          <div className="w-4 h-4 bg-[#a6301d] rounded-xs flex items-center justify-center text-[9px] font-song text-[#f9ebd0] leading-none shadow-xs">
            启
          </div>
          <span className="font-song text-base sm:text-lg font-semibold tracking-[0.25em] pl-1">
            打开信件
          </span>
          <span className="text-[#a6301d] font-serif text-sm transition-transform duration-200 group-hover:translate-x-0.5">
            »
          </span>
        </div>

        {/* Hanging rope stitch or decorative pin accent */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-1 bg-[#61442d] rounded-full opacity-60" />
      </motion.button>
    </div>
  );
};
