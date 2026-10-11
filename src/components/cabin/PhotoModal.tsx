import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCw, Check, X } from 'lucide-react';
import familyPhoto from '../../assets/images/enshi_vintage_family_photo_1788855993742.jpg';

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDiscoverClue: () => void;
  hasDiscovered: boolean;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  onClose,
  onDiscoverClue,
  hasDiscovered,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    onDiscoverClue();
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        id="cabin-photo-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      >
        {/* Dim backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-[#0d0a08]/85 backdrop-blur-[3px] cursor-pointer"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.75, opacity: 0, y: 35 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.75, opacity: 0, y: 25 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-lg bg-[#ebd7ac] border-2 border-[#b59963] paper-edge-rough shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-5 sm:p-8 overflow-hidden"
        >
          {/* Close X */}
          <button
            onClick={handleClose}
            className="absolute top-3.5 right-4 text-[#75593f] hover:text-[#2d1d13] p-1 transition-colors cursor-pointer flex items-center space-x-1 text-xs font-song"
            title="放回柜旁"
          >
            <span>收起</span>
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col items-center text-center space-y-4 pt-1">
            {/* Tag */}
            <div className="border-b border-[#ad905c]/40 pb-1">
              <span className="text-xs font-song text-[#7a5f45] tracking-[0.25em]">
                — 柜边的黑白老照片 —
              </span>
            </div>

            {/* The Photo Container with 3D Flip */}
            <div className="relative w-full max-w-sm aspect-[4/3] perspective-1000">
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="w-full h-full relative [transform-style:preserve-3d]"
              >
                {/* FRONT SIDE: Family Portrait */}
                <div className="absolute inset-0 [backface-visibility:hidden] bg-[#f5ecdc] p-2.5 sm:p-3 border border-[#baa075] shadow-md flex flex-col justify-between">
                  <div className="relative w-full h-[85%] overflow-hidden bg-[#2d251f] border border-[#a88a5d]">
                    <img
                      src={familyPhoto}
                      alt="恩施家庭老合影"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center grayscale contrast-110 sepia-[0.35]"
                    />
                    <div className="absolute inset-0 bg-[#573919]/10 mix-blend-color-burn pointer-events-none" />
                  </div>
                  <div className="text-center pt-1">
                    <span className="text-[10px] sm:text-xs font-handwriting text-[#5a4838] tracking-widest">
                      一九八六年 · 江畔留影
                    </span>
                  </div>
                </div>

                {/* BACK SIDE: Handwritten note on aged yellow paper */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#e6d2a4] p-5 sm:p-6 border border-[#b89b65] shadow-md flex flex-col justify-between select-none">
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-song text-[#8a6e50] tracking-widest">
                      相片背面：
                    </span>
                    <div className="h-[1px] w-full bg-[#c2a775]/50" />
                  </div>

                  <div className="py-6 px-2 text-center">
                    <p className="font-calligraphy text-lg sm:text-xl text-[#2e1d12] leading-relaxed tracking-widest">
                      “那年夏天，
                      <br />
                      我们沿着江走了很远。”
                    </p>
                  </div>

                  <div className="text-right text-[10px] font-song text-[#8a6e50] tracking-wider border-t border-[#c2a775]/40 pt-1">
                    字迹模糊 · 钢笔旧墨
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Flip toggle button */}
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="cursor-pointer text-xs font-song text-[#75593f] hover:text-[#2d1d13] flex items-center space-x-1.5 px-3 py-1 bg-[#dfc999]/60 hover:bg-[#dfc999] rounded-xs border border-[#bfa572] transition-colors"
            >
              <RotateCw className="w-3 h-3 text-[#943825]" />
              <span>{isFlipped ? '翻看正面' : '翻看背面手写字'}</span>
            </button>

            {/* Descriptive lines */}
            <div className="space-y-1 max-w-sm">
              <p className="font-song text-xs sm:text-sm text-[#3b2719] leading-relaxed">
                “照片上的人，似乎在看着屋外的方向。”
              </p>
              <p className="font-handwriting text-xs text-[#70553e]">
                背面写着：“那年夏天，我们沿着江走了很远。”
              </p>
            </div>

            {/* Clue Badge Notification */}
            <div className="pt-1 flex items-center space-x-2 text-xs font-song text-[#8a2f1d]">
              <span className="w-2 h-2 rounded-full bg-[#9e2e1a]" />
              <span className="font-semibold tracking-widest">
                {hasDiscovered ? '已获得线索：' : '获得新线索：'}
              </span>
              <span className="font-calligraphy text-sm sm:text-base text-[#2e1c12]">
                「线索二 · 江边」
              </span>
            </div>

            {/* Button: 【收起照片】 */}
            <div className="pt-2">
              <button
                id="close-photo-button"
                onClick={handleClose}
                className="cursor-pointer px-8 py-2 bg-[#422c1e] hover:bg-[#322014] text-[#ede0c2] font-song text-sm tracking-[0.25em] wood-tag-edge shadow-md transition-colors flex items-center space-x-1.5"
              >
                <Check className="w-4 h-4 text-[#d49b42]" />
                <span>收起照片</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
