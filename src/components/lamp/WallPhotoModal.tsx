import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, Check } from 'lucide-react';
import vintagePhotoImg from '../../assets/images/enshi_vintage_family_photo_1788855993742.jpg';
import brassButtonImg from '../../assets/images/enshi_old_brass_button_1788856763821.jpg';
import { ambientSound } from '../../utils/ambientAudio';

interface WallPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDiscoverClue: () => void;
  hasDiscovered: boolean;
}

export const WallPhotoModal: React.FC<WallPhotoModalProps> = ({
  isOpen,
  onClose,
  onDiscoverClue,
  hasDiscovered,
}) => {
  const [isZoomedIn, setIsZoomedIn] = useState<boolean>(hasDiscovered);

  if (!isOpen) return null;

  const handleZoom = () => {
    ambientSound.playPageTurnSound();
    setIsZoomedIn(true);
    onDiscoverClue();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0806]/90 backdrop-blur-[2px]">
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 10 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-lg bg-[#1f150f] border border-[#5d402b] wood-tag-edge shadow-[0_15px_45px_rgba(0,0,0,0.85)] p-5 sm:p-7 select-none"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-3.5 right-3.5 text-[#bfa98e] hover:text-[#f8edd9] p-1.5 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center space-y-1 pb-3 border-b border-[#4d3522]">
          <span className="text-[11px] font-song text-[#ba9a76] tracking-[0.25em] block">
            墙上的木框黑白旧照片
          </span>
          <h3 className="font-song text-xl sm:text-2xl text-[#faebd3] tracking-[0.2em] font-medium">
            记忆的面庞
          </h3>
        </div>

        {/* Photo Display Stage */}
        <div className="relative my-5 p-3 sm:p-4 bg-[#140c08] border border-[#3b2719] flex flex-col items-center">
          {/* Framed Photo */}
          <div
            onClick={!isZoomedIn ? handleZoom : undefined}
            className={`relative p-2.5 bg-[#d8c5a4] border-4 border-[#332216] shadow-2xl transition-all duration-300 ${
              !isZoomedIn ? 'cursor-pointer hover:brightness-105' : ''
            }`}
          >
            <div className="relative w-48 sm:w-56 aspect-[4/5] overflow-hidden bg-[#241a12]">
              <motion.img
                src={vintagePhotoImg}
                alt="墙上的老照片"
                referrerPolicy="no-referrer"
                animate={{ scale: 1 }}
                className="w-full h-full object-cover sepia-[0.35] contrast-[1.08]"
              />

              {/* Highlight Ring over the button on his jacket when inspecting detail (without magnifying photo) */}
              {isZoomedIn && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="absolute bottom-[36%] right-[38%] w-9 h-9 rounded-full border-2 border-[#f7ba4a] shadow-[0_0_10px_rgba(247,186,74,0.8)] flex items-center justify-center pointer-events-none"
                >
                  <span className="w-2 h-2 rounded-full bg-[#f7ba4a] animate-ping" />
                </motion.div>
              )}
            </div>

            {/* Click to Zoom Hint */}
            {!isZoomedIn && (
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="bg-[#1f150f]/90 text-[#faebd3] font-song text-xs px-3 py-1.5 wood-tag-edge border border-[#6b4e36] flex items-center space-x-1.5 shadow-lg">
                  <ZoomIn className="w-3.5 h-3.5 text-[#d49b42]" />
                  <span>点击靠近观察细节</span>
                </div>
              </div>
            )}
          </div>

          {/* Button Comparison Card if Zoomed */}
          <AnimatePresence>
            {isZoomedIn && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-4 p-3 bg-[#24170f] border border-[#5d3f29] wood-tag-edge flex items-center space-x-3 w-full"
              >
                <div className="w-12 h-12 rounded-sm border border-[#7a5639] overflow-hidden shrink-0 bg-black/40">
                  <img
                    src={brassButtonImg}
                    alt="清江边发现的旧纽扣"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-0.5">
                  <span className="text-[10px] font-song text-[#d49b42] block tracking-wider">
                    【线索呼应】清江边木盒里的旧纽扣
                  </span>
                  <p className="text-xs font-song text-[#ebd9be] leading-relaxed">
                    青年外套右衽上的第四颗铜纽扣，与清江边木盒中的纹理与磨损痕迹分毫不差。
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Narrative Monologue */}
        <div className="text-center space-y-2">
          {!isZoomedIn ? (
            <div className="space-y-1">
              <p className="font-calligraphy text-base sm:text-lg text-[#f8edd9] tracking-[0.2em]">
                “这个人……”
              </p>
              <p className="font-song text-xs text-[#baa080] tracking-widest">
                “你在哪里见过他？”
              </p>
              <div className="pt-2">
                <button
                  onClick={handleZoom}
                  className="cursor-pointer px-5 py-1.5 bg-[#382417] hover:bg-[#4a3020] text-[#e8d7be] font-song text-xs tracking-widest wood-tag-edge border border-[#5d402b] transition-colors"
                >
                  细看照片衣服上的细节 »
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <p className="font-calligraphy text-base sm:text-lg text-[#faebd3] tracking-[0.2em]">
                “原来，那枚纽扣属于他。”
              </p>
              <p className="font-song text-xs text-[#baa080] tracking-widest">
                “他曾经住在这里。”
              </p>
              <div className="pt-2 flex justify-center">
                <button
                  onClick={onClose}
                  className="cursor-pointer px-6 py-1.5 bg-[#782819] hover:bg-[#8f301e] text-[#faebd4] font-song text-xs tracking-[0.2em] wood-tag-edge transition-colors flex items-center space-x-1.5 shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>记下这道线索</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
