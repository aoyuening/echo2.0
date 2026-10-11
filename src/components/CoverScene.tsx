import React from 'react';
import { motion } from 'motion/react';
import coverBg from '../assets/images/enshi_cover_bg_1788855601526.jpg';

interface CoverSceneProps {
  onEnterStory: () => void;
  isTransitioning: boolean;
}

export const CoverScene: React.FC<CoverSceneProps> = ({
  onEnterStory,
  isTransitioning,
}) => {
  return (
    <div
      id="cover-scene"
      className="relative w-full h-full overflow-hidden bg-[#120f0d] flex items-center justify-center select-none"
    >
      {/* 16:9 Aspect Ratio Master Container */}
      <div className="relative w-full h-full max-w-[177.78vh] max-h-[56.25vw] aspect-[16/9] overflow-hidden shadow-2xl">
        {/* Storybook Cover Illustration Background */}
        <motion.div
          animate={
            isTransitioning
              ? { scale: 1.05, filter: 'blur(4px) brightness(0.25)' }
              : { scale: 1, filter: 'blur(0px) brightness(1)' }
          }
          transition={{ duration: 1.6, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src={coverBg}
            alt="恩施暮色山影"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter saturate-[0.88] contrast-[1.02]"
          />
        </motion.div>

        {/* Deep Evening Twilight Vignette & Storybook Paper Tint */}
        <div
          className="absolute inset-0 pointer-events-none z-1"
          style={{
            background:
              'radial-gradient(ellipse at 50% 48%, rgba(20, 16, 26, 0.2) 0%, rgba(14, 11, 18, 0.6) 65%, rgba(6, 5, 8, 0.88) 100%)',
          }}
        />

        {/* Subtle Drifting Mountain Mist in the Distance */}
        <motion.div
          animate={{
            x: ['-5%', '5%', '-5%'],
            opacity: [0.18, 0.32, 0.18],
          }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: 'easeInOut',
          }}
          className="absolute inset-x-0 bottom-[18%] h-[35%] pointer-events-none z-2"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(225, 235, 240, 0.15) 0%, rgba(190, 205, 215, 0.06) 50%, transparent 80%)',
            filter: 'blur(16px)',
          }}
        />

        {/* Vintage Paper Surface Grain & Framing Border */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay z-3"
          style={{
            backgroundImage:
              'radial-gradient(#d5b682 1px, transparent 1px), radial-gradient(#4a321c 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            backgroundPosition: '0 0, 14px 14px',
          }}
        />
        <div className="absolute inset-0 pointer-events-none border-[10px] sm:border-[16px] md:border-[20px] border-[#0e0b09]/75 z-4" />

        {/* Center Content: Pure, Quiet Storybook Cover Typography */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
          <div className="flex flex-col items-center max-w-xl mx-auto space-y-4 sm:space-y-6">
            {/* Title 《回声》 with delicate ink-breathing / faint aura */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="relative"
            >
              {/* Subtle ambient ink bloom glow */}
              <motion.div
                animate={{
                  opacity: [0.35, 0.65, 0.35],
                  scale: [0.98, 1.04, 0.98],
                }}
                transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full blur-xl pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(230, 205, 160, 0.22) 0%, transparent 70%)',
                }}
              />

              <h1
                id="cover-main-title"
                className="font-song text-5xl sm:text-6xl md:text-7xl font-semibold text-[#f8ebd3] tracking-[0.3em] pl-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
              >
                《回声》
              </h1>
            </motion.div>

            {/* Subtitle: 清江边的最后一封信 */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease: 'easeOut' }}
            >
              <h2
                id="cover-subtitle"
                className="font-song text-xl sm:text-2xl md:text-[26px] text-[#e0cfab] tracking-[0.26em] pl-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] font-light"
              >
                清江边的最后一封信
              </h2>
            </motion.div>

            {/* Small Narrative Tag: “一段被时间留下的故事。” */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.55, ease: 'easeOut' }}
              className="pt-1"
            >
              <p
                id="cover-tagline"
                className="font-handwriting text-sm sm:text-base md:text-lg text-[#b8a27d] tracking-[0.2em] drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] opacity-90"
              >
                “一段被时间留下的故事。”
              </p>
            </motion.div>

            {/* Center-Bottom Primary Button: 【进入故事】 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
              className="pt-8 sm:pt-10"
            >
              <button
                id="enter-story-button"
                onClick={onEnterStory}
                disabled={isTransitioning}
                className="group relative cursor-pointer px-10 py-3 bg-[#dbc593] hover:bg-[#e4cf9f] text-[#291b12] wood-tag-edge border border-[#a88950] shadow-[0_6px_25px_rgba(0,0,0,0.8)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                title="开启旧故事书，进入恩施老屋"
              >
                {/* Subtle aged paper / wood texture inside button */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 40% 30%, #fff0cf 0%, transparent 70%), radial-gradient(circle at 70% 80%, #a68444 0%, transparent 60%)',
                  }}
                />

                {/* Classical thin border inside */}
                <div className="absolute inset-[3px] border border-[#8b6f3b]/40 pointer-events-none" />

                {/* Button Content */}
                <div className="relative z-10 flex items-center space-x-2.5">
                  <span className="w-1.5 h-1.5 bg-[#9e2e1a] rounded-xs" />
                  <span className="font-song text-base sm:text-lg font-medium tracking-[0.3em] pl-1 text-[#24170e]">
                    进入故事
                  </span>
                  <span className="text-[#9e2e1a] text-sm group-hover:translate-x-1 transition-transform duration-200">
                    »
                  </span>
                </div>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Book Page-Turn & Fading Transition Overlay */}
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 1] }}
            transition={{ duration: 1.4, times: [0, 0.4, 1] }}
            className="absolute inset-0 bg-[#0e0b09] z-50 pointer-events-none flex items-center justify-center"
          >
            {/* Soft book turning visual cue */}
            <motion.div
              initial={{ scaleX: 1, opacity: 0 }}
              animate={{ scaleX: 0, opacity: [0, 0.4, 0] }}
              transition={{ duration: 1.3, ease: 'easeInOut' }}
              className="w-full h-full bg-[#1b1510] origin-left"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};
