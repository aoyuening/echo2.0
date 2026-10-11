import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SceneId, JourneyClues, initialJourneyClues } from './types';
import { CoverScene } from './components/CoverScene';
import { CabinScene } from './components/CabinScene';
import { QingjiangScene } from './components/QingjiangScene';
import { LampScene } from './components/LampScene';
import { FinalLetterScene } from './components/FinalLetterScene';
import { BookPageTurnTransition } from './components/BookPageTurnTransition';
import { UnifiedClueNotebook } from './components/UnifiedClueNotebook';
import { ambientSound } from './utils/ambientAudio';
import vintageLetterPaper from './assets/images/vintage_letter_texture_1788855040945.jpg';

export default function App() {
  const [currentScene, setCurrentScene] = useState<SceneId>('cover');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [transitionTitle, setTransitionTitle] = useState<string>('翻开第一幕 · 恩施老屋');
  const [transitionSubtitle, setTransitionSubtitle] = useState<string>('“一段被时间留下的故事。”');

  // Dedicated transition for Chapter 4 -> Chapter 5 (Letter paper expanding & dissolving into dawn)
  const [isLetterTransitioning, setIsLetterTransitioning] = useState<boolean>(false);

  // Global Clues State shared seamlessly across all 5 chapters
  const [clues, setClues] = useState<JourneyClues>(initialJourneyClues);

  const handleDiscoverClue = (key: keyof JourneyClues, value: any = true) => {
    setClues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Transition: Cover -> Cabin
  const handleEnterCabin = () => {
    setIsTransitioning(true);
    setTransitionTitle('第一幕 · 恩施老屋');
    setTransitionSubtitle('“屋檐下的时间，静得像一汪水。”');
    ambientSound.playPageTurnSound();

    setTimeout(() => {
      setCurrentScene('cabin');
      ambientSound.transitionToScene('cabin');
      setIsTransitioning(false);
    }, 1400);
  };

  // Transition: Cabin -> Qingjiang
  const handleEnterQingjiang = () => {
    setIsTransitioning(true);
    setTransitionTitle('第二幕 · 清江边');
    setTransitionSubtitle('“沿着信里的话，你来到了清江边。”');
    ambientSound.playPageTurnSound();

    setTimeout(() => {
      setCurrentScene('qingjiang');
      ambientSound.transitionToScene('qingjiang');
      setIsTransitioning(false);
    }, 1400);
  };

  // Transition: Qingjiang -> Lamp
  const handleEnterLamp = () => {
    setIsTransitioning(true);
    setTransitionTitle('第四幕 · 那盏灯');
    setTransitionSubtitle('“去找那盏还亮着的灯。”');
    ambientSound.playPageTurnSound();

    setTimeout(() => {
      setCurrentScene('lamp');
      ambientSound.transitionToScene('lamp');
      setIsTransitioning(false);
    }, 1400);
  };

  // Transition: Lamp -> FinalLetter (Custom Letter Paper Expansion into Dawn)
  const handleEnterFinalLetter = () => {
    setIsLetterTransitioning(true);
    ambientSound.playPaperFoldSound();

    setTimeout(() => {
      ambientSound.playPageTurnSound();
    }, 1200);

    setTimeout(() => {
      setCurrentScene('finalLetter');
      ambientSound.transitionToScene('finalLetter');
      setIsLetterTransitioning(false);
    }, 3200);
  };

  // Return handlers
  const handleBackToCover = () => {
    ambientSound.playPageTurnSound();
    setCurrentScene('cover');
    ambientSound.transitionToScene('cover');
  };

  const handleBackToCabin = () => {
    ambientSound.playPageTurnSound();
    setCurrentScene('cabin');
    ambientSound.transitionToScene('cabin');
  };

  const handleBackToQingjiang = () => {
    ambientSound.playPageTurnSound();
    setCurrentScene('qingjiang');
    ambientSound.transitionToScene('qingjiang');
  };

  const handleBackToLamp = () => {
    ambientSound.playPageTurnSound();
    setCurrentScene('lamp');
    ambientSound.transitionToScene('lamp');
  };

  const handleRestartToCover = () => {
    ambientSound.playPageTurnSound();
    setCurrentScene('cover');
    ambientSound.transitionToScene('cover');
  };

  return (
    <main className="w-screen h-screen bg-[#0d0a08] flex items-center justify-center select-none overflow-hidden relative">
      {/* 16:9 Master Canvas Container */}
      <div className="relative w-full h-full max-w-[177.78vh] max-h-[56.25vw] aspect-[16/9] overflow-hidden shadow-2xl flex items-center justify-center">
        {/* Active Scene Rendering */}
        {currentScene === 'cover' && (
          <CoverScene
            onEnterStory={handleEnterCabin}
            isTransitioning={isTransitioning}
          />
        )}

        {currentScene === 'cabin' && (
          <CabinScene
            onBackToCover={handleBackToCover}
            onNavigateToQingjiang={handleEnterQingjiang}
            clues={clues}
            onDiscoverClue={handleDiscoverClue}
          />
        )}

        {currentScene === 'qingjiang' && (
          <QingjiangScene
            onBackToCabin={handleBackToCabin}
            onBackToCover={handleBackToCover}
            onNavigateToLamp={handleEnterLamp}
            clues={clues}
            onDiscoverClue={handleDiscoverClue}
          />
        )}

        {currentScene === 'lamp' && (
          <LampScene
            onBackToQingjiang={handleBackToQingjiang}
            onBackToCover={handleBackToCover}
            onNavigateToNextChapter={handleEnterFinalLetter}
            clues={clues}
            onDiscoverClue={handleDiscoverClue}
          />
        )}

        {currentScene === 'finalLetter' && (
          <FinalLetterScene
            onRestartStory={handleRestartToCover}
            onBackToLamp={handleBackToLamp}
            clues={clues}
            onDiscoverClue={handleDiscoverClue}
          />
        )}

        {/* Unified Clue Notebook: Persistent at bottom-left for all story scenes */}
        {currentScene !== 'cover' && (
          <UnifiedClueNotebook clues={clues} />
        )}
      </div>

      {/* Unified Book Page-Turn Transition */}
      <BookPageTurnTransition
        isActive={isTransitioning}
        chapterTitle={transitionTitle}
        chapterSubtitle={transitionSubtitle}
      />

      {/* Special Transition: Chapter 4 -> Chapter 5 (Letter Paper Expands, Text Fills Frame, Fades into Dawn) */}
      <AnimatePresence>
        {isLetterTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0906] overflow-hidden pointer-events-none"
          >
            {/* The expanding letter texture filling the entire screen */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0.2, rotate: -1.5 }}
              animate={{ scale: 1.12, opacity: 1, rotate: 0 }}
              transition={{ duration: 2.4, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                backgroundImage: `url(${vintageLetterPaper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-[#f7ebd4]/85 backdrop-blur-[1px]" />

              {/* Calligraphy ink text appearing on the letter and gently filling the frame */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1.4 }}
                className="relative z-10 text-center max-w-xl p-8 space-y-3"
              >
                <p className="font-calligraphy text-2xl sm:text-4xl text-[#3b2416] tracking-[0.3em] leading-relaxed">
                  “总有一盏灯，”
                </p>
                <p className="font-calligraphy text-xl sm:text-3xl text-[#5c341e] tracking-[0.25em] leading-relaxed">
                  “会替你记得回来的路。”
                </p>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ delay: 1.6, duration: 1.0 }}
                  className="font-song text-xs text-[#8a6843] tracking-[0.35em] block pt-3"
                >
                  晨光渐起 · 清江入晓
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
