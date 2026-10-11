import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Sparkles, Waves, Hand } from 'lucide-react';
import { ambientSound } from '../../utils/ambientAudio';

interface StoneStepsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecordClue: () => void;
  hasRecorded: boolean;
}

export const StoneStepsModal: React.FC<StoneStepsModalProps> = ({
  isOpen,
  onClose,
  onRecordClue,
  hasRecorded,
}) => {
  // Step exploration stages:
  // 0: Overview of wet mossy stone steps
  // 1: Interactively clearing/wiping the moss & silt
  // 2: Ancient carved water mark & words revealed
  // 3: Recorded / Rubbing completed
  const [stepStage, setStepStage] = useState<0 | 1 | 2 | 3>(hasRecorded ? 2 : 0);
  const [wipeProgress, setWipeProgress] = useState<number>(hasRecorded ? 100 : 0);
  const [isWiping, setIsWiping] = useState<boolean>(false);

  if (!isOpen) return null;

  // Wiping moss interaction
  const handleWipeMoss = () => {
    setIsWiping(true);
    ambientSound.playMossWipeSound();
    ambientSound.playWaterLapSound();

    setWipeProgress((prev) => {
      const next = Math.min(100, prev + 35);
      if (next >= 100) {
        ambientSound.playStoneStepSound();
        ambientSound.playFluteChimeSound();
        setTimeout(() => {
          setStepStage(2);
          setIsWiping(false);
        }, 600);
      }
      return next;
    });
  };

  const handleStartWiping = () => {
    setStepStage(1);
    handleWipeMoss();
  };

  const handleConfirm = () => {
    ambientSound.playPaperFoldSound();
    ambientSound.playStoneStepSound();
    setStepStage(3);
    onRecordClue();
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div
        id="stone-steps-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none"
      >
        {/* Dim backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#070908]/85 backdrop-blur-[3px] cursor-pointer"
        />

        {/* Storybook Close-up Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 15 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-xl bg-[#ebd8b0] border-2 border-[#a38550] paper-edge-rough shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-5 sm:p-7 overflow-hidden"
        >
          {/* Subtle paper texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 15%, #ba965c 0%, transparent 50%), radial-gradient(circle at 80% 85%, #8f7243 0%, transparent 60%)',
            }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-4 text-[#6e533c] hover:text-[#2a1a11] p-1 transition-colors cursor-pointer flex items-center space-x-1 text-xs font-song z-20"
          >
            <span>收起凝视</span>
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-10 flex flex-col items-center text-center space-y-3.5">
            {/* Tag Header */}
            <div className="flex items-center space-x-2 border-b border-[#ad905c]/50 pb-1.5 px-4">
              <Waves className="w-3.5 h-3.5 text-[#4e6b62]" />
              <span className="text-xs sm:text-sm font-song text-[#543b27] font-semibold tracking-[0.25em]">
                清江石阶 · 潮湿水痕
              </span>
            </div>

            {/* Hand-painted close-up canvas */}
            <div className="relative w-full aspect-[16/9] bg-[#1d2725] border border-[#78613e] overflow-hidden rounded-xs shadow-inner">
              <svg viewBox="0 0 400 225" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  {/* Water Gradient */}
                  <linearGradient id="riverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#253a38" />
                    <stop offset="60%" stopColor="#1a2b29" />
                    <stop offset="100%" stopColor="#121e1d" />
                  </linearGradient>
                  {/* Limestone Gradient */}
                  <linearGradient id="stoneTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#696458" />
                    <stop offset="100%" stopColor="#4f493d" />
                  </linearGradient>
                  <linearGradient id="stoneRiserGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b372f" />
                    <stop offset="100%" stopColor="#292620" />
                  </linearGradient>
                </defs>

                {/* River water base */}
                <rect width="400" height="225" fill="url(#riverGrad)" />

                {/* River ripples */}
                <path d="M0,170 C100,165 240,178 400,168 L400,225 L0,225 Z" fill="#14211f" opacity="0.8" />
                <path d="M0,195 C120,190 280,200 400,192 L400,225 L0,225 Z" fill="#0d1615" opacity="0.9" />

                {/* Ancient tiered stone steps descending diagonally into river */}
                {/* Step 1 (Dry upper step) */}
                <polygon points="30,15 370,15 340,65 55,65" fill="url(#stoneTopGrad)" />
                <polygon points="55,65 340,65 340,82 55,82" fill="url(#stoneRiserGrad)" />

                {/* Step 2 (Middle step - where mark is located) */}
                <polygon points="55,82 340,82 315,138 75,138" fill="#585449" />
                <polygon points="75,138 315,138 315,155 75,155" fill="#302d26" />

                {/* Step 3 (Lower wet step submerged in river) */}
                <polygon points="75,155 315,155 295,195 95,195" fill="#444137" />
                <polygon points="95,195 295,195 295,210 95,210" fill="#22201a" />

                {/* Water sheen overlay on lower step */}
                <path d="M75,155 L315,155 L295,195 L95,195 Z" fill="#42665f" opacity="0.35" />

                {/* Weathered Stone cracks and mineral grains */}
                <path d="M120,35 Q145,28 175,38 T210,32" stroke="#36322b" strokeWidth="2" fill="none" opacity="0.6" />
                <path d="M240,42 Q260,39 285,45" stroke="#36322b" strokeWidth="1.5" fill="none" opacity="0.6" />
                <path d="M90,105 Q120,98 150,108" stroke="#2b2823" strokeWidth="2" fill="none" opacity="0.6" />
              </svg>

              {/* Moss Layer (Decreases opacity and shrinks as wipeProgress increases) */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  opacity: Math.max(0.08, 1 - wipeProgress / 100),
                }}
              >
                <svg viewBox="0 0 400 225" className="w-full h-full">
                  {/* Thick damp river moss clusters clinging to step 2 and crevice */}
                  <path
                    d="M130,95 Q160,82 200,92 Q230,105 270,95 Q285,115 260,128 Q210,132 165,124 Q135,120 130,95 Z"
                    fill="#2f4a30"
                    opacity="0.9"
                  />
                  <path
                    d="M145,100 Q180,90 220,98 Q240,115 225,126 Q185,128 150,118 Z"
                    fill="#3f613c"
                    opacity="0.95"
                  />
                  {/* Wet silt dots */}
                  <circle cx="160" cy="110" r="14" fill="#243825" opacity="0.8" />
                  <circle cx="210" cy="115" r="18" fill="#243825" opacity="0.85" />
                  <circle cx="245" cy="108" r="12" fill="#2b422a" opacity="0.8" />
                </svg>
              </motion.div>

              {/* Revealed Carved Marks (Appears as wipeProgress increases) */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{
                  opacity: Math.min(1, wipeProgress / 70),
                }}
              >
                <div className="relative top-[2%] left-[1%] flex flex-col items-center">
                  {/* Carved Water Line Notch */}
                  <div className="w-36 sm:w-44 h-[2px] bg-[#1e1712] shadow-[0_1px_0_rgba(255,255,255,0.18)]" />

                  {/* Engraved Year & Characters */}
                  <div className="mt-1 flex items-center space-x-3 text-[#18110b] font-calligraphy text-sm sm:text-base tracking-[0.25em] drop-shadow-[0_1px_1px_rgba(255,255,255,0.25)]">
                    <span className="font-semibold">「一九八七·夏·水至此」</span>
                  </div>

                  {/* Small carved barefoot impression & "等归" */}
                  <div className="flex items-center space-x-2 mt-0.5 text-xs text-[#2b1e15] font-calligraphy tracking-widest opacity-90">
                    <span>— 阿成</span>
                    <span className="text-[10px] px-1 py-0.2 bg-[#2d2218]/15 rounded-xs">等归</span>
                  </div>
                </div>
              </motion.div>

              {/* Water Lapping Sheen Animation on bottom */}
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3], y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#1b2b29]/70 via-[#27403c]/20 to-transparent pointer-events-none"
              />

              {/* Interactive Wipe Prompt Overlay (Stage 0 & 1) */}
              {stepStage < 2 && (
                <div
                  onClick={handleWipeMoss}
                  className="absolute inset-0 z-20 cursor-pointer flex flex-col items-center justify-center bg-black/15 hover:bg-black/10 transition-colors group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-[#1f2b27]/92 border-2 border-[#75a697] text-[#f4ebdb] font-song text-xs sm:text-sm wood-tag-edge shadow-xl flex items-center space-x-2 pointer-events-auto"
                  >
                    <Hand className="w-4 h-4 text-[#f0caa0] animate-bounce" />
                    <span>
                      {stepStage === 0
                        ? '轻抚石阶，拂去积存的青苔与江泥'
                        : `继续擦拭（${wipeProgress}%）……`}
                    </span>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Narrative & Memory Reflections */}
            <div className="space-y-2 min-h-[72px] flex flex-col items-center justify-center px-2">
              {stepStage < 2 ? (
                <p className="font-song text-xs sm:text-sm text-[#3b2719] leading-relaxed max-w-md">
                  石阶伸入滚滚清江之中，被千百次江水与往来步履冲刷得温润平整。
                  <br />
                  <span className="text-xs text-[#6e533b]">
                    靠近水线的石缝里被厚厚的绿苔封盖，用手拂开，似乎能摸到一道凹痕。
                  </span>
                </p>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-1 text-center"
                >
                  <p className="font-calligraphy text-base sm:text-lg text-[#26170d] tracking-[0.2em] leading-relaxed">
                    “那年夏天清江大水，我们赤脚站在这里刻下了水痕。”
                  </p>
                  <p className="font-song text-xs text-[#523d2e] tracking-wider leading-relaxed">
                    后来江水退去，刻线留在了石头里。当年从这级石阶上船远行的人，却再也没有踏水归来。
                  </p>
                </motion.div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-1 flex items-center justify-center space-x-3">
              {stepStage === 0 && (
                <button
                  onClick={handleStartWiping}
                  className="cursor-pointer px-6 py-2 bg-[#3b2b1e] hover:bg-[#2c1f14] text-[#faebd3] font-song text-xs sm:text-sm tracking-[0.25em] wood-tag-edge shadow-md transition-colors flex items-center space-x-1.5"
                >
                  <Hand className="w-3.5 h-3.5 text-[#e0b784]" />
                  <span>拂拭青苔</span>
                </button>
              )}

              {stepStage === 1 && (
                <button
                  onClick={handleWipeMoss}
                  className="cursor-pointer px-6 py-2 bg-[#2d3d37] hover:bg-[#202e29] text-[#e8f2ee] font-song text-xs sm:text-sm tracking-[0.25em] wood-tag-edge shadow-md transition-colors flex items-center space-x-1.5"
                >
                  <Waves className="w-3.5 h-3.5 text-[#91bfb2]" />
                  <span>洗净石缝泥沙 ({wipeProgress}%)</span>
                </button>
              )}

              {stepStage >= 2 && (
                <motion.button
                  id="record-steps-clue-button"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleConfirm}
                  className="cursor-pointer px-8 py-2.5 bg-[#782819] hover:bg-[#8f301e] text-[#faebd4] font-song text-xs sm:text-sm font-semibold tracking-[0.3em] wood-tag-edge shadow-xl border border-[#b25742] transition-colors flex items-center space-x-2"
                >
                  <Check className="w-4 h-4 text-[#f5ba58]" />
                  <span>{stepStage === 3 || hasRecorded ? '已拓印水痕并记下' : '拓印水痕 · 记入线索簿'}</span>
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
