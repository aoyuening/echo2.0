import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import letterPaperBg from '../assets/images/vintage_letter_texture_1788855040945.jpg';

interface BookPageTurnTransitionProps {
  isActive: boolean;
  chapterTitle: string;
  chapterSubtitle?: string;
}

export const BookPageTurnTransition: React.FC<BookPageTurnTransitionProps> = ({
  isActive,
  chapterTitle,
  chapterSubtitle = '“一段被时间留下的故事。”',
}) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          id="book-page-turn-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-50 overflow-hidden pointer-events-none flex items-center justify-center select-none"
        >
          {/* Base darkening backdrop */}
          <div className="absolute inset-0 bg-[#0d0a07]/80 backdrop-blur-[1px]" />

          {/* Book Page Sheet Turning: Sweeping across from right like turning a picture book page */}
          <motion.div
            initial={{ x: '100%', rotate: 1 }}
            animate={{ x: '0%', rotate: 0 }}
            exit={{ x: '-100%', rotate: -1 }}
            transition={{
              duration: 1.4,
              ease: [0.25, 0.1, 0.25, 1.0],
            }}
            className="absolute inset-0 flex items-center justify-center overflow-hidden shadow-2xl"
            style={{
              backgroundImage: `url(${letterPaperBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Old Rice Paper Tint & Texture */}
            <div className="absolute inset-0 bg-[#f4ecd8]/90 mix-blend-multiply" />

            {/* Page Spine Fold Shadow on left edge */}
            <div
              className="absolute inset-y-0 left-0 w-24 sm:w-36 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, rgba(30, 20, 14, 0.4) 0%, rgba(30, 20, 14, 0.15) 30%, transparent 100%)',
              }}
            />

            {/* Delicate Page Curl Shadow along right turning edge */}
            <div
              className="absolute inset-y-0 right-0 w-16 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to left, rgba(30, 20, 14, 0.25) 0%, transparent 100%)',
              }}
            />

            {/* Book Border Frame */}
            <div className="absolute inset-4 sm:inset-8 border border-[#967752]/35 pointer-events-none" />

            {/* Center Storybook Typography */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative z-10 text-center space-y-3 px-6 max-w-lg"
            >
              {/* Seal Mark */}
              <div className="mx-auto w-7 h-7 rounded-xs border border-[#8a3320] flex items-center justify-center text-[#8a3320] text-[10px] font-song mb-1">
                回声
              </div>

              <h2 className="font-song text-2xl sm:text-3xl text-[#2c1d14] tracking-[0.3em] font-semibold">
                {chapterTitle}
              </h2>

              <p className="font-song text-xs sm:text-sm text-[#70523a] tracking-[0.25em]">
                {chapterSubtitle}
              </p>

              <div className="w-12 h-px bg-[#8a3320]/40 mx-auto mt-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
