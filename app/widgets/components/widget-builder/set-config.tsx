"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageSet, SingleImageConfig, SideBySideConfig } from "./widget-builder";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Image, Upload } from "lucide-react";

interface SetConfigProps {
  set: ImageSet;
  onUpdate: (config: Partial<SingleImageConfig | SideBySideConfig>) => void;
  onSelectImage: (mode: "single" | "before" | "after") => void;
}

export function SetConfig({ set, onUpdate, onSelectImage }: SetConfigProps) {
  if (set.type === "form") {
    return null;
  }

  const renderImageSelection = () => {
    if (set.type === "image") {
      const config = set.config as SingleImageConfig;
      return (
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onSelectImage("single")}
        >
          {config.imageUrl ? (
            <>
              <Image className="h-4 w-4 mr-2" />
              Change Image
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Select Image
            </>
          )}
        </Button>
      );
    }

    if (set.type === "sideBySide") {
      const config = set.config as SideBySideConfig;
      return (
        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => onSelectImage("before")}
          >
            {config.beforeImageUrl ? (
              <>
                <Image className="h-4 w-4 mr-2" />
                Change Before Image
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Select Before Image
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => onSelectImage("after")}
          >
            {config.afterImageUrl ? (
              <>
                <Image className="h-4 w-4 mr-2" />
                Change After Image
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Select After Image
              </>
            )}
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Images</h3>
        {renderImageSelection()}
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Appearance</h3>
        
        {set.type === "sideBySide" && (
          <div className="space-y-2">
            <Label>Layout</Label>
            <Select
              value={(set.config as SideBySideConfig).layout}
              onValueChange={(value: "standard" | "slider") =>
                onUpdate({ layout: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Side by Side</SelectItem>
                <SelectItem value="slider">Interactive Slider</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label>Background Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={set.config.backgroundColor}
              onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
              className="w-12 h-12 p-1"
            />
            <Input
              type="text"
              value={set.config.backgroundColor}
              onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Border Size</Label>
          <Input
            type="number"
            min="0"
            max="20"
            value={set.config.borderSize}
            onChange={(e) => onUpdate({ borderSize: parseInt(e.target.value) || 0 })}
          />
        </div>

        <div className="space-y-2">
          <Label>Border Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={set.config.borderColor}
              onChange={(e) => onUpdate({ borderColor: e.target.value })}
              className="w-12 h-12 p-1"
            />
            <Input
              type="text"
              value={set.config.borderColor}
              onChange={(e) => onUpdate({ borderColor: e.target.value })}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}