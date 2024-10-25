"use client";

import { VideoConfig } from '../widget-builder';

interface VideoPreviewProps {
  config: VideoConfig;
}

export function VideoPreview({ config }: VideoPreviewProps) {
  if (!config.url) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Add a video URL or upload a video file
      </div>
    );
  }

  if (config.source === 'link') {
    return (
      <iframe
        src={config.url}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <video
      src={config.url}
      className="w-full h-full object-cover"
      controls
      autoPlay={config.autoPlay}
      loop
      muted={config.autoPlay}
    />
  );
}