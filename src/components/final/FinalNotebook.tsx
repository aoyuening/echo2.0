import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ChevronUp, ChevronDown, Check, Sparkles } from 'lucide-react';

interface FinalNotebookProps {
  hasInspectedLamp?: boolean;
  hasInspectedPath?: boolean;
  hasReadFinalLetter?: boolean;
  chosenEnding?: 'leave' | 'carry' | null;
}

export const FinalNotebook: React.FC<FinalNotebookProps> = ({
  hasInspectedLamp = false,
  hasInspectedPath = false,
  hasReadFinalLetter = false,
  chosenEnding = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const journeySteps = [
    { title: '一、老屋', desc: '阁楼上的旧木桌，第一封信。', done: true },
    { title: '二、清江', desc: '沿江而下，雾色中的旧石阶。', done: true },
    { title: '三、旧码头', desc: '木盒里的小锁与生锈铜纽扣。', done: true },
    { title: '四、那盏灯', desc: '吊脚楼里的粗陶温茶与旧电波。', done: true },
    {
      title: '五、最后一封信',
      desc: hasReadFinalLetter
        ? '“给后来的人”——故乡是不会消失的声音。'
        : '清晨的案头，静候后来之人。',
      done: hasReadFinalLetter,
    },
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none">
      {/* Toggle Button */}
      <motion.button
        id="final-notebook-toggle"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer bg-[#241a12]/92 hover:bg-[#33251a] text-[#eadbc5] border border-[#7a5a3f] px-3.5 py-2 wood-tag-edge shadow-xl flex items-center space-x-2 text-xs font-song tracking-wider transition-colors"
      >
        <BookOpen className="w-4 h-4 text-[#d49b42]" />
        <span>线索手记 · 回声全览</span>
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 text-[#b39578]" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-[#b39578]" />
        )}
      </motion.button>

      {/* Expanded Notebook Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-12 right-0 w-80 max-h-[75vh] overflow-y-auto bg-[#f4e8d3] border-2 border-[#825e43] wood-tag-edge p-5 shadow-[0_10px_35px_rgba(0,0,0,0.85)] text-[#2d1e13] space-y-4"
          >
            {/* Header */}
            <div className="border-b border-[#bfa278] pb-2 flex items-center justify-between">
              <div>
                <h3 className="font-calligraphy text-lg tracking-[0.25em] text-[#6d2417]">
                  《回声》
                </h3>
                <p className="text-[10px] font-song text-[#75593e] tracking-wider">
                  你走过的路 · 归忆录
                </p>
              </div>
              <span className="text-[11px] font-song px-2 py-0.5 bg-[#e3d0ae] border border-[#a18258] wood-tag-edge">
                终卷
              </span>
            </div>

            {/* Journey Steps List */}
            <div className="space-y-2.5">
              {journeySteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 wood-tag-edge border transition-all ${
                    step.done
                      ? 'bg-[#edd9b7] border-[#9c784f]'
                      : 'bg-[#f7eedf] border-[#d8c29d]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-song font-semibold text-xs tracking-wider text-[#3c2516]">
                      {step.title}
                    </span>
                    {step.done && (
                      <span className="flex items-center space-x-0.5 text-[10px] text-[#7a2517] font-song">
                        <Check className="w-3 h-3 text-[#7a2517]" />
                        <span>已抵</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-song text-[#5f442f] mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Morning Explorations Status */}
            <div className="pt-2 border-t border-[#bfa278] space-y-1.5">
              <span className="text-[10px] font-song text-[#75593e] font-semibold block">
                清晨之物探索：
              </span>
              <div className="grid grid-cols-3 gap-1 text-[10px] font-song text-center">
                <span
                  className={`py-1 wood-tag-edge border ${
                    hasInspectedLamp
                      ? 'bg-[#edd9b7] border-[#8a6540] text-[#3c2516]'
                      : 'bg-[#f7eedf] border-[#d8c29d] text-[#937b65]'
                  }`}
                >
                  {hasInspectedLamp ? '✓ 檐下夜灯' : '檐下夜灯'}
                </span>
                <span
                  className={`py-1 wood-tag-edge border ${
                    hasInspectedPath
                      ? 'bg-[#edd9b7] border-[#8a6540] text-[#3c2516]'
                      : 'bg-[#f7eedf] border-[#d8c29d] text-[#937b65]'
                  }`}
                >
                  {hasInspectedPath ? '✓ 清江小路' : '清江小路'}
                </span>
                <span
                  className={`py-1 wood-tag-edge border ${
                    hasReadFinalLetter
                      ? 'bg-[#edd9b7] border-[#8a6540] text-[#3c2516]'
                      : 'bg-[#f7eedf] border-[#d8c29d] text-[#937b65]'
                  }`}
                >
                  {hasReadFinalLetter ? '✓ 最后一封信' : '最后一封信'}
                </span>
              </div>
            </div>

            {/* Final Ending Record if chosen */}
            {chosenEnding && (
              <div className="bg-[#e4cfab] p-2.5 wood-tag-edge border border-[#8a6540] text-center space-y-1">
                <span className="text-[10px] font-song text-[#8a2f1c] font-semibold flex items-center justify-center space-x-1">
                  <Sparkles className="w-3 h-3 text-[#d49b42]" />
                  <span>
                    终局选择：{chosenEnding === 'leave' ? '【把信留下】' : '【带着信离开】'}
                  </span>
                </span>
              </div>
            )}

            {/* Concluding Footnote */}
            <div className="pt-2 border-t border-[#bfa278] text-center">
              <p className="text-[11px] font-song text-[#75593e] tracking-widest leading-relaxed">
                “你已经走到了故事的尽头。”
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
