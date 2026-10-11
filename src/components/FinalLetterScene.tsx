import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  ArrowLeft,
  Mail,
  Flame,
  Compass,
  RotateCcw,
} from 'lucide-react';
import dawnVillageBg from '../assets/images/enshi_dawn_village_1788858399024.jpg';
import dawnQingjiangBg from '../assets/images/enshi_dawn_qingjiang_1788858419162.jpg';
import { ambientSound } from '../utils/ambientAudio';
import { FinalNotebook } from './final/FinalNotebook';
import { FinalLetterModal } from './final/FinalLetterModal';
import { JourneyClues } from '../types';

interface FinalLetterSceneProps {
  onRestartStory: () => void;
  onBackToLamp?: () => void;
  clues?: JourneyClues;
  onDiscoverClue?: (key: keyof JourneyClues, value?: any) => void;
}

type ScenePhase = 'morning_explore' | 'ending_leave' | 'ending_carry';

export const FinalLetterScene: React.FC<FinalLetterSceneProps> = ({
  onRestartStory,
  onBackToLamp,
  clues,
  onDiscoverClue,
}) => {
  // Scene Phase
  const [phase, setPhase] = useState<ScenePhase>('morning_explore');
  // Entrance monologue: “天快亮了。” ... “那盏灯，也该熄灭了。”
  const [showEntranceBanner, setShowEntranceBanner] = useState<boolean>(true);
  const [entranceStep, setEntranceStep] = useState<number>(0);
  // Audio state
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Exploration trackers for the 3 morning spots
  const [hasInspectedLamp, setHasInspectedLamp] = useState<boolean>(false);
  const [hasInspectedPath, setHasInspectedPath] = useState<boolean>(false);
  const [hasReadFinalLetter, setHasReadFinalLetter] = useState<boolean>(false);

  // Active prompt modal/banner for lamp or path
  const [activePrompt, setActivePrompt] = useState<string[] | null>(null);
  const [activePromptStep, setActivePromptStep] = useState<number>(0);

  // Final letter modal visibility
  const [isLetterModalOpen, setIsLetterModalOpen] = useState<boolean>(false);

  // Ending state: 'leave' | 'carry' | null
  const [chosenEnding, setChosenEnding] = useState<'leave' | 'carry' | null>(null);
  const [endingStage, setEndingStage] = useState<number>(0);

  // Hover target tracker (for restrained, discrete highlighting)
  const [hoveredSpot, setHoveredSpot] = useState<string | null>(null);

  // Initial sound setup & entrance monologue pacing
  useEffect(() => {
    ambientSound.playMorningAmbience();

    // Sequence for entrance text:
    // 0s: “天快亮了。”
    // 2.2s: “那盏灯，也该熄灭了。”
    // 5.5s: fade out completely
    const t1 = setTimeout(() => {
      setEntranceStep(1);
    }, 2200);

    const t2 = setTimeout(() => {
      setShowEntranceBanner(false);
    }, 5600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Handle inspecting the extinguished lamp under the eaves
  const handleInspectLamp = () => {
    const wasAlreadyDone = hasInspectedLamp;
    setHasInspectedLamp(true);
    if (!wasAlreadyDone && hasInspectedPath) {
      ambientSound.playFluteChimeSound();
    }
    setActivePrompt([
      '它亮了一夜。',
      '像是在等一个终于回来的人。',
      '可是，没有人回来。',
    ]);
    setActivePromptStep(0);
  };

  // Handle inspecting the mountain path to Qingjiang
  const handleInspectPath = () => {
    const wasAlreadyDone = hasInspectedPath;
    setHasInspectedPath(true);
    if (!wasAlreadyDone && hasInspectedLamp) {
      ambientSound.playFluteChimeSound();
    }
    setActivePrompt([
      '晨雾在山林与峡谷间缓缓流淌。',
      '这条石阶小路通向江边。',
      '当年离开这里的人，大抵也是踏着这样的露水启程的。',
    ]);
    setActivePromptStep(0);
  };

  // Handle inspecting the letter (requires inspecting lamp and path first)
  const handleInspectLetter = () => {
    if (!hasInspectedLamp || !hasInspectedPath) {
      setActivePrompt([
        '晨曦初现，案头的信纸静静合着。',
        '请先看一看【屋檐下熄灭的灯】与门外【通往清江的小路】吧。',
      ]);
      setActivePromptStep(0);
      return;
    }
    setIsLetterModalOpen(true);
  };

  // Next prompt line
  const handleAdvancePrompt = () => {
    if (!activePrompt) return;
    if (activePromptStep < activePrompt.length - 1) {
      setActivePromptStep((prev) => prev + 1);
    } else {
      setActivePrompt(null);
      setActivePromptStep(0);
    }
  };

  // Handle ending choice
  const handleChooseEnding = (choice: 'leave' | 'carry') => {
    setIsLetterModalOpen(false);
    setHasReadFinalLetter(true);
    setChosenEnding(choice);

    if (choice === 'leave') {
      setPhase('ending_leave');
      ambientSound.playPaperFoldSound();
      ambientSound.playFinalMelody();
      // Step sequence for ending A
      setTimeout(() => setEndingStage(1), 1800);
      setTimeout(() => setEndingStage(2), 4800);
      setTimeout(() => setEndingStage(3), 8200);
    } else {
      setPhase('ending_carry');
      ambientSound.playPaperFoldSound();
      ambientSound.playFinalMelody();
      // Step sequence for ending B
      setTimeout(() => setEndingStage(1), 1800);
      setTimeout(() => setEndingStage(2), 4800);
      setTimeout(() => setEndingStage(3), 8200);
    }
  };

  // Audio Toggle
  const handleToggleMute = () => {
    const isPlaying = ambientSound.toggle();
    setIsMuted(!isPlaying);
  };

  return (
    <div
      id="final-letter-scene-container"
      className="w-full h-full relative overflow-hidden bg-[#0c0a08] select-none flex items-center justify-center"
    >
      {/* 16:9 Aspect Ratio Frame */}
      <div className="relative w-full h-full max-w-[177.78vh] max-h-[56.25vw] aspect-[16/9] shadow-2xl overflow-hidden bg-[#120d09]">
        {/* =========================================================================
            BACKGROUND LAYERS
           ========================================================================= */}
        {/* Scene Background: Enshi Dawn Village (Morning light, mist, extinguished lamp) */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          animate={{
            scale: phase === 'ending_carry' && endingStage >= 2 ? 1.05 : 1.0,
          }}
          transition={{ duration: 4.0, ease: 'easeOut' }}
        >
          <img
            src={
              phase === 'ending_carry' && endingStage >= 2
                ? dawnQingjiangBg
                : dawnVillageBg
            }
            alt="恩施清晨山村水彩画"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter contrast-[1.03] brightness-[0.98]"
          />
        </motion.div>

        {/* Paper Grain & Watercolor Texture Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#b89f81]/15 via-transparent to-[#1a120b]/35 mix-blend-multiply" />
        <div className="absolute inset-0 z-10 pointer-events-none border-[12px] sm:border-[20px] border-[#18110b]/50" />

        {/* =========================================================================
            TOP BAR: Chapter Title, Navigation & Audio
           ========================================================================= */}
        <header className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 z-30 flex items-center justify-between pointer-events-none">
          {/* Chapter Stamp */}
          <div className="flex items-center space-x-2.5">
            {onBackToLamp && phase === 'morning_explore' && (
              <button
                onClick={onBackToLamp}
                className="cursor-pointer pointer-events-auto bg-[#24170f]/90 hover:bg-[#382317] text-[#faebd3] border border-[#6b4c33] p-1.5 wood-tag-edge shadow-md transition-colors mr-1"
                title="返回那盏灯"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            )}
            <div className="bg-[#1e140d]/92 border border-[#69482f] px-3.5 py-1 wood-tag-edge shadow-md">
              <span className="font-calligraphy text-xs sm:text-sm text-[#f7ecd8] tracking-[0.25em]">
                第五幕 · 最后一封信
              </span>
            </div>
            <span className="hidden sm:inline-block font-song text-[10px] text-[#baa386] tracking-widest bg-[#150f0a]/80 px-2 py-0.5 wood-tag-edge border border-[#483321]">
              清晨 · 恩施
            </span>
          </div>

          {/* Sound Mute Toggle */}
          <button
            onClick={handleToggleMute}
            className="cursor-pointer pointer-events-auto bg-[#1e140d]/90 hover:bg-[#312015] text-[#eadbc4] border border-[#6b4c33] px-2.5 py-1 wood-tag-edge shadow-md flex items-center space-x-1 text-xs font-song transition-colors"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#b09075]" />
                <span className="hidden sm:inline">静音</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#d49b42]" />
                <span className="hidden sm:inline">清晨水声</span>
              </>
            )}
          </button>
        </header>

        {/* =========================================================================
            PHASE 1: MORNING FREE EXPLORATION (3 SPOTS: LAMP, LETTER, PATH)
           ========================================================================= */}
        {phase === 'morning_explore' && (() => {
          const bothCluesInspected = hasInspectedLamp && hasInspectedPath;
          return (
            <>
              {/* Top Guided Objective Banner */}
              <div className="absolute top-13 sm:top-14 inset-x-0 z-25 flex justify-center pointer-events-none px-4">
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#19110b]/92 border border-[#6f4f34] px-4 py-1.5 wood-tag-edge shadow-lg text-center flex items-center space-x-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#d49b42]" />
                  <span className="font-song text-xs tracking-[0.2em] text-[#faebd3]">
                    {!bothCluesInspected
                      ? `晨光初照 · 请先细查【屋檐下熄灭的灯】与【门外通往清江的小路】（${(hasInspectedLamp ? 1 : 0) + (hasInspectedPath ? 1 : 0)}/2）`
                      : '晨曦已至 · 屋内案头的最后一封信已可启封阅读'}
                  </span>
                </motion.div>
              </div>

              {/* Spot 1: 屋檐下的灯 (Upper-Left Eaves, extinguished lamp) */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onHoverStart={() => setHoveredSpot('lamp')}
                onHoverEnd={() => setHoveredSpot(null)}
                onClick={handleInspectLamp}
                className="absolute top-[28%] left-[28%] sm:left-[30%] z-20 cursor-pointer pointer-events-auto group select-none flex flex-col items-center"
                title="屋檐下熄灭的灯"
              >
                {/* Indicator icon */}
                <div className="relative flex items-center justify-center mb-1">
                  {!hasInspectedLamp && (
                    <span className="w-7 h-7 rounded-full bg-[#d49b42]/35 animate-ping absolute" />
                  )}
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center border shadow-md transition-colors ${
                      hasInspectedLamp
                        ? 'bg-[#1b120c] border-[#5d412d] text-[#937b65]'
                        : 'bg-[#3b281b] border-2 border-[#f5ba58] text-[#f7e0b5] shadow-[0_0_12px_rgba(245,186,88,0.5)]'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div
                  className={`px-2.5 py-1 text-xs font-song tracking-wider wood-tag-edge shadow-lg whitespace-nowrap transition-all ${
                    hasInspectedLamp
                      ? 'bg-[#1c140d]/90 text-[#b5a38e] border border-[#523b29]'
                      : 'bg-[#291b11]/95 text-[#faebd3] border-2 border-[#d49b42] shadow-[0_2px_10px_rgba(212,155,66,0.35)]'
                  }`}
                >
                  <span>{hasInspectedLamp ? '【屋檐下熄灭的灯 · 已查 ✓】' : '【屋檐下的灯 · 细查】'}</span>
                </div>
              </motion.div>

              {/* Spot 3: 门外通往清江的小路 (Right-Side Winding Dirt Path down to River) */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onHoverStart={() => setHoveredSpot('path')}
                onHoverEnd={() => setHoveredSpot(null)}
                onClick={handleInspectPath}
                className="absolute bottom-[20%] right-[16%] sm:right-[19%] z-20 cursor-pointer pointer-events-auto group select-none flex flex-col items-center"
                title="通往清江的小路"
              >
                <div className="relative flex items-center justify-center mb-1">
                  {!hasInspectedPath && (
                    <span className="w-7 h-7 rounded-full bg-[#d49b42]/35 animate-ping absolute" />
                  )}
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center border shadow-md transition-colors ${
                      hasInspectedPath
                        ? 'bg-[#1b120c] border-[#5d412d] text-[#937b65]'
                        : 'bg-[#322318] border-2 border-[#f5ba58] text-[#f7e0b5] shadow-[0_0_12px_rgba(245,186,88,0.5)]'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div
                  className={`px-2.5 py-1 text-xs font-song tracking-wider wood-tag-edge shadow-lg whitespace-nowrap transition-all ${
                    hasInspectedPath
                      ? 'bg-[#1c140d]/90 text-[#b5a38e] border border-[#523b29]'
                      : 'bg-[#291b11]/95 text-[#faebd3] border-2 border-[#d49b42] shadow-[0_2px_10px_rgba(212,155,66,0.35)]'
                  }`}
                >
                  <span>{hasInspectedPath ? '【通往清江的小路 · 已望 ✓】' : '【通往清江的小路 · 远眺】'}</span>
                </div>
              </motion.div>

              {/* Spot 2: 桌上的最后一封信 (Center-Lower Table - Unlocks after lamp & path) */}
              <motion.div
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onHoverStart={() => setHoveredSpot('letter')}
                onHoverEnd={() => setHoveredSpot(null)}
                onClick={handleInspectLetter}
                className="absolute bottom-[24%] left-[43%] sm:left-[45%] z-20 cursor-pointer pointer-events-auto group select-none flex flex-col items-center"
                title="案头上的最后一封信"
              >
                <div className="relative flex items-center justify-center mb-1">
                  {bothCluesInspected && !hasReadFinalLetter && (
                    <span className="w-8 h-8 rounded-full bg-[#782819]/40 animate-ping absolute" />
                  )}
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                      bothCluesInspected
                        ? 'bg-[#782819] border-[#f5ba58] shadow-[0_0_14px_#782819]'
                        : 'bg-[#261910] border-[#5a3e29] text-[#937b65]'
                    }`}
                  >
                    <Mail
                      className={`w-3.5 h-3.5 ${
                        bothCluesInspected ? 'text-[#faebd4]' : 'text-[#8c745d]'
                      }`}
                    />
                  </span>
                </div>
                <div
                  className={`px-3.5 py-1.5 text-xs font-song tracking-[0.25em] wood-tag-edge shadow-xl whitespace-nowrap flex items-center space-x-1.5 transition-all ${
                    bothCluesInspected
                      ? 'bg-[#782819] group-hover:bg-[#8f301e] text-[#faebd4] font-semibold border-2 border-[#f5ba58]'
                      : 'bg-[#22160f]/92 text-[#a8937b] border border-[#5e412a]'
                  }`}
                >
                  {bothCluesInspected && (
                    <Sparkles className="w-3.5 h-3.5 text-[#f5ba58]" />
                  )}
                  <span>
                    {hasReadFinalLetter
                      ? '【最后一封信 · 研毕】'
                      : bothCluesInspected
                      ? '【桌上的最后一封信 · 启封阅读】'
                      : '【桌上的信封 · 待先查晨景】'}
                  </span>
                </div>
              </motion.div>

              {/* Active Dialogue / Monologue Banner for Lamp & Path */}
              <AnimatePresence>
                {activePrompt && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-16 sm:bottom-20 inset-x-0 flex justify-center z-30 pointer-events-auto"
                  >
                    <div
                      onClick={handleAdvancePrompt}
                      className="cursor-pointer max-w-md bg-[#18110b]/94 border-2 border-[#7a583c] px-6 py-3.5 wood-tag-edge shadow-2xl text-center space-y-1.5 select-none"
                    >
                      <p className="font-calligraphy text-base sm:text-lg text-[#faebd3] tracking-[0.2em] leading-relaxed">
                        “{activePrompt[activePromptStep]}”
                      </p>
                      <span className="font-song text-[11px] text-[#b39578] block">
                        {activePromptStep < activePrompt.length - 1
                          ? '点击继续听……'
                          : '点击收起'}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          );
        })()}

        {/* =========================================================================
            PHASE 2: ENDING A - 【把信留下】
           ========================================================================= */}
        {phase === 'ending_leave' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center select-none"
          >
            {/* Soft morning breeze overlay */}
            <div className="absolute inset-0 bg-[#120d09]/45 backdrop-blur-[2px] pointer-events-none" />

            <div className="relative z-10 max-w-xl space-y-6">
              {/* Lines 1 & 2 */}
              <AnimatePresence>
                {endingStage >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="space-y-3"
                  >
                    <p className="font-calligraphy text-lg sm:text-2xl text-[#fbf1de] tracking-[0.3em] leading-relaxed">
                      “有些故事，不需要带走。”
                    </p>
                    <p className="font-calligraphy text-base sm:text-xl text-[#dfceb5] tracking-[0.25em]">
                      “因为它已经有人替你记住。”
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Line 3: 这一次，灯可以熄灭了 */}
              <AnimatePresence>
                {endingStage >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="pt-2"
                  >
                    <p className="font-song text-sm sm:text-base text-[#baa080] tracking-[0.3em]">
                      “这一次，灯可以熄灭了。”
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Final Epilogue Card */}
              <AnimatePresence>
                {endingStage >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.4 }}
                    className="pt-6 flex flex-col items-center space-y-4"
                  >
                    {/* Final Title */}
                    <div className="bg-[#1a110a]/92 border-2 border-[#825c3e] px-10 py-5 wood-tag-edge shadow-2xl space-y-2">
                      <h1 className="font-calligraphy text-3xl sm:text-4xl text-[#fbf0dd] tracking-[0.35em]">
                        《回声》
                      </h1>
                      <p className="font-song text-xs sm:text-sm text-[#d4bd9e] tracking-[0.25em]">
                        愿每一个离开的人，都知道回来的路。
                      </p>
                      <div className="pt-2 border-t border-[#6b472e]/60">
                        <p className="font-song text-[11px] text-[#9c7f63] tracking-widest">
                          有些声音不会消失。因为总有人，还记得它从哪里来。
                        </p>
                      </div>
                    </div>

                    {/* Return button: 【重新听见】 */}
                    <motion.button
                      id="restart-story-btn-leave"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={onRestartStory}
                      className="cursor-pointer px-9 py-2.5 bg-[#782819] hover:bg-[#8f301e] text-[#faebd4] font-song text-sm font-semibold tracking-[0.35em] wood-tag-edge shadow-xl border border-[#b25742] flex items-center space-x-2 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4 text-[#f5ba58]" />
                      <span>重新听见</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* =========================================================================
            PHASE 3: ENDING B - 【带着信离开】
           ========================================================================= */}
        {phase === 'ending_carry' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center select-none"
          >
            {/* Morning mist on river overlay */}
            <div className="absolute inset-0 bg-[#120d09]/45 backdrop-blur-[1px] pointer-events-none" />

            <div className="relative z-10 max-w-xl space-y-6">
              {/* Lines 1 & 2 */}
              <AnimatePresence>
                {endingStage >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="space-y-3"
                  >
                    <p className="font-calligraphy text-lg sm:text-2xl text-[#fbf1de] tracking-[0.3em] leading-relaxed">
                      “有些东西，只有被带到更远的地方，”
                    </p>
                    <p className="font-calligraphy text-base sm:text-xl text-[#dfceb5] tracking-[0.25em]">
                      “才会继续被听见。”
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Line 3: Qingjiang & Village distant echo */}
              <AnimatePresence>
                {endingStage >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="pt-2"
                  >
                    <p className="font-song text-sm sm:text-base text-[#baa080] tracking-[0.3em]">
                      身后，晨雾渐渐笼住了村庄与吊脚楼。
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Final Epilogue Card */}
              <AnimatePresence>
                {endingStage >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.4 }}
                    className="pt-6 flex flex-col items-center space-y-4"
                  >
                    {/* Final Title */}
                    <div className="bg-[#1a110a]/92 border-2 border-[#825c3e] px-10 py-5 wood-tag-edge shadow-2xl space-y-2">
                      <h1 className="font-calligraphy text-3xl sm:text-4xl text-[#fbf0dd] tracking-[0.35em]">
                        《回声》
                      </h1>
                      <div className="space-y-1">
                        <p className="font-song text-xs sm:text-sm text-[#d4bd9e] tracking-[0.25em]">
                          故乡不会追着你回来。
                        </p>
                        <p className="font-song text-xs sm:text-sm text-[#baa080] tracking-[0.25em]">
                          它只是一直在那里。
                        </p>
                      </div>
                      <div className="pt-2 border-t border-[#6b472e]/60">
                        <p className="font-song text-[11px] text-[#9c7f63] tracking-widest">
                          有些声音不会消失。因为总有人，还记得它从哪里来。
                        </p>
                      </div>
                    </div>

                    {/* Return button: 【重新听见】 */}
                    <motion.button
                      id="restart-story-btn-carry"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={onRestartStory}
                      className="cursor-pointer px-9 py-2.5 bg-[#782819] hover:bg-[#8f301e] text-[#faebd4] font-song text-sm font-semibold tracking-[0.35em] wood-tag-edge shadow-xl border border-[#b25742] flex items-center space-x-2 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4 text-[#f5ba58]" />
                      <span>重新听见</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* =========================================================================
            FIRST ENTRANCE MONOLOGUE BANNER
            “天快亮了。” (pause) “那盏灯，也该熄灭了。”
           ========================================================================= */}
        <AnimatePresence>
          {showEntranceBanner && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 1.0 }}
              className="absolute bottom-16 sm:bottom-20 inset-x-0 flex justify-center z-35 pointer-events-none"
            >
              <div className="bg-[#18110b]/94 border border-[#6b4c32] text-[#f5ecd9] font-calligraphy text-base sm:text-lg px-8 py-3 wood-tag-edge shadow-2xl tracking-[0.25em] text-center space-y-1">
                <p>“天快亮了。”</p>
                {entranceStep >= 1 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-[#dfccb3] text-sm sm:text-base"
                  >
                    “那盏灯，也该熄灭了。”
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            FINAL NOTEBOOK (Bottom-Right Floating Drawer)
           ========================================================================= */}
        <FinalNotebook
          hasInspectedLamp={hasInspectedLamp}
          hasInspectedPath={hasInspectedPath}
          hasReadFinalLetter={hasReadFinalLetter}
          chosenEnding={chosenEnding}
        />

        {/* =========================================================================
            FINAL LETTER READING & DECISION MODAL
           ========================================================================= */}
        <FinalLetterModal
          isOpen={isLetterModalOpen}
          onClose={() => setIsLetterModalOpen(false)}
          onChooseEnding={handleChooseEnding}
        />
      </div>
    </div>
  );
};
