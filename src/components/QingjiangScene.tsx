import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import qingjiangBg from '../assets/images/enshi_qingjiang_scene_1788856749404.jpg';
import { QingjiangNotebook } from './qingjiang/QingjiangNotebook';
import { StoneStepsModal } from './qingjiang/StoneStepsModal';
import { DriftingBoxModal } from './qingjiang/DriftingBoxModal';
import { PierTreeModal } from './qingjiang/PierTreeModal';
import { SecondLetterModal } from './qingjiang/SecondLetterModal';
import { ambientSound } from '../utils/ambientAudio';
import { ArrowLeft, Sparkles, Flame, Check, Waves } from 'lucide-react';
import { JourneyClues } from '../types';

interface QingjiangSceneProps {
  onBackToCabin: () => void;
  onBackToCover: () => void;
  onNavigateToLamp?: () => void;
  clues?: JourneyClues;
  onDiscoverClue?: (key: keyof JourneyClues, value?: any) => void;
}

export const QingjiangScene: React.FC<QingjiangSceneProps> = ({
  onBackToCabin,
  onBackToCover,
  onNavigateToLamp,
  clues,
  onDiscoverClue,
}) => {
  // Clues State for Qingjiang Chapter - synchronized with global persistent clues
  const [hasStepClue, setHasStepClue] = useState(clues?.qingjiangSteps ?? false);
  const [hasButtonClue, setHasButtonClue] = useState(clues?.pierButton ?? false);
  const [hasSecondLetterClue, setHasSecondLetterClue] = useState(clues?.qingjiangSecondLetter ?? false);

  useEffect(() => {
    if (clues?.qingjiangSteps) setHasStepClue(true);
    if (clues?.pierButton) setHasButtonClue(true);
    if (clues?.qingjiangSecondLetter) setHasSecondLetterClue(true);
  }, [clues?.qingjiangSteps, clues?.pierButton, clues?.qingjiangSecondLetter]);

  const isAllQingjiangCluesFound = hasStepClue && hasButtonClue && hasSecondLetterClue;
  const qingjiangDiscoveredCount = [hasStepClue, hasButtonClue, hasSecondLetterClue].filter(Boolean).length;

  const handleRecordStepClue = () => {
    setHasStepClue(true);
    onDiscoverClue?.('qingjiangSteps', true);
  };

  const handleRecordButtonClue = () => {
    setHasButtonClue(true);
    onDiscoverClue?.('pierButton', true);
    onDiscoverClue?.('qingjiangBox', true);
  };

  const handleRecordSecondLetterClue = () => {
    setHasSecondLetterClue(true);
    onDiscoverClue?.('qingjiangSecondLetter', true);
  };

  // Modals
  const [isStepsModalOpen, setIsStepsModalOpen] = useState(false);
  const [isBoxModalOpen, setIsBoxModalOpen] = useState(false);
  const [isPierModalOpen, setIsPierModalOpen] = useState(false);
  const [isSecondLetterOpen, setIsSecondLetterOpen] = useState(false);

  // Hover states for subtle physical feedback (no harsh glow)
  const [hoveredTarget, setHoveredTarget] = useState<'steps' | 'box' | 'pier' | null>(null);

  // Opening Book-Page Transition State (~1.4s)
  const [isPageTransitioning, setIsPageTransitioning] = useState(true);

  // Initial Narrative Monologue (“沿着信里的话，你来到了清江边。” 停留约3秒后慢慢消失)
  const [showEntranceMonologue, setShowEntranceMonologue] = useState(false);

  // First-Layer Guidance (“信里说，要沿着江往下走。” 然后消失)
  const [showFirstGuide, setShowFirstGuide] = useState(false);

  // Inactivity / Idle Hints: 8s -> 15s -> 25s -> 35s
  const [idleHintIndex, setIdleHintIndex] = useState<number | null>(null);
  const idleTimer1Ref = useRef<NodeJS.Timeout | null>(null);
  const idleTimer2Ref = useRef<NodeJS.Timeout | null>(null);
  const idleTimer3Ref = useRef<NodeJS.Timeout | null>(null);
  const idleTimer4Ref = useRef<NodeJS.Timeout | null>(null);
  const hideHintTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Distant Lamp Chapter Ending
  const [showNextChapterModal, setShowNextChapterModal] = useState(false);

  // Clear idle timers
  const clearAllIdleTimers = () => {
    if (idleTimer1Ref.current) clearTimeout(idleTimer1Ref.current);
    if (idleTimer2Ref.current) clearTimeout(idleTimer2Ref.current);
    if (idleTimer3Ref.current) clearTimeout(idleTimer3Ref.current);
    if (idleTimer4Ref.current) clearTimeout(idleTimer4Ref.current);
    if (hideHintTimerRef.current) clearTimeout(hideHintTimerRef.current);
  };

  const resetIdleTimer = () => {
    if (hasSecondLetterClue) {
      setIdleHintIndex(null);
      return;
    }

    setIdleHintIndex(null);
    clearAllIdleTimers();

    // 8s: “江边，好像留下了什么。”
    idleTimer1Ref.current = setTimeout(() => {
      setIdleHintIndex(0);
      hideHintTimerRef.current = setTimeout(() => setIdleHintIndex(null), 3200);

      // 15s: “你可以再看看那几级旧石阶。”
      idleTimer2Ref.current = setTimeout(() => {
        setIdleHintIndex(1);
        hideHintTimerRef.current = setTimeout(() => setIdleHintIndex(null), 3200);

        // 25s: “有些东西，不会自己浮出水面。”
        idleTimer3Ref.current = setTimeout(() => {
          setIdleHintIndex(2);
          hideHintTimerRef.current = setTimeout(() => setIdleHintIndex(null), 3200);

          // 35s: “那棵老树，好像比其他地方更安静。”
          idleTimer4Ref.current = setTimeout(() => {
            setIdleHintIndex(3);
            hideHintTimerRef.current = setTimeout(() => setIdleHintIndex(null), 3500);
          }, 10000);
        }, 10000);
      }, 7000);
    }, 8000);
  };

  // Entrance Lifecycle
  useEffect(() => {
    ambientSound.start();

    // Page-turn animation lasts 1.4s
    const pageTimer = setTimeout(() => {
      setIsPageTransitioning(false);
      // Wait 1s, then show opening narration
      const monoTimer = setTimeout(() => {
        setShowEntranceMonologue(true);
        // Stays 3s then fades
        const monoFadeTimer = setTimeout(() => {
          setShowEntranceMonologue(false);
          // Then first guide shows briefly
          const guideTimer = setTimeout(() => {
            setShowFirstGuide(true);
            const guideFadeTimer = setTimeout(() => {
              setShowFirstGuide(false);
              resetIdleTimer();
            }, 3000);
            return () => clearTimeout(guideFadeTimer);
          }, 600);
          return () => clearTimeout(guideTimer);
        }, 3200);
        return () => clearTimeout(monoFadeTimer);
      }, 1000);
      return () => clearTimeout(monoTimer);
    }, 1400);

    return () => {
      clearTimeout(pageTimer);
      clearAllIdleTimers();
    };
  }, []);

  const handleUserActivity = () => {
    resetIdleTimer();
  };

  // Audio trigger when second letter is collected & distant lamp lights up
  useEffect(() => {
    if (hasSecondLetterClue) {
      const chimeTimer = setTimeout(() => {
        ambientSound.playFluteChimeSound();
      }, 1200);
      return () => clearTimeout(chimeTimer);
    }
  }, [hasSecondLetterClue]);

  const idleHintTexts = [
    '江边，好像留下了什么。',
    '你可以再看看那几级旧石阶。',
    '有些东西，不会自己浮出水面。',
    '那棵老树，好像比其他地方更安静。',
  ];

  return (
    <div
      id="qingjiang-scene"
      onMouseMove={handleUserActivity}
      onClick={handleUserActivity}
      className="relative w-full h-full overflow-hidden bg-[#0e1010] flex items-center justify-center select-none"
    >
      {/* 16:9 Aspect Ratio Master Container */}
      <div className="relative w-full h-full max-w-[177.78vh] max-h-[56.25vw] aspect-[16/9] overflow-hidden shadow-2xl">
        {/* Hand-painted Watercolor Qingjiang River Background */}
        <motion.div
          animate={
            hasSecondLetterClue
              ? { filter: 'saturate(0.82) brightness(0.78) contrast(1.08)' } // Evening twilight deepens after finding letter
              : { filter: 'saturate(0.92) brightness(0.96) contrast(1.02)' }
          }
          transition={{ duration: 3.5, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src={qingjiangBg}
            alt="恩施清江山水画"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Dynamic Subtle River Flow Wave Effect */}
        <motion.div
          animate={{
            opacity: [0.12, 0.24, 0.12],
            backgroundPosition: ['0% 0%', '100% 50%', '0% 0%'],
          }}
          transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
          className="absolute inset-0 z-1 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 48% 65%, rgba(135, 175, 175, 0.25) 0%, transparent 65%)',
          }}
        />

        {/* Mountain Mist Drifting across Valleys */}
        <motion.div
          animate={{
            x: ['-2%', '3%', '-2%'],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{ repeat: Infinity, duration: 22, ease: 'easeInOut' }}
          className="absolute top-[8%] left-[20%] w-[55%] h-[35%] pointer-events-none z-2"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(220, 230, 235, 0.3) 0%, rgba(180, 195, 200, 0.1) 50%, transparent 80%)',
            filter: 'blur(12px)',
          }}
        />

        {/* Distant Birds Flying Across (Very subtle) */}
        <motion.div
          animate={{
            x: ['-20%', '120%'],
            y: ['30%', '24%'],
            opacity: [0, 0.45, 0.45, 0],
          }}
          transition={{
            repeat: Infinity,
            repeatDelay: 25,
            duration: 18,
            ease: 'linear',
          }}
          className="absolute top-[12%] left-0 w-32 h-10 pointer-events-none z-2 flex items-center space-x-3"
        >
          <svg viewBox="0 0 40 12" className="w-5 h-2 text-[#2e3b3c] opacity-60">
            <path d="M0,8 Q5,0 10,8 Q15,0 20,8" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <svg viewBox="0 0 40 12" className="w-4 h-1.5 text-[#2e3b3c] opacity-50">
            <path d="M0,8 Q5,0 10,8 Q15,0 20,8" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* Vintage Paper Storybook Texture Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay z-3"
          style={{
            backgroundImage:
              'radial-gradient(#cfb283 1px, transparent 1px), radial-gradient(#6d4c2b 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
          }}
        />

        {/* Storybook Outer Wooden Border */}
        <div className="absolute inset-0 pointer-events-none border-[10px] sm:border-[16px] md:border-[20px] border-[#101211]/80 z-4" />

        {/* Top-Left: Return Navigation */}
        <div className="absolute top-4 sm:top-6 left-5 sm:left-7 z-30 flex items-center space-x-2.5 pointer-events-auto">
          <button
            id="back-to-cabin-button"
            onClick={onBackToCabin}
            className="cursor-pointer px-3 py-1.5 bg-[#1f2523]/85 hover:bg-[#2b3532] text-[#d6ded9] font-song text-xs tracking-wider border border-[#485752]/70 wood-tag-edge transition-colors flex items-center space-x-1.5 shadow-sm"
            title="返回恩施老屋"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>老屋旧忆</span>
          </button>

          <div className="hidden md:flex items-center space-x-2 text-xs font-song text-[#b2c2bc]/90 bg-[#141b19]/70 px-2.5 py-1 rounded-sm border border-[#3e4f4a]/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#82aa9c]" />
            <span className="tracking-widest">第三界面 · 清江边</span>
          </div>
        </div>

        {/* THE THREE CORE INTERACTIVE ZONES */}

        {/* 1. 【江边旧石阶】 (Mid-Left, 几级伸入江水的旧石阶 - 明显线索) */}
        <div
          id="stone-steps-hotspot"
          onClick={() => {
            handleUserActivity();
            setIsStepsModalOpen(true);
          }}
          onMouseEnter={() => setHoveredTarget('steps')}
          onMouseLeave={() => setHoveredTarget(null)}
          className="absolute left-[13%] bottom-[12%] w-[20%] h-[26%] cursor-pointer z-15 flex flex-col items-center justify-end group select-none"
          title="江边旧石阶 · 潮湿水痕"
        >
          {/* Beacon Ping Ring when not discovered yet */}
          {!hasStepClue && (
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              className="absolute -top-3 w-8 h-8 rounded-full border border-[#82aa9c] pointer-events-none"
            />
          )}

          {/* Prominent Weathered Wood Clue Tag */}
          <motion.div
            animate={
              hoveredTarget === 'steps'
                ? { y: -3, scale: 1.04 }
                : { y: 0, scale: 1 }
            }
            transition={{ duration: 0.25 }}
            className={`px-3 py-1.5 text-xs font-song tracking-wider wood-tag-edge shadow-lg flex items-center space-x-1.5 whitespace-nowrap mb-2 transition-all ${
              hasStepClue
                ? 'bg-[#15201e]/90 text-[#b5c7c0] border border-[#3e524d]'
                : 'bg-[#1a2924]/95 text-[#f9ebd7] border-2 border-[#5c8577] shadow-[0_4px_14px_rgba(92,133,119,0.4)]'
            }`}
          >
            {!hasStepClue ? (
              <span className="w-2 h-2 rounded-full bg-[#f2c668] animate-pulse inline-block" />
            ) : (
              <Check className="w-3.5 h-3.5 text-[#7ea396]" />
            )}
            <span className="font-semibold">
              {hasStepClue ? '江边旧石阶 · 已拓' : '江边旧石阶 · 细看'}
            </span>
          </motion.div>

          {/* Tiered Hand-painted Slate Steps Silhouette with River Moss */}
          <div className="relative flex flex-col items-center">
            <div className="w-20 sm:w-24 h-8 sm:h-10 relative flex flex-col items-center justify-end">
              {/* Slate Step Slabs */}
              <div className="w-20 sm:w-24 h-2.5 bg-[#2d3a36]/85 border-b border-[#445752]/70 rounded-[1px] shadow-sm" />
              <div className="w-16 sm:w-19 h-2.5 bg-[#23312d]/90 border-b border-[#3b4c48]/70 rounded-[1px]" />
              <div className="w-12 sm:w-14 h-2 bg-[#1b2523]/95 rounded-[1px]" />
              {/* Moss Clusters */}
              <div className="absolute top-1 left-2.5 w-3.5 h-1.5 bg-[#476643]/75 rounded-full blur-[0.5px]" />
              <div className="absolute top-3.5 right-3 w-4 h-1.5 bg-[#3a5437]/75 rounded-full blur-[0.5px]" />
            </div>

            {/* Lapping Water Ripple beneath the lowest step */}
            <motion.div
              animate={{
                scale: [0.95, 1.3, 0.95],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{ repeat: Infinity, duration: 3.4, ease: 'easeInOut' }}
              className="w-28 sm:w-32 h-5 rounded-full bg-[#82aa9c]/30 blur-[2px] -mt-1 pointer-events-none"
            />
          </div>

          {/* Whisper tooltip on hover */}
          <AnimatePresence>
            {hoveredTarget === 'steps' && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute -top-7 whitespace-nowrap bg-[#131b19]/95 text-[#f5ecd9] font-song text-[11px] px-2.5 py-1 wood-tag-edge border border-[#526b64] pointer-events-none shadow-xl z-20"
              >
                石阶伸入滚滚清江，缝隙间似乎刻有旧痕
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. 【漂来的旧木盒】 (Distant River Current / Far Water Reach, 离远一点) */}
        <div
          id="drifting-box-hotspot"
          onClick={() => {
            handleUserActivity();
            setIsBoxModalOpen(true);
          }}
          onMouseEnter={() => setHoveredTarget('box')}
          onMouseLeave={() => setHoveredTarget(null)}
          className="absolute left-[44%] bottom-[29%] w-[7%] h-[8%] cursor-pointer z-12 flex items-center justify-center group"
          title="远处的旧木盒"
        >
          {/* Subtle Bobbing Motion in distant water current */}
          <motion.div
            animate={{
              y: [0, -3, 0],
              rotate: [-1, 1, -1],
            }}
            transition={{
              repeat: Infinity,
              duration: 4.8,
              ease: 'easeInOut',
            }}
            className="relative flex flex-col items-center"
          >
            {/* Hand-painted Wooden Box Icon in distant water - scaled down for perspective depth */}
            <div className="relative w-6 h-4 sm:w-7 sm:h-4.5 bg-[#332215]/90 border border-[#5c3e23]/80 shadow-[0_2px_8px_rgba(0,0,0,0.65)] rounded-[1px] flex items-center justify-center group-hover:border-[#aa7744] transition-colors">
              <div className="w-3.5 h-[1px] bg-[#543b27]" />
              {!hasButtonClue && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#d49b42]/70 animate-ping pointer-events-none" />
              )}
            </div>

            {/* Subtle distant ripple around box */}
            <motion.div
              animate={{ scale: [0.85, 1.3, 0.85], opacity: [0.12, 0.35, 0.12] }}
              transition={{ repeat: Infinity, duration: 4.2 }}
              className="w-9 h-2.5 rounded-full bg-[#b2d5cc]/20 blur-[1.5px] -mt-0.5 pointer-events-none"
            />

            {/* Tiny hover hint */}
            <AnimatePresence>
              {hoveredTarget === 'box' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute -top-7 whitespace-nowrap bg-[#171f1e]/90 text-[#ebdcc6] font-song text-[11px] px-2.5 py-1 wood-tag-edge border border-[#485c57] pointer-events-none shadow-md"
                >
                  远处的江面漂着一个旧木盒
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* 3. 【旧码头与老树】 (Right, 停泊木船、古树根与石台 - 明显线索) */}
        <div
          id="pier-tree-hotspot"
          onClick={() => {
            handleUserActivity();
            setIsPierModalOpen(true);
          }}
          onMouseEnter={() => setHoveredTarget('pier')}
          onMouseLeave={() => setHoveredTarget(null)}
          className="absolute right-[5%] bottom-[10%] w-[26%] h-[46%] cursor-pointer z-15 flex flex-col items-center justify-end select-none group"
          title="老树根与旧码头"
        >
          {/* Beacon Ping Ring when not discovered yet */}
          {!hasSecondLetterClue && (
            <motion.div
              animate={{ scale: [1, 1.45, 1], opacity: [0.6, 0.1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
              className="absolute top-[28%] right-[38%] w-8 h-8 rounded-full border border-[#c49258] pointer-events-none"
            />
          )}

          {/* Prominent Weathered Wood Clue Tag */}
          <motion.div
            animate={
              hoveredTarget === 'pier'
                ? { y: -3, scale: 1.04 }
                : { y: 0, scale: 1 }
            }
            transition={{ duration: 0.25 }}
            className={`px-3 py-1.5 text-xs font-song tracking-wider wood-tag-edge shadow-lg flex items-center space-x-1.5 whitespace-nowrap mb-3 transition-all z-20 ${
              hasSecondLetterClue
                ? 'bg-[#15201e]/90 text-[#b5c7c0] border border-[#3e524d]'
                : 'bg-[#1f160e]/95 text-[#faebd4] border-2 border-[#825c38] shadow-[0_4px_14px_rgba(130,92,56,0.45)]'
            }`}
          >
            {!hasSecondLetterClue ? (
              <span className="w-2 h-2 rounded-full bg-[#f5ba58] animate-pulse inline-block" />
            ) : (
              <Check className="w-3.5 h-3.5 text-[#9e7a55]" />
            )}
            <span className="font-semibold">
              {hasSecondLetterClue ? '老树根与旧码头 · 已查' : '老树根与旧码头 · 细查'}
            </span>
          </motion.div>

          {/* Pier & Gnarled Tree Roots Visual Hints */}
          <div className="relative flex flex-col items-center">
            {/* Wooden Mooring Planks & Piles Silhouette */}
            <div className="w-24 sm:w-28 h-12 relative flex items-end justify-center">
              {/* Wooden Mooring Post */}
              <div className="w-3 h-10 bg-[#2d1e14]/90 border-r border-[#473021]/80 rounded-t-xs mr-3 shadow-md" />
              {/* Pier Timber Plank */}
              <div className="w-20 h-2 bg-[#38261a]/95 border-b border-[#21160e] rounded-[1px] mb-1 -rotate-2" />
              {/* Second post */}
              <div className="w-2.5 h-7 bg-[#24170f]/90 border-r border-[#3b2619]/80 rounded-t-xs -ml-2" />
            </div>

            {/* Winding roots graphic creeping into riverbank */}
            <svg viewBox="0 0 100 25" className="w-24 sm:w-28 h-5 -mt-2 pointer-events-none opacity-80">
              <path
                d="M10,2 Q30,18 55,8 T90,20"
                stroke="#2b1b11"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M35,12 Q45,22 65,18"
                stroke="#3a2517"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            {/* Gentle Water Ripple beneath the pier */}
            <motion.div
              animate={{
                scale: [0.9, 1.25, 0.9],
                opacity: [0.2, 0.45, 0.2],
              }}
              transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
              className="w-28 sm:w-32 h-4 rounded-full bg-[#9bbdb4]/25 blur-[2px] -mt-1 pointer-events-none"
            />
          </div>

          {/* Whisper tooltip on hover */}
          <AnimatePresence>
            {hoveredTarget === 'pier' && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute top-[18%] right-[10%] whitespace-nowrap bg-[#17110c]/95 text-[#f5ecd9] font-song text-[11px] px-2.5 py-1 wood-tag-edge border border-[#5d412a] pointer-events-none shadow-xl z-30 flex items-center space-x-1"
              >
                <Sparkles className="w-3 h-3 text-[#d49b42]" />
                <span>盘根错节的老树下，泥土似有新近翻动的痕迹</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* DISTANT COTTAGE WINDOW WARM LAMP (Appears after second letter is found!) */}
        <AnimatePresence>
          {hasSecondLetterClue && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
              className="absolute top-[38%] left-[47%] z-15 pointer-events-none flex flex-col items-center"
            >
              {/* Very tiny warm yellow dot in distant village across mountain foot */}
              <div className="relative flex items-center justify-center">
                {/* Soft warm halo */}
                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.45, 0.75, 0.45],
                  }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="w-8 h-8 rounded-full bg-[#f7b848]/35 blur-[5px]"
                />
                {/* Center glowing wick */}
                <div className="absolute w-2.5 h-2.5 rounded-full bg-[#ffe79a] shadow-[0_0_8px_#ffb833]" />
              </div>
              <span className="text-[10px] font-song text-[#fce8b8]/90 bg-[#121615]/80 px-1.5 py-0.5 mt-1 border border-[#6b5837]/50 wood-tag-edge tracking-widest">
                山脚灯火
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BOTTOM-LEFT: 【线索簿】 Notebook */}
        <QingjiangNotebook
          hasStepClue={hasStepClue}
          hasButtonClue={hasButtonClue}
          hasSecondLetterClue={hasSecondLetterClue}
        />

        {/* NARRATIVE CUES & MONOLOGUES */}

        {/* 1. Opening Entrance Monologue: “沿着信里的话，你来到了清江边。” */}
        <AnimatePresence>
          {showEntranceMonologue && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.9 }}
              className="absolute bottom-16 sm:bottom-20 inset-x-0 flex justify-center z-25 pointer-events-none"
            >
              <div className="bg-[#181d1c]/90 border border-[#485e58]/80 text-[#f5ebd7] font-calligraphy text-base sm:text-lg px-6 py-2.5 wood-tag-edge shadow-2xl tracking-[0.25em]">
                “沿着信里的话，你来到了清江边。”
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. First-Layer Guide: “信里说，要沿着江往下走。” */}
        <AnimatePresence>
          {showFirstGuide && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 0.95, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.8 }}
              className="absolute bottom-16 sm:bottom-20 inset-x-0 flex justify-center z-25 pointer-events-none"
            >
              <div className="bg-[#181d1c]/85 border border-[#42544f]/60 text-[#dfd0ba] font-song text-xs sm:text-sm px-5 py-2 wood-tag-edge shadow-xl tracking-[0.2em]">
                “信里说，要沿着江往下走。”
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. Inactivity Idle Hints (8s / 15s / 25s / 35s) */}
        <AnimatePresence>
          {idleHintIndex !== null &&
            !isStepsModalOpen &&
            !isBoxModalOpen &&
            !isPierModalOpen &&
            !isSecondLetterOpen &&
            !showEntranceMonologue &&
            !showFirstGuide && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.95, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.7 }}
                className="absolute bottom-16 sm:bottom-20 inset-x-0 flex justify-center z-25 pointer-events-none"
              >
                <div className="bg-[#171e1d]/92 border border-[#4d635c] text-[#eddcb9] font-song text-xs sm:text-sm px-4 py-1.5 wood-tag-edge shadow-xl flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#82aa9c]" />
                  <span className="tracking-widest">
                    {idleHintTexts[idleHintIndex]}
                  </span>
                </div>
              </motion.div>
            )}
        </AnimatePresence>

        {/* Clue Progress Indicator when some but not all clues are collected */}
        {!isAllQingjiangCluesFound && qingjiangDiscoveredCount > 0 && !isSecondLetterOpen && !isBoxModalOpen && !isStepsModalOpen && !isPierModalOpen && (
          <div className="absolute bottom-5 sm:bottom-7 right-5 sm:right-7 z-20 pointer-events-none">
            <div className="px-3 py-1.5 bg-[#171b1a]/90 border border-[#4a5f57] text-[#cfe0d8] font-song text-[11px] sm:text-xs wood-tag-edge tracking-wider shadow-lg">
              <span>清江线索（{qingjiangDiscoveredCount}/3）· 尚有旧痕待探寻</span>
            </div>
          </div>
        )}

        {/* 4. After finding ALL 3 clues in Qingjiang: End of Chapter Narrative & 【去找那盏灯】 */}
        <AnimatePresence>
          {isAllQingjiangCluesFound && !isSecondLetterOpen && !isBoxModalOpen && !isStepsModalOpen && !isPierModalOpen && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="absolute bottom-12 sm:bottom-16 inset-x-0 flex flex-col items-center justify-center z-25 pointer-events-auto space-y-3 px-4"
            >
              <div className="bg-[#171b1a]/92 border border-[#52665f] px-6 py-2.5 wood-tag-edge shadow-2xl flex flex-col items-center text-center space-y-1">
                <p className="font-calligraphy text-base sm:text-lg text-[#fce8b8] tracking-[0.2em]">
                  “那盏灯，还亮着。”
                </p>
                <p className="font-song text-xs text-[#a3b8b0] tracking-wider">
                  “清江边的所有痕迹皆已齐备，是时候去找那盏灯了。”
                </p>
              </div>

              <motion.button
                id="seek-lamp-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (onNavigateToLamp) {
                    onNavigateToLamp();
                  } else {
                    setShowNextChapterModal(true);
                  }
                }}
                className="cursor-pointer px-9 py-2.5 bg-[#782819] hover:bg-[#8f301e] text-[#faebd4] font-song text-sm font-semibold tracking-[0.3em] wood-tag-edge shadow-[0_4px_20px_rgba(0,0,0,0.8)] transition-colors flex items-center space-x-2 border border-[#b25742]"
              >
                <Flame className="w-4 h-4 text-[#f5ba58]" />
                <span>去找那盏灯</span>
                <span className="text-[#f5ba58]">»</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODALS */}

        {/* 1. Stone Steps Modal */}
        <StoneStepsModal
          isOpen={isStepsModalOpen}
          onClose={() => setIsStepsModalOpen(false)}
          onRecordClue={handleRecordStepClue}
          hasRecorded={hasStepClue}
        />

        {/* 2. Drifting Box Modal */}
        <DriftingBoxModal
          isOpen={isBoxModalOpen}
          onClose={() => setIsBoxModalOpen(false)}
          onCollectButton={handleRecordButtonClue}
          hasCollected={hasButtonClue}
        />

        {/* 3. Pier & Tree Roots Modal */}
        <PierTreeModal
          isOpen={isPierModalOpen}
          onClose={() => setIsPierModalOpen(false)}
          onOpenLetter={() => {
            setIsPierModalOpen(false);
            setIsSecondLetterOpen(true);
          }}
        />

        {/* 4. Second Letter Modal */}
        <SecondLetterModal
          isOpen={isSecondLetterOpen}
          onClose={() => setIsSecondLetterOpen(false)}
          onFoldAndCollect={handleRecordSecondLetterClue}
        />

        {/* CHAPTER 4 TEASER / PREVIEW MODAL */}
        <AnimatePresence>
          {showNextChapterModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#080b0b]/95"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-md mx-auto space-y-6 bg-[#161d1c] p-8 border border-[#485e58] wood-tag-edge shadow-2xl text-center"
              >
                <div className="space-y-2">
                  <span className="text-xs font-song text-[#82aa9c] tracking-[0.3em] block">
                    — 第三幕 · 清江边 完结 —
                  </span>
                  <h3 className="font-song text-2xl sm:text-3xl text-[#f6ecda] tracking-[0.25em] font-semibold">
                    下一章：寻找那盏灯
                  </h3>
                </div>

                <div className="space-y-3 font-song text-xs sm:text-sm text-[#b8c9c3] leading-relaxed">
                  <p>
                    渡过清江的暮色，你已经收集了石阶的足迹、泛黄的铜纽扣，以及第二封信中未尽的牵挂。
                  </p>
                  <p className="font-calligraphy text-base sm:text-lg text-[#fce8b8]">
                    “有些人离开，是为了走得更远；有些人留下，是因为这里一直有人在等。”
                  </p>
                  <p className="text-[11px] text-[#7a918a]">
                    顺着对岸山脚那一星闪烁的微温火光，下一步的足迹即将启程……
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-center space-x-3">
                  <button
                    onClick={() => setShowNextChapterModal(false)}
                    className="cursor-pointer px-4 py-2 bg-[#25302e] hover:bg-[#32403d] text-[#d6ded9] font-song text-xs tracking-wider border border-[#485c57] wood-tag-edge transition-colors"
                  >
                    留在清江边
                  </button>
                  {onNavigateToLamp && (
                    <button
                      onClick={() => {
                        setShowNextChapterModal(false);
                        onNavigateToLamp();
                      }}
                      className="cursor-pointer px-4 py-2 bg-[#8c2d1b] hover:bg-[#a1341f] text-[#fcf1db] font-song text-xs tracking-wider wood-tag-edge transition-colors shadow-md flex items-center space-x-1"
                    >
                      <Flame className="w-3.5 h-3.5 text-[#f5ba58]" />
                      <span>启程前往那盏灯</span>
                    </button>
                  )}
                  <button
                    onClick={onBackToCover}
                    className="cursor-pointer px-4 py-2 bg-[#1b2221] hover:bg-[#25302e] text-[#b8c7c2] font-song text-xs tracking-wider wood-tag-edge transition-colors"
                  >
                    返回封面
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* OLD BOOK PAGE TURN TRANSITION FROM SCENE 2 (~1.4s) */}
        <AnimatePresence>
          {isPageTransitioning && (
            <motion.div
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: '100%', opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
              className="absolute inset-0 z-50 bg-[#1c140d] flex items-center justify-center pointer-events-none shadow-[25px_0_50px_rgba(0,0,0,0.8)]"
            >
              <div className="text-center space-y-2 opacity-70">
                <span className="font-calligraphy text-lg text-[#ecdcb9] tracking-[0.3em] block">
                  翻开下一页 · 清江边
                </span>
                <span className="font-song text-xs text-[#9c8264]">
                  沿着江水往下走……
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
