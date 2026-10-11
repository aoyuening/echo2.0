import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Radio, Volume2 } from 'lucide-react';

interface WindowRadioProps {
  isTuning: boolean;
  hasDiscoveredVoice: boolean;
  onTriggerTune: () => void;
  onHoverChange: (isHovered: boolean) => void;
}

export const WindowRadio: React.FC<WindowRadioProps> = ({
  isTuning,
  hasDiscoveredVoice,
  onTriggerTune,
  onHoverChange,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverStart = () => {
    setIsHovered(true);
    onHoverChange(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    onHoverChange(false);
  };

  return (
    <div
      id="cabin-item-radio"
      className="absolute bottom-[31%] sm:bottom-[33%] md:bottom-[35%] left-[8%] sm:left-[9%] md:left-[10%] z-25 pointer-events-auto"
    >
      <motion.div
        animate={{
          y: isHovered ? -2.5 : 0,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ duration: 0.2 }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onClick={onTriggerTune}
        className="relative cursor-pointer select-none group"
        title="窗边的老式收音机"
      >
        {/* Shadow on window table */}
        <div className="absolute inset-0 bg-[#0e0a07]/80 blur-[4px] translate-y-2 translate-x-1 pointer-events-none" />

        {/* Vintage 1970s Transistor Radio */}
        <div className="relative w-22 sm:w-26 md:w-28 bg-[#382416] border border-[#543b27] p-1.5 sm:p-2 rounded-t-xs shadow-lg flex flex-col justify-between">
          {/* Faint metallic antenna extending toward the window */}
          <div className="absolute -top-5 right-2 w-0.5 h-6 bg-[#857668] origin-bottom transform rotate-[-12deg]" />

          {/* Tuning window */}
          <div className="w-full bg-[#160f0a] border border-[#4a3423] px-1 py-0.5 rounded-xs flex items-center justify-between mb-1">
            <span className="text-[7px] text-[#baa075] font-mono tracking-wider">
              SW 89.2
            </span>
            {/* The blinking indicator light as specifically requested:
                "鼠标移动到可互动物品附近时，收音机指示灯轻微闪烁" */}
            <motion.div
              animate={
                isTuning
                  ? { opacity: [0.1, 1, 0.1], scale: [0.8, 1.25, 0.8] }
                  : isHovered
                  ? { opacity: [0.3, 1, 0.3], scale: [0.9, 1.15, 0.9] }
                  : { opacity: hasDiscoveredVoice ? 0.7 : 0.3 }
              }
              transition={{ repeat: Infinity, duration: isTuning ? 0.35 : 0.75 }}
              className="w-1.5 h-1.5 rounded-full bg-[#e8a338] shadow-[0_0_4px_#e8a338]"
            />
          </div>

          {/* Slotted wooden speaker grill */}
          <div className="w-full h-6 sm:h-7 bg-[#21150e] border border-[#3d291b] rounded-xs p-0.5 flex flex-col justify-around">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full h-[1px] bg-[#342217]" />
            ))}
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between mt-1 pt-0.5 border-t border-[#463020]">
            <div className="flex items-center space-x-1">
              <div
                className={`w-2.5 h-2.5 rounded-full border border-[#6b4c33] flex items-center justify-center transition-colors ${
                  isTuning ? 'bg-[#9e2e1a]' : 'bg-[#22160f]'
                }`}
              >
                <div className="w-1 h-1 bg-[#d1a052] rounded-full" />
              </div>
              <span className="text-[7px] text-[#ad967d] font-song">
                {isTuning ? '接收中…' : hasDiscoveredVoice ? '微弱杂音' : '旋钮'}
              </span>
            </div>

            <div className="text-[#baa075]">
              {isTuning ? (
                <Volume2 className="w-2.5 h-2.5 text-[#e8a338] animate-bounce" />
              ) : (
                <Radio className="w-2.5 h-2.5 text-[#6b5543]" />
              )}
            </div>
          </div>
        </div>

        {/* Hover Tooltip Prompt */}
        {isHovered && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap z-30 pointer-events-none bg-[#241812]/90 text-[#ecdcb9] text-[11px] font-song px-2.5 py-0.5 rounded-sm border border-[#6b4e38]/70 shadow-md tracking-wider">
            窗边的老式收音机。
          </div>
        )}
      </motion.div>
    </div>
  );
};
