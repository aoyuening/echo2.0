import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Hand } from 'lucide-react';
import { ambientSound } from '../../utils/ambientAudio';

interface PierTreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLetter: () => void;
}

export const PierTreeModal: React.FC<PierTreeModalProps> = ({
  isOpen,
  onClose,
  onOpenLetter,
}) => {
  // Current view: 'overview' (the pier, boat, steps, tree) vs 'tree_roots' (dug into soil)
  const [viewState, setViewState] = useState<'overview' | 'tree_roots'>('overview');
  // Sub-observation under overview: 'boat' | 'steps' | 'tree' | null
  const [observeItem, setObserveItem] = useState<'boat' | 'steps' | 'tree' | null>(null);

  // Tree roots interactive digging:
  const [isFirstClicked, setIsFirstClicked] = useState(false);
  const [clearedProgress, setClearedProgress] = useState(0); // 0 to 100
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleObserve = (item: 'boat' | 'steps' | 'tree') => {
    setObserveItem(item);
    if (item === 'steps') ambientSound.playStoneStepSound();
    if (item === 'tree') {
      // Zoom into tree roots after a brief pause
      setTimeout(() => {
        setViewState('tree_roots');
      }, 700);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || clearedProgress >= 100) return;
    if (e.movementX !== 0 || e.movementY !== 0) {
      setClearedProgress((prev) => {
        const next = Math.min(100, prev + 4.5);
        if (Math.random() > 0.6) ambientSound.playDigSoilSound();
        if (next >= 100 && prev < 100) {
          ambientSound.playTinBoxSound();
        }
        return next;
      });
    }
  };

  return (
    <AnimatePresence>
      <div
        id="pier-tree-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      >
        {/* Dim backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0c0907]/85 backdrop-blur-[3px] cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-xl bg-[#ebd7ad] border-2 border-[#b59963] paper-edge-rough shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-5 sm:p-8 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-4 text-[#75593f] hover:text-[#2d1d13] p-1 transition-colors cursor-pointer flex items-center space-x-1 text-xs font-song"
          >
            <span>返回江边</span>
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col items-center text-center space-y-4 pt-1">
            {/* Header tag */}
            <div className="border-b border-[#ad905c]/40 pb-1">
              <span className="text-xs font-song text-[#7a5f45] tracking-[0.25em]">
                {viewState === 'overview' ? '— 旧码头与老树 —' : '— 盘曲的老树根下 —'}
              </span>
            </div>

            {/* STAGE 1: Pier & Tree Overview Observation */}
            {viewState === 'overview' && (
              <div className="w-full flex flex-col items-center space-y-4">
                {/* Visual Pier Scene with interactive hotspots */}
                <div className="relative w-full aspect-[16/9] bg-[#27231e] border border-[#a88a5d] rounded-xs overflow-hidden shadow-inner">
                  {/* SVG illustration representing rustic dock, boat, and gnarled ancient tree */}
                  <svg viewBox="0 0 360 200" className="w-full h-full" preserveAspectRatio="none">
                    {/* Water */}
                    <rect width="360" height="200" fill="#2d3838" />
                    <path d="M0,150 Q120,140 240,155 T360,145 L360,200 L0,200 Z" fill="#202b2c" />

                    {/* Earth shore on right & bottom */}
                    <path d="M140,200 C180,140 230,120 360,110 L360,200 Z" fill="#3d3326" />

                    {/* Weathered Wooden Pier Planks */}
                    <polygon points="10,130 160,120 170,145 20,158" fill="#4a3726" />
                    <polygon points="160,120 180,125 180,165 170,145" fill="#362619" />
                    <rect x="25" y="145" width="8" height="40" fill="#302115" />
                    <rect x="135" y="135" width="8" height="45" fill="#302115" />

                    {/* Wooden Boat Moored */}
                    <path d="M35,115 Q90,112 145,118 Q140,138 90,142 Q40,140 35,115 Z" fill="#4d331e" stroke="#2b1a0d" />
                    <line x1="85" y1="110" x2="85" y2="128" stroke="#755234" strokeWidth="2" />

                    {/* Old Weathered Steps */}
                    <polygon points="165,145 225,135 220,155 160,165" fill="#544c41" />
                    <polygon points="180,160 235,150 230,170 175,180" fill="#473f35" />

                    {/* Massive Ancient Tree Trunk & Exposed Roots */}
                    <path d="M260,0 C270,60 280,100 270,140 C280,155 310,165 350,170 L360,200 L250,200 C230,180 230,160 250,140 C240,80 245,40 250,0 Z" fill="#2c1f15" />
                    {/* Roots clutching the earth */}
                    <path d="M255,145 Q225,160 215,185" stroke="#251a11" strokeWidth="8" strokeLinecap="round" fill="none" />
                    <path d="M280,145 Q305,170 330,185" stroke="#251a11" strokeWidth="7" strokeLinecap="round" fill="none" />
                    <path d="M265,155 Q250,180 255,198" stroke="#1f150e" strokeWidth="6" strokeLinecap="round" fill="none" />
                  </svg>

                  {/* Hotspot 1: 【木船】 */}
                  <button
                    onClick={() => handleObserve('boat')}
                    className="absolute top-[52%] left-[16%] px-2 py-0.5 bg-[#241710]/85 hover:bg-[#3d2719] text-[#edd9b9] border border-[#6e4e36] text-[10px] font-song rounded-xs cursor-pointer shadow-md transition-transform hover:scale-105"
                  >
                    木船
                  </button>

                  {/* Hotspot 2: 【石阶】 */}
                  <button
                    onClick={() => handleObserve('steps')}
                    className="absolute top-[68%] left-[48%] px-2 py-0.5 bg-[#241710]/85 hover:bg-[#3d2719] text-[#edd9b9] border border-[#6e4e36] text-[10px] font-song rounded-xs cursor-pointer shadow-md transition-transform hover:scale-105"
                  >
                    石阶
                  </button>

                  {/* Hotspot 3: 【老树】 */}
                  <button
                    onClick={() => handleObserve('tree')}
                    className="absolute top-[60%] right-[18%] px-2.5 py-0.5 bg-[#782819]/90 hover:bg-[#91301d] text-[#faedd8] border border-[#a8442c] text-[10px] font-song rounded-xs cursor-pointer shadow-md transition-transform hover:scale-110 flex items-center space-x-1 animate-pulse"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-[#f5ba58]" />
                    <span>老树根</span>
                  </button>
                </div>

                {/* Narrative observation display */}
                <div className="space-y-1 min-h-[48px] flex flex-col items-center justify-center">
                  {!observeItem && (
                    <p className="font-song text-xs sm:text-sm text-[#3b2719] leading-relaxed">
                      “这里的水，好像比别处浅。”
                      <br />
                      <span className="text-[11px] text-[#735a43] font-handwriting">
                        （点击码头边的木船、石阶或老树进行细致观察）
                      </span>
                    </p>
                  )}

                  {observeItem === 'boat' && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-song text-xs sm:text-sm text-[#2a1a10]">
                      “船已经很久没有使用了，船缆早已浸烂在泥里。”
                    </motion.p>
                  )}

                  {observeItem === 'steps' && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-song text-xs sm:text-sm text-[#2a1a10]">
                      “石头上留下了水痕，江水涨落的印迹清晰可辨。”
                    </motion.p>
                  )}

                  {observeItem === 'tree' && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-song text-xs sm:text-sm text-[#8c2d1b] font-medium">
                      “树根旁，好像埋着什么……（正靠近树根查看）”
                    </motion.p>
                  )}
                </div>
              </div>
            )}

            {/* STAGE 2: Interactive Tree Roots & Soil Dragging */}
            {viewState === 'tree_roots' && (
              <div className="w-full flex flex-col items-center space-y-4">
                <div className="text-left w-full flex items-center justify-between text-xs font-song text-[#75593f]">
                  <span>老树裸露的粗壮根须深处</span>
                  <button
                    onClick={() => setViewState('overview')}
                    className="underline hover:text-[#2d1d13] cursor-pointer"
                  >
                    返回码头全景
                  </button>
                </div>

                {/* Soil Dragging Sandbox */}
                <div
                  onMouseDown={() => {
                    setIsFirstClicked(true);
                    setIsDragging(true);
                  }}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseLeave={() => setIsDragging(false)}
                  onMouseMove={handleMouseMove}
                  className="relative w-full max-w-sm aspect-[4/3] bg-[#221811] border-2 border-[#69482d] rounded-xs overflow-hidden select-none cursor-grab active:cursor-grabbing shadow-2xl"
                >
                  {/* Buried Rusty Tin Box (revealed as mud is cleared) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[#1a110a]">
                    {/* Gnarled roots framing the box */}
                    <svg viewBox="0 0 200 150" className="absolute inset-0 w-full h-full pointer-events-none opacity-85">
                      <path d="M0,20 Q60,40 100,20 T200,30" stroke="#382215" strokeWidth="14" fill="none" />
                      <path d="M15,140 Q40,90 80,100 T190,130" stroke="#301c10" strokeWidth="16" fill="none" />
                    </svg>

                    {/* The Antique Iron Tin Box */}
                    <div className="relative z-10 w-44 sm:w-52 h-28 sm:h-32 bg-gradient-to-b from-[#403831] via-[#2d2722] to-[#1c1815] border-2 border-[#54473b] rounded-xs shadow-2xl flex flex-col items-center justify-center p-3">
                      {/* Rusty patina textures */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-color-burn"
                        style={{
                          backgroundImage:
                            'radial-gradient(#8c4524 1.5px, transparent 1.5px), radial-gradient(#61321b 1px, transparent 1px)',
                          backgroundSize: '16px 16px',
                        }}
                      />
                      {/* Tin Box Latch */}
                      <div className="w-10 h-4 bg-[#756250] border border-[#3b3026] rounded-xs shadow-md mb-2" />
                      <span className="font-song text-xs text-[#baa080] tracking-widest text-center">
                        生锈的铁盒
                      </span>
                      <span className="font-song text-[10px] text-[#78634d] mt-0.5">
                        表面沾满陈年干泥
                      </span>
                    </div>
                  </div>

                  {/* Mud Layer Over the Box (Clears away on drag) */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-150"
                    style={{
                      opacity: Math.max(0.05, (100 - clearedProgress) / 100),
                      backgroundColor: '#382517',
                      backgroundImage:
                        'radial-gradient(circle at 40% 40%, #573a25 0%, transparent 60%), radial-gradient(circle at 70% 70%, #29190e 0%, transparent 70%)',
                    }}
                  />

                  {/* Drag Prompt Cue if not fully cleared */}
                  {clearedProgress < 100 && (
                    <div className="absolute inset-x-0 bottom-3 flex justify-center pointer-events-none">
                      <div className="bg-[#1c120a]/90 text-[#ecdcb9] text-[11px] font-song px-3 py-1 rounded-sm border border-[#5e412b] shadow flex items-center space-x-1.5">
                        <Hand className="w-3.5 h-3.5 text-[#d49b42] animate-bounce" />
                        <span>按住鼠标左右来回拖动，拨开树根旁的泥土</span>
                        <span className="text-[#e6aa45] font-mono font-bold ml-1">
                          ({Math.round(clearedProgress)}%)
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom text & action */}
                <div className="space-y-2 max-w-sm">
                  {!isFirstClicked && (
                    <p className="font-song text-xs text-[#4d3623]">
                      “被泥土埋住了，试着动手拨开厚厚的泥层。”
                    </p>
                  )}

                  {clearedProgress < 100 && isFirstClicked && (
                    <p className="font-song text-xs text-[#735841]">
                      泥土被一点点拨开，生锈铁盒的轮廓越来越清晰……
                    </p>
                  )}

                  {clearedProgress >= 100 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-3 pt-1"
                    >
                      <p className="font-song text-xs sm:text-sm text-[#2b1b11] font-semibold">
                        泥土已被完全拨开，铁盒静静躺在树根里。
                      </p>
                      <button
                        id="open-tin-box-button"
                        onClick={onOpenLetter}
                        className="cursor-pointer px-8 py-2.5 bg-[#8c2d1b] hover:bg-[#772414] text-[#fcf0d9] font-song text-sm font-semibold tracking-[0.25em] wood-tag-edge shadow-xl transition-all hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
                      >
                        <Sparkles className="w-4 h-4 text-[#f5ba58]" />
                        <span>打开铁盒</span>
                        <span className="text-[#f5ba58]">»</span>
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
