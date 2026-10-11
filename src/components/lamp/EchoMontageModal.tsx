import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Footprints,
  Layers,
  Sparkles,
  Radio,
  Coffee,
  FileText,
  Flame,
  Check,
} from 'lucide-react';
import vintagePhotoImg from '../../assets/images/enshi_vintage_family_photo_1788855993742.jpg';
import brassButtonImg from '../../assets/images/enshi_old_brass_button_1788856763821.jpg';
import exteriorImg from '../../assets/images/enshi_lamp_exterior_1788857415192.jpg';
import letterBg from '../../assets/images/vintage_letter_texture_1788855040945.jpg';
import { ambientSound } from '../../utils/ambientAudio';

interface EchoMontageModalProps {
  isActive: boolean;
  onComplete: () => void;
  onKeepLamp?: () => void;
}

interface ClueStepData {
  title: string;
  order: string;
  summary: string;
  sub: string;
}

const STEPS_DATA: ClueStepData[] = [
  {
    order: '线索一',
    title: '门口旧布鞋',
    summary: '“鞋底还留着山路上的泥。这里的人，每天都要走很远。”',
    sub: '留在泥土里的行迹',
  },
  {
    order: '线索二',
    title: '窗边竹编',
    summary: '“它已经用了很多年。手艺留下来了，人却走远了。”',
    sub: '经年摩挲的温润器物',
  },
  {
    order: '线索三',
    title: '旧照片与铜纽扣',
    summary: '“照片里青年的领口，与清江边拾得的纽扣严丝合缝。”',
    sub: '穿透时光的唯一信物',
  },
  {
    order: '线索四',
    title: '老收音机电波',
    summary: '“……清江……回来……沙沙的电波越过千山。”',
    sub: '山谷间未能传达的回声',
  },
  {
    order: '线索五',
    title: '案头微温热茶',
    summary: '“那一碗重新沏好的茶汤，还冒着微温的轻白热气。”',
    sub: '给未曾等到之人的留客茶',
  },
  {
    order: '线索六',
    title: '案头第三封信',
    summary: '“人走得再远，也总会有一条江，一盏灯，等着你记起回来的路。”',
    sub: '留给后来人的嘱托',
  },
  {
    order: '终声',
    title: '屋檐下的长明灯',
    summary: '“以及这一盏替他守在黑夜里的灯。”',
    sub: '照亮所有归途的光',
  },
];

export const EchoMontageModal: React.FC<EchoMontageModalProps> = ({
  isActive,
  onComplete,
  onKeepLamp,
}) => {
  const [montageStep, setMontageStep] = useState<number>(0);

  const handleFinalAction = () => {
    onComplete();
    if (onKeepLamp) {
      setTimeout(() => {
        onKeepLamp();
      }, 300);
    }
  };

  useEffect(() => {
    if (!isActive) {
      setMontageStep(0);
      return;
    }

    setMontageStep(0);
    ambientSound.playPageTurnSound();

    // Step 0: Cloth Shoes (2.4s)
    const t0 = setTimeout(() => {
      setMontageStep(1);
      ambientSound.playWoodBoxOpenSound();
    }, 2400);

    // Step 1: Bamboo (2.4s)
    const t1 = setTimeout(() => {
      setMontageStep(2);
      ambientSound.playPageTurnSound();
    }, 4800);

    // Step 2: Photo & Button (2.6s)
    const t2 = setTimeout(() => {
      setMontageStep(3);
      ambientSound.playRadioStaticWhisper();
    }, 7400);

    // Step 3: Radio (2.4s)
    const t3 = setTimeout(() => {
      setMontageStep(4);
      ambientSound.playTeaCupPlaceSound();
    }, 9800);

    // Step 4: Hot Tea (2.4s)
    const t4 = setTimeout(() => {
      setMontageStep(5);
      ambientSound.playPaperFoldSound();
    }, 12200);

    // Step 5: Letter (2.6s)
    const t5 = setTimeout(() => {
      setMontageStep(6);
      ambientSound.playWarmLampLitSound();
    }, 14800);

    // Step 6: Hanging Lamp (2.6s)
    const t6 = setTimeout(() => {
      setMontageStep(7); // All Clues Harmonious Convergence
      ambientSound.playWarmLampLitSound();
    }, 17400);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [isActive]);

  if (!isActive) return null;

  const currentClue = STEPS_DATA[montageStep] || STEPS_DATA[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070504]/94 backdrop-blur-[2px] select-none p-4 pointer-events-auto">
      {/* Background radial ambiance */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(220, 150, 60, 0.18) 0%, transparent 75%)',
        }}
      />

      {/* Top Header Notification */}
      <div className="absolute top-6 inset-x-0 flex justify-center pointer-events-none z-20">
        <div className="bg-[#1e130b]/90 border border-[#704d33] px-5 py-1.5 wood-tag-edge shadow-lg flex items-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-[#e8a338] animate-pulse" />
          <span className="font-song text-xs sm:text-sm text-[#ebd6b8] tracking-[0.25em]">
            所有线索连缀 · 记忆逐一浮现
          </span>
        </div>
      </div>

      {/* Step Indicators Bar */}
      <div className="absolute top-16 inset-x-0 flex justify-center items-center space-x-2 z-20 pointer-events-none">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((s) => (
          <div
            key={s}
            className={`transition-all duration-500 rounded-full ${
              s === montageStep
                ? 'w-6 h-1.5 bg-[#f5ba58]'
                : s < montageStep
                ? 'w-1.5 h-1.5 bg-[#8f643e]'
                : 'w-1.5 h-1.5 bg-[#3a271c]'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ===================================================================
            STEP 0: 门口旧布鞋
           =================================================================== */}
        {montageStep === 0 && (
          <motion.div
            key="shoes"
            initial={{ scale: 0.65, opacity: 0, y: 28 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.08, opacity: 0, y: -15 }}
            transition={{ type: 'spring', damping: 18, stiffness: 125 }}
            className="relative z-10 flex flex-col items-center max-w-lg text-center space-y-4"
          >
            <div className="relative w-28 h-28 rounded-full bg-[#1e130a] border-2 border-[#825531] shadow-[0_0_35px_rgba(212,155,66,0.3)] flex items-center justify-center">
              <Footprints className="w-12 h-12 text-[#e2aa52] -rotate-12" />
              <div className="absolute -bottom-1 px-2.5 py-0.5 bg-[#381f12] border border-[#a87642] text-[10px] font-song text-[#fce8ba] wood-tag-edge">
                {currentClue.order}
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-song text-xl sm:text-2xl text-[#f6ecda] tracking-[0.2em] font-medium">
                {currentClue.title}
              </h4>
              <p className="font-song text-xs text-[#baa080] tracking-widest">
                {currentClue.sub}
              </p>
            </div>

            <p className="font-calligraphy text-base sm:text-lg text-[#ebd6b5] tracking-[0.25em] max-w-md leading-relaxed px-4">
              {currentClue.summary}
            </p>
          </motion.div>
        )}

        {/* ===================================================================
            STEP 1: 窗边竹编
           =================================================================== */}
        {montageStep === 1 && (
          <motion.div
            key="bamboo"
            initial={{ scale: 0.65, opacity: 0, y: 28 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.08, opacity: 0, y: -15 }}
            transition={{ type: 'spring', damping: 18, stiffness: 125 }}
            className="relative z-10 flex flex-col items-center max-w-lg text-center space-y-4"
          >
            <div className="relative w-28 h-28 rounded-full bg-[#1e130a] border-2 border-[#825531] shadow-[0_0_35px_rgba(212,155,66,0.3)] flex items-center justify-center">
              <Layers className="w-12 h-12 text-[#e2aa52]" />
              <div className="absolute -bottom-1 px-2.5 py-0.5 bg-[#381f12] border border-[#a87642] text-[10px] font-song text-[#fce8ba] wood-tag-edge">
                {currentClue.order}
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-song text-xl sm:text-2xl text-[#f6ecda] tracking-[0.2em] font-medium">
                {currentClue.title}
              </h4>
              <p className="font-song text-xs text-[#baa080] tracking-widest">
                {currentClue.sub}
              </p>
            </div>

            <p className="font-calligraphy text-base sm:text-lg text-[#ebd6b5] tracking-[0.25em] max-w-md leading-relaxed px-4">
              {currentClue.summary}
            </p>
          </motion.div>
        )}

        {/* ===================================================================
            STEP 2: 旧照片与铜纽扣
           =================================================================== */}
        {montageStep === 2 && (
          <motion.div
            key="photo_button"
            initial={{ scale: 0.65, opacity: 0, y: 28 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.08, opacity: 0, y: -15 }}
            transition={{ type: 'spring', damping: 18, stiffness: 125 }}
            className="relative z-10 flex flex-col items-center max-w-lg text-center space-y-4"
          >
            <div className="relative flex items-center justify-center">
              {/* Photo */}
              <div className="w-44 sm:w-52 aspect-[4/3] p-1.5 bg-[#25170e] border-2 border-[#7a5030] shadow-2xl -rotate-3 overflow-hidden rounded-xs">
                <img
                  src={vintagePhotoImg}
                  alt="照片"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover sepia-[0.3]"
                />
              </div>
              {/* Button Overlapping */}
              <div className="absolute -bottom-2 -right-4 w-16 h-16 rounded-full border-2 border-[#d49b42] shadow-[0_0_20px_#d49b42] overflow-hidden bg-[#24170d]">
                <img
                  src={brassButtonImg}
                  alt="铜纽扣"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <span className="text-[10px] font-song text-[#d49b42] tracking-widest block">
                {currentClue.order} · {currentClue.sub}
              </span>
              <h4 className="font-song text-xl sm:text-2xl text-[#f6ecda] tracking-[0.2em] font-medium">
                {currentClue.title}
              </h4>
            </div>

            <p className="font-calligraphy text-base sm:text-lg text-[#ebd6b5] tracking-[0.25em] max-w-md leading-relaxed px-4">
              {currentClue.summary}
            </p>
          </motion.div>
        )}

        {/* ===================================================================
            STEP 3: 老收音机电波
           =================================================================== */}
        {montageStep === 3 && (
          <motion.div
            key="radio"
            initial={{ scale: 0.65, opacity: 0, y: 28 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.08, opacity: 0, y: -15 }}
            transition={{ type: 'spring', damping: 18, stiffness: 125 }}
            className="relative z-10 flex flex-col items-center max-w-lg text-center space-y-4"
          >
            <div className="relative w-28 h-28 rounded-full bg-[#1e130a] border-2 border-[#825531] shadow-[0_0_35px_rgba(212,155,66,0.3)] flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="absolute inset-2 rounded-full border border-[#f5ba58]"
              />
              <Radio className="w-12 h-12 text-[#e2aa52] animate-pulse" />
              <div className="absolute -bottom-1 px-2.5 py-0.5 bg-[#381f12] border border-[#a87642] text-[10px] font-song text-[#fce8ba] wood-tag-edge">
                {currentClue.order}
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-song text-xl sm:text-2xl text-[#f6ecda] tracking-[0.2em] font-medium">
                {currentClue.title}
              </h4>
              <p className="font-song text-xs text-[#baa080] tracking-widest">
                {currentClue.sub}
              </p>
            </div>

            <p className="font-calligraphy text-base sm:text-lg text-[#ebd6b5] tracking-[0.25em] max-w-md leading-relaxed px-4">
              {currentClue.summary}
            </p>
          </motion.div>
        )}

        {/* ===================================================================
            STEP 4: 粗陶温茶
           =================================================================== */}
        {montageStep === 4 && (
          <motion.div
            key="tea"
            initial={{ scale: 0.65, opacity: 0, y: 28 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.08, opacity: 0, y: -15 }}
            transition={{ type: 'spring', damping: 18, stiffness: 125 }}
            className="relative z-10 flex flex-col items-center max-w-lg text-center space-y-4"
          >
            <div className="relative w-28 h-28 rounded-full bg-[#1e130a] border-2 border-[#825531] shadow-[0_0_35px_rgba(212,155,66,0.3)] flex items-center justify-center">
              <motion.div
                animate={{ y: [-2, -18], opacity: [0, 0.75, 0], scale: [0.8, 1.3] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                className="absolute -top-3 w-4 h-8 rounded-full bg-[#fde9cc]/40 blur-[2px]"
              />
              <Coffee className="w-12 h-12 text-[#e2aa52]" />
              <div className="absolute -bottom-1 px-2.5 py-0.5 bg-[#381f12] border border-[#a87642] text-[10px] font-song text-[#fce8ba] wood-tag-edge">
                {currentClue.order}
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-song text-xl sm:text-2xl text-[#f6ecda] tracking-[0.2em] font-medium">
                {currentClue.title}
              </h4>
              <p className="font-song text-xs text-[#baa080] tracking-widest">
                {currentClue.sub}
              </p>
            </div>

            <p className="font-calligraphy text-base sm:text-lg text-[#ebd6b5] tracking-[0.25em] max-w-md leading-relaxed px-4">
              {currentClue.summary}
            </p>
          </motion.div>
        )}

        {/* ===================================================================
            STEP 5: 案头第三封信
           =================================================================== */}
        {montageStep === 5 && (
          <motion.div
            key="letter"
            initial={{ scale: 0.65, opacity: 0, y: 28 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.08, opacity: 0, y: -15 }}
            transition={{ type: 'spring', damping: 18, stiffness: 125 }}
            className="relative z-10 flex flex-col items-center max-w-lg text-center space-y-4"
          >
            <div className="relative w-44 sm:w-52 aspect-[5/3] p-2 bg-[#ebd8b0] border-2 border-[#8a5d35] paper-edge-rough shadow-2xl overflow-hidden flex flex-col justify-center items-center">
              <img
                src={letterBg}
                alt="信纸"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-multiply pointer-events-none"
              />
              <FileText className="w-6 h-6 text-[#8a3320] mb-1" />
              <span className="font-calligraphy text-xs sm:text-sm text-[#3b2416] tracking-widest">
                “致寻路而来的人”
              </span>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-song text-xl sm:text-2xl text-[#f6ecda] tracking-[0.2em] font-medium">
                {currentClue.title}
              </h4>
              <p className="font-song text-xs text-[#baa080] tracking-widest">
                {currentClue.sub}
              </p>
            </div>

            <p className="font-calligraphy text-base sm:text-lg text-[#f8ebd0] tracking-[0.25em] max-w-md leading-relaxed px-4">
              {currentClue.summary}
            </p>
          </motion.div>
        )}

        {/* ===================================================================
            STEP 6: 屋檐下的长明灯
           =================================================================== */}
        {montageStep === 6 && (
          <motion.div
            key="lamp"
            initial={{ scale: 0.65, opacity: 0, y: 28 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.08, opacity: 0, y: -15 }}
            transition={{ type: 'spring', damping: 18, stiffness: 125 }}
            className="relative z-10 flex flex-col items-center max-w-lg text-center space-y-4"
          >
            <div className="w-64 sm:w-76 aspect-[16/9] p-1.5 bg-[#25180f] border-2 border-[#825531] shadow-2xl overflow-hidden rounded-xs">
              <img
                src={exteriorImg}
                alt="屋檐下的灯"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1.5">
              <h4 className="font-song text-xl sm:text-2xl text-[#f6ecda] tracking-[0.2em] font-medium">
                {currentClue.title}
              </h4>
              <p className="font-song text-xs text-[#baa080] tracking-widest">
                {currentClue.sub}
              </p>
            </div>

            <p className="font-calligraphy text-base sm:text-lg text-[#faebd3] tracking-[0.25em] max-w-md leading-relaxed px-4">
              {currentClue.summary}
            </p>
          </motion.div>
        )}

        {/* ===================================================================
            STEP 7: 全线索齐聚 · 记忆共鸣
           =================================================================== */}
        {montageStep === 7 && (
          <motion.div
            key="all_clues"
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center max-w-xl text-center space-y-5 px-4"
          >
            <div className="space-y-1">
              <span className="text-[11px] font-song text-[#e8a338] tracking-[0.3em] block">
                恩施吊脚楼 · 全部六处线索齐备
              </span>
              <h3 className="font-song text-2xl sm:text-3xl text-[#fbf0dd] tracking-[0.25em] font-semibold">
                所有的回声，都在替他记得回来的路
              </h3>
            </div>

            {/* 6 Harmonious Clue Badges Arrayed */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 w-full pt-2">
              {[
                { label: '旧布鞋', icon: Footprints },
                { label: '旧竹编', icon: Layers },
                { label: '铜纽扣', icon: Sparkles },
                { label: '老收音机', icon: Radio },
                { label: '粗陶热茶', icon: Coffee },
                { label: '第三封信', icon: FileText },
              ].map((c, idx) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="p-2.5 bg-[#20150e]/95 border border-[#755034] wood-tag-edge flex flex-col items-center space-y-1 shadow-md"
                  >
                    <Icon className="w-4 h-4 text-[#f5ba58]" />
                    <span className="font-song text-[11px] text-[#ebd6b8] whitespace-nowrap">
                      {c.label}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#52a658]" />
                  </motion.div>
                );
              })}
            </div>

            <p className="font-calligraphy text-base sm:text-lg text-[#f8ecda] tracking-[0.25em] max-w-lg leading-relaxed pt-1">
              “你替他走完了这一段路。现在，该替他把灯留到天亮了。”
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleFinalAction}
              className="cursor-pointer px-9 py-3 bg-[#8a2f1c] hover:bg-[#9e3722] text-[#fdf1db] font-song text-sm font-semibold tracking-[0.3em] wood-tag-edge shadow-[0_6px_25px_rgba(0,0,0,0.85)] flex items-center space-x-2 border border-[#bd5c46] mt-2"
            >
              <Flame className="w-4 h-4 text-[#f7ba4a]" />
              <span>把灯留到天亮</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
