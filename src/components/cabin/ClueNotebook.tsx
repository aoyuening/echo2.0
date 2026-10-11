import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ChevronUp, ChevronDown, Compass } from 'lucide-react';

interface ClueNotebookProps {
  hasLetter: boolean;
  hasPhoto: boolean;
  hasRadio: boolean;
  onGoToQingjiang: () => void;
}

export const ClueNotebook: React.FC<ClueNotebookProps> = ({
  hasLetter,
  hasPhoto,
  hasRadio,
  onGoToQingjiang,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const totalClues = (hasLetter ? 1 : 0) + (hasPhoto ? 1 : 0) + (hasRadio ? 1 : 0);
  const isAllDiscovered = hasLetter && hasPhoto && hasRadio;

  return (
    <div
      id="clue-notebook-container"
      className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-35 pointer-events-auto"
    >
      <motion.div
        layout
        className="w-56 sm:w-68 bg-[#ebd9b2] border border-[#a88a55] paper-edge-rough shadow-[0_8px_25px_rgba(0,0,0,0.65)] overflow-hidden"
      >
        {/* Paper texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 20%, #d4b478 0%, transparent 60%), radial-gradient(circle at 10% 90%, #b8985c 0%, transparent 70%)',
          }}
        />

        {/* Notebook Title Header Bar */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 px-3.5 py-2 bg-[#dfc99a] border-b border-[#ba9a62] flex items-center justify-between cursor-pointer hover:bg-[#d6bf8e] transition-colors select-none"
        >
          <div className="flex items-center space-x-2">
            <BookOpen className="w-3.5 h-3.5 text-[#823927]" />
            <span className="font-song text-xs sm:text-sm font-semibold text-[#302014] tracking-[0.2em]">
              【线索簿】
            </span>
            <span className="text-[10px] font-song text-[#75593e]">
              ({totalClues}/3)
            </span>
          </div>

          <div className="flex items-center space-x-1 text-[#70543a]">
            <span className="text-[10px] font-song hidden sm:inline">
              {isOpen ? '收起' : '展开'}
            </span>
            {isOpen ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5" />
            )}
          </div>
        </div>

        {/* Notebook Body Content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 p-3 sm:p-4 space-y-3"
            >
              {/* Task Section */}
              <div className="space-y-1 border-b border-[#cbbb90] pb-2.5">
                <span className="text-[10px] font-song text-[#7a5f43] tracking-widest block">
                  当前任务
                </span>
                <p className="font-song text-xs sm:text-sm text-[#2f1f14] leading-relaxed font-medium">
                  {hasLetter ? (
                    <span className="text-[#8c2b18]">“沿着清江往下走。”</span>
                  ) : (
                    <span>“看看屋里，还有什么没有被带走。”</span>
                  )}
                </p>
              </div>

              {/* Clues List */}
              <div className="space-y-2">
                <span className="text-[10px] font-song text-[#7a5f43] tracking-widest block">
                  {isAllDiscovered ? '【已发现的记忆】' : '已发现：'}
                </span>

                <div className="space-y-1.5 text-xs font-song">
                  {/* Clue 1: 清江 */}
                  <div
                    className={`flex items-center space-x-2 py-0.5 transition-colors ${
                      hasLetter ? 'text-[#2b1b11]' : 'text-[#9c8264]/70 italic'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                        hasLetter ? 'bg-[#9e2e1a] text-[#fbf3e4]' : 'bg-[#cfbc96] text-[#786147]'
                      }`}
                    >
                      ①
                    </span>
                    <span className="font-calligraphy text-xs sm:text-sm tracking-wider">
                      {hasLetter ? '清江' : '待寻物'}
                    </span>
                    {hasLetter && (
                      <span className="text-[9px] text-[#735841] font-song ml-auto">
                        案头旧信
                      </span>
                    )}
                  </div>

                  {/* Clue 2: 江边 */}
                  <div
                    className={`flex items-center space-x-2 py-0.5 transition-colors ${
                      hasPhoto ? 'text-[#2b1b11]' : 'text-[#9c8264]/70 italic'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                        hasPhoto ? 'bg-[#9e2e1a] text-[#fbf3e4]' : 'bg-[#cfbc96] text-[#786147]'
                      }`}
                    >
                      ②
                    </span>
                    <span className="font-calligraphy text-xs sm:text-sm tracking-wider">
                      {hasPhoto ? '江边' : '待寻物'}
                    </span>
                    {hasPhoto && (
                      <span className="text-[9px] text-[#735841] font-song ml-auto">
                        柜边相片
                      </span>
                    )}
                  </div>

                  {/* Clue 3: 一段声音 */}
                  <div
                    className={`flex items-center space-x-2 py-0.5 transition-colors ${
                      hasRadio ? 'text-[#2b1b11]' : 'text-[#9c8264]/70 italic'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                        hasRadio ? 'bg-[#9e2e1a] text-[#fbf3e4]' : 'bg-[#cfbc96] text-[#786147]'
                      }`}
                    >
                      ③
                    </span>
                    <span className="font-calligraphy text-xs sm:text-sm tracking-wider">
                      {hasRadio ? '一段声音' : '待寻物'}
                    </span>
                    {hasRadio && (
                      <span className="text-[9px] text-[#735841] font-song ml-auto">
                        窗边电波
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* All 3 Clues Discovered -> Show Next Chapter Button */}
              {isAllDiscovered && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-2 border-t border-[#ba9a62] space-y-2"
                >
                  <p className="font-song text-[11px] text-[#694f38] leading-relaxed">
                    “这些线索，好像都指向同一个地方。”
                  </p>

                  <button
                    id="goto-qingjiang-button"
                    onClick={onGoToQingjiang}
                    className="w-full py-2 bg-[#962d1a] hover:bg-[#7e2415] text-[#fdedd5] wood-tag-edge shadow-md transition-all duration-200 flex items-center justify-center space-x-1.5 cursor-pointer group"
                  >
                    <Compass className="w-3.5 h-3.5 text-[#f5ba58] group-hover:rotate-45 transition-transform" />
                    <span className="font-song text-xs sm:text-sm font-semibold tracking-[0.25em]">
                      前往清江
                    </span>
                    <span className="text-[#f5ba58] text-xs group-hover:translate-x-1 transition-transform">
                      »
                    </span>
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
