import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import letterTexture from '../../assets/images/vintage_letter_texture_1788855040945.jpg';
import { ambientSound } from '../../utils/ambientAudio';

interface FinalLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChooseEnding: (choice: 'leave' | 'carry') => void;
}

export const FinalLetterModal: React.FC<FinalLetterModalProps> = ({
  isOpen,
  onClose,
  onChooseEnding,
}) => {
  // Envelope opened or sealed
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState<boolean>(false);

  // 4 Paragraphs of the final letter
  const paragraph1 = [
    '如果你看到这封信，',
    '说明你已经替我走过了清江。',
    '也见过那盏灯。',
    '也许你一直在找我。',
    '但其实，不必再找了。',
  ];

  const paragraph2 = [
    '我没有失踪。',
    '我只是离开了。',
    '离开这里以后，我去过很多地方。',
    '见过很多山。',
    '也走过很多条比清江更宽的河。',
    '可是每次听见水声的时候，',
    '我还是会想起这里。',
  ];

  const paragraph3 = [
    '我曾经以为，故乡是一个地方。',
    '后来才明白。',
    '故乡是一种声音。',
    '是一盏灯。',
    '是一张旧照片。',
    '是一杯已经凉掉的茶。',
    '是有人记得你曾经来过。',
  ];

  const paragraph4 = [
    '所以，如果你有一天也要离开，',
    '别害怕。',
    '走远一点。',
    '看看更大的世界。',
    '只是别忘了，',
    '总有一盏灯，',
    '会替你记得回来的路。',
  ];

  // Open envelope
  const handleOpenEnvelope = () => {
    ambientSound.playPageTurnSound();
    setIsEnvelopeOpened(true);
  };

  // Reset when modal closes/opens
  useEffect(() => {
    if (!isOpen) {
      setIsEnvelopeOpened(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#080503]/88 backdrop-blur-md select-none">
      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-hidden bg-[#24170f] border-2 border-[#825c3e] wood-tag-edge shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col"
      >
        {/* Phase 1: The Envelope with "给后来的人。" */}
        {!isEnvelopeOpened ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-8 min-h-[420px]">
            <div className="space-y-3">
              <span className="text-xs font-song text-[#b39578] tracking-[0.3em] uppercase block">
                The Final Letter · 最终信笺
              </span>
              <div className="w-16 h-0.5 bg-[#825c3e] mx-auto" />
            </div>

            {/* Envelope Visual Representation */}
            <div className="relative w-full max-w-md aspect-[16/10] bg-[#e6d8be] border-2 border-[#9b7650] wood-tag-edge p-6 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
              {/* Envelope Flap Lines */}
              <div className="absolute inset-0 pointer-events-none border border-[#c4ab7c]/60" />
              <div className="absolute top-0 inset-x-0 h-1/2 border-b border-[#a18159]/40 -skew-y-2 pointer-events-none" />

              {/* The Central Highlight: “给后来的人。” */}
              <div className="relative z-10 text-center py-4 px-6 bg-[#dac4a0]/80 border border-[#8a6843] wood-tag-edge shadow-sm">
                <p className="font-calligraphy text-2xl sm:text-3xl text-[#4a2618] tracking-[0.3em] font-semibold">
                  “给后来的人。”
                </p>
                <p className="font-song text-[11px] text-[#78593d] tracking-widest mt-1.5">
                  信封上没有署名，唯留此句。
                </p>
              </div>

              {/* Wax Seal Stamp (Dark Cinnabar) */}
              <div className="mt-4 flex items-center justify-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-[#7a2517] border border-[#a84434] flex items-center justify-center shadow-md">
                  <Mail className="w-4 h-4 text-[#faebd3]" />
                </div>
              </div>
            </div>

            {/* Action Button: 【打开】 */}
            <div className="pt-2 flex flex-col items-center space-y-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleOpenEnvelope}
                className="cursor-pointer px-10 py-3 bg-[#782819] hover:bg-[#8f301e] text-[#faebd4] font-song text-sm font-semibold tracking-[0.35em] wood-tag-edge shadow-xl border border-[#b25742] flex items-center space-x-2 transition-colors"
              >
                <Mail className="w-4 h-4 text-[#f5ba58]" />
                <span>打开信笺</span>
              </motion.button>
              <button
                onClick={onClose}
                className="cursor-pointer text-xs font-song text-[#9e8369] hover:text-[#d4ba9d] tracking-wider transition-colors"
              >
                暂不拆封，放回案头
              </button>
            </div>
          </div>
        ) : (
          /* Phase 2: Complete Letter Directly Displayed */
          <div
            className="relative flex-1 p-6 sm:p-9 overflow-y-auto flex flex-col justify-between"
            style={{
              backgroundImage: `url(${letterTexture})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Soft Aged Parchment Overlay */}
            <div className="absolute inset-0 bg-[#f7eedc]/94 pointer-events-none" />

            {/* Letter Header */}
            <div className="relative z-10 border-b border-[#ba9a6b]/60 pb-3 flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7a2517]" />
                <span className="font-calligraphy text-xl sm:text-2xl text-[#3d2417] tracking-[0.25em]">
                  给后来的人
                </span>
              </div>
              <span className="font-song text-xs text-[#7a5c3e] tracking-widest">
                清晨 · 恩施老屋案头
              </span>
            </div>

            {/* Complete Letter Text - Direct & Clear Display */}
            <div className="relative z-10 space-y-4 font-calligraphy text-base sm:text-lg text-[#2e1c12] tracking-[0.2em] leading-relaxed max-h-[52vh] overflow-y-auto pr-2 custom-scrollbar">
              {/* Paragraph 1 */}
              <div className="space-y-1 border-l-2 border-[#b08e60]/50 pl-3.5">
                {paragraph1.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>

              {/* Paragraph 2 */}
              <div className="space-y-1 border-l-2 border-[#b08e60]/50 pl-3.5 pt-1">
                {paragraph2.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>

              {/* Paragraph 3 */}
              <div className="space-y-1 border-l-2 border-[#8a2f1c]/60 pl-3.5 pt-1.5 pb-1 bg-[#f0dfc2]/50 wood-tag-edge">
                {paragraph3.map((line, idx) => (
                  <p
                    key={idx}
                    className={idx >= 2 && idx <= 6 ? 'text-[#612718] font-medium' : ''}
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Paragraph 4 */}
              <div className="space-y-1 border-l-2 border-[#b08e60]/50 pl-3.5 pt-1">
                {paragraph4.map((line, idx) => (
                  <p
                    key={idx}
                    className={idx >= 4 ? 'font-semibold text-[#5a2113]' : ''}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Bottom Final Choices - Directly accessible */}
            <div className="relative z-10 pt-4 mt-3 border-t border-[#ba9a6b]/60">
              <div className="space-y-3 text-center">
                <div className="space-y-0.5">
                  <p className="font-song text-xs sm:text-sm text-[#4d3221] tracking-widest font-semibold">
                    “现在，你手里拿着这封留给后人的信。”
                  </p>
                  <p className="font-song text-xs text-[#705037] tracking-wider">
                    晨光已破晓，你会如何选择？
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                  {/* Button 1: 【把信留下】 */}
                  <motion.button
                    id="decision-leave-letter"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => onChooseEnding('leave')}
                    className="cursor-pointer w-full sm:w-auto px-7 py-2.5 bg-[#423124] hover:bg-[#523d2d] text-[#faebd3] font-song text-xs sm:text-sm tracking-[0.25em] wood-tag-edge shadow-lg border border-[#78573d] transition-colors"
                  >
                    【把信留下】
                  </motion.button>

                  {/* Button 2: 【带着信离开】 */}
                  <motion.button
                    id="decision-carry-letter"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => onChooseEnding('carry')}
                    className="cursor-pointer w-full sm:w-auto px-7 py-2.5 bg-[#782819] hover:bg-[#8f301e] text-[#faebd4] font-song text-xs sm:text-sm tracking-[0.25em] wood-tag-edge shadow-lg border border-[#b25742] transition-colors"
                  >
                    【带着信离开】
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
