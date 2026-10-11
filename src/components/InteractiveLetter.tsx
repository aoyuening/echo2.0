import React from 'react';
import { motion } from 'motion/react';

interface InteractiveLetterProps {
  onOpen: () => void;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
  isReading: boolean;
}

export const InteractiveLetter: React.FC<InteractiveLetterProps> = ({
  onOpen,
  isHovered,
  setIsHovered,
  isReading,
}) => {
  if (isReading) return null;

  return (
    <div
      id="letter-desk-wrapper"
      className="absolute bottom-[23%] sm:bottom-[24%] md:bottom-[25%] left-[20%] sm:left-[22%] md:left-[24%] z-20"
    >
      <motion.div
        id="interactive-letter-card"
        // Subtle vertical floating idle animation as required
        animate={{
          y: isHovered ? -8 : [0, -5, 0],
          rotate: isHovered ? -1 : [-2, -2.5, -2],
          scale: isHovered ? 1.04 : 1,
        }}
        transition={
          isHovered
            ? { duration: 0.28, ease: 'easeOut' }
            : { repeat: Infinity, duration: 3.8, ease: 'easeInOut' }
        }
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onOpen}
        className={`relative cursor-pointer transition-shadow duration-300 ${
          isHovered ? 'shadow-paper-hover' : 'shadow-paper'
        }`}
        style={{
          width: 'clamp(210px, 24vw, 290px)',
          aspectRatio: '1.38 / 1',
        }}
        title="点击阅读这封泛黄的信"
      >
        {/* Paper Container with rough vintage edges and warm aged paper coloring */}
        <div className="relative w-full h-full bg-[#ebd9b2] border border-[#c4ab7a] paper-edge-rough p-4 sm:p-5 flex flex-col justify-between overflow-hidden">
          {/* Subtle Paper Grain & Discoloration Gradients */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
            style={{
              backgroundImage:
                'radial-gradient(ellipse at 80% 20%, #d8be87 0%, transparent 60%), radial-gradient(ellipse at 15% 85%, #be9f65 0%, transparent 70%)',
            }}
          />

          {/* Paper Fold / Crease Lines */}
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#ba9e70]/40 -translate-y-1/2 pointer-events-none" />
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#fff6e0]/60 -translate-y-[calc(50%-1px)] pointer-events-none" />
          <div className="absolute inset-y-0 left-1/3 w-[1px] bg-[#ba9e70]/30 pointer-events-none" />

          {/* Gentle warm highlight aura when hovered */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-tr from-[#f5ba58]/25 via-transparent to-[#f3c267]/20 pointer-events-none"
            />
          )}

          {/* Antique postmark / stamp trace */}
          <div className="absolute top-2 right-3 pointer-events-none opacity-70">
            <div className="w-8 h-8 sm:w-9 sm:h-9 border border-[#b83b26]/70 rounded-full flex flex-col items-center justify-center rotate-12 p-0.5">
              <span className="text-[7px] text-[#992d1c] font-song leading-none">恩施</span>
              <span className="text-[6px] text-[#992d1c] font-song scale-75 mt-0.5">清江</span>
            </div>
          </div>

          {/* Faint envelope fold stamp / seal */}
          <div className="flex items-center justify-between text-[#856b4f] text-[10px] sm:text-[11px] font-song opacity-75">
            <span className="tracking-widest">【手书】</span>
            <span className="text-[9px] font-mono tracking-wider opacity-60">No. 1989-QJ</span>
          </div>

          {/* The key handwritten sentence on the letter */}
          <div className="my-auto py-1 text-center">
            <p className="font-calligraphy text-[#2d1d13] text-base sm:text-lg md:text-[19px] leading-relaxed tracking-wider drop-shadow-sm select-none">
              “如果你还能听见，
              <br />
              请沿着清江往下走。”
            </p>
          </div>

          {/* Letter Bottom subtle note */}
          <div className="flex items-end justify-between text-[10px] text-[#826a4e] font-song pt-1 border-t border-[#d8be8d]/50">
            <span className="tracking-widest opacity-80">字迹犹湿</span>
            <span className="text-[9px] text-[#a0825e] flex items-center space-x-1">
              <span>轻启</span>
              <span className="text-[#b83b26]">◆</span>
            </span>
          </div>
        </div>

        {/* Floating whisper tooltip next to the letter: “它好像还在等人读完……” */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : [0.75, 1, 0.75],
            y: isHovered ? -6 : [0, -3, 0],
          }}
          transition={{ repeat: isHovered ? 0 : Infinity, duration: 2.8, ease: 'easeInOut' }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap z-30"
        >
          <div className="relative bg-[#251b14]/90 text-[#e8dcbe] text-[11px] sm:text-[12px] font-song px-3 py-1 rounded-sm border border-[#7a593e]/70 shadow-md flex items-center space-x-1.5 backdrop-blur-[2px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5ba58] animate-ping" />
            <span>它好像还在等人读完……</span>
            {/* Little pointer beak */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#251b14] border-b border-r border-[#7a593e]/70 rotate-45" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
