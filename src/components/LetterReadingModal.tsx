import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, X } from 'lucide-react';

interface LetterReadingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LetterReadingModal: React.FC<LetterReadingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [hasContinued, setHasContinued] = useState(false);

  const handleContinue = () => {
    setHasContinued(true);
  };

  const handleReset = () => {
    setHasContinued(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="letter-reading-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
        >
          {/* Gentle dimming background with subtle warm vignette */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0d0a08]/85 backdrop-blur-[4px] cursor-pointer"
          />

          {/* Unfolding Letter Container */}
          <motion.div
            id="unfolded-letter-stage"
            initial={{ scale: 0.35, y: 120, rotate: -4, opacity: 0 }}
            animate={{ scale: 1, y: 0, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.4, y: 80, opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 24,
              stiffness: 140,
              duration: 0.65,
            }}
            className="relative z-10 w-full max-w-2xl bg-[#ebd9b2] border-2 border-[#b59963] paper-edge-rough shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85)] p-6 sm:p-10 md:p-14 overflow-hidden"
          >
            {/* Vintage Aged Paper Texture Background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-50 mix-blend-multiply"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 10% 20%, #d8be87 0%, transparent 50%), radial-gradient(circle at 90% 80%, #be9f65 0%, transparent 60%)',
              }}
            />

            {/* Fold Creases from being folded on the table */}
            <div className="absolute inset-x-0 top-1/3 h-[1px] bg-[#a88a59]/30 pointer-events-none" />
            <div className="absolute inset-x-0 top-2/3 h-[1px] bg-[#a88a59]/30 pointer-events-none" />
            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-[#a88a59]/25 pointer-events-none" />

            {/* Close / Fold Back Icon in top right */}
            <button
              id="fold-back-button"
              onClick={onClose}
              className="absolute top-4 right-5 text-[#735841] hover:text-[#2d1d13] p-1.5 transition-colors cursor-pointer flex items-center space-x-1 text-xs font-song"
              title="将信纸折叠放回案上"
            >
              <span>折叠放回</span>
              <X className="w-4 h-4" />
            </button>

            {/* Antique Seal Stamp */}
            <div className="absolute top-6 left-6 opacity-80 pointer-events-none">
              <div className="w-12 h-12 border-2 border-[#a6301d] rounded flex flex-col items-center justify-center rotate-[-8deg] p-1">
                <span className="text-[10px] text-[#912514] font-song font-bold leading-none">清江</span>
                <span className="text-[8px] text-[#912514] font-song mt-0.5 leading-none">密存</span>
              </div>
            </div>

            {!hasContinued ? (
              /* Reading State Content */
              <div className="relative z-10 flex flex-col items-center text-center space-y-6 sm:space-y-8 my-4">
                {/* Header Tag */}
                <div className="inline-block border-b border-[#a88a59]/50 pb-1">
                  <span className="text-xs sm:text-sm font-song text-[#75593f] tracking-[0.3em]">
                    — 寄往时间的未拆之信 —
                  </span>
                </div>

                {/* The main text as explicitly requested by user */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.6 }}
                  className="max-w-lg mx-auto py-2"
                >
                  <p className="font-calligraphy text-[#24170e] text-xl sm:text-2xl md:text-[27px] leading-[2.1] tracking-wider select-none text-balance">
                    如果你找到了这封信，
                    <br />
                    说明我已经没办法亲自走完这段路了。
                  </p>
                  <div className="my-5 w-16 h-[1px] bg-[#9c7d4d]/40 mx-auto" />
                  <p className="font-calligraphy text-[#24170e] text-xl sm:text-2xl md:text-[27px] leading-[2.1] tracking-wider select-none text-balance">
                    沿着清江往下走。
                    <br />
                    你会找到答案。
                  </p>
                </motion.div>

                {/* Faint signature at bottom right */}
                <div className="w-full text-right pr-4 sm:pr-8">
                  <p className="font-handwriting text-sm sm:text-base text-[#694e36] tracking-widest">
                    山中故人 · 留于暮色
                  </p>
                </div>

                {/* The required 【继续】 button styled with vintage paper/wood tag aesthetics */}
                <div className="pt-3">
                  <button
                    id="continue-button"
                    onClick={handleContinue}
                    className="group relative cursor-pointer px-8 py-2.5 bg-[#422c1e] hover:bg-[#342216] text-[#e8dcbe] hover:text-[#fff4dc] transition-all duration-300 wood-tag-edge shadow-md flex items-center space-x-2.5"
                  >
                    {/* Subtle warm wood grain inner border */}
                    <div className="absolute inset-[2px] border border-[#785437]/60 pointer-events-none" />
                    <span className="relative z-10 font-song text-base sm:text-lg tracking-[0.25em] font-medium pl-1">
                      继续
                    </span>
                    <span className="relative z-10 text-[#d49b42] group-hover:translate-x-1 transition-transform duration-200">
                      →
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              /* Story Transition State (respecting "currently only make homepage, no maps/games") */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 flex flex-col items-center text-center space-y-6 my-6"
              >
                <div className="w-10 h-10 rounded-full bg-[#523b2b]/15 border border-[#8f6d4d] flex items-center justify-center text-[#992d1c]">
                  <Sparkles className="w-5 h-5 text-[#b83b26]" />
                </div>

                <div className="space-y-3">
                  <h3 className="font-song text-xl sm:text-2xl font-bold text-[#2b1b11] tracking-widest">
                    序幕已开启 · 记忆的回声
                  </h3>
                  <p className="font-song text-sm sm:text-base text-[#5c4633] leading-relaxed max-w-md mx-auto">
                    清江的水声在窗外隐约泛起，
                    <br />
                    泛黄的信纸已被展开，一段属于恩施山水的往事正在苏醒。
                  </p>
                  <p className="font-song text-xs text-[#8f745d] tracking-widest pt-2">
                    （第一幕：恩施清江渡口 · 即将展开）
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="cursor-pointer px-6 py-2 bg-[#d6be90] hover:bg-[#c9b080] text-[#362316] font-song text-sm tracking-wider border border-[#9c7d4d] wood-tag-edge transition-colors flex items-center space-x-1.5 shadow-sm"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>放回信件 · 重温旧案</span>
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
