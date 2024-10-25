"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SetList } from "./set-list";
import { Preview } from "./preview";
import { SetConfig } from "./set-config";
import { ImageSelectionDialog } from "./image-selection-dialog";
import { PublishDialog } from "./publish-dialog";

interface ImageSet {
  id: string;
  type: "single" | "sideBySide";
  config: {
    images: {
      single?: string;
      before?: string;
      after?: string;
    };
    backgroundColor?: string;
    borderSize?: number;
    borderColor?: string;
    layout?: "standard" | "slider";
  };
}

interface WidgetBuilderProps {
  widgetId: string;
}

export function WidgetBuilder({ widgetId }: WidgetBuilderProps) {
  const [name, setName] = useState("New Widget");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [sets, setSets] = useState<ImageSet[]>([]);
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
  const [imageSelectionOpen, setImageSelectionOpen] = useState(false);
  const [imageSelectionMode, setImageSelectionMode] = useState<"single" | "before" | "after">("single");
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [editingSetId, setEditingSetId] = useState<string | null>(null);

  const selectedSet = sets.find(set => set.id === selectedSetId);

  const handleAddSet = (type: "single" | "sideBySide") => {
    const newSet: ImageSet = {
      id: Math.random().toString(36).substring(2),
      type,
      config: {
        images: {},
        backgroundColor: "#ffffff",
        borderSize: 0,
        borderColor: "#000000",
        layout: "standard"
      }
    };
    setSets(prev => [...prev, newSet]);
    setSelectedSetId(newSet.id);
  };

  const handleUpdateSet = (setId: string, config: Partial<ImageSet["config"]>) => {
    setSets(prev => prev.map(set => 
      set.id === setId ? { ...set, config: { ...set.config, ...config } } : set
    ));
  };

  const handleRemoveSet = (setId: string) => {
    setSets(prev => prev.filter(set => set.id !== setId));
    if (selectedSetId === setId) {
      setSelectedSetId(null);
    }
  };

  const handleReorderSets = (startIndex: number, endIndex: number) => {
    setSets(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  const handleImageSelection = (mode: "single" | "before" | "after", setId: string) => {
    setImageSelectionMode(mode);
    setEditingSetId(setId);
    setImageSelectionOpen(true);
  };

  const handleImageSelect = (imageUrl: string) => {
    if (!editingSetId) return;

    setSets(prev => prev.map(set => {
      if (set.id !== editingSetId) return set;

      const newImages = { ...set.config.images };
      if (imageSelectionMode === "single") {
        newImages.single = imageUrl;
      } else if (imageSelectionMode === "before") {
        newImages.before = imageUrl;
      } else if (imageSelectionMode === "after") {
        newImages.after = imageUrl;
      }

      return {
        ...set,
        config: {
          ...set.config,
          images: newImages
        }
      };
    }));

    setImageSelectionOpen(false);
    setEditingSetId(null);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b">
        <div className="container py-4">
          <div className="flex items-center gap-4">
            <Link href="/widgets" className="text-sm text-gray-500 hover:text-gray-900">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Widgets
              </Button>
            </Link>
            <div className="flex-1">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-lg font-semibold border-0 px-0 h-auto focus-visible:ring-0"
              />
            </div>
            <Badge variant={status === "published" ? "default" : "secondary"}>
              {status === "published" ? "Published" : "Draft"}
            </Badge>
            <Button 
              variant="default"
              onClick={() => {
                setStatus("published");
                setPublishDialogOpen(true);
              }}
            >
              {status === "published" ? "Share" : "Publish"}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="w-[240px] border-r bg-gray-50/50">
          <SetList
            sets={sets}
            selectedSetId={selectedSetId}
            onSetSelect={setSelectedSetId}
            onAddSet={handleAddSet}
            onUpdateSet={handleUpdateSet}
            onRemoveSet={handleRemoveSet}
            onReorderSets={handleReorderSets}
          />
        </div>
        <div className="flex-1 flex">
          <div className="flex-1 p-6">
            <Preview 
              sets={sets} 
              selectedSetId={selectedSetId}
            />
          </div>
          {selectedSet && (
            <div className="w-[300px] border-l bg-gray-50/50 p-4">
              <SetConfig
                set={selectedSet}
                onUpdate={(config) => handleUpdateSet(selectedSet.id, config)}
                onSelectImage={(mode) => handleImageSelection(mode, selectedSet.id)}
              />
            </div>
          )}
        </div>
      </div>

      <ImageSelectionDialog
        open={imageSelectionOpen}
        onOpenChange={setImageSelectionOpen}
        onSelect={handleImageSelect}
        mode={imageSelectionMode}
      />

      <PublishDialog
        open={publishDialogOpen}
        onOpenChange={setPublishDialogOpen}
        widgetId={widgetId}
        widgetName={name}
      />
    </div>
  );
}