import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Sparkles,
  Flame,
  Check,
  DoorOpen,
  Coffee,
  Radio,
  Footprints,
  Image as ImageIcon,
  FileText,
  Layers,
} from 'lucide-react';
import exteriorBg from '../assets/images/enshi_lamp_exterior_1788857415192.jpg';
import interiorBg from '../assets/images/enshi_lamp_interior_1788857448706.jpg';
import vintagePhotoThumb from '../assets/images/enshi_vintage_family_photo_1788855993742.jpg';
import { ambientSound } from '../utils/ambientAudio';
import { LampNotebook } from './lamp/LampNotebook';
import { TeaBrewingModal } from './lamp/TeaBrewingModal';
import { WallPhotoModal } from './lamp/WallPhotoModal';
import { ThirdLetterModal } from './lamp/ThirdLetterModal';
import { EchoMontageModal } from './lamp/EchoMontageModal';
import { JourneyClues } from '../types';

interface LampSceneProps {
  onBackToQingjiang: () => void;
  onBackToCover: () => void;
  onNavigateToNextChapter?: () => void;
  clues?: JourneyClues;
  onDiscoverClue?: (key: keyof JourneyClues, value?: any) => void;
}

type ViewMode = 'approach' | 'exterior' | 'interior' | 'outro';

export const LampScene: React.FC<LampSceneProps> = ({
  onBackToQingjiang,
  onBackToCover,
  onNavigateToNextChapter,
  clues,
  onDiscoverClue,
}) => {
  // Navigation & View Mode
  const [viewMode, setViewMode] = useState<ViewMode>('approach');
  const [showEntranceBanner, setShowEntranceBanner] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Interaction Modals
  const [isTeaModalOpen, setIsTeaModalOpen] = useState<boolean>(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState<boolean>(false);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState<boolean>(false);
  const [isMontageActive, setIsMontageActive] = useState<boolean>(false);
  const [showNextChapterModal, setShowNextChapterModal] = useState<boolean>(false);

  // Observables Discovery State
  const [hasClothShoesClue, setHasClothShoesClue] = useState<boolean>(false);
  const [hasPhotoClue, setHasPhotoClue] = useState<boolean>(false);
  const [hasTeaClue, setHasTeaClue] = useState<boolean>(false);
  const [hasBambooClue, setHasBambooClue] = useState<boolean>(false);
  const [hasRadioClue, setHasRadioClue] = useState<boolean>(false);
  const [hasThirdLetterClue, setHasThirdLetterClue] = useState<boolean>(false);

  // Culmination State
  const [isLampKeptTillDawn, setIsLampKeptTillDawn] = useState<boolean>(false);

  // Hovered target
  const [hoveredTarget, setHoveredTarget] = useState<string | null>(null);

  // Active floating prompt
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [radioVoiceStep, setRadioVoiceStep] = useState<string | null>(null);

  // Step 1: Continuous camera approach (~2s)
  useEffect(() => {
    ambientSound.start();

    const t1 = setTimeout(() => {
      setViewMode('exterior');
      setShowEntranceBanner(true);
      ambientSound.playDoorCreakSound();
    }, 2000);

    const t2 = setTimeout(() => {
      setShowEntranceBanner(false);
    }, 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Enter the house interior through the door
  const handleOpenDoor = () => {
    ambientSound.playDoorCreakSound();
    setViewMode('interior');
    setActivePrompt('门未上锁，屋内还留有微温的灯火。');
    setTimeout(() => setActivePrompt(null), 3500);
  };

  // 1. Cloth shoes interaction
  const handleInspectShoes = () => {
    ambientSound.playPageTurnSound();
    setHasClothShoesClue(true);
    setActivePrompt('“鞋底还留着山路上的泥。这里的人，好像每天都要走很远。”');
    setTimeout(() => setActivePrompt(null), 4500);
  };

  // 4. Bamboo woven basket interaction
  const handleInspectBamboo = () => {
    ambientSound.playWoodBoxOpenSound();
    setHasBambooClue(true);
    setActivePrompt('“它已经用了很多年。手艺留下来了，人却走远了。”');
    setTimeout(() => setActivePrompt(null), 4500);
  };

  // 5. Radio interaction
  const handleTriggerRadio = () => {
    setRadioVoiceStep('沙沙……');
    ambientSound.playRadioStaticWhisper(
      (voiceText) => {
        setRadioVoiceStep(voiceText);
      },
      () => {
        setRadioVoiceStep(null);
        setHasRadioClue(true);
        setActivePrompt('“你似乎又听见了那个声音。”');
        setTimeout(() => setActivePrompt(null), 4000);
      }
    );
  };

  // Finish reading the 3rd letter - ONLY record the clue and close modal, DO NOT trigger montage!
  const handleFinishLetter = () => {
    setHasThirdLetterClue(true);
    setIsLetterModalOpen(false);
    setActivePrompt('“人走得再远，也总会有一条江，一盏灯，等着你记起回来的路。”');
    setTimeout(() => setActivePrompt(null), 3600);
  };

  // Check if all 6 clues have been discovered
  const isAllCluesDiscovered =
    hasClothShoesClue &&
    hasPhotoClue &&
    hasTeaClue &&
    hasBambooClue &&
    hasRadioClue &&
    hasThirdLetterClue;

  // Track if transition to the final act has been triggered
  const [hasJumpedToFinalAct, setHasJumpedToFinalAct] = useState<boolean>(false);

  // When all 6 clues are discovered, bring up the sequential EchoMontageModal
  useEffect(() => {
    if (
      isAllCluesDiscovered &&
      !isMontageActive &&
      !hasJumpedToFinalAct &&
      !isLetterModalOpen &&
      !isPhotoModalOpen &&
      !isTeaModalOpen
    ) {
      setActivePrompt('屋内的线索已全部集齐……记忆正缓缓浮现。');
      const timer = setTimeout(() => {
        setActivePrompt(null);
        setIsMontageActive(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [
    isAllCluesDiscovered,
    isMontageActive,
    hasJumpedToFinalAct,
    isLetterModalOpen,
    isPhotoModalOpen,
    isTeaModalOpen,
  ]);

  // When sequential EchoMontageModal completes (user clicks "把灯留到天亮"), transition to Chapter 5
  const handleMontageComplete = () => {
    setIsMontageActive(false);
    setHasJumpedToFinalAct(true);
    ambientSound.playWarmLampLitSound();
    onDiscoverClue?.('lampKeptDawn', true);
    setActivePrompt('“天快亮了，该启程走向晨曦了……”');

    setTimeout(() => {
      setActivePrompt(null);
      if (onNavigateToNextChapter) {
        onNavigateToNextChapter();
      } else {
        setShowNextChapterModal(true);
      }
    }, 1200);
  };

  const toggleSound = () => {
    const isNowPlaying = ambientSound.toggle();
    setIsMuted(!isNowPlaying);
  };

  return (
    <div
      id="lamp-scene-wrapper"
      className="relative w-full h-full flex items-center justify-center bg-[#070504] overflow-hidden select-none"
    >
      {/* 16:9 Aspect Ratio Storybook Canvas Container */}
      <div className="relative w-full h-full max-w-[177.78vh] max-h-[56.25vw] aspect-[16/9] overflow-hidden shadow-2xl">
        {/* =========================================================================
            BACKGROUND VIEWS
           ========================================================================= */}

        {/* View Mode: Approach (Continuous 2s pan along mountain path toward Diaojiaolou) */}
        {viewMode === 'approach' && (
          <motion.div
            initial={{ scale: 1.45, filter: 'blur(3px)' }}
            animate={{ scale: 1.05, filter: 'blur(0px)' }}
            transition={{ duration: 2.2, ease: 'easeOut' }}
            className="absolute inset-0 z-0"
          >
            <img
              src={exteriorBg}
              alt="夜行山路"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {/* Dark night mountain shadow overlay */}
            <div className="absolute inset-0 bg-[#070504]/50 pointer-events-none" />
          </motion.div>
        )}

        {/* View Mode: Exterior / Outro (Traditional Enshi Diaojiaolou at Night) */}
        {(viewMode === 'exterior' || viewMode === 'outro') && (
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{
              opacity: 1,
              filter: isLampKeptTillDawn
                ? 'brightness(1.08) contrast(1.03)'
                : 'brightness(0.96) contrast(1)',
            }}
            transition={{ duration: 1.8 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={exteriorBg}
              alt="恩施夜色吊脚楼与屋檐油灯"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />

            {/* Drifting Night Mountain Mist */}
            <motion.div
              animate={{
                x: ['-4%', '4%', '-4%'],
                opacity: [0.18, 0.32, 0.18],
              }}
              transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
              className="absolute inset-0 pointer-events-none z-1"
              style={{
                background:
                  'radial-gradient(ellipse at 40% 65%, rgba(180, 205, 200, 0.22) 0%, rgba(90, 115, 110, 0.1) 60%, transparent 85%)',
                filter: 'blur(12px)',
              }}
            />

            {/* Hanging Lantern Amber Glow Under Eaves */}
            <motion.div
              animate={{
                scale: isLampKeptTillDawn ? [1.25, 1.45, 1.25] : [1, 1.15, 1],
                opacity: isLampKeptTillDawn ? [0.65, 0.9, 0.65] : [0.45, 0.65, 0.45],
              }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="absolute top-[28%] left-[51%] w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-2"
              style={{
                background:
                  'radial-gradient(circle, rgba(255, 195, 85, 0.85) 0%, rgba(240, 150, 45, 0.45) 45%, transparent 75%)',
                filter: 'blur(10px)',
              }}
            />

            {/* If Lamp Kept Till Dawn -> Warm light extends out the doorway to the path */}
            {isLampKeptTillDawn && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0.5 }}
                animate={{ opacity: 0.75, scaleY: 1 }}
                transition={{ duration: 2.5 }}
                className="absolute bottom-[10%] left-[38%] w-[32%] h-[35%] pointer-events-none z-2 origin-top"
                style={{
                  background:
                    'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
                  backgroundImage:
                    'radial-gradient(ellipse at 50% 10%, rgba(255, 210, 120, 0.45) 0%, rgba(220, 140, 50, 0.15) 60%, transparent 85%)',
                  filter: 'blur(14px)',
                }}
              />
            )}
          </motion.div>
        )}

        {/* View Mode: Interior (Inside the Traditional Stilt House) */}
        {viewMode === 'interior' && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 z-0"
          >
            <img
              src={interiorBg}
              alt="吊脚楼内室生活陈设"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />

            {/* Warm Hearth & Table Lamp Soft Amber Halo */}
            <motion.div
              animate={{
                opacity: isLampKeptTillDawn ? [0.65, 0.8, 0.65] : [0.45, 0.6, 0.45],
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="absolute top-[32%] left-[45%] w-80 h-80 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-1"
              style={{
                background:
                  'radial-gradient(circle, rgba(255, 205, 100, 0.35) 0%, rgba(210, 130, 45, 0.18) 55%, transparent 75%)',
                filter: 'blur(16px)',
              }}
            />
          </motion.div>
        )}

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
        <div className="absolute inset-0 pointer-events-none border-[10px] sm:border-[16px] md:border-[20px] border-[#0c0907]/85 z-4" />

        {/* =========================================================================
            TOP NAVIGATION & SOUND CONTROLS
           ========================================================================= */}
        <div className="absolute top-4 sm:top-6 left-5 sm:left-7 z-30 flex items-center space-x-2.5 pointer-events-auto">
          {viewMode === 'interior' ? (
            <button
              onClick={() => {
                ambientSound.playDoorCreakSound();
                setViewMode('exterior');
              }}
              className="cursor-pointer px-3 py-1.5 bg-[#20150e]/90 hover:bg-[#301f15] text-[#d6c4a5] font-song text-xs tracking-wider border border-[#5d402b] wood-tag-edge transition-colors flex items-center space-x-1.5 shadow-sm"
              title="推门步出屋外"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>步出屋外</span>
            </button>
          ) : (
            <button
              onClick={onBackToQingjiang}
              className="cursor-pointer px-3 py-1.5 bg-[#20150e]/90 hover:bg-[#301f15] text-[#d6c4a5] font-song text-xs tracking-wider border border-[#5d402b] wood-tag-edge transition-colors flex items-center space-x-1.5 shadow-sm"
              title="返回清江边"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>清江边</span>
            </button>
          )}

          <button
            onClick={onBackToCover}
            className="cursor-pointer px-3 py-1.5 bg-[#19110b]/80 hover:bg-[#281b12] text-[#bca586] font-song text-xs tracking-wider border border-[#483322] wood-tag-edge transition-colors hidden sm:flex items-center space-x-1"
            title="返回故事封面"
          >
            <span>封面</span>
          </button>

          <div className="hidden md:flex items-center space-x-2 text-xs font-song text-[#ba9f7b]/90 bg-[#160f09]/80 px-2.5 py-1 rounded-sm border border-[#4d3725]/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8a338]" />
            <span className="tracking-widest">
              第四幕 · 那盏灯 {viewMode === 'interior' ? '· 屋内' : '· 屋外'}
            </span>
          </div>
        </div>

        {/* Top-Right: Ambient Sound Toggle */}
        <div className="absolute top-4 sm:top-6 right-5 sm:right-7 z-30 pointer-events-auto">
          <button
            onClick={toggleSound}
            className="cursor-pointer p-2 bg-[#20150e]/90 hover:bg-[#301f15] text-[#d49b42] border border-[#5d402b] wood-tag-edge transition-colors shadow-sm flex items-center space-x-1.5"
            title={isMuted ? '开启山风水声' : '静音'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-[#9e8369]" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#d49b42]" />
            )}
            <span className="text-[10px] font-song text-[#d6c4a5] hidden sm:inline">
              {isMuted ? '静音' : '山音'}
            </span>
          </button>
        </div>

        {/* =========================================================================
            INTERACTIVE OBJECTS: EXTERIOR VIEW
           ========================================================================= */}
        {viewMode === 'exterior' && (
          <>
            {/* 1. The Wooden Door (Prominent glowing beacon & clear wooden invitation tag) */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onHoverStart={() => setHoveredTarget('door')}
              onHoverEnd={() => setHoveredTarget(null)}
              onClick={handleOpenDoor}
              className="absolute top-[35%] left-[42%] w-[16%] h-[35%] z-20 cursor-pointer pointer-events-auto flex flex-col items-center justify-center group"
              title="虚掩的旧木门 · 点击推门入屋"
            >
              <div className="relative flex flex-col items-center select-none">
                {/* Glowing Pulsing Beacon */}
                <div className="relative flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#f5ba58]/35 animate-ping absolute" />
                  <div className="w-8 h-8 rounded-full bg-[#782819]/90 border border-[#f5ba58] flex items-center justify-center shadow-[0_0_18px_#f5ba58]">
                    <DoorOpen className="w-4 h-4 text-[#fcdca0]" />
                  </div>
                </div>

                {/* Permanent High-Contrast Wood Entrance Pill */}
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                  className="mt-2.5 px-3.5 py-1.5 bg-[#1e130c]/95 group-hover:bg-[#2e1c12] text-[#fbf0dc] font-song text-xs tracking-[0.25em] wood-tag-edge border-2 border-[#9b663e] shadow-[0_4px_20px_rgba(0,0,0,0.85)] flex items-center space-x-1.5 whitespace-nowrap transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#f5ba58]" />
                  <span className="font-semibold">【虚掩的木门 · 点击推门入屋】</span>
                </motion.div>
              </div>
            </motion.div>

            {/* 2. Weathered Wooden Placard Beside Door (Illuminated after keeping lamp till dawn) */}
            {isLampKeptTillDawn && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="absolute top-[48%] left-[59%] z-20 pointer-events-none"
              >
                <div className="bg-[#2d1e14]/95 border border-[#8a5f3d] p-2.5 wood-tag-edge shadow-xl max-w-[140px] text-center">
                  <span className="font-calligraphy text-xs sm:text-sm text-[#faebd3] tracking-[0.2em] block">
                    “回来的人，总有地方可以坐。”
                  </span>
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* =========================================================================
            INTERACTIVE OBJECTS: INTERIOR VIEW (6 Prominent, Distinct Clues)
           ========================================================================= */}
        {viewMode === 'interior' && (
          <>
            {/* Top-Center: Interior Exploration Status Bar */}
            <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-25 pointer-events-auto hidden sm:flex items-center space-x-2 bg-[#1b120a]/92 border border-[#63452f] px-4 py-1.5 wood-tag-edge shadow-xl select-none">
              <Sparkles className="w-3.5 h-3.5 text-[#e8a338]" />
              <span className="font-song text-xs text-[#ebd8bf] tracking-widest">
                吊脚楼遗存 · 已寻得{' '}
                <span className="text-[#f5ba58] font-bold text-sm">
                  {(hasClothShoesClue ? 1 : 0) +
                    (hasPhotoClue ? 1 : 0) +
                    (hasTeaClue ? 1 : 0) +
                    (hasBambooClue ? 1 : 0) +
                    (hasRadioClue ? 1 : 0) +
                    (hasThirdLetterClue ? 1 : 0)}
                </span>
                /6 处线索
              </span>
            </div>

            {/* Clue 1: 门口旧布鞋 (Lower-Left near entrance door) */}
            <motion.div
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onHoverStart={() => setHoveredTarget('shoes')}
              onHoverEnd={() => setHoveredTarget(null)}
              onClick={handleInspectShoes}
              className="absolute bottom-[14%] left-[10%] sm:left-[13%] z-20 cursor-pointer pointer-events-auto group select-none"
              title="门口旧布鞋"
            >
              <div className="relative flex flex-col items-center">
                {/* Glowing beacon ring */}
                <div className="relative flex items-center justify-center mb-1">
                  {!hasClothShoesClue && (
                    <span className="w-7 h-7 rounded-full bg-[#e8a338]/30 animate-ping absolute" />
                  )}
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center border shadow-md transition-colors ${
                      hasClothShoesClue
                        ? 'bg-[#1f1610] border-[#5a4230] text-[#a89580]'
                        : 'bg-[#782819] border-[#f5ba58] text-[#fde4aa] shadow-[0_0_12px_#f5ba58]'
                    }`}
                  >
                    {hasClothShoesClue ? (
                      <Check className="w-3 h-3 text-[#a89580]" />
                    ) : (
                      <Footprints className="w-3.5 h-3.5 text-[#f5ba58]" />
                    )}
                  </span>
                </div>

                {/* Permanent High-Contrast Wood Tag */}
                <div
                  className={`px-2.5 py-1 text-xs font-song tracking-wider wood-tag-edge shadow-lg transition-all flex items-center space-x-1 whitespace-nowrap ${
                    hasClothShoesClue
                      ? 'bg-[#1c140e]/92 text-[#b8a691] border border-[#5d432f]'
                      : 'bg-[#2b190f]/95 text-[#fdf1dc] border-2 border-[#d49b42] shadow-[0_2px_12px_rgba(212,155,66,0.35)]'
                  }`}
                >
                  <span>{hasClothShoesClue ? '【门口旧布鞋 · 已查】' : '【门口旧布鞋】'}</span>
                </div>
              </div>
            </motion.div>

            {/* Clue 2: 墙上的旧照片 (Upper-Center Left Wooden Wall) */}
            <motion.div
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onHoverStart={() => setHoveredTarget('photo')}
              onHoverEnd={() => setHoveredTarget(null)}
              onClick={() => setIsPhotoModalOpen(true)}
              className="absolute top-[23%] left-[26%] sm:left-[28%] z-20 cursor-pointer pointer-events-auto group select-none"
              title="墙上的旧照片"
            >
              <div className="relative flex flex-col items-center">
                {/* Miniature Hanging Vintage Photo Frame */}
                <div className="relative w-14 sm:w-16 bg-[#eae0cb] border border-[#a18259] p-1 pb-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.7)] -rotate-2 rounded-xs group-hover:rotate-0 transition-transform">
                  {/* Photo thumbnail */}
                  <div className="w-full aspect-[4/3] bg-[#221c17] overflow-hidden relative sepia-[0.35] contrast-110">
                    <img
                      src={vintagePhotoThumb}
                      alt="老照片缩略"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    {/* Tiny sparkling brass button cue on photo */}
                    <div className="absolute top-[52%] left-[48%] w-1.5 h-1.5 rounded-full bg-[#ffe79a] shadow-[0_0_6px_#ffba33] animate-pulse" />
                  </div>

                  {/* Corner indicator badge */}
                  <div className="absolute -top-2 -right-2">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] shadow-sm ${
                        hasPhotoClue
                          ? 'bg-[#1f1610] border-[#5a4230] text-[#a89580]'
                          : 'bg-[#782819] border-[#f5ba58] text-[#fde4aa] shadow-[0_0_10px_#f5ba58]'
                      }`}
                    >
                      {hasPhotoClue ? (
                        <Check className="w-2.5 h-2.5" />
                      ) : (
                        <ImageIcon className="w-2.5 h-2.5 text-[#f5ba58]" />
                      )}
                    </span>
                  </div>
                </div>

                {/* Permanent High-Contrast Wood Tag */}
                <div
                  className={`mt-1.5 px-2.5 py-1 text-xs font-song tracking-wider wood-tag-edge shadow-lg transition-all whitespace-nowrap ${
                    hasPhotoClue
                      ? 'bg-[#1c140e]/92 text-[#b8a691] border border-[#5d432f]'
                      : 'bg-[#2b190f]/95 text-[#fdf1dc] border-2 border-[#d49b42] shadow-[0_2px_12px_rgba(212,155,66,0.35)]'
                  }`}
                >
                  <span>{hasPhotoClue ? '【墙上旧照片 · 纽扣吻合】' : '【墙上的旧照片】'}</span>
                </div>
              </div>
            </motion.div>

            {/* Clue 3: 桌上的茶具与泡茶 (Center Tea Table) */}
            <motion.div
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onHoverStart={() => setHoveredTarget('tea')}
              onHoverEnd={() => setHoveredTarget(null)}
              onClick={() => setIsTeaModalOpen(true)}
              className="absolute bottom-[26%] left-[43%] sm:left-[45%] z-20 cursor-pointer pointer-events-auto group select-none"
              title="桌上的茶具与泡茶"
            >
              <div className="relative flex flex-col items-center">
                {/* Rising Warm Tea Steam Animation */}
                <div className="relative w-8 h-8 flex items-center justify-center mb-1">
                  {hasTeaClue ? (
                    <motion.div
                      animate={{ y: [-2, -8, -2], opacity: [0.7, 0.2, 0.7] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                      className="absolute -top-3 w-4 h-6 border-l border-r border-[#fae2b8]/40 rounded-full blur-[1px] pointer-events-none"
                    />
                  ) : (
                    <span className="w-8 h-8 rounded-full bg-[#f5ba58]/25 animate-ping absolute" />
                  )}
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center border shadow-md transition-colors ${
                      hasTeaClue
                        ? 'bg-[#1f1610] border-[#5a4230] text-[#a89580]'
                        : 'bg-[#782819] border-[#f5ba58] text-[#fde4aa] shadow-[0_0_12px_#f5ba58]'
                    }`}
                  >
                    {hasTeaClue ? (
                      <Check className="w-3 h-3 text-[#a89580]" />
                    ) : (
                      <Coffee className="w-3.5 h-3.5 text-[#f5ba58]" />
                    )}
                  </span>
                </div>

                {/* Permanent High-Contrast Wood Tag */}
                <div
                  className={`px-2.5 py-1 text-xs font-song tracking-wider wood-tag-edge shadow-lg transition-all whitespace-nowrap ${
                    hasTeaClue
                      ? 'bg-[#1c140e]/92 text-[#b8a691] border border-[#5d432f]'
                      : 'bg-[#381c12]/95 text-[#fdf1dc] border-2 border-[#e8a338] shadow-[0_2px_14px_rgba(232,163,56,0.4)]'
                  }`}
                >
                  <span>{hasTeaClue ? '【微温热茶 · 已沏】' : '【桌上茶具 · 动手沏茶】'}</span>
                </div>
              </div>
            </motion.div>

            {/* Clue 4: 窗边的竹编物件 (Right Window Sill / Wall) */}
            <motion.div
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onHoverStart={() => setHoveredTarget('bamboo')}
              onHoverEnd={() => setHoveredTarget(null)}
              onClick={handleInspectBamboo}
              className="absolute top-[32%] right-[15%] sm:right-[17%] z-20 cursor-pointer pointer-events-auto group select-none"
              title="窗边的竹编物件"
            >
              <div className="relative flex flex-col items-center">
                {/* Glowing beacon */}
                <div className="relative flex items-center justify-center mb-1">
                  {!hasBambooClue && (
                    <span className="w-7 h-7 rounded-full bg-[#d49b42]/30 animate-ping absolute" />
                  )}
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center border shadow-md transition-colors ${
                      hasBambooClue
                        ? 'bg-[#1f1610] border-[#5a4230] text-[#a89580]'
                        : 'bg-[#782819] border-[#f5ba58] text-[#fde4aa] shadow-[0_0_12px_#f5ba58]'
                    }`}
                  >
                    {hasBambooClue ? (
                      <Check className="w-3 h-3 text-[#a89580]" />
                    ) : (
                      <Layers className="w-3.5 h-3.5 text-[#f5ba58]" />
                    )}
                  </span>
                </div>

                {/* Permanent High-Contrast Wood Tag */}
                <div
                  className={`px-2.5 py-1 text-xs font-song tracking-wider wood-tag-edge shadow-lg transition-all whitespace-nowrap ${
                    hasBambooClue
                      ? 'bg-[#1c140e]/92 text-[#b8a691] border border-[#5d432f]'
                      : 'bg-[#2b190f]/95 text-[#fdf1dc] border-2 border-[#d49b42] shadow-[0_2px_12px_rgba(212,155,66,0.35)]'
                  }`}
                >
                  <span>{hasBambooClue ? '【窗边竹编 · 手艺犹存】' : '【窗边的竹编物件】'}</span>
                </div>
              </div>
            </motion.div>

            {/* Clue 5: 老收音机 (Far Left Side Shelf / Low Table) */}
            <motion.div
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onHoverStart={() => setHoveredTarget('radio')}
              onHoverEnd={() => setHoveredTarget(null)}
              onClick={handleTriggerRadio}
              className="absolute bottom-[35%] left-[8%] sm:left-[10%] z-20 cursor-pointer pointer-events-auto group select-none"
              title="木架上的老收音机"
            >
              <div className="relative flex flex-col items-center">
                {/* Glowing beacon / soundwave rings */}
                <div className="relative flex items-center justify-center mb-1">
                  {!hasRadioClue && (
                    <span className="w-7 h-7 rounded-full bg-[#d49b42]/30 animate-ping absolute" />
                  )}
                  {radioVoiceStep && (
                    <span className="w-10 h-10 rounded-full border border-[#f5ba58] animate-ping absolute" />
                  )}
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center border shadow-md transition-colors ${
                      hasRadioClue
                        ? 'bg-[#1f1610] border-[#5a4230] text-[#a89580]'
                        : 'bg-[#782819] border-[#f5ba58] text-[#fde4aa] shadow-[0_0_12px_#f5ba58]'
                    }`}
                  >
                    {hasRadioClue ? (
                      <Check className="w-3 h-3 text-[#a89580]" />
                    ) : (
                      <Radio className="w-3.5 h-3.5 text-[#f5ba58]" />
                    )}
                  </span>
                </div>

                {/* Permanent High-Contrast Wood Tag */}
                <div
                  className={`px-2.5 py-1 text-xs font-song tracking-wider wood-tag-edge shadow-lg transition-all whitespace-nowrap ${
                    hasRadioClue
                      ? 'bg-[#1c140e]/92 text-[#b8a691] border border-[#5d432f]'
                      : 'bg-[#2b190f]/95 text-[#fdf1dc] border-2 border-[#d49b42] shadow-[0_2px_12px_rgba(212,155,66,0.35)]'
                  }`}
                >
                  <span>{hasRadioClue ? '【老收音机 · 电波已明】' : '【木架老收音机 · 旋拧】'}</span>
                </div>
              </div>
            </motion.div>

            {/* Clue 6: 桌上的第三封信 (Right Portion of the Center Table) */}
            <motion.div
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.96 }}
              onHoverStart={() => setHoveredTarget('letter')}
              onHoverEnd={() => setHoveredTarget(null)}
              onClick={() => setIsLetterModalOpen(true)}
              className="absolute bottom-[20%] right-[28%] sm:right-[31%] z-20 cursor-pointer pointer-events-auto group select-none"
              title="案头的第三封信"
            >
              <div className="relative flex flex-col items-center">
                {/* Glowing envelope icon & pulsating halo */}
                <div className="relative flex items-center justify-center mb-1">
                  <span className="w-9 h-9 rounded-full bg-[#a3321f]/40 animate-ping absolute" />
                  <span className="w-7 h-7 rounded-full bg-[#8c2918] border border-[#f5ba58] flex items-center justify-center shadow-[0_0_16px_#a3321f]">
                    <FileText className="w-4 h-4 text-[#faebd3]" />
                  </span>
                </div>

                {/* Highly Prominent Cinnabar Wood Tag */}
                <div
                  className={`px-3 py-1.5 text-xs font-song tracking-[0.2em] wood-tag-edge shadow-xl transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                    hasThirdLetterClue
                      ? 'bg-[#29170e]/95 text-[#faebd3] border border-[#7a4831]'
                      : 'bg-[#782819] text-[#faebd4] border-2 border-[#f5ba58] shadow-[0_4px_18px_rgba(163,50,31,0.6)] animate-pulse'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-[#f5ba58]" />
                  <span className="font-semibold">
                    {hasThirdLetterClue ? '【第三封信 · 已研读】' : '【案头第三封信 · 亲启】'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Radio Broadcasting Speech Float */}
            <AnimatePresence>
              {radioVoiceStep && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-24 sm:bottom-28 left-6 sm:left-12 z-30 pointer-events-none"
                >
                  <div className="bg-[#1f130b]/95 border-2 border-[#d49b42] px-4 py-2 wood-tag-edge text-[#fbebd0] font-calligraphy text-base tracking-[0.2em] shadow-2xl flex items-center space-x-2">
                    <Radio className="w-4 h-4 text-[#f5ba58] animate-pulse" />
                    <span>{radioVoiceStep}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* =========================================================================
            VIEW MODE: OUTRO (Camera pulled back to night valley with bright lamp)
           ========================================================================= */}
        {viewMode === 'outro' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute bottom-14 sm:bottom-18 inset-x-0 flex flex-col items-center justify-center z-25 pointer-events-auto space-y-3.5 text-center px-4"
          >
            <div className="bg-[#140e0a]/94 border border-[#5d3f2b] px-8 py-3.5 wood-tag-edge shadow-2xl max-w-lg space-y-1.5">
              <p className="font-calligraphy text-base sm:text-lg text-[#f8ecda] tracking-[0.25em]">
                “原来，信真正想留下的，不是一个人的消息。”
              </p>
              <p className="font-song text-xs sm:text-sm text-[#bca586] tracking-widest">
                “而是一条回家的路。”
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (onNavigateToNextChapter) {
                  onNavigateToNextChapter();
                } else {
                  setShowNextChapterModal(true);
                }
              }}
              className="cursor-pointer px-9 py-2.5 bg-[#872d1a] hover:bg-[#9a341e] text-[#faebd3] font-song text-sm font-semibold tracking-[0.3em] wood-tag-edge shadow-xl border border-[#b25742] flex items-center space-x-2"
            >
              <span>继续往下走</span>
              <span className="text-[#f7ba4a]">»</span>
            </motion.button>
          </motion.div>
        )}

        {/* =========================================================================
            FLOATING NARRATIVE PROMPTS
           ========================================================================= */}
        {/* Entrance Monologue: “你终于走到了灯下。” */}
        <AnimatePresence>
          {showEntranceBanner && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.9 }}
              className="absolute bottom-16 sm:bottom-20 inset-x-0 flex justify-center z-25 pointer-events-none"
            >
              <div className="bg-[#18110b]/92 border border-[#61422c] text-[#f5ebd7] font-calligraphy text-base sm:text-lg px-6 py-2.5 wood-tag-edge shadow-2xl tracking-[0.25em]">
                “你终于走到了灯下。”
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* General Active Object Inspection Prompt */}
        <AnimatePresence>
          {activePrompt && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.7 }}
              className="absolute bottom-16 sm:bottom-20 inset-x-0 flex justify-center z-25 pointer-events-none px-4"
            >
              <div className="bg-[#18100a]/94 border border-[#5d3f2a] text-[#ebd9bd] font-song text-xs sm:text-sm px-6 py-2 wood-tag-edge shadow-2xl tracking-[0.18em] max-w-lg text-center leading-relaxed">
                {activePrompt}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            BOTTOM-RIGHT: 【线索簿】 NOTEBOOK
           ========================================================================= */}
        <LampNotebook
          hasClothShoesClue={hasClothShoesClue}
          hasPhotoClue={hasPhotoClue}
          hasTeaClue={hasTeaClue}
          hasBambooClue={hasBambooClue}
          hasRadioClue={hasRadioClue}
          hasThirdLetterClue={hasThirdLetterClue}
          isLampKeptTillDawn={isLampKeptTillDawn}
        />

        {/* =========================================================================
            MODALS & OVERLAYS
           ========================================================================= */}

        {/* 1. Tea Table Brewing Interaction */}
        <TeaBrewingModal
          isOpen={isTeaModalOpen}
          onClose={() => setIsTeaModalOpen(false)}
          onComplete={() => setHasTeaClue(true)}
          hasCompleted={hasTeaClue}
        />

        {/* 2. Wall Old Photo Detail Modal */}
        <WallPhotoModal
          isOpen={isPhotoModalOpen}
          onClose={() => setIsPhotoModalOpen(false)}
          onDiscoverClue={() => setHasPhotoClue(true)}
          hasDiscovered={hasPhotoClue}
        />

        {/* 3. The Third Letter Modal */}
        <ThirdLetterModal
          isOpen={isLetterModalOpen}
          onClose={() => setIsLetterModalOpen(false)}
          onFinishReading={handleFinishLetter}
          hasFinished={hasThirdLetterClue}
        />

        {/* 4. Sequential Echo Montage Modal (without skip button) */}
        <EchoMontageModal
          isActive={isMontageActive}
          onComplete={handleMontageComplete}
        />

        {/* 5. End of Chapter 4 Completion & Next Chapter Teaser Modal */}
        <AnimatePresence>
          {showNextChapterModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#080605]/95"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-md mx-auto space-y-6 bg-[#18110c] p-8 border border-[#5d402b] wood-tag-edge shadow-2xl text-center select-none"
              >
                <div className="space-y-2">
                  <span className="text-xs font-song text-[#bfa07d] tracking-[0.3em] block">
                    — 第四幕 · 那盏灯 完结 —
                  </span>
                  <h3 className="font-song text-2xl sm:text-3xl text-[#f6ecda] tracking-[0.25em] font-semibold">
                    回家的路
                  </h3>
                </div>

                <div className="space-y-3 font-song text-xs sm:text-sm text-[#c9b59b] leading-relaxed">
                  <p>
                    你已经读完了三封信，替他重新泡了一杯温茶，并将屋檐下的灯一直守到了天亮。
                  </p>
                  <p className="font-calligraphy text-base sm:text-lg text-[#fce8b8]">
                    “人走得再远，也总会有一条江，一盏灯，等着你记起回来的路。”
                  </p>
                  <p className="text-[11px] text-[#8f775f]">
                    晨曦初露，恩施山谷的薄雾正在慢慢散去，第五幕的故事静候启程……
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-center space-x-3">
                  <button
                    onClick={() => setShowNextChapterModal(false)}
                    className="cursor-pointer px-5 py-2 bg-[#2a1b12] hover:bg-[#382619] text-[#d6c4a5] font-song text-xs tracking-wider border border-[#5d402b] wood-tag-edge transition-colors"
                  >
                    留在灯下
                  </button>
                  <button
                    onClick={onBackToCover}
                    className="cursor-pointer px-5 py-2 bg-[#8c2d1b] hover:bg-[#772414] text-[#fcf1db] font-song text-xs tracking-wider wood-tag-edge transition-colors shadow-md flex items-center space-x-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>重温故事书封面</span>
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
