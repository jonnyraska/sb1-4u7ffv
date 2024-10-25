"use client";

import { useState } from 'react';
import Image from 'next/image';
import { SideBySideConfig } from '../widget-builder';

interface SideBySidePreviewProps {
  config: SideBySideConfig;
}

export function SideBySidePreview({ config }: SideBySidePreviewProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  if (!config.beforeImage || !config.afterImage) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Add before and after images to compare
      </div>
    );
  }

  if (config.layout === 'slider') {
    return (
      <div className="relative h-full">
        <Image
          src={config.afterImage}
          alt="After"
          fill
          className="object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          <Image
            src={config.beforeImage}
            alt="Before"
            fill
            className="object-cover"
          />
        </div>
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(parseInt(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-ew-resize w-full"
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <div className="relative">
        <Image
          src={config.beforeImage}
          alt="Before"
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
          Before
        </div>
      </div>
      <div className="relative">
        <Image
          src={config.afterImage}
          alt="After"
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
          After
        </div>
      </div>
    </div>
  );
}