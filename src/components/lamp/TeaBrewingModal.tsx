import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check } from 'lucide-react';
import { ambientSound } from '../../utils/ambientAudio';

interface TeaBrewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  hasCompleted: boolean;
}

export const TeaBrewingModal: React.FC<TeaBrewingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  hasCompleted,
}) => {
  const [isPoured, setIsPoured] = useState<boolean>(hasCompleted);
  const [isPouring, setIsPouring] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsPoured(hasCompleted);
      setIsPouring(false);
    }
  }, [isOpen, hasCompleted]);

  if (!isOpen) return null;

  // Single click: Pour tea immediately in one smooth motion
  const handlePourTeaOnce = () => {
    if (isPoured || isPouring) return;
    setIsPouring(true);
    ambientSound.playPourWaterSound();

    setTimeout(() => {
      ambientSound.playTeaCupPlaceSound();
      ambientSound.playFluteChimeSound();
      setIsPouring(false);
      setIsPoured(true);
      onComplete();
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0806]/85 backdrop-blur-[2px]">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-xl bg-[#21160f] border border-[#5d412b] wood-tag-edge shadow-[0_15px_40px_rgba(0,0,0,0.85)] p-5 sm:p-7 select-none overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-3.5 right-3.5 text-[#bfa98e] hover:text-[#f8edd9] p-1.5 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title Header */}
        <div className="text-center space-y-1 pb-4 border-b border-[#4d3522]">
          <span className="text-[11px] font-song text-[#ba9a76] tracking-[0.25em] block">
            恩施土家木桌 · 叙事互动
          </span>
          <h3 className="font-song text-xl sm:text-2xl text-[#faebd3] tracking-[0.2em] font-medium">
            重新泡一杯茶
          </h3>
          <p className="text-xs font-song text-[#9e8369] tracking-wider">
            “桌上的茶已经凉了，他似乎一直在等一个人。”
          </p>
        </div>

        {/* Tea Table Interactive Stage */}
        <div className="relative my-6 py-6 px-4 bg-[#180f0a] border border-[#3b2719] rounded-sm flex flex-col items-center justify-center min-h-[220px]">
          {/* Subtle wood grain line */}
          <div className="absolute inset-x-4 bottom-8 h-[2px] bg-[#3a2517] opacity-60" />

          {/* Objects on Table */}
          <div className="relative z-10 flex items-end justify-center space-x-6 sm:space-x-10 w-full">
            {/* 1. Tea Caddy (陶制茶罐) */}
            <div className="flex flex-col items-center space-y-2 opacity-75">
              <div className="w-12 h-14 bg-[#4a2e1d] border border-[#6b472e] rounded-t-lg rounded-b-md shadow-md flex flex-col items-center justify-center relative">
                <div className="w-6 h-2 bg-[#2d1b10] rounded-t-xs -mt-1 border-t border-[#805739]" />
                <span className="text-[8px] font-song text-[#c4aa86] writing-vertical mt-1">
                  富硒茶
                </span>
              </div>
              <span className="text-[11px] font-song text-[#aa957b] tracking-wider mt-1.5">
                茶罐
              </span>
            </div>

            {/* 2. Water Kettle (老铜壶/水壶) */}
            <div className="flex flex-col items-center space-y-2 opacity-75">
              <div className="w-14 h-15 bg-[#523724] border border-[#754f35] rounded-t-xl rounded-b-md shadow-md flex items-center justify-center relative">
                <div className="absolute -left-2 top-3 w-3 h-4 border-l-2 border-t-2 border-[#8a5f3f] rounded-tl-md" />
                <div className="absolute -top-3 w-8 h-4 border-t-2 border-r-2 border-l-2 border-[#8a5f3f] rounded-t-md" />
                <span className="text-[9px] font-song text-[#bfa482]">热水</span>
              </div>
              <span className="text-[11px] font-song text-[#aa957b] tracking-wider mt-1.5">
                水壶
              </span>
            </div>

            {/* 3. Teapot (紫砂/土陶茶壶 - 点击倒茶) */}
            <div className="flex flex-col items-center space-y-2">
              <motion.button
                whileHover={!isPoured && !isPouring ? { scale: 1.08, y: -3 } : {}}
                whileTap={!isPoured && !isPouring ? { scale: 0.95 } : {}}
                onClick={handlePourTeaOnce}
                disabled={isPoured || isPouring}
                className={`relative group flex flex-col items-center transition-all ${
                  !isPoured
                    ? 'cursor-pointer'
                    : 'opacity-85 cursor-default'
                }`}
              >
                {/* Steaming steam animation when pouring */}
                {isPouring && (
                  <motion.div
                    animate={{ y: [-2, -14], opacity: [0.3, 0.8, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="absolute -top-6 w-2 h-5 rounded-full bg-[#faedd2]/60 blur-[2px]"
                  />
                )}

                <motion.div
                  animate={isPouring ? { rotate: [-5, 18, 15] } : { rotate: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-13 bg-[#3b2315] border border-[#5d3b25] rounded-full shadow-lg flex items-center justify-center relative"
                >
                  {/* Pot lid knob */}
                  <div className="absolute -top-2 w-3 h-2 rounded-full bg-[#52331f] border-t border-[#7e4f30]" />
                  {/* Spout */}
                  <div className="absolute -right-2.5 top-3.5 w-3.5 h-2.5 bg-[#3b2315] rounded-r-sm transform rotate-12" />
                  {/* Handle */}
                  <div className="absolute -left-2 top-3 w-2.5 h-6 border-l-2 border-t-2 border-b-2 border-[#52331f] rounded-l-md" />
                </motion.div>

                <span className="text-[11px] font-song text-[#cfb696] tracking-wider mt-1.5 flex items-center space-x-1">
                  {!isPoured && !isPouring && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d49b42] animate-ping" />
                  )}
                  <span>{isPouring ? '倒茶中…' : isPoured ? '老茶壶' : '【点击倒茶】'}</span>
                </span>
              </motion.button>
            </div>

            {/* 4. Teacup (粗陶茶碗) */}
            <div className="flex flex-col items-center space-y-2">
              <motion.div
                whileHover={!isPoured && !isPouring ? { scale: 1.05 } : {}}
                onClick={handlePourTeaOnce}
                className={`relative flex flex-col items-center ${!isPoured ? 'cursor-pointer' : ''}`}
              >
                {/* Steam Rising when Done */}
                {isPoured && (
                  <motion.div
                    animate={{
                      y: [-1, -15, -24],
                      x: [0, 2, -1],
                      opacity: [0, 0.6, 0],
                      scale: [0.8, 1.2, 1.5],
                    }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut' }}
                    className="absolute -top-6 w-3 h-6 rounded-full bg-[#fcead0]/45 blur-[3px] pointer-events-none"
                  />
                )}

                {/* Earthenware bowl */}
                <div className="w-11 h-9 bg-[#3d2719] border border-[#61412b] rounded-b-xl rounded-t-xs shadow-md flex items-center justify-center relative overflow-hidden">
                  {/* Tea soup level */}
                  <motion.div
                    animate={{
                      height: isPoured ? '68%' : isPouring ? '50%' : '0%',
                      backgroundColor: '#875121',
                    }}
                    transition={{ duration: 0.8 }}
                    className="absolute bottom-0 inset-x-1 rounded-b-lg opacity-85"
                  />
                </div>
                <span className="text-[11px] font-song text-[#cfb696] tracking-wider mt-1.5">
                  {isPoured ? '热茶微温' : '空茶碗'}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Action Button: Single Click Pour */}
          {!isPoured && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handlePourTeaOnce}
                disabled={isPouring}
                className="cursor-pointer px-7 py-2 bg-[#782819] hover:bg-[#8f301e] text-[#faebd4] font-song text-xs tracking-[0.25em] wood-tag-edge border border-[#b25742] shadow-md flex items-center space-x-2 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#f5ba58]" />
                <span>{isPouring ? '正在斟入温茶……' : '提壶倒茶 · 仅需一触'}</span>
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Narrative Revelation when Completed */}
        <AnimatePresence>
          {isPoured && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="p-4 bg-[#170e09] border border-[#523824] wood-tag-edge text-center space-y-2"
            >
              <p className="font-calligraphy text-base sm:text-lg text-[#faebd3] tracking-[0.2em] leading-relaxed">
                “有些人等的，从来不是一杯茶。”
              </p>
              <p className="font-song text-xs sm:text-sm text-[#bca282] tracking-widest">
                “而是一个终于愿意回来的人。”
              </p>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={onClose}
                  className="cursor-pointer px-6 py-1.5 bg-[#782819] hover:bg-[#8f301e] text-[#faebd4] font-song text-xs tracking-[0.2em] wood-tag-edge transition-colors flex items-center space-x-1.5 shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>收下这杯茶的心意</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
