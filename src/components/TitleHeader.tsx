import React from 'react';
import { motion } from 'motion/react';

export const TitleHeader: React.FC = () => {
  return (
    <div
      id="main-title-block"
      className="flex flex-col items-center justify-center text-center select-none"
    >
      {/* Title: 《回声》 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative mb-1"
      >
        <h1
          id="project-title"
          className="font-song text-4xl sm:text-5xl md:text-6xl font-semibold text-[#f4ebd9] tracking-[0.25em] pl-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
        >
          《回声》
        </h1>
      </motion.div>

      {/* Subtitle: 清江边的最后一封信 */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
        className="mb-2"
      >
        <h2
          id="project-subtitle"
          className="font-song text-lg sm:text-xl md:text-2xl text-[#dfcfad] tracking-[0.22em] pl-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] font-light"
        >
          清江边的最后一封信
        </h2>
      </motion.div>

      {/* Narrative Line: “一段被时间留下的记忆，等你听见。” */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
      >
        <p
          id="narrative-tagline"
          className="font-handwriting text-sm sm:text-base md:text-lg text-[#c5b290] tracking-widest drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] opacity-95"
        >
          “一段被时间留下的记忆，等你听见。”
        </p>
      </motion.div>
    </div>
  );
};
