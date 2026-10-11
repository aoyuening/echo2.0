import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import letterBg from '../../assets/images/vintage_letter_texture_1788855040945.jpg';
import { ambientSound } from '../../utils/ambientAudio';

interface ThirdLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinishReading: () => void;
  hasFinished: boolean;
}

export const ThirdLetterModal: React.FC<ThirdLetterModalProps> = ({
  isOpen,
  onClose,
  onFinishReading,
  hasFinished,
}) => {
  const [revealedLineIndex, setRevealedLineIndex] = useState<number>(
    hasFinished ? 10 : 0
  );

  // Line sequence matching exact user specification
  const letterLines = [
    { text: '如果你真的找到了这里，', pauseMs: 1600 },
    { text: '说明你已经替我走完了这条路。', pauseMs: 1800 },
    { text: '清江还在。', pauseMs: 1400 },
    { text: '屋子还在。', pauseMs: 1400 },
    { text: '那盏灯，也还在。', pauseMs: 1600 },
    {
      text: '只有等我的那个人，已经不在了。',
      pauseMs: 2600,
      highlight: true,
    },
    { text: '我曾经以为，只要走得够远，就能忘记故乡。', pauseMs: 1800 },
    { text: '后来才明白。', pauseMs: 1500 },
    {
      text: '人走得再远，也总会有一条江，一盏灯，等着你记起回来的路。',
      pauseMs: 2000,
      quote: true,
    },
    { text: '如果有人替我打开这封信，', pauseMs: 1600 },
    { text: '请替我把灯留到天亮。', pauseMs: 1000, finalCall: true },
  ];

  useEffect(() => {
    if (!isOpen) {
      if (!hasFinished) setRevealedLineIndex(0);
      return;
    }

    if (hasFinished) {
      setRevealedLineIndex(letterLines.length - 1);
      return;
    }

    ambientSound.playPageTurnSound();
    setRevealedLineIndex(0);

    let currentIdx = 0;
    let isCancelled = false;

    const revealNext = () => {
      if (isCancelled) return;
      if (currentIdx < letterLines.length - 1) {
        currentIdx++;
        setRevealedLineIndex(currentIdx);
        const nextDelay = letterLines[currentIdx].pauseMs;
        setTimeout(revealNext, nextDelay);
      }
    };

    const initialTimer = setTimeout(revealNext, letterLines[0].pauseMs);

    return () => {
      isCancelled = true;
      clearTimeout(initialTimer);
    };
  }, [isOpen, hasFinished]);

  if (!isOpen) return null;

  const isReadingComplete = revealedLineIndex >= letterLines.length - 1;

  const handleCloseAndFinish = () => {
    onFinishReading();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#090705]/90 backdrop-blur-[2px]">
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 15 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-xl bg-[#ebd9b2] border-2 border-[#826645] paper-edge-rough shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-5 sm:p-8 select-none max-h-[92vh] overflow-y-auto"
      >
        {/* Real paper texture background overlay */}
        <div className="absolute inset-0 opacity-25 mix-blend-multiply pointer-events-none">
          <img
            src={letterBg}
            alt="老信纸底纹"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Vintage postal stamp watermark in corner */}
        <div className="absolute top-4 right-5 sm:right-7 border-2 border-[#943625]/45 text-[#943625]/60 font-song text-[10px] px-2 py-1 rotate-6 pointer-events-none tracking-widest uppercase">
          恩施 · 吊脚楼留存
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-3.5 right-3 text-[#70523a] hover:text-[#2d1e13] p-1.5 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Letter Heading */}
        <div className="relative z-10 pb-4 mb-4 border-b border-[#c2aa7f]/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-song text-[#8a684b] tracking-[0.25em] block">
              【第三封信 · 终章】
            </span>
            <h3 className="font-calligraphy text-2xl sm:text-3xl text-[#24170d] tracking-[0.2em]">
              致寻路而来的人
            </h3>
          </div>
          <span className="text-xs font-song text-[#75593e] self-end hidden sm:inline">
            岁末 · 吊脚楼灯下
          </span>
        </div>

        {/* Letter Text Content Revealing Line by Line */}
        <div className="relative z-10 space-y-3 sm:space-y-4 py-2 font-calligraphy text-base sm:text-lg text-[#25170d] leading-relaxed tracking-wider">
          {letterLines.map((line, idx) => {
            const isRevealed = idx <= revealedLineIndex;
            if (!isRevealed) return null;

            return (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`${
                  line.highlight
                    ? 'text-[#872b1a] text-lg sm:text-xl py-1 font-semibold'
                    : line.quote
                    ? 'text-[#6e2213] bg-[#deb984]/35 px-3 py-1.5 border-l-2 border-[#872b1a] my-2 text-base sm:text-lg rounded-r-xs'
                    : line.finalCall
                    ? 'text-[#20150e] font-semibold text-lg sm:text-xl pt-1'
                    : 'text-[#2e1d13]'
                }`}
              >
                {line.text}
              </motion.p>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="relative z-10 pt-6 mt-4 border-t border-[#ba9f72]/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] font-song text-[#73553c] italic">
            {!isReadingComplete ? '信中字迹缓缓展露中……' : '“此心安处是吾乡。”'}
          </span>

          <AnimatePresence>
            {isReadingComplete && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleCloseAndFinish}
                className="cursor-pointer px-6 py-2 bg-[#782819] hover:bg-[#8f301e] text-[#fbf0dc] font-song text-xs tracking-[0.25em] wood-tag-edge shadow-md transition-colors flex items-center space-x-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>读完，收好信件</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
