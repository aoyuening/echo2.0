import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface RoomLampProps {
  isLit: boolean;
  onToggleLit: () => void;
  onHoverChange: (isHovered: boolean) => void;
}

export const RoomLamp: React.FC<RoomLampProps> = ({
  isLit,
  onToggleLit,
  onHoverChange,
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
      id="cabin-item-lamp"
      className="absolute top-[38%] sm:top-[39%] right-[32%] sm:right-[34%] md:right-[36%] z-20 pointer-events-auto"
    >
      {/* Wall Carving Illuminated by the Lamp when Lit */}
      <AnimatePresence>
        {isLit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="absolute -top-16 -left-12 w-36 h-28 pointer-events-none rounded-full flex flex-col items-center justify-center text-center p-2"
            style={{
              background:
                'radial-gradient(circle at 45% 55%, rgba(255, 215, 128, 0.45) 0%, rgba(220, 150, 60, 0.18) 55%, transparent 80%)',
            }}
          >
            {/* The ancient notch/carving on the wood wall */}
            <div className="relative">
              <svg viewBox="0 0 32 32" className="w-6 h-6 text-[#4a2e16] opacity-80 rotate-[-12deg]">
                <path
                  d="M6,16 L26,16 M16,6 L16,26 M10,10 L22,22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="font-handwriting text-[9px] text-[#4d3319] tracking-wider mt-1 drop-shadow-sm font-semibold">
              木痕 · 1989
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          y: isHovered ? -2 : 0,
        }}
        transition={{ duration: 0.2 }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onClick={onToggleLit}
        className="relative cursor-pointer select-none group"
        title="几案上的暖黄色小灯"
      >
        {/* Warm Ambient Halo spreading around the lamp - brightens when clicked */}
        <motion.div
          animate={
            isLit
              ? {
                  scale: [1.2, 1.35, 1.2],
                  opacity: [0.75, 0.92, 0.75],
                }
              : isHovered
              ? {
                  scale: [1.05, 1.18, 1.05],
                  opacity: [0.55, 0.75, 0.55],
                }
              : {
                  scale: [1, 1.06, 1],
                  opacity: [0.38, 0.48, 0.38],
                }
          }
          transition={{
            repeat: Infinity,
            duration: isHovered ? 1.4 : isLit ? 2.5 : 3.5,
            ease: 'easeInOut',
          }}
          className="absolute -inset-10 sm:-inset-14 md:-inset-16 rounded-full pointer-events-none"
          style={{
            background: isLit
              ? 'radial-gradient(circle, rgba(255, 205, 110, 0.55) 0%, rgba(230, 150, 60, 0.25) 50%, transparent 80%)'
              : 'radial-gradient(circle, rgba(245, 186, 88, 0.4) 0%, rgba(214, 138, 48, 0.18) 45%, transparent 75%)',
          }}
        />

        {/* The Lamp structure */}
        <div className="relative flex flex-col items-center w-8 sm:w-10">
          {/* Flame - flickers gently on hover / brightens when lit */}
          <div className="relative w-2.5 h-4 mb-0.5">
            <motion.div
              animate={
                isLit
                  ? {
                      scale: [1.2, 1.4, 1.1, 1.35, 1.2],
                      opacity: [0.95, 1, 0.9, 1, 0.95],
                    }
                  : isHovered
                  ? {
                      scale: [1, 1.25, 0.9, 1.2, 1],
                      x: [0, -1, 1, 0],
                      opacity: [0.85, 1, 0.8, 1, 0.85],
                    }
                  : {
                      scale: [1, 1.08, 0.96, 1],
                      opacity: [0.8, 0.95, 0.8],
                    }
              }
              transition={{ repeat: Infinity, duration: isLit ? 1.8 : isHovered ? 1 : 2.2 }}
              className="absolute inset-0 bg-[#ffea9f] rounded-full blur-[1px] shadow-[0_0_10px_#f5ba58]"
            />
            <div className="absolute inset-[1px] bg-[#fffdf5] rounded-full" />
          </div>

          {/* Glass Chimney */}
          <div
            className={`w-4 sm:w-5 h-8 sm:h-9 border border-[#e8c078]/40 rounded-t-full shadow-inner transition-colors duration-500 ${
              isLit
                ? 'bg-gradient-to-b from-[#f5ba58]/35 via-[#f0aa40]/45 to-[#8c5e2d]/60'
                : 'bg-gradient-to-b from-[#f5ba58]/20 via-[#d49b42]/30 to-[#8c5e2d]/60'
            }`}
          />

          {/* Brass/Iron base */}
          <div className="w-6 sm:w-7 h-4 bg-[#3a281e] border-t border-[#b58348] rounded-b-xs shadow-md" />
        </div>

        {/* Hover Cue */}
        {isHovered && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap z-30 pointer-events-none bg-[#241812]/90 text-[#ecdcb9] text-[11px] font-song px-2.5 py-0.5 rounded-sm border border-[#6b4e38]/70 shadow-md tracking-wider">
            几旁的小油灯。
          </div>
        )}
      </motion.div>
    </div>
  );
};
