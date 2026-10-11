import React, { useState } from 'react';
import { motion } from 'motion/react';

interface DeskLetterProps {
  onOpen: () => void;
  onHoverChange: (isHovered: boolean) => void;
  hasDiscovered: boolean;
}

export const DeskLetter: React.FC<DeskLetterProps> = ({
  onOpen,
  onHoverChange,
  hasDiscovered,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverStart = () => {
    setIsHovered(true);
    onHoverChange(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    onHoverChange(false);
  };

  return (
    <div
      id="cabin-item-letter"
      className="absolute bottom-[20%] sm:bottom-[21%] md:bottom-[23%] left-[34%] sm:left-[37%] md:left-[39%] z-20 pointer-events-auto"
    >
      <motion.div
        animate={{
          // When hovered, the letter edge gently lifts/tilts as requested
          y: isHovered ? -5 : 0,
          rotate: isHovered ? -3.5 : -2,
          scale: isHovered ? 1.04 : 1,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onClick={onOpen}
        className="relative cursor-pointer select-none group"
        style={{
          width: 'clamp(145px, 16vw, 195px)',
          aspectRatio: '1.4 / 1',
        }}
        title="桌上的旧信件"
      >
        {/* Subtle shadow on the wooden desk */}
        <div className="absolute inset-0 bg-[#140c08]/60 blur-[3px] translate-y-2 translate-x-1 -rotate-2 rounded-xs pointer-events-none" />

        {/* The Aged Folded Paper */}
        <div className="relative w-full h-full bg-[#ebd7ac] border border-[#bfa674] paper-edge-rough p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden shadow-sm">
          {/* Paper creasing and vintage spots */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
            style={{
              backgroundImage:
                'radial-gradient(circle at 75% 25%, #d4b478 0%, transparent 60%), radial-gradient(circle at 20% 80%, #b8985c 0%, transparent 65%)',
            }}
          />

          {/* Central fold line */}
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#9e8354]/30 pointer-events-none" />

          {/* Envelope Header Note */}
          <div className="flex items-center justify-between text-[#856c4c] text-[8px] sm:text-[9px] font-song opacity-80">
            <span className="tracking-widest">手书</span>
            {hasDiscovered && (
              <span className="text-[#a6301d] font-serif font-bold text-[8px]">● 已研读</span>
            )}
          </div>

          {/* Visible handwritten snippet on the desk letter */}
          <div className="text-center py-0.5">
            <p className="font-calligraphy text-[#2f1f14] text-[11px] sm:text-xs md:text-[13px] leading-snug tracking-wider">
              “沿着清江往下走…”
            </p>
          </div>

          {/* Bottom subtle edge */}
          <div className="flex items-center justify-between text-[7px] sm:text-[8px] text-[#917555] font-song border-t border-[#cbb082]/60 pt-0.5">
            <span>留字</span>
            <span>纸痕斑驳</span>
          </div>

          {/* Gentle edge flutter effect when hovered */}
          <motion.div
            animate={isHovered ? { rotate: [0, -1.5, 0] } : {}}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-bl from-[#fff2d4]/30 to-transparent pointer-events-none"
          />
        </div>

        {/* Faint interaction cue on hover */}
        {isHovered && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap z-30 pointer-events-none bg-[#241812]/90 text-[#ecdcb9] text-[11px] font-song px-2.5 py-0.5 rounded-sm border border-[#6b4e38]/70 shadow-md tracking-wider">
            桌上似乎有一封信。
          </div>
        )}
      </motion.div>
    </div>
  );
};
