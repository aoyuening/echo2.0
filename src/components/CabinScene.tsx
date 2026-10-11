import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import cabinBg from '../assets/images/enshi_cabin_room_1788855624777.jpg';
import { DeskLetter } from './cabin/DeskLetter';
import { CabinetPhoto } from './cabin/CabinetPhoto';
import { WindowRadio } from './cabin/WindowRadio';
import { RoomLamp } from './cabin/RoomLamp';
import { LetterModal } from './cabin/LetterModal';
import { PhotoModal } from './cabin/PhotoModal';
import { JourneyClues } from '../types';
import { ambientSound } from '../utils/ambientAudio';
import { ArrowLeft, Sparkles, Volume2 } from 'lucide-react';

interface CabinSceneProps {
  onBackToCover: () => void;
  onNavigateToQingjiang?: () => void;
  clues: JourneyClues;
  onDiscoverClue: (key: keyof JourneyClues, value?: any) => void;
}

export const CabinScene: React.FC<CabinSceneProps> = ({
  onBackToCover,
  onNavigateToQingjiang,
  clues,
  onDiscoverClue,
}) => {
  // Clues tracking - synchronized with global persistent clues
  const hasLetterClue = clues.cabinLetter;
  const hasPhotoClue = clues.cabinPhoto;
  const hasRadioClue = clues.cabinRadio;
  const [lampToggledOnce, setLampToggledOnce] = useState(false);
  const isLampLit = clues.cabinLamp;
  const hasLampClue = clues.cabinLamp || lampToggledOnce;

  // Top-right banner for "新的线索: 清江"
  const [showNewLetterBanner, setShowNewLetterBanner] = useState(false);
  const [showAllCluesFoundBanner, setShowAllCluesFoundBanner] = useState(false);

  // Modals & States
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  // Radio states
  const [isRadioTuning, setIsRadioTuning] = useState(false);
  const [radioVoiceNotice, setRadioVoiceNotice] = useState<string | null>(null);

  // Lamp states
  const [lampNotice, setLampNotice] = useState<{ main: string; sub: string } | null>(null);

  // Initial Entrance Banner ("屋里似乎留下些什么……" 停留约2秒后淡出)
  const [showEntrancePrompt, setShowEntrancePrompt] = useState(true);

  // Inactivity / Idle Hints: 8s -> 15s -> 25s
  const [idleHintLevel, setIdleHintLevel] = useState<0 | 1 | 2 | 3>(0);
  const idleTimer1Ref = useRef<NodeJS.Timeout | null>(null);
  const idleTimer2Ref = useRef<NodeJS.Timeout | null>(null);
  const idleTimer3Ref = useRef<NodeJS.Timeout | null>(null);

  // Act 1 Completion Interlude
  const [showQingjiangJourney, setShowQingjiangJourney] = useState(false);

  const isAllDiscovered = hasLetterClue && hasPhotoClue && hasRadioClue && hasLampClue;
  const discoveredCount = [hasLetterClue, hasPhotoClue, hasRadioClue, hasLampClue].filter(Boolean).length;

  // Background audio start on mount
  useEffect(() => {
    ambientSound.start();

    // Initial entrance hint: stays ~2s then fades out
    const entranceTimer = setTimeout(() => {
      setShowEntrancePrompt(false);
    }, 2800);

    return () => {
      clearTimeout(entranceTimer);
      clearAllIdleTimers();
    };
  }, []);

  // Idle timer manager
  const clearAllIdleTimers = () => {
    if (idleTimer1Ref.current) clearTimeout(idleTimer1Ref.current);
    if (idleTimer2Ref.current) clearTimeout(idleTimer2Ref.current);
    if (idleTimer3Ref.current) clearTimeout(idleTimer3Ref.current);
  };

  const resetIdleTimer = () => {
    // If the core letter clue is already collected, disable letter-specific idle hints
    if (hasLetterClue) {
      setIdleHintLevel(0);
      return;
    }

    setIdleHintLevel(0);
    clearAllIdleTimers();

    // Level 1: > 8s -> “屋里，好像还有什么没有发现。”
    idleTimer1Ref.current = setTimeout(() => {
      setIdleHintLevel(1);

      // Level 2: > 15s -> “桌上的东西，也许值得看看。”
      idleTimer2Ref.current = setTimeout(() => {
        setIdleHintLevel(2);

        // Level 3: > 25s -> “那封信，似乎一直在等你打开。”
        idleTimer3Ref.current = setTimeout(() => {
          setIdleHintLevel(3);
        }, 10000);
      }, 7000);
    }, 8000);
  };

  useEffect(() => {
    resetIdleTimer();
  }, [hasLetterClue]);

  const handleUserActivity = () => {
    resetIdleTimer();
  };

  // 1. Core Letter Handler
  const handleOpenLetter = () => {
    handleUserActivity();
    setIsLetterOpen(true);
  };

  const handleCollectLetterClue = () => {
    onDiscoverClue('cabinLetter', true);
    setIsLetterOpen(false);
    // Show top-right notification: 【新的线索】“清江。”
    setShowNewLetterBanner(true);
    setTimeout(() => {
      setShowNewLetterBanner(false);
    }, 4500);
  };

  // 2. Photo Handler
  const handleOpenPhoto = () => {
    handleUserActivity();
    setIsPhotoOpen(true);
  };

  const handlePhotoClueDiscovered = () => {
    onDiscoverClue('cabinPhoto', true);
  };

  // 3. Radio Handler (Tuning -> sound -> voice "……清江……" -> cuts off -> clue)
  const handleTriggerRadio = () => {
    handleUserActivity();
    if (isRadioTuning) return;

    setIsRadioTuning(true);
    setRadioVoiceNotice(null);

    ambientSound.playRadioTuningBroadcast(
      // Voice trigger midway
      () => {
        setRadioVoiceNotice('“……清江……”');
      },
      // Broadcast end
      () => {
        setIsRadioTuning(false);
        onDiscoverClue('cabinRadio', true);
        setTimeout(() => {
          setRadioVoiceNotice(null);
        }, 4000);
      }
    );
  };

  // 4. Lamp Handler (Illuminates wall marking & hint)
  const handleToggleLamp = () => {
    handleUserActivity();
    setLampToggledOnce(true);
    const nextLit = !isLampLit;
    onDiscoverClue('cabinLamp', true);

    if (nextLit) {
      setLampNotice({
        main: '“灯光照出了一个被时间藏起来的痕迹。”',
        sub: '木痕上的字迹渐渐显现。',
      });
      setTimeout(() => {
        setLampNotice(null);
      }, 4500);
    } else {
      setLampNotice(null);
    }
  };

  // Trigger banner when all 4 clues are found
  useEffect(() => {
    if (isAllDiscovered) {
      setShowAllCluesFoundBanner(true);
      const timer = setTimeout(() => {
        setShowAllCluesFoundBanner(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isAllDiscovered]);

  return (
    <div
      id="cabin-scene"
      onMouseMove={handleUserActivity}
      onClick={handleUserActivity}
      className="relative w-full h-full overflow-hidden bg-[#140e0b] flex items-center justify-center select-none"
    >
      {/* 16:9 Aspect Ratio Master Viewport */}
      <div className="relative w-full h-full max-w-[177.78vh] max-h-[56.25vw] aspect-[16/9] overflow-hidden shadow-2xl">
        {/* Hand-painted Cabin Interior Background */}
        <motion.div
          animate={
            isAllDiscovered
              ? { filter: 'saturate(0.96) contrast(1.05) brightness(0.96)' }
              : { filter: 'saturate(0.9) contrast(1.02) brightness(1)' }
          }
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={cabinBg}
            alt="恩施山地老屋室内"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Layered Twilight & Mountain Mist Outside Left Wooden Window */}
        <motion.div
          animate={
            isAllDiscovered
              ? { opacity: [0.35, 0.55, 0.35], x: ['-2%', '2%', '-2%'] }
              : { opacity: [0.15, 0.28, 0.15], x: ['-1%', '1%', '-1%'] }
          }
          transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
          className="absolute top-[18%] left-[3%] w-[24%] h-[42%] pointer-events-none z-1"
          style={{
            background:
              'radial-gradient(ellipse at 40% 45%, rgba(200, 220, 235, 0.28) 0%, rgba(130, 160, 185, 0.12) 50%, transparent 80%)',
            filter: 'blur(10px)',
          }}
        />

        {/* Ambient Evening Vignette & Living Atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none z-2"
          style={{
            background:
              'radial-gradient(ellipse at 45% 60%, rgba(245, 186, 88, 0.06) 0%, rgba(22, 15, 10, 0.35) 65%, rgba(10, 7, 5, 0.75) 100%)',
          }}
        />

        {/* Vintage Paper Storybook Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay z-3"
          style={{
            backgroundImage:
              'radial-gradient(#cfb283 1px, transparent 1px), radial-gradient(#6d4c2b 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
          }}
        />

        {/* Framing border */}
        <div className="absolute inset-0 pointer-events-none border-[10px] sm:border-[16px] md:border-[20px] border-[#120c09]/75 z-4" />

        {/* Top-Left: Return to Storybook Cover */}
        <div className="absolute top-4 sm:top-6 left-5 sm:left-7 z-30 flex items-center space-x-3 pointer-events-auto">
          <button
            id="back-to-cover-button"
            onClick={onBackToCover}
            className="cursor-pointer px-3 py-1.5 bg-[#251912]/85 hover:bg-[#342318] text-[#d6c4a5] font-song text-xs tracking-wider border border-[#634833]/70 wood-tag-edge transition-colors flex items-center space-x-1.5 shadow-sm"
            title="返回故事书封面"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>《回声》封面</span>
          </button>

          <div className="hidden md:flex items-center space-x-2 text-xs font-song text-[#ba9f7b]/90 bg-[#1a110a]/70 px-2.5 py-1 rounded-sm border border-[#523c2a]/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d49b42]" />
            <span className="tracking-widest">恩施老屋 · 探索</span>
          </div>
        </div>

        {/* Top-Right: New Clue Notification ("【新的线索】 清江。") */}
        <AnimatePresence>
          {showNewLetterBanner && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute top-4 sm:top-6 right-5 sm:right-7 z-35 pointer-events-none"
            >
              <div className="bg-[#2a1a10]/95 border-2 border-[#a6301d] text-[#f8ebd3] px-4 py-2 wood-tag-edge shadow-xl flex items-center space-x-2.5">
                <Sparkles className="w-4 h-4 text-[#e8a338] animate-pulse" />
                <div>
                  <span className="font-song text-xs text-[#d8a86c] tracking-widest block">
                    【新的线索】
                  </span>
                  <span className="font-calligraphy text-base sm:text-lg text-[#f7e6c4] tracking-wider">
                    “清江。”
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* THE FOUR INTERACTIVE OBJECTS (Spatially Separated Across Room) */}

        {/* 1. 【旧信】: Center Wooden Desk */}
        <DeskLetter
          onOpen={handleOpenLetter}
          onHoverChange={handleUserActivity}
          hasDiscovered={hasLetterClue}
        />

        {/* 2. 【老照片】: Hanging on Center Wooden Wall */}
        <CabinetPhoto
          onInspect={handleOpenPhoto}
          onHoverChange={handleUserActivity}
        />

        {/* 3. 【老式收音机】: Left Window Side Table */}
        <WindowRadio
          isTuning={isRadioTuning}
          hasDiscoveredVoice={hasRadioClue}
          onTriggerTune={handleTriggerRadio}
          onHoverChange={handleUserActivity}
        />

        {/* 4. 【暖黄色的小灯】: Another Side (Right-Center Table) */}
        <RoomLamp
          isLit={isLampLit}
          onToggleLit={handleToggleLamp}
          onHoverChange={handleUserActivity}
        />

        {/* If some clues are found but not all, show progress indicator */}
        {!isAllDiscovered && discoveredCount > 0 && (
          <div className="absolute bottom-5 sm:bottom-7 right-5 sm:right-7 z-25 pointer-events-none">
            <div className="px-3 py-1.5 bg-[#1a130f]/90 border border-[#5c4331] text-[#decab3] font-song text-[11px] sm:text-xs wood-tag-edge tracking-wider shadow-lg">
              <span>老屋线索（{discoveredCount}/4）· 尚有旧物待探寻</span>
            </div>
          </div>
        )}

        {/* Bottom-Right: When ALL clues in cabin are discovered, provide the clear, peaceful wood-tag button to Qingjiang */}
        {isAllDiscovered && onNavigateToQingjiang && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-5 sm:bottom-7 right-5 sm:right-7 z-30 pointer-events-auto flex flex-col items-end space-y-2"
          >
            <div className="hidden sm:block px-2.5 py-1 bg-[#1a130f]/85 border border-[#694d38] text-[#e0cfb8] font-song text-[11px] wood-tag-edge tracking-widest">
              老屋线索已齐备（4/4）
            </div>
            <button
              id="cabin-to-qingjiang-btn"
              onClick={onNavigateToQingjiang}
              className="cursor-pointer px-6 py-2.5 bg-[#8a2f1c] hover:bg-[#9e3722] text-[#fdf1db] font-song text-xs sm:text-sm tracking-[0.22em] wood-tag-edge border border-[#b85842] shadow-[0_4px_16px_rgba(0,0,0,0.7)] flex items-center space-x-2 transition-transform duration-150 hover:-translate-y-0.5 font-semibold"
              title="老屋所有线索皆已齐备，前往清江边"
            >
              <span>前往清江</span>
              <span className="text-sm">»</span>
            </button>
          </motion.div>
        )}

        {/* Initial Entrance Prompt: “屋里似乎留下些什么……” (停留约2秒后淡出) */}
        <AnimatePresence>
          {showEntrancePrompt && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.95, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.8 }}
              className="absolute bottom-16 sm:bottom-20 inset-x-0 flex justify-center z-25 pointer-events-none"
            >
              <div className="bg-[#1f150f]/90 border border-[#6b4e36]/70 text-[#e6d6b8] font-handwriting text-sm sm:text-base px-5 py-2 wood-tag-edge shadow-xl tracking-[0.28em]">
                “屋里似乎留下些什么……”
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Radio Broadcast Atmospheric Prompt ("你似乎听见了什么。" / "……清江……" / "获得：「声音线索」") */}
        <AnimatePresence>
          {(isRadioTuning || radioVoiceNotice) && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute bottom-16 sm:bottom-20 inset-x-0 flex justify-center z-30 pointer-events-none"
            >
              <div className="bg-[#20150e]/92 border border-[#8a5d3b] px-5 py-2.5 wood-tag-edge shadow-2xl flex flex-col items-center text-center space-y-1">
                <div className="flex items-center space-x-2 text-[#d49b42] text-xs font-song">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <span>窗边收音机传来微弱杂音……</span>
                </div>
                {radioVoiceNotice && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-calligraphy text-base sm:text-lg text-[#f8ebd3] tracking-[0.2em]"
                  >
                    {radioVoiceNotice}
                  </motion.p>
                )}
                <div className="text-[11px] font-song text-[#bca382]">
                  {radioVoiceNotice ? '声音中断。你似乎听见了什么。获得「声音线索」' : '杂音与山风交织……'}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lamp Mystery Prompt ("灯光照出了一个被时间藏起来的痕迹。" / "似乎还缺少什么。") */}
        <AnimatePresence>
          {lampNotice && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute bottom-16 sm:bottom-20 inset-x-0 flex justify-center z-30 pointer-events-none"
            >
              <div className="bg-[#24170f]/90 border border-[#b58348]/80 px-5 py-2 wood-tag-edge shadow-2xl flex flex-col items-center text-center space-y-0.5">
                <p className="font-song text-xs sm:text-sm text-[#f4e2be] tracking-wider">
                  {lampNotice.main}
                </p>
                <p className="font-handwriting text-xs text-[#baa080] tracking-widest">
                  {lampNotice.sub}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Banner when all 4 clues in cabin are found */}
        <AnimatePresence>
          {showAllCluesFoundBanner && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7 }}
              className="absolute top-16 sm:top-20 inset-x-0 flex justify-center z-35 pointer-events-none px-4"
            >
              <div className="bg-[#1f150f]/95 border border-[#8a5d3b] text-[#f5ebd7] font-song text-xs sm:text-sm px-6 py-2.5 wood-tag-edge shadow-2xl tracking-[0.2em] flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#e8c078]" />
                <span>老屋中的线索已全部齐备，可以循迹前往清江了。</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inactivity / Idle Natural Hints (8s -> 15s -> 25s) */}
        <AnimatePresence>
          {idleHintLevel > 0 &&
            !isLetterOpen &&
            !isPhotoOpen &&
            !isRadioTuning &&
            !radioVoiceNotice &&
            !lampNotice &&
            !showEntrancePrompt && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.95, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.7 }}
                className="absolute bottom-16 sm:bottom-20 inset-x-0 flex justify-center z-25 pointer-events-none"
              >
                <div className="bg-[#21140e]/92 border border-[#7d5637] text-[#f2e0be] font-song text-xs sm:text-sm px-4 py-1.5 wood-tag-edge shadow-xl flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d49b42] animate-ping" />
                  <span className="tracking-widest">
                    {idleHintLevel === 1 && '屋里，好像还有什么没有发现。'}
                    {idleHintLevel === 2 && '桌上的东西，也许值得看看。'}
                    {idleHintLevel === 3 && '那封信，似乎一直在等你打开。'}
                  </span>
                </div>
              </motion.div>
            )}
        </AnimatePresence>

        {/* Modal: Core Letter (木桌上的泛黄旧信) */}
        <LetterModal
          isOpen={isLetterOpen}
          onClose={() => setIsLetterOpen(false)}
          onCollectClue={handleCollectLetterClue}
          hasCollected={hasLetterClue}
        />

        {/* Modal: Old Photo (旧木柜旁的老照片) */}
        <PhotoModal
          isOpen={isPhotoOpen}
          onClose={() => setIsPhotoOpen(false)}
          onDiscoverClue={handlePhotoClueDiscovered}
          hasDiscovered={hasPhotoClue}
        />

        {/* Interlude / Next Chapter Preview: 【前往清江】 */}
        <AnimatePresence>
          {showQingjiangJourney && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-[#0c0806]/95 z-50 flex items-center justify-center p-6 text-center select-none"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-md mx-auto space-y-6 bg-[#1a120c] p-8 border border-[#6d4d33] wood-tag-edge shadow-2xl"
              >
                <div className="space-y-2">
                  <span className="text-xs font-song text-[#a67946] tracking-[0.3em] block">
                    — 第一幕 · 老屋旧忆 完结 —
                  </span>
                  <h3 className="font-song text-2xl sm:text-3xl text-[#f5ebd6] tracking-[0.25em] font-semibold">
                    启程前往清江
                  </h3>
                </div>

                <div className="space-y-3 font-song text-xs sm:text-sm text-[#bda789] leading-relaxed">
                  <p>
                    案头的旧信、相框里的江渡留影，以及收音机里断续呼唤的微弱声浪……
                  </p>
                  <p className="font-calligraphy text-base sm:text-lg text-[#e8c688]">
                    “所有的记忆，都指向了那条穿过深山的清江。”
                  </p>
                  <p className="text-[11px] text-[#8c745b]">
                    山雾渐散，江水潺潺。你将带着这些遗落的线索，沿着江岸往下走……
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-center space-x-3">
                  <button
                    onClick={() => setShowQingjiangJourney(false)}
                    className="cursor-pointer px-4 py-2 bg-[#2d1e15] hover:bg-[#3d2a1d] text-[#d6c4a5] font-song text-xs tracking-wider border border-[#5d402b] wood-tag-edge transition-colors"
                  >
                    留在老屋
                  </button>
                  {onNavigateToQingjiang && (
                    <button
                      onClick={() => {
                        setShowQingjiangJourney(false);
                        onNavigateToQingjiang();
                      }}
                      className="cursor-pointer px-5 py-2 bg-[#8c2d1b] hover:bg-[#772414] text-[#fcf1db] font-song text-xs tracking-wider wood-tag-edge transition-colors shadow-md"
                    >
                      启程前往清江 »
                    </button>
                  )}
                  <button
                    onClick={onBackToCover}
                    className="cursor-pointer px-4 py-2 bg-[#251912] hover:bg-[#342318] text-[#c4b192] font-song text-xs tracking-wider border border-[#4d3725] wood-tag-edge transition-colors"
                  >
                    封面
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
