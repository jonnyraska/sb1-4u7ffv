"use client";

import Image from 'next/image';
import { ImageConfig } from '../widget-builder';

interface ImagePreviewProps {
  config: ImageConfig;
}

export function ImagePreview({ config }: ImagePreviewProps) {
  if (!config.url) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select an image to display
      </div>
    );
  }

  return (
    <div 
      className="relative h-full"
      style={{
        padding: `${config.borderSize}px`,
        borderColor: config.borderColor,
        borderStyle: config.borderSize > 0 ? 'solid' : 'none',
      }}
    >
      <Image
        src={config.url}
        alt=""
        fill
        className="object-cover"
      />
    </div>
  );
}