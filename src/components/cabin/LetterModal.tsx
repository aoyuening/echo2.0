import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';

interface LetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCollectClue: () => void;
  hasCollected: boolean;
}

export const LetterModal: React.FC<LetterModalProps> = ({
  isOpen,
  onClose,
  onCollectClue,
  hasCollected,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="cabin-letter-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Dimmed Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0d0a08]/85 backdrop-blur-[3px] cursor-pointer"
          />

          {/* Unfolding Letter Paper */}
          <motion.div
            id="cabin-unfolding-letter"
            initial={{ scale: 0.35, y: 80, rotate: -3, opacity: 0 }}
            animate={{ scale: 1, y: 0, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.4, y: 60, opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 24,
              stiffness: 140,
              duration: 0.6,
            }}
            className="relative z-10 w-full max-w-xl bg-[#ebd7ac] border-2 border-[#b59963] paper-edge-rough shadow-[0_20px_50px_-10px_rgba(0,0,0,0.85)] p-6 sm:p-10 md:p-12 overflow-hidden"
          >
            {/* Vintage Aged Paper Texture Background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-45 mix-blend-multiply"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 15% 15%, #dbbf8c 0%, transparent 60%), radial-gradient(circle at 85% 85%, #bca167 0%, transparent 60%)',
              }}
            />

            {/* Crease marks from folds */}
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#9e8354]/30 pointer-events-none" />
            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-[#9e8354]/20 pointer-events-none" />

            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-5 text-[#735841] hover:text-[#2d1d13] p-1 transition-colors cursor-pointer flex items-center space-x-1 text-xs font-song"
              title="放回桌面"
            >
              <span>放回桌上</span>
              <X className="w-4 h-4" />
            </button>

            {/* Postal Stamp */}
            <div className="absolute top-5 left-5 opacity-75 pointer-events-none">
              <div className="w-10 h-10 border border-[#a6301d] rounded-full flex flex-col items-center justify-center rotate-6 p-1">
                <span className="text-[9px] text-[#912514] font-song leading-none">恩施</span>
                <span className="text-[7px] text-[#912514] font-song mt-0.5 leading-none">清江信件</span>
              </div>
            </div>

            {/* The Letter Handwritten Text */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-6 sm:space-y-8 my-3">
              <div className="inline-block border-b border-[#a88a59]/40 pb-1">
                <span className="text-xs font-song text-[#75593f] tracking-[0.25em]">
                  — 留在案上的旧信 —
                </span>
              </div>

              {/* Core Text Requirement:
                  “如果你还能听见，
                  请沿着清江往下走。” */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="max-w-md mx-auto py-2"
              >
                <p className="font-calligraphy text-[#22160d] text-2xl sm:text-3xl md:text-[32px] leading-[2.2] tracking-wider select-none text-balance">
                  “如果你还能听见，
                  <br />
                  请沿着清江往下走。”
                </p>
              </motion.div>

              {/* Faint note */}
              <div className="w-full text-right pr-4">
                <p className="font-handwriting text-xs sm:text-sm text-[#735a43] tracking-widest">
                  —— 最后的留字
                </p>
              </div>

              {/* The Button: 【收下这条线索】 */}
              <div className="pt-2">
                <button
                  id="collect-clue-button"
                  onClick={onCollectClue}
                  className="group relative cursor-pointer px-8 py-2.5 bg-[#422c1e] hover:bg-[#342216] text-[#e8dcbe] hover:text-[#fff4dc] transition-all duration-300 wood-tag-edge shadow-md flex items-center space-x-2"
                >
                  <div className="absolute inset-[2px] border border-[#785437]/50 pointer-events-none" />
                  {hasCollected ? (
                    <>
                      <Check className="w-4 h-4 text-[#d49b42] relative z-10" />
                      <span className="relative z-10 font-song text-base tracking-[0.2em] font-medium pl-1">
                        已收下线索（放回桌上）
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d49b42] relative z-10" />
                      <span className="relative z-10 font-song text-base tracking-[0.25em] font-medium pl-1">
                        收下这条线索
                      </span>
                      <span className="relative z-10 text-[#d49b42] group-hover:translate-x-1 transition-transform">
                        »
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
