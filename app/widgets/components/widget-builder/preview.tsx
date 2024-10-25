"use client";

import { Card } from "@/components/ui/card";
import { ImageSet, SingleImageConfig, SideBySideConfig } from "./widget-builder";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PreviewProps {
  sets: ImageSet[];
  selectedSetId: string | null;
}

export function Preview({ sets, selectedSetId }: PreviewProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const selectedSet = sets.find(set => set.id === selectedSetId);

  if (!selectedSet) {
    return (
      <Card className="p-6 text-center text-gray-500">
        Select a set to preview or add a new one to start building your widget
      </Card>
    );
  }

  const renderContent = () => {
    if (selectedSet.type === "image") {
      const config = selectedSet.config as SingleImageConfig;
      if (!config.imageUrl) {
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
            backgroundColor: config.backgroundColor,
            borderColor: config.borderColor,
            borderStyle: config.borderSize > 0 ? 'solid' : 'none',
          }}
        >
          <Image
            src={config.imageUrl}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      );
    }

    if (selectedSet.type === "sideBySide") {
      const config = selectedSet.config as SideBySideConfig;
      if (!config.beforeImageUrl || !config.afterImageUrl) {
        return (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select before and after images to compare
          </div>
        );
      }

      if (config.layout === "slider") {
        return (
          <div 
            className="relative h-full"
            style={{
              backgroundColor: config.backgroundColor,
              padding: `${config.borderSize}px`,
              borderColor: config.borderColor,
              borderStyle: config.borderSize > 0 ? 'solid' : 'none',
            }}
          >
            <div className="relative h-full">
              <Image
                src={config.afterImageUrl}
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
                  src={config.beforeImageUrl}
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
          </div>
        );
      }

      return (
        <div 
          className="grid grid-cols-2 gap-4 h-full"
          style={{
            backgroundColor: config.backgroundColor,
            padding: `${config.borderSize}px`,
            borderColor: config.borderColor,
            borderStyle: config.borderSize > 0 ? 'solid' : 'none',
          }}
        >
          <div className="relative">
            <Image
              src={config.beforeImageUrl}
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
              src={config.afterImageUrl}
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

    return null;
  };

  return (
    <Card className="p-6">
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
        {renderContent()}
      </div>
    </Card>
  );
}