import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ChevronUp, ChevronDown } from 'lucide-react';

interface QingjiangNotebookProps {
  hasStepClue: boolean;
  hasButtonClue: boolean;
  hasSecondLetterClue: boolean;
}

export const QingjiangNotebook: React.FC<QingjiangNotebookProps> = ({
  hasStepClue,
  hasButtonClue,
  hasSecondLetterClue,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // 3 from cabin + up to 3 from river
  const totalClues = 3 + (hasStepClue ? 1 : 0) + (hasButtonClue ? 1 : 0) + (hasSecondLetterClue ? 1 : 0);

  return (
    <div
      id="qingjiang-notebook-container"
      className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-35 pointer-events-auto"
    >
      <motion.div
        layout
        className="w-60 sm:w-72 bg-[#ebd9b2] border border-[#a88a55] paper-edge-rough shadow-[0_8px_25px_rgba(0,0,0,0.65)] overflow-hidden"
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
              ({totalClues}/6)
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
              {/* Header book name */}
              <div className="border-b border-[#cbbb90] pb-2">
                <div className="flex items-center justify-between">
                  <span className="font-song text-xs font-semibold text-[#8c2b18] tracking-[0.25em]">
                    《回声》
                  </span>
                  <span className="text-[10px] font-song text-[#7a5f43]">
                    清江篇
                  </span>
                </div>
                <p className="font-song text-[11px] text-[#5c4632] mt-1 leading-snug">
                  信的下一句话：“沿着清江往下走。”
                </p>
              </div>

              {/* Memory Clues List */}
              <div className="space-y-2">
                <span className="text-[10px] font-song text-[#7a5f43] tracking-widest block">
                  已发现的记忆：
                </span>

                <div className="space-y-2 text-xs font-song max-h-56 overflow-y-auto pr-1">
                  {/* Clue 1: 清江 */}
                  <div className="flex flex-col border-b border-[#ddcca6]/60 pb-1.5">
                    <div className="flex items-center space-x-1.5 text-[#2b1b11]">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#9e2e1a] text-[#fbf3e4] text-[9px] flex items-center justify-center font-bold">
                        一
                      </span>
                      <span className="font-calligraphy text-sm font-semibold tracking-wide">
                        清江
                      </span>
                    </div>
                    <span className="text-[11px] font-song text-[#6e553f] pl-5 mt-0.5">
                      “信里留下的方向。”
                    </span>
                  </div>

                  {/* Clue 2: 江边 */}
                  <div className="flex flex-col border-b border-[#ddcca6]/60 pb-1.5">
                    <div className="flex items-center space-x-1.5 text-[#2b1b11]">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#9e2e1a] text-[#fbf3e4] text-[9px] flex items-center justify-center font-bold">
                        二
                      </span>
                      <span className="font-calligraphy text-sm font-semibold tracking-wide">
                        江边
                      </span>
                    </div>
                    <span className="text-[11px] font-song text-[#6e553f] pl-5 mt-0.5">
                      “照片里的那段夏天。”
                    </span>
                  </div>

                  {/* Clue 3: 一段声音 */}
                  <div className="flex flex-col border-b border-[#ddcca6]/60 pb-1.5">
                    <div className="flex items-center space-x-1.5 text-[#2b1b11]">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#9e2e1a] text-[#fbf3e4] text-[9px] flex items-center justify-center font-bold">
                        三
                      </span>
                      <span className="font-calligraphy text-sm font-semibold tracking-wide">
                        一段声音
                      </span>
                    </div>
                    <span className="text-[11px] font-song text-[#6e553f] pl-5 mt-0.5">
                      “收音机里传来的清江。”
                    </span>
                  </div>

                  {/* Clue 4: 旧石阶 */}
                  <div
                    className={`flex flex-col border-b border-[#ddcca6]/60 pb-1.5 transition-colors ${
                      hasStepClue ? 'text-[#2b1b11]' : 'text-[#9c8264]/70 italic'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5">
                      <span
                        className={`w-3.5 h-3.5 rounded-full text-[9px] flex items-center justify-center font-bold ${
                          hasStepClue ? 'bg-[#9e2e1a] text-[#fbf3e4]' : 'bg-[#cfbc96] text-[#786147]'
                        }`}
                      >
                        四
                      </span>
                      <span className="font-calligraphy text-sm font-semibold tracking-wide">
                        {hasStepClue ? '旧石阶' : '待寻的痕迹'}
                      </span>
                    </div>
                    <span className="text-[11px] font-song text-[#6e553f] pl-5 mt-0.5">
                      {hasStepClue ? '“有人曾从这里下江。”' : '清江岸边留下的足迹……'}
                    </span>
                  </div>

                  {/* Clue 5: 旧纽扣 */}
                  <div
                    className={`flex flex-col border-b border-[#ddcca6]/60 pb-1.5 transition-colors ${
                      hasButtonClue ? 'text-[#2b1b11]' : 'text-[#9c8264]/70 italic'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5">
                      <span
                        className={`w-3.5 h-3.5 rounded-full text-[9px] flex items-center justify-center font-bold ${
                          hasButtonClue ? 'bg-[#9e2e1a] text-[#fbf3e4]' : 'bg-[#cfbc96] text-[#786147]'
                        }`}
                      >
                        五
                      </span>
                      <span className="font-calligraphy text-sm font-semibold tracking-wide">
                        {hasButtonClue ? '旧纽扣' : '待寻的遗物'}
                      </span>
                    </div>
                    <span className="text-[11px] font-song text-[#6e553f] pl-5 mt-0.5">
                      {hasButtonClue ? '“它似乎属于照片里的那个人。”' : '随江水漂来的旧物……'}
                    </span>
                  </div>

                  {/* Clue 6: 第二封信 */}
                  <div
                    className={`flex flex-col pb-1 transition-colors ${
                      hasSecondLetterClue ? 'text-[#2b1b11]' : 'text-[#9c8264]/70 italic'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5">
                      <span
                        className={`w-3.5 h-3.5 rounded-full text-[9px] flex items-center justify-center font-bold ${
                          hasSecondLetterClue ? 'bg-[#9e2e1a] text-[#fbf3e4]' : 'bg-[#cfbc96] text-[#786147]'
                        }`}
                      >
                        六
                      </span>
                      <span className="font-calligraphy text-sm font-semibold tracking-wide text-[#8c2b18]">
                        {hasSecondLetterClue ? '第二封信' : '未寻得的信'}
                      </span>
                    </div>
                    <span className="text-[11px] font-song text-[#6e553f] pl-5 mt-0.5">
                      {hasSecondLetterClue ? '“去找那盏还亮着的灯。”' : '藏在老树旁的信件……'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
