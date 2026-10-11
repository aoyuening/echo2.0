import React, { useState } from 'react';
import { motion } from 'motion/react';
import photoThumb from '../../assets/images/enshi_vintage_family_photo_1788855993742.jpg';

interface CabinetPhotoProps {
  onInspect: () => void;
  onHoverChange: (isHovered: boolean) => void;
}

export const CabinetPhoto: React.FC<CabinetPhotoProps> = ({
  onInspect,
  onHoverChange,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverStart = () => {
    setIsHovered(true);
    onHoverChange(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    onHoverChange(false);
  };

  return (
    <div
      id="cabin-item-photo"
      className="absolute top-[23%] sm:top-[25%] md:top-[26%] left-[45%] sm:left-[47%] md:left-[48%] z-20 pointer-events-auto"
    >
      <motion.div
        animate={{
          // When hovered, the old photo gently sways on its wall nail
          rotate: isHovered ? [0, -3.5, 2.5, -1, 0] : 0,
          y: isHovered ? -3 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onClick={onInspect}
        className="relative cursor-pointer select-none group"
        title="木墙上的老照片"
      >
        {/* Wall hanging nail and twine chord */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-[#8c6239] border border-[#4a331c] shadow-sm" />
          <svg className="w-8 h-3 -mt-0.5 text-[#6e4e2f]" viewBox="0 0 32 12" fill="none">
            <path d="M16 1 L2 11 M16 1 L30 11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>

        {/* Soft shadow cast against the wooden wall */}
        <div className="absolute inset-0 bg-[#0c0806]/70 blur-[3px] translate-y-1.5 translate-x-1 rounded-xs pointer-events-none" />

        {/* Vintage Photo Frame Card */}
        <div className="relative w-16 sm:w-20 md:w-24 bg-[#f2e9d8] border border-[#c2b092] p-1 pb-2.5 shadow-md rounded-xs">
          {/* Black and white aged family photo miniature */}
          <div className="w-full aspect-[4/3] bg-[#2d2621] overflow-hidden relative grayscale contrast-110 sepia-[0.3]">
            <img
              src={photoThumb}
              alt="老照片缩略"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#826039]/15 mix-blend-color" />
          </div>

          <div className="mt-1 text-center">
            <span className="text-[8px] font-handwriting text-[#695847] tracking-wider block">
              岁月留影
            </span>
          </div>
        </div>

        {/* Subtle tooltip on hover */}
        {isHovered && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-30 pointer-events-none bg-[#241812]/92 text-[#ecdcb9] text-[11px] font-song px-2.5 py-0.5 wood-tag-edge border border-[#7a573d] shadow-md tracking-wider">
            木墙上挂着一张老照片。
          </div>
        )}
      </motion.div>
    </div>
  );
};
