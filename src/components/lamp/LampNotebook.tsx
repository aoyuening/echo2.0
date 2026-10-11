import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ChevronUp, ChevronDown, Check, Sparkles } from 'lucide-react';

interface LampNotebookProps {
  hasClothShoesClue: boolean;
  hasPhotoClue: boolean;
  hasTeaClue: boolean;
  hasBambooClue: boolean;
  hasRadioClue: boolean;
  hasThirdLetterClue: boolean;
  isLampKeptTillDawn: boolean;
}

export const LampNotebook: React.FC<LampNotebookProps> = ({
  hasClothShoesClue,
  hasPhotoClue,
  hasTeaClue,
  hasBambooClue,
  hasRadioClue,
  hasThirdLetterClue,
  isLampKeptTillDawn,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // 6 previous clues from Scene 1-3 + 3 new clues from Scene 4
  const totalClues =
    6 +
    (hasPhotoClue ? 1 : 0) +
    (hasBambooClue ? 1 : 0) +
    (hasThirdLetterClue ? 1 : 0);

  return (
    <div
      id="lamp-notebook-container"
      className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-35 pointer-events-auto"
    >
      <motion.div
        layout
        className="w-64 sm:w-76 bg-[#ebd9b2] border border-[#a88a55] paper-edge-rough shadow-[0_8px_25px_rgba(0,0,0,0.65)] overflow-hidden"
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
              ({totalClues}/9)
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
              className="relative z-10 p-3 sm:p-4 space-y-3 max-h-[56vh] overflow-y-auto"
            >
              {/* Task Section */}
              <div className="space-y-1 border-b border-[#cbbb90] pb-2">
                <span className="text-[10px] font-song text-[#7a5f43] tracking-widest block">
                  《回声》 · 恩施吊脚楼
                </span>
                <p className="font-song text-xs text-[#2f1f14] leading-relaxed">
                  {isLampKeptTillDawn
                    ? '“一盏守到天亮的灯，一条回家的路。”'
                    : hasThirdLetterClue
                    ? '“替他把灯留到天亮。”'
                    : '“看看这栋吊脚楼里，留下了谁的故事。”'}
                </p>
              </div>

              {/* Clues List */}
              <div className="space-y-2">
                <span className="text-[10px] font-song text-[#7a5f43] tracking-widest block">
                  已发现的记忆：
                </span>

                <div className="space-y-1.5 text-xs font-song">
                  {/* Clue 1: 清江 */}
                  <div className="flex items-center space-x-2 py-0.5 text-[#2b1b11]">
                    <span className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold bg-[#9e2e1a] text-[#fbf3e4]">
                      一
                    </span>
                    <span className="font-calligraphy text-xs sm:text-sm tracking-wider">
                      清江
                    </span>
                    <span className="text-[9px] text-[#735841] font-song ml-auto">
                      案头旧信
                    </span>
                  </div>

                  {/* Clue 2: 江边 */}
                  <div className="flex items-center space-x-2 py-0.5 text-[#2b1b11]">
                    <span className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold bg-[#9e2e1a] text-[#fbf3e4]">
                      二
                    </span>
                    <span className="font-calligraphy text-xs sm:text-sm tracking-wider">
                      江边
                    </span>
                    <span className="text-[9px] text-[#735841] font-song ml-auto">
                      老照片
                    </span>
                  </div>

                  {/* Clue 3: 一段声音 */}
                  <div className="flex items-center space-x-2 py-0.5 text-[#2b1b11]">
                    <span className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold bg-[#9e2e1a] text-[#fbf3e4]">
                      三
                    </span>
                    <span className="font-calligraphy text-xs sm:text-sm tracking-wider">
                      一段声音
                    </span>
                    <span className="text-[9px] text-[#735841] font-song ml-auto">
                      窗边电波
                    </span>
                  </div>

                  {/* Clue 4: 旧石阶 */}
                  <div className="flex items-center space-x-2 py-0.5 text-[#2b1b11]">
                    <span className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold bg-[#9e2e1a] text-[#fbf3e4]">
                      四
                    </span>
                    <span className="font-calligraphy text-xs sm:text-sm tracking-wider">
                      旧石阶
                    </span>
                    <span className="text-[9px] text-[#735841] font-song ml-auto">
                      曾有人下江
                    </span>
                  </div>

                  {/* Clue 5: 旧纽扣 */}
                  <div className="flex items-center space-x-2 py-0.5 text-[#2b1b11]">
                    <span className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold bg-[#9e2e1a] text-[#fbf3e4]">
                      五
                    </span>
                    <span className="font-calligraphy text-xs sm:text-sm tracking-wider">
                      旧纽扣
                    </span>
                    <span className="text-[9px] text-[#735841] font-song ml-auto">
                      木盒铜扣
                    </span>
                  </div>

                  {/* Clue 6: 第二封信 */}
                  <div className="flex items-center space-x-2 py-0.5 text-[#2b1b11]">
                    <span className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold bg-[#9e2e1a] text-[#fbf3e4]">
                      六
                    </span>
                    <span className="font-calligraphy text-xs sm:text-sm tracking-wider">
                      第二封信
                    </span>
                    <span className="text-[9px] text-[#735841] font-song ml-auto">
                      去找那盏灯
                    </span>
                  </div>

                  {/* Clue 7: 照片里的人 */}
                  <div
                    className={`flex items-start space-x-2 py-0.5 transition-colors ${
                      hasPhotoClue ? 'text-[#2b1b11]' : 'text-[#9c8264]/70 italic'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5 ${
                        hasPhotoClue ? 'bg-[#9e2e1a] text-[#fbf3e4]' : 'bg-[#cfbc96] text-[#786147]'
                      }`}
                    >
                      七
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-calligraphy text-xs sm:text-sm tracking-wider">
                          {hasPhotoClue ? '照片里的人' : '待观察'}
                        </span>
                        {hasPhotoClue && (
                          <span className="text-[9px] text-[#735841] font-song">
                            旧衣铜扣
                          </span>
                        )}
                      </div>
                      {hasPhotoClue && (
                        <p className="text-[10px] text-[#6b4c30] mt-0.5">
                          “他曾经住在这里。”
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Clue 8: 生活里的手艺 */}
                  <div
                    className={`flex items-start space-x-2 py-0.5 transition-colors ${
                      hasBambooClue ? 'text-[#2b1b11]' : 'text-[#9c8264]/70 italic'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5 ${
                        hasBambooClue ? 'bg-[#9e2e1a] text-[#fbf3e4]' : 'bg-[#cfbc96] text-[#786147]'
                      }`}
                    >
                      八
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-calligraphy text-xs sm:text-sm tracking-wider">
                          {hasBambooClue ? '生活里的手艺' : '待观察'}
                        </span>
                        {hasBambooClue && (
                          <span className="text-[9px] text-[#735841] font-song">
                            竹编旧物
                          </span>
                        )}
                      </div>
                      {hasBambooClue && (
                        <p className="text-[10px] text-[#6b4c30] mt-0.5">
                          “手艺留下来了，人却走远了。”
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Clue 9: 第三封信 */}
                  <div
                    className={`flex items-start space-x-2 py-0.5 transition-colors ${
                      hasThirdLetterClue ? 'text-[#2b1b11]' : 'text-[#9c8264]/70 italic'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5 ${
                        hasThirdLetterClue ? 'bg-[#9e2e1a] text-[#fbf3e4]' : 'bg-[#cfbc96] text-[#786147]'
                      }`}
                    >
                      九
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-calligraphy text-xs sm:text-sm tracking-wider">
                          {hasThirdLetterClue ? '第三封信' : '待打开'}
                        </span>
                        {hasThirdLetterClue && (
                          <span className="text-[9px] text-[#735841] font-song">
                            案上信纸
                          </span>
                        )}
                      </div>
                      {hasThirdLetterClue && (
                        <p className="text-[10px] text-[#6b4c30] mt-0.5 leading-tight">
                          “人走得再远，也总会有一条江，一盏灯，等着你记起回来的路。”
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cottage Living Traces Section (6 Items) */}
              <div className="pt-2.5 border-t border-[#ba9a62]/60 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-song text-[#7a5f43]">
                  <span className="font-semibold flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-[#9e2e1a]" />
                    <span>吊脚楼生活痕迹</span>
                  </span>
                  <span>
                    {(hasClothShoesClue ? 1 : 0) +
                      (hasPhotoClue ? 1 : 0) +
                      (hasTeaClue ? 1 : 0) +
                      (hasBambooClue ? 1 : 0) +
                      (hasRadioClue ? 1 : 0) +
                      (hasThirdLetterClue ? 1 : 0)}
                    /6
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1 text-[10px] font-song">
                  <div
                    className={`px-1.5 py-0.5 wood-tag-edge border flex items-center space-x-1 ${
                      hasClothShoesClue
                        ? 'bg-[#dec899] border-[#917149] text-[#2e1d11]'
                        : 'bg-[#ebd7ae]/60 border-[#c4ab7c] text-[#8c7457]'
                    }`}
                  >
                    {hasClothShoesClue ? (
                      <Check className="w-2.5 h-2.5 text-[#822d1b]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a38b69]" />
                    )}
                    <span>门口布鞋</span>
                  </div>

                  <div
                    className={`px-1.5 py-0.5 wood-tag-edge border flex items-center space-x-1 ${
                      hasPhotoClue
                        ? 'bg-[#dec899] border-[#917149] text-[#2e1d11]'
                        : 'bg-[#ebd7ae]/60 border-[#c4ab7c] text-[#8c7457]'
                    }`}
                  >
                    {hasPhotoClue ? (
                      <Check className="w-2.5 h-2.5 text-[#822d1b]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a38b69]" />
                    )}
                    <span>墙上照片</span>
                  </div>

                  <div
                    className={`px-1.5 py-0.5 wood-tag-edge border flex items-center space-x-1 ${
                      hasTeaClue
                        ? 'bg-[#dec899] border-[#917149] text-[#2e1d11]'
                        : 'bg-[#ebd7ae]/60 border-[#c4ab7c] text-[#8c7457]'
                    }`}
                  >
                    {hasTeaClue ? (
                      <Check className="w-2.5 h-2.5 text-[#822d1b]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a38b69]" />
                    )}
                    <span>粗陶温茶</span>
                  </div>

                  <div
                    className={`px-1.5 py-0.5 wood-tag-edge border flex items-center space-x-1 ${
                      hasBambooClue
                        ? 'bg-[#dec899] border-[#917149] text-[#2e1d11]'
                        : 'bg-[#ebd7ae]/60 border-[#c4ab7c] text-[#8c7457]'
                    }`}
                  >
                    {hasBambooClue ? (
                      <Check className="w-2.5 h-2.5 text-[#822d1b]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a38b69]" />
                    )}
                    <span>窗边竹编</span>
                  </div>

                  <div
                    className={`px-1.5 py-0.5 wood-tag-edge border flex items-center space-x-1 ${
                      hasRadioClue
                        ? 'bg-[#dec899] border-[#917149] text-[#2e1d11]'
                        : 'bg-[#ebd7ae]/60 border-[#c4ab7c] text-[#8c7457]'
                    }`}
                  >
                    {hasRadioClue ? (
                      <Check className="w-2.5 h-2.5 text-[#822d1b]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a38b69]" />
                    )}
                    <span>老收音机</span>
                  </div>

                  <div
                    className={`px-1.5 py-0.5 wood-tag-edge border flex items-center space-x-1 ${
                      hasThirdLetterClue
                        ? 'bg-[#dec899] border-[#917149] text-[#2e1d11]'
                        : 'bg-[#ebd7ae]/60 border-[#c4ab7c] text-[#8c7457]'
                    }`}
                  >
                    {hasThirdLetterClue ? (
                      <Check className="w-2.5 h-2.5 text-[#822d1b]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a38b69]" />
                    )}
                    <span>第三封信</span>
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
