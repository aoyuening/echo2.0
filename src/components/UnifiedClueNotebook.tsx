import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, X, Check, Sparkles, Feather } from 'lucide-react';
import { JourneyClues } from '../types';
import { ambientSound } from '../utils/ambientAudio';
import letterTexture from '../assets/images/vintage_letter_texture_1788855040945.jpg';

interface UnifiedClueNotebookProps {
  clues: JourneyClues;
}

export const UnifiedClueNotebook: React.FC<UnifiedClueNotebookProps> = ({ clues }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | '1' | '2' | '3' | '4' | '5'>('all');

  // Count total discovered clues
  const totalClues = [
    clues.cabinLetter,
    clues.cabinPhoto,
    clues.cabinRadio,
    clues.cabinLamp,
    clues.qingjiangSteps,
    clues.qingjiangBox,
    clues.pierButton,
    clues.qingjiangSecondLetter,
    clues.pierBoat,
    clues.lampShoes,
    clues.lampBamboo,
    clues.lampPhotoFit,
    clues.lampRadio,
    clues.lampTea,
    clues.lampThirdLetter,
    clues.lampKeptDawn,
    clues.finalLetterRead,
  ].filter(Boolean).length;

  const handleToggle = () => {
    ambientSound.playPageTurnSound();
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    ambientSound.playPaperFoldSound();
    setIsOpen(false);
  };

  return (
    <>
      {/* ===================================================================
          Collapsed State: Authentic Vintage Weathered Pocket Notebook
          Position: Strictly Bottom-Left Corner
         =================================================================== */}
      <div
        id="unified-clue-notebook-container"
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 select-none pointer-events-auto"
      >
        <motion.button
          id="unified-clue-notebook-trigger"
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          onClick={handleToggle}
          className="group relative cursor-pointer bg-[#241912] hover:bg-[#2e2017] text-[#eddcc3] border border-[#6b4a33] px-3.5 py-2.5 wood-tag-edge shadow-[0_4px_16px_rgba(0,0,0,0.7)] flex items-center space-x-2.5 transition-all duration-200"
          title="翻开线索手记"
        >
          {/* Stitched notebook spine detail */}
          <div className="w-1.5 h-6 bg-[#8a5d3b] rounded-xs border-r border-[#452b1b] flex flex-col justify-between py-0.5">
            <span className="w-full h-0.5 bg-[#d4ab73]" />
            <span className="w-full h-0.5 bg-[#d4ab73]" />
            <span className="w-full h-0.5 bg-[#d4ab73]" />
          </div>

          <div className="flex flex-col items-start leading-tight text-left">
            <div className="flex items-center space-x-1.5">
              <span className="font-song text-xs sm:text-sm font-medium text-[#f5ebd7] tracking-wider">
                《回声》手记
              </span>
              <span className="text-[10px] font-song text-[#bfa07d] tracking-widest px-1 py-0.2 bg-[#17100b] rounded-xs border border-[#4d3423]">
                {totalClues}
              </span>
            </div>
            <span className="font-song text-[10px] text-[#9c8266] tracking-widest">
              你走过的路
            </span>
          </div>
        </motion.button>
      </div>

      {/* ===================================================================
          Expanded State: Hand-stitched Old Paper Notebook Unfold
         =================================================================== */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#080605]/85 backdrop-blur-[2px] select-none">
            {/* Backdrop click to close */}
            <div className="absolute inset-0 cursor-pointer" onClick={handleClose} />

            {/* Main Notebook Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-2xl max-h-[88vh] flex flex-col bg-[#ebd8b0] border-2 border-[#825b3a] paper-edge-rough shadow-[0_15px_45px_rgba(0,0,0,0.85)] overflow-hidden"
              style={{
                backgroundImage: `url(${letterTexture})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Rice paper subtle tint overlay */}
              <div className="absolute inset-0 bg-[#f4ecd8]/92 mix-blend-multiply pointer-events-none" />

              {/* Notebook Header */}
              <div className="relative z-10 px-6 pt-5 pb-3 border-b border-[#a8825a]/40 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <Feather className="w-4 h-4 text-[#8a3320]" />
                    <h3 className="font-song text-xl sm:text-2xl text-[#2b1d14] font-semibold tracking-[0.25em]">
                      《回声》
                    </h3>
                  </div>
                  <p className="font-song text-xs text-[#70523b] tracking-widest mt-0.5">
                    你走过的路 · 岁月与归途手记
                  </p>
                </div>

                <button
                  onClick={handleClose}
                  className="cursor-pointer text-[#7a583d] hover:text-[#2b1d14] p-1.5 transition-colors"
                  title="合上手记"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chapter Tabs */}
              <div className="relative z-10 px-6 pt-2 border-b border-[#a8825a]/30 flex items-center space-x-2 overflow-x-auto scrollbar-none text-xs font-song">
                {[
                  { id: 'all', label: '全部踪迹' },
                  { id: '1', label: '一、老屋' },
                  { id: '2', label: '二、清江' },
                  { id: '3', label: '三、旧码头' },
                  { id: '4', label: '四、那盏灯' },
                  { id: '5', label: '五、最后一封信' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    className={`cursor-pointer px-3 py-1.5 transition-all duration-150 border-b-2 whitespace-nowrap tracking-wider ${
                      activeTab === t.id
                        ? 'border-[#8a3320] text-[#8a3320] font-semibold bg-[#e0ce9f]/40'
                        : 'border-transparent text-[#6e513a] hover:text-[#2b1d14]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Notebook Scrollable Content */}
              <div className="relative z-10 p-6 overflow-y-auto space-y-6 text-[#2d1e15] font-song text-sm">
                {/* -------------------------------------------------------------
                    一、老屋
                   ------------------------------------------------------------- */}
                {(activeTab === 'all' || activeTab === '1') && (
                  <div className="space-y-3 pb-3 border-b border-[#9e7a56]/20">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-[#8a3320] rotate-45" />
                      <h4 className="font-song text-base font-semibold text-[#382317] tracking-[0.2em]">
                        一、老屋
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-4">
                      {/* 1. Letter */}
                      <div className="p-2.5 bg-[#f0e4c6]/70 border border-[#b8956e]/50 rounded-xs flex items-start space-x-2">
                        <span className={`w-4 h-4 rounded-xs mt-0.5 flex items-center justify-center text-[10px] ${
                          clues.cabinLetter ? 'bg-[#8a3320] text-[#f7eedc]' : 'border border-[#9c7854] text-transparent'
                        }`}>
                          ✓
                        </span>
                        <div className="space-y-0.5">
                          <p className="font-medium text-xs text-[#2b1a10] tracking-wider">
                            案头第一封信
                          </p>
                          <p className="text-[11px] text-[#6e533d] leading-relaxed">
                            {clues.cabinLetter
                              ? '“沿着清江往下走。” 启封了沉睡多年的往事。'
                              : '静静躺在阁楼木桌上的泛黄信笺。'}
                          </p>
                        </div>
                      </div>

                      {/* 2. Photo */}
                      <div className="p-2.5 bg-[#f0e4c6]/70 border border-[#b8956e]/50 rounded-xs flex items-start space-x-2">
                        <span className={`w-4 h-4 rounded-xs mt-0.5 flex items-center justify-center text-[10px] ${
                          clues.cabinPhoto ? 'bg-[#8a3320] text-[#f7eedc]' : 'border border-[#9c7854] text-transparent'
                        }`}>
                          ✓
                        </span>
                        <div className="space-y-0.5">
                          <p className="font-medium text-xs text-[#2b1a10] tracking-wider">
                            墙上老照片
                          </p>
                          <p className="text-[11px] text-[#6e533d] leading-relaxed">
                            {clues.cabinPhoto
                              ? '黑白合影里，青年站在木桥旁，背面刻有依稀铅笔字。'
                              : '木墙上挂着的一张泛黄合影。'}
                          </p>
                        </div>
                      </div>

                      {/* 3. Radio */}
                      <div className="p-2.5 bg-[#f0e4c6]/70 border border-[#b8956e]/50 rounded-xs flex items-start space-x-2">
                        <span className={`w-4 h-4 rounded-xs mt-0.5 flex items-center justify-center text-[10px] ${
                          clues.cabinRadio ? 'bg-[#8a3320] text-[#f7eedc]' : 'border border-[#9c7854] text-transparent'
                        }`}>
                          ✓
                        </span>
                        <div className="space-y-0.5">
                          <p className="font-medium text-xs text-[#2b1a10] tracking-wider">
                            窗边老收音机
                          </p>
                          <p className="text-[11px] text-[#6e533d] leading-relaxed">
                            {clues.cabinRadio
                              ? '穿透沙沙杂音的微弱声响，像是远山传来的低语。'
                              : '木窗旁带着旋钮的旧式收音机。'}
                          </p>
                        </div>
                      </div>

                      {/* 4. Lamp */}
                      <div className="p-2.5 bg-[#f0e4c6]/70 border border-[#b8956e]/50 rounded-xs flex items-start space-x-2">
                        <span className={`w-4 h-4 rounded-xs mt-0.5 flex items-center justify-center text-[10px] ${
                          clues.cabinLamp ? 'bg-[#8a3320] text-[#f7eedc]' : 'border border-[#9c7854] text-transparent'
                        }`}>
                          ✓
                        </span>
                        <div className="space-y-0.5">
                          <p className="font-medium text-xs text-[#2b1a10] tracking-wider">
                            案头旧油灯
                          </p>
                          <p className="text-[11px] text-[#6e533d] leading-relaxed">
                            {clues.cabinLamp
                              ? '跳动的暖黄色火苗，照亮了桌角微凹的“归”字刻痕。'
                              : '老屋书桌上等待点亮的煤油灯。'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------------------
                    二、清江
                   ------------------------------------------------------------- */}
                {(activeTab === 'all' || activeTab === '2') && (
                  <div className="space-y-3 pb-3 border-b border-[#9e7a56]/20">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-[#8a3320] rotate-45" />
                      <h4 className="font-song text-base font-semibold text-[#382317] tracking-[0.2em]">
                        二、清江
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-4">
                      {/* Steps */}
                      <div className="p-2.5 bg-[#f0e4c6]/70 border border-[#b8956e]/50 rounded-xs flex items-start space-x-2">
                        <span className={`w-4 h-4 rounded-xs mt-0.5 flex items-center justify-center text-[10px] ${
                          clues.qingjiangSteps ? 'bg-[#8a3320] text-[#f7eedc]' : 'border border-[#9c7854] text-transparent'
                        }`}>
                          ✓
                        </span>
                        <div className="space-y-0.5">
                          <p className="font-medium text-xs text-[#2b1a10] tracking-wider">
                            青石阶与江水
                          </p>
                          <p className="text-[11px] text-[#6e533d] leading-relaxed">
                            {clues.qingjiangSteps
                              ? '潮湿的青石阶浸在清冽江水里，卵石间水光闪烁。'
                              : '顺着信件指引走下江滩的石阶。'}
                          </p>
                        </div>
                      </div>

                      {/* Box */}
                      <div className="p-2.5 bg-[#f0e4c6]/70 border border-[#b8956e]/50 rounded-xs flex items-start space-x-2">
                        <span className={`w-4 h-4 rounded-xs mt-0.5 flex items-center justify-center text-[10px] ${
                          clues.qingjiangBox ? 'bg-[#8a3320] text-[#f7eedc]' : 'border border-[#9c7854] text-transparent'
                        }`}>
                          ✓
                        </span>
                        <div className="space-y-0.5">
                          <p className="font-medium text-xs text-[#2b1a10] tracking-wider">
                            锈蚀铁盒
                          </p>
                          <p className="text-[11px] text-[#6e533d] leading-relaxed">
                            {clues.qingjiangBox
                              ? '卡在石缝深处的旧铁盒，生锈的搭扣封存了岁月。'
                              : '石隙间半隐半现的铁盒。'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------------------
                    三、旧码头
                   ------------------------------------------------------------- */}
                {(activeTab === 'all' || activeTab === '3') && (
                  <div className="space-y-3 pb-3 border-b border-[#9e7a56]/20">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-[#8a3320] rotate-45" />
                      <h4 className="font-song text-base font-semibold text-[#382317] tracking-[0.2em]">
                        三、旧码头
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-4">
                      {/* Button */}
                      <div className="p-2.5 bg-[#f0e4c6]/70 border border-[#b8956e]/50 rounded-xs flex items-start space-x-2">
                        <span className={`w-4 h-4 rounded-xs mt-0.5 flex items-center justify-center text-[10px] ${
                          clues.pierButton ? 'bg-[#8a3320] text-[#f7eedc]' : 'border border-[#9c7854] text-transparent'
                        }`}>
                          ✓
                        </span>
                        <div className="space-y-0.5">
                          <p className="font-medium text-xs text-[#2b1a10] tracking-wider">
                            黄铜纽扣
                          </p>
                          <p className="text-[11px] text-[#6e533d] leading-relaxed">
                            {clues.pierButton
                              ? '暗淡的金属微光，像旧衣物上脱落的唯一信物。'
                              : '盒中静卧的铜质小纽扣。'}
                          </p>
                        </div>
                      </div>

                      {/* Second Letter */}
                      <div className="p-2.5 bg-[#f0e4c6]/70 border border-[#b8956e]/50 rounded-xs flex items-start space-x-2">
                        <span className={`w-4 h-4 rounded-xs mt-0.5 flex items-center justify-center text-[10px] ${
                          clues.qingjiangSecondLetter ? 'bg-[#8a3320] text-[#f7eedc]' : 'border border-[#9c7854] text-transparent'
                        }`}>
                          ✓
                        </span>
                        <div className="space-y-0.5">
                          <p className="font-medium text-xs text-[#2b1a10] tracking-wider">
                            第二封信
                          </p>
                          <p className="text-[11px] text-[#6e533d] leading-relaxed">
                            {clues.qingjiangSecondLetter
                              ? '“去找那盏还亮着的灯。” 望向对岸山腰的微茫火光。'
                              : '铁盒中取出的第二封折叠信纸。'}
                          </p>
                        </div>
                      </div>

                      {/* Boat */}
                      <div className="p-2.5 bg-[#f0e4c6]/70 border border-[#b8956e]/50 rounded-xs flex items-start space-x-2">
                        <span className={`w-4 h-4 rounded-xs mt-0.5 flex items-center justify-center text-[10px] ${
                          clues.pierBoat ? 'bg-[#8a3320] text-[#f7eedc]' : 'border border-[#9c7854] text-transparent'
                        }`}>
                          ✓
                        </span>
                        <div className="space-y-0.5">
                          <p className="font-medium text-xs text-[#2b1a10] tracking-wider">
                            岸边木船
                          </p>
                          <p className="text-[11px] text-[#6e533d] leading-relaxed">
                            {clues.pierBoat
                              ? '系在枯树桩旁的旧木舟，随清江微波轻轻摇荡。'
                              : '码头边等待解缆的木船。'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------------------
                    四、那盏灯
                   ------------------------------------------------------------- */}
                {(activeTab === 'all' || activeTab === '4') && (
                  <div className="space-y-3 pb-3 border-b border-[#9e7a56]/20">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-[#8a3320] rotate-45" />
                      <h4 className="font-song text-base font-semibold text-[#382317] tracking-[0.2em]">
                        四、那盏灯
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-4">
                      {/* Shoes */}
                      <div className="p-2.5 bg-[#f0e4c6]/70 border border-[#b8956e]/50 rounded-xs flex items-start space-x-2">
                        <span className={`w-4 h-4 rounded-xs mt-0.5 flex items-center justify-center text-[10px] ${
                          clues.lampShoes ? 'bg-[#8a3320] text-[#f7eedc]' : 'border border-[#9c7854] text-transparent'
                        }`}>
                          ✓
                        </span>
                        <div className="space-y-0.5">
                          <p className="font-medium text-xs text-[#2b1a10] tracking-wider">
                            门口旧布鞋
                          </p>
                          <p className="text-[11px] text-[#6e533d] leading-relaxed">
                            {clues.lampShoes
                              ? '鞋底沾着干涸的山泥，踏过崎岖遥远的山路。'
                              : '吊脚楼门槛旁的粗布鞋。'}
                          </p>
                        </div>
                      </div>

                      {/* Bamboo */}
                      <div className="p-2.5 bg-[#f0e4c6]/70 border border-[#b8956e]/50 rounded-xs flex items-start space-x-2">
                        <span className={`w-4 h-4 rounded-xs mt-0.5 flex items-center justify-center text-[10px] ${
                          clues.lampBamboo ? 'bg-[#8a3320] text-[#f7eedc]' : 'border border-[#9c7854] text-transparent'
                        }`}>
                          ✓
                        </span>
                        <div className="space-y-0.5">
                          <p className="font-medium text-xs text-[#2b1a10] tracking-wider">
                            窗边竹编
                          </p>
                          <p className="text-[11px] text-[#6e533d] leading-relaxed">
                            {clues.lampBamboo
                              ? '经年摩挲的温润竹纹，手艺留了下来，人却走远了。'
                              : '窗棂边倚着的陈年竹器。'}
                          </p>
                        </div>
                      </div>

                      {/* Photo & Button Fit */}
                      <div className="p-2.5 bg-[#f0e4c6]/70 border border-[#b8956e]/50 rounded-xs flex items-start space-x-2">
                        <span className={`w-4 h-4 rounded-xs mt-0.5 flex items-center justify-center text-[10px] ${
                          clues.lampPhotoFit ? 'bg-[#8a3320] text-[#f7eedc]' : 'border border-[#9c7854] text-transparent'
                        }`}>
                          ✓
                        </span>
                        <div className="space-y-0.5">
                          <p className="font-medium text-xs text-[#2b1a10] tracking-wider">
                            纽扣与照片吻合
                          </p>
                          <p className="text-[11px] text-[#6e533d] leading-relaxed">
                            {clues.lampPhotoFit
                              ? '照片里青年的衣领缺角，与清江边拾得的纽扣严丝合缝。'
                              : '墙上旧照与信物的暗合之处。'}
                          </p>
                        </div>
                      </div>

                      {/* Radio broadcast */}
                      <div className="p-2.5 bg-[#f0e4c6]/70 border border-[#b8956e]/50 rounded-xs flex items-start space-x-2">
                        <span className={`w-4 h-4 rounded-xs mt-0.5 flex items-center justify-center text-[10px] ${
                          clues.lampRadio ? 'bg-[#8a3320] text-[#f7eedc]' : 'border border-[#9c7854] text-transparent'
                        }`}>
                          ✓
                        </span>
                        <div className="space-y-0.5">
                          <p className="font-medium text-xs text-[#2b1a10] tracking-wider">
                            老收音机电波
                          </p>
                          <p className="text-[11px] text-[#6e533d] leading-relaxed">
                            {clues.lampRadio
                              ? '“……清江……回来……” 穿过千山万壑未曾停歇的回声。'
                              : '木架上接收远山电波的旧收音机。'}
                          </p>
                        </div>
                      </div>

                      {/* Tea */}
                      <div className="p-2.5 bg-[#f0e4c6]/70 border border-[#b8956e]/50 rounded-xs flex items-start space-x-2">
                        <span className={`w-4 h-4 rounded-xs mt-0.5 flex items-center justify-center text-[10px] ${
                          clues.lampTea ? 'bg-[#8a3320] text-[#f7eedc]' : 'border border-[#9c7854] text-transparent'
                        }`}>
                          ✓
                        </span>
                        <div className="space-y-0.5">
                          <p className="font-medium text-xs text-[#2b1a10] tracking-wider">
                            案头温热茶
                          </p>
                          <p className="text-[11px] text-[#6e533d] leading-relaxed">
                            {clues.lampTea
                              ? '一碗重新沏好的热茶，热气袅袅，像是等候的人下一秒就会归来。'
                              : '粗陶茶具与等待沏开的清茶。'}
                          </p>
                        </div>
                      </div>

                      {/* Third Letter */}
                      <div className="p-2.5 bg-[#f0e4c6]/70 border border-[#b8956e]/50 rounded-xs flex items-start space-x-2">
                        <span className={`w-4 h-4 rounded-xs mt-0.5 flex items-center justify-center text-[10px] ${
                          clues.lampThirdLetter ? 'bg-[#8a3320] text-[#f7eedc]' : 'border border-[#9c7854] text-transparent'
                        }`}>
                          ✓
                        </span>
                        <div className="space-y-0.5">
                          <p className="font-medium text-xs text-[#2b1a10] tracking-wider">
                            第三封信
                          </p>
                          <p className="text-[11px] text-[#6e533d] leading-relaxed">
                            {clues.lampThirdLetter
                              ? '“如果有人替我打开这封信，请替我把灯留到天亮。”'
                              : '案头留下的最后一卷字迹。'}
                          </p>
                        </div>
                      </div>

                      {/* Lamp kept */}
                      <div className="p-2.5 bg-[#f0e4c6]/70 border border-[#b8956e]/50 rounded-xs flex items-start space-x-2 col-span-1 sm:col-span-2">
                        <span className={`w-4 h-4 rounded-xs mt-0.5 flex items-center justify-center text-[10px] ${
                          clues.lampKeptDawn ? 'bg-[#8a3320] text-[#f7eedc]' : 'border border-[#9c7854] text-transparent'
                        }`}>
                          ✓
                        </span>
                        <div className="space-y-0.5">
                          <p className="font-medium text-xs text-[#2b1a10] tracking-wider">
                            把灯留到天亮
                          </p>
                          <p className="text-[11px] text-[#6e533d] leading-relaxed">
                            {clues.lampKeptDawn
                              ? '屋檐下的长明油灯，驱散了漫漫长夜的孤寂，亮到了晨曦。'
                              : '替他守住这一盏照亮夜路的光。'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------------------
                    五、最后一封信
                   ------------------------------------------------------------- */}
                {(activeTab === 'all' || activeTab === '5') && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-[#8a3320] rotate-45" />
                      <h4 className="font-song text-base font-semibold text-[#382317] tracking-[0.2em]">
                        五、最后一封信
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5 pl-4">
                      {/* Final letter */}
                      <div className="p-3 bg-[#f0e4c6]/70 border border-[#b8956e]/50 rounded-xs flex items-start space-x-2.5">
                        <span className={`w-4 h-4 rounded-xs mt-0.5 flex items-center justify-center text-[10px] ${
                          clues.finalLetterRead ? 'bg-[#8a3320] text-[#f7eedc]' : 'border border-[#9c7854] text-transparent'
                        }`}>
                          ✓
                        </span>
                        <div className="space-y-1">
                          <p className="font-medium text-xs text-[#2b1a10] tracking-wider">
                            给后来的人 · 最后一封信
                          </p>
                          <p className="text-[11px] text-[#6e533d] leading-relaxed">
                            {clues.finalLetterRead
                              ? '“这封信并不是写给某一个特定的人。它是写给所有有一天会离开故乡，又终有一天会想起故乡的人。”'
                              : '晨光穿透薄雾，案头那封写给后来者的真正信件。'}
                          </p>
                        </div>
                      </div>

                      {/* Ending Choice */}
                      <div className="p-3 bg-[#f0e4c6]/70 border border-[#b8956e]/50 rounded-xs flex items-start space-x-2.5">
                        <span className={`w-4 h-4 rounded-xs mt-0.5 flex items-center justify-center text-[10px] ${
                          clues.finalEndingChoice ? 'bg-[#8a3320] text-[#f7eedc]' : 'border border-[#9c7854] text-transparent'
                        }`}>
                          ✓
                        </span>
                        <div className="space-y-1">
                          <p className="font-medium text-xs text-[#2b1a10] tracking-wider">
                            心之所向 · 归宿抉择
                          </p>
                          <p className="text-[11px] text-[#6e533d] leading-relaxed">
                            {clues.finalEndingChoice === 'leave'
                              ? '【带着回声，回到山外】——离开故乡的人，心里从此多了一盏灯。'
                              : clues.finalEndingChoice === 'carry'
                              ? '【留下来，守着清江与灯】——走过千万里的人，终于回到了江边。'
                              : '晨光已至，留给每一个寻路之人的静默回答。'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Notebook Footer */}
              <div className="relative z-10 px-6 py-3.5 border-t border-[#a8825a]/30 bg-[#ded0b1]/50 flex items-center justify-between">
                <span className="text-xs font-song text-[#7a583d] tracking-wider">
                  已收录 {totalClues} / 17 处踪迹
                </span>

                <button
                  onClick={handleClose}
                  className="cursor-pointer px-5 py-1.5 bg-[#2a1b12] hover:bg-[#382418] text-[#f7eedc] font-song text-xs tracking-[0.2em] wood-tag-edge border border-[#6b472e] shadow-sm transition-transform duration-150 hover:-translate-y-0.5"
                >
                  【合上笔记】
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
