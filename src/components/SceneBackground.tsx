import React from 'react';
import bgImage from '../assets/images/enshi_room_bg_1788855027069.jpg';

interface SceneBackgroundProps {
  children?: React.ReactNode;
}

export const SceneBackground: React.FC<SceneBackgroundProps> = ({ children }) => {
  return (
    <div
      id="scene-viewport"
      className="relative w-full h-screen overflow-hidden bg-[#161210] flex items-center justify-center select-none"
    >
      {/* 16:9 Aspect Ratio Master Container (Responsive to all viewports) */}
      <div
        id="scene-canvas-16-9"
        className="relative w-full h-full max-w-[177.78vh] max-h-[56.25vw] aspect-[16/9] overflow-hidden shadow-2xl"
      >
        {/* The Illustrated Enshi Room Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt="恩施山地老屋与黄昏远山"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter saturate-[0.92] contrast-[1.03]"
          />
        </div>

        {/* Ambient Evening Twilight Vignette & Storybook Toning */}
        <div
          className="absolute inset-0 pointer-events-none z-1"
          style={{
            background:
              'radial-gradient(ellipse at 40% 65%, rgba(245, 186, 88, 0.12) 0%, rgba(30, 20, 15, 0.35) 60%, rgba(10, 7, 5, 0.75) 100%)',
          }}
        />

        {/* Storybook Aged Paper Texture Overlay (Gives the feel of an open picture book) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay z-2"
          style={{
            backgroundImage:
              'radial-gradient(#cfb283 1px, transparent 1px), radial-gradient(#6d4c2b 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
          }}
        />

        {/* Soft edge darkening like a book border */}
        <div className="absolute inset-0 pointer-events-none border-[8px] sm:border-[12px] md:border-[16px] border-[#18120e]/60 z-3" />

        {/* The Stage Content (Desk items, letter, titles, and controls) */}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
};
