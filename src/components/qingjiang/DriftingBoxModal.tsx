import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, PackageOpen } from 'lucide-react';
import buttonImg from '../../assets/images/enshi_old_brass_button_1788856763821.jpg';
import { ambientSound } from '../../utils/ambientAudio';

interface DriftingBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCollectButton: () => void;
  hasCollected: boolean;
}

export const DriftingBoxModal: React.FC<DriftingBoxModalProps> = ({
  isOpen,
  onClose,
  onCollectButton,
  hasCollected,
}) => {
  const [isBoxOpened, setIsBoxOpened] = useState(hasCollected);
  const [textStage, setTextStage] = useState<0 | 1 | 2>(hasCollected ? 2 : 0);

  if (!isOpen) return null;

  const handleOpenBox = () => {
    ambientSound.playWoodBoxOpenSound();
    setIsBoxOpened(true);
    setTimeout(() => {
      setTextStage(1);
      setTimeout(() => {
        setTextStage(2);
      }, 1000);
    }, 400);
  };

  const handleCollect = () => {
    onCollectButton();
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        id="drifting-box-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      >
        {/* Dim background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0c0907]/80 backdrop-blur-[2px] cursor-pointer"
        />

        {/* Storybook Box Stage */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-lg bg-[#ebd7ad] border-2 border-[#b59963] paper-edge-rough shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-6 sm:p-8 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-4 text-[#75593f] hover:text-[#2d1d13] p-1 transition-colors cursor-pointer flex items-center space-x-1 text-xs font-song"
          >
            <span>放回岸边</span>
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col items-center text-center space-y-4 pt-1">
            {/* Tag */}
            <div className="border-b border-[#ad905c]/40 pb-1">
              <span className="text-xs font-song text-[#7a5f45] tracking-[0.25em]">
                — 漂至岸边的旧木盒 —
              </span>
            </div>

            {/* Visual: Wooden Box & Inside Old Button */}
            <div className="relative w-52 sm:w-60 aspect-square bg-[#2b2017] border-2 border-[#69482d] rounded-xs shadow-2xl p-3 flex items-center justify-center overflow-hidden">
              {/* Wooden box lid or interior */}
              <AnimatePresence mode="wait">
                {!isBoxOpened ? (
                  <motion.div
                    key="closed-box"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={handleOpenBox}
                    className="w-full h-full bg-[#3d2719] border border-[#5a3820] flex flex-col items-center justify-center space-y-3 cursor-pointer group shadow-inner"
                  >
                    <div className="w-12 h-12 rounded-full border border-[#7a5332] bg-[#29170c] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <PackageOpen className="w-6 h-6 text-[#d49b42]" />
                    </div>
                    <div className="text-center px-4">
                      <span className="font-song text-xs text-[#cfb78f] tracking-widest block">
                        盒盖覆着细砂与水痕
                      </span>
                      <span className="font-calligraphy text-sm text-[#e6aa45] mt-1 block">
                        点击揭开木盒
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="opened-box"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full bg-[#201610] p-2 border border-[#4d321d] flex flex-col items-center justify-center relative shadow-inner"
                  >
                    {/* The Tarnished Brass Button Inside */}
                    <div className="w-32 sm:w-36 aspect-square rounded-full border border-[#85633a]/60 overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.8)] relative">
                      <img
                        src={buttonImg}
                        alt="磨损的旧铜纽扣"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-handwriting text-[10px] text-[#9c8264] tracking-widest mt-2">
                      一枚带有岁月划痕的铜纽扣
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Narrative text with pauses */}
            <div className="space-y-1.5 min-h-[64px] flex flex-col items-center justify-center max-w-sm">
              {!isBoxOpened && (
                <p className="font-song text-xs sm:text-sm text-[#4d3725] leading-relaxed">
                  木盒随江水漂流至浅滩，木料被水浸泡得沉甸甸的。
                </p>
              )}

              {isBoxOpened && textStage >= 0 && (
                <p className="font-calligraphy text-base sm:text-lg text-[#2a1a10]">
                  “不是信。”
                </p>
              )}

              {isBoxOpened && textStage >= 1 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-calligraphy text-sm sm:text-base text-[#3b2719]"
                >
                  “但有人把它留在了这里。”
                </motion.p>
              )}

              {isBoxOpened && textStage >= 2 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-song text-xs sm:text-sm text-[#8c2d1b] leading-relaxed font-medium"
                >
                  “这枚纽扣，似乎和照片里的人有关。”
                </motion.p>
              )}
            </div>

            {/* Collect button */}
            {isBoxOpened && textStage >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-1"
              >
                <button
                  id="collect-button-clue-button"
                  onClick={handleCollect}
                  className="cursor-pointer px-8 py-2 bg-[#422c1e] hover:bg-[#322014] text-[#ede0c2] font-song text-sm tracking-[0.25em] wood-tag-edge shadow-md transition-colors flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4 text-[#d49b42]" />
                  <span>{hasCollected ? '已收好纽扣' : '收下'}</span>
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
