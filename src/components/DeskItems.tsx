import React from 'react';
import { motion } from 'motion/react';
import { Radio, Volume2, VolumeX } from 'lucide-react';
import { ambientSound } from '../utils/ambientAudio';

interface DeskItemsProps {
  radioPlaying: boolean;
  setRadioPlaying: (playing: boolean) => void;
}

export const DeskItems: React.FC<DeskItemsProps> = ({
  radioPlaying,
  setRadioPlaying,
}) => {
  const handleRadioClick = () => {
    const active = ambientSound.toggle();
    setRadioPlaying(active);
  };

  return (
    <div id="desk-items-container" className="relative w-full h-full pointer-events-none">
      {/* 1. Small Warm Yellow Lamp (暖黄色的小灯) */}
      <div
        id="warm-oil-lamp"
        className="absolute bottom-[34%] left-[46%] sm:left-[44%] md:left-[42%] pointer-events-auto group cursor-help z-10"
        title="油灯微光，映着案上的旧信"
      >
        {/* Soft glowing ambient amber light spreading over the desk */}
        <div
          className="absolute -inset-16 sm:-inset-24 md:-inset-32 rounded-full pointer-events-none lamp-flicker"
          style={{
            background: 'radial-gradient(circle, rgba(245, 186, 88, 0.45) 0%, rgba(220, 140, 50, 0.22) 40%, rgba(30, 20, 15, 0) 75%)',
          }}
        />

        {/* Lamp Base & Glass Chimney */}
        <div className="relative flex flex-col items-center w-12 sm:w-14">
          {/* Flame & Core Glow */}
          <div className="relative w-4 h-6 mb-1">
            <motion.div
              animate={{
                scale: [1, 1.12, 0.96, 1.05, 1],
                opacity: [0.85, 0.95, 0.8, 0.92, 0.85],
              }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              className="absolute inset-0 bg-[#ffe8a3] rounded-full blur-[1px] shadow-[0_0_12px_#f5ba58]"
            />
            <div className="absolute inset-[2px] bg-[#fffbf0] rounded-full" />
          </div>

          {/* Glass Chimney */}
          <div className="w-6 sm:w-7 h-12 sm:h-14 border border-[#e8c078]/40 bg-gradient-to-b from-[#f5ba58]/20 via-[#d49b42]/30 to-[#8c5e2d]/60 rounded-t-full shadow-inner" />

          {/* Brass / Cast Iron Burner & Fuel Reservoir */}
          <div className="w-10 sm:w-12 h-6 sm:h-7 bg-[#3a281e] border-t-2 border-[#b58348] rounded-b-md shadow-md flex items-center justify-center">
            <div className="w-7 h-2 bg-[#251811] rounded-sm" />
          </div>

          {/* Lamp Label tooltip on hover */}
          <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[11px] font-song text-[#eddcb8] bg-[#221813]/90 px-2 py-0.5 rounded border border-[#6d513e]/60 whitespace-nowrap">
            油灯 · 暖黄夜光
          </div>
        </div>
      </div>

      {/* 2. Old Vintage Transistor Radio (老式收音机) */}
      <div
        id="vintage-radio"
        onClick={handleRadioClick}
        className="absolute bottom-[28%] left-[2%] sm:left-[6%] md:left-[10%] pointer-events-auto cursor-pointer group z-10 transition-transform duration-300 hover:-translate-y-1"
      >
        <div className="relative w-28 sm:w-36 md:w-40 bg-[#3d2719] border border-[#5a3e2b] rounded-t-sm shadow-xl p-2 sm:p-2.5 flex flex-col justify-between">
          {/* Wood grain outer frame */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#2a1a11] via-[#432c1e] to-[#2e1d13] opacity-90 rounded-t-sm" />

          {/* Antenna */}
          <div className="absolute -top-6 right-3 w-0.5 h-6 bg-[#8a796c] origin-bottom transform rotate-12" />

          <div className="relative z-10 flex flex-col space-y-1.5">
            {/* Tuning dial display */}
            <div className="w-full bg-[#1b120c] border border-[#523b2b] px-1.5 py-1 rounded flex items-center justify-between">
              <div className="text-[9px] sm:text-[10px] text-[#c9a777] font-mono tracking-wider">
                SW / MW 108.4
              </div>
              <div className="w-2 h-2 rounded-full bg-[#f5ba58]/80 animate-pulse" />
            </div>

            {/* Speaker Grill */}
            <div className="w-full h-9 sm:h-11 bg-[#251811] border border-[#442f22] rounded p-1 flex flex-col justify-around">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-0.5 bg-[#3a271c] rounded-full" />
              ))}
            </div>

            {/* Knobs & Radio Status */}
            <div className="flex items-center justify-between pt-0.5">
              <div className="flex items-center space-x-1.5">
                <div
                  className={`w-4 h-4 rounded-full border border-[#78593f] flex items-center justify-center transition-colors ${
                    radioPlaying ? 'bg-[#b83b26]' : 'bg-[#291b13]'
                  }`}
                >
                  <div className="w-1.5 h-1.5 bg-[#d49b42] rounded-full" />
                </div>
                <span className="text-[10px] text-[#baa48d] font-song hidden sm:inline">
                  {radioPlaying ? '播放中' : '调谐'}
                </span>
              </div>

              <div className="flex items-center space-x-1 text-[#d9c0a3]">
                {radioPlaying ? (
                  <Volume2 className="w-3.5 h-3.5 text-[#f5ba58]" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-[#8c7462]" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Radio hover prompt */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] sm:text-[11px] font-song text-[#eddcb8] bg-[#221813]/90 px-2 py-0.5 rounded border border-[#6d513e]/60 whitespace-nowrap">
          {radioPlaying ? '点击关闭清江风声' : '点击轻听江流与风声'}
        </div>
      </div>

      {/* 3. Old Photograph (一张老照片) */}
      <div
        id="old-photograph"
        className="absolute bottom-[26%] left-[38%] sm:left-[35%] md:left-[33%] pointer-events-auto transform -rotate-6 transition-transform duration-300 hover:rotate-0 hover:-translate-y-1 hover:z-20 cursor-default group"
      >
        <div className="w-20 sm:w-24 md:w-28 bg-[#ede6d4] p-1.5 pb-4 shadow-lg border border-[#cfc0a5] rounded-sm relative">
          {/* Subtle paper discoloration & worn corners */}
          <div className="w-full aspect-[4/3] bg-[#2d2822] overflow-hidden relative grayscale contrast-125 sepia">
            {/* Stylized vintage picture: Enshi mountain cliffs & ferry boat by the Qingjiang river */}
            <svg viewBox="0 0 100 75" className="w-full h-full opacity-80" preserveAspectRatio="none">
              <rect width="100" height="75" fill="#3b352f" />
              {/* Layered mountain silhouettes */}
              <path d="M0,50 Q25,20 50,45 T100,30 L100,75 L0,75 Z" fill="#241e1a" opacity="0.9" />
              <path d="M15,55 Q45,35 75,50 T100,42 L100,75 L15,75 Z" fill="#181310" opacity="0.95" />
              {/* River water curve */}
              <path d="M0,60 Q50,68 100,58 L100,75 L0,75 Z" fill="#4d443b" opacity="0.5" />
              {/* Small wooden boat silhouette */}
              <path d="M52,62 Q60,61 68,62 L66,65 Q58,66 54,65 Z" fill="#0f0c0a" />
              <line x1="59" y1="58" x2="59" y2="62" stroke="#0f0c0a" strokeWidth="0.8" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-[#8c6b44]/20 to-transparent mix-blend-color-burn" />
          </div>

          {/* Faint date in ink at the bottom of the photo */}
          <div className="mt-1 text-center">
            <span className="text-[8px] sm:text-[9px] font-handwriting text-[#7a6b5a] tracking-widest">
              清江渡口 · 一九八九
            </span>
          </div>

          {/* Photo Hover Tooltip */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[11px] font-song text-[#eddcb8] bg-[#221813]/90 px-2 py-0.5 rounded border border-[#6d513e]/60 whitespace-nowrap pointer-events-none">
            旧照片 · 记忆里的清江老渡
          </div>
        </div>
      </div>
    </div>
  );
};
