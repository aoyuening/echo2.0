import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { ambientSound } from '../../utils/ambientAudio';

interface SecondLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFoldAndCollect: () => void;
}

export const SecondLetterModal: React.FC<SecondLetterModalProps> = ({
  isOpen,
  onClose,
  onFoldAndCollect,
}) => {
  // Reveal lines 1 to 6
  const [revealedLines, setRevealedLines] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) {
      setRevealedLines(0);
      return;
    }

    // Line 1 after 600ms
    const t1 = setTimeout(() => setRevealedLines(1), 700);
    // Line 2 after 2000ms
    const t2 = setTimeout(() => setRevealedLines(2), 2200);
    // Line 3 after 3500ms
    const t3 = setTimeout(() => setRevealedLines(3), 3700);
    // 1-second pause -> Line 4 after 5200ms
    const t4 = setTimeout(() => setRevealedLines(4), 5200);
    // Line 5 after 6800ms
    const t5 = setTimeout(() => setRevealedLines(5), 6800);
    // Line 6 after 8500ms
    const t6 = setTimeout(() => setRevealedLines(6), 8500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFinish = () => {
    onFoldAndCollect();
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        id="second-letter-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      >
        {/* Soft dark blurred backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#080605]/88 backdrop-blur-[4px] pointer-events-none"
        />

        {/* Vintage Paper Storybook Unfolded Letter */}
        <motion.div
          initial={{ scale: 0.82, opacity: 0, y: 35 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.82, opacity: 0, y: 25 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-lg bg-[#faedd3] border-2 border-[#b89560] paper-edge-rough shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-7 sm:p-10 overflow-hidden select-none"
        >
          {/* Subtle aged paper creases & fiber texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-35 mix-blend-multiply"
            style={{
              backgroundImage:
                'radial-gradient(circle at 15% 15%, #cbb185 0%, transparent 55%), radial-gradient(circle at 85% 85%, #baa074 0%, transparent 60%)',
            }}
          />

          {/* Central fold lines simulating real folded letter */}
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#bf9d68]/40 pointer-events-none shadow-sm" />
          <div className="absolute inset-y-0 left-1/2 w-[1px] bg-[#bf9d68]/30 pointer-events-none shadow-sm" />

          {/* Letter Content */}
          <div className="relative z-10 flex flex-col items-center space-y-6 text-center">
            {/* Stamp / Title Header */}
            <div className="border-b border-[#ad905c]/35 pb-2 w-full flex items-center justify-between px-2">
              <span className="text-[10px] font-song text-[#7d5f42] tracking-[0.3em]">
                铁盒里的第二封信
              </span>
              <span className="text-[10px] font-song text-[#8a3320]">
                恩施 · 清江旧忆
              </span>
            </div>

            {/* Line by line text container */}
            <div className="space-y-4 py-2 sm:py-4 min-h-[220px] flex flex-col items-center justify-center w-full">
              {/* Line 1 */}
              {revealedLines >= 1 && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="font-calligraphy text-base sm:text-lg text-[#2a1a11] tracking-wide"
                >
                  “如果你真的走到了这里，”
                </motion.p>
              )}

              {/* Line 2 */}
              {revealedLines >= 2 && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="font-calligraphy text-base sm:text-lg text-[#2a1a11] tracking-wide"
                >
                  “那你应该已经知道，”
                </motion.p>
              )}

              {/* Line 3 */}
              {revealedLines >= 3 && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="font-calligraphy text-base sm:text-lg text-[#2a1a11] tracking-wide"
                >
                  “我为什么一直没有回来。”
                </motion.p>
              )}

              {/* 1-second pause before philosophical reflection */}
              {revealedLines >= 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="pt-2 space-y-2.5 border-t border-[#d8c29b]/70 w-full"
                >
                  <p className="font-song text-xs sm:text-sm text-[#3b281b] leading-relaxed">
                    “有些人离开故乡，是为了走得更远。”
                  </p>
                  {revealedLines >= 5 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      className="font-song text-xs sm:text-sm text-[#3b281b] leading-relaxed"
                    >
                      “有些人留下，是因为这里一直有人在等。”
                    </motion.p>
                  )}
                </motion.div>
              )}

              {/* Line 6: Core suspense, slightly larger, no glowing neon */}
              {revealedLines >= 6 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2 }}
                  className="pt-3"
                >
                  <p className="font-calligraphy text-lg sm:text-xl md:text-2xl text-[#822817] tracking-[0.2em] font-semibold">
                    “去找那盏还亮着的灯。”
                  </p>
                </motion.div>
              )}
            </div>

            {/* Old paper tag action button: 【收好这封信】 */}
            {revealedLines >= 6 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="pt-2"
              >
                <button
                  id="collect-second-letter-button"
                  onClick={handleFinish}
                  className="cursor-pointer px-9 py-2.5 bg-[#8c2d1b] hover:bg-[#772414] text-[#fbf0d8] font-song text-sm tracking-[0.25em] wood-tag-edge shadow-xl transition-all hover:scale-105 flex items-center space-x-2"
                >
                  <Check className="w-4 h-4 text-[#f5ba58]" />
                  <span>收好这封信</span>
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
