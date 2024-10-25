"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, SortAsc } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sampleData } from "@/app/images/data/sample-data";
import { TagProvider } from "@/app/images/context/tag-context";
import { TagFilter } from "@/app/images/components/tag-filter";

interface ImageSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (imageUrl: string) => void;
  mode: "single" | "before" | "after";
}

export function ImageSelectionDialog({
  open,
  onOpenChange,
  onSelect,
  mode,
}: ImageSelectionDialogProps) {
  const [search, setSearch] = useState("");
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);

  // Filter images based on search, tags, and current folder
  const filteredImages = sampleData.images.filter((image) => {
    const matchesSearch = image.name.toLowerCase().includes(search.toLowerCase());
    const matchesFolder = currentFolderId ? image.folderId === currentFolderId : true;
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => image.tags.includes(tag));
    return matchesSearch && matchesFolder && matchesTags;
  });

  const handleSelect = () => {
    const image = filteredImages.find((img) => img.id === selectedImageId);
    if (image) {
      onSelect(image.url);
      onOpenChange(false);
      setSelectedImageId(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>
            {mode === "single"
              ? "Select Image"
              : mode === "before"
              ? "Select Before Image"
              : "Select After Image"}
          </DialogTitle>
        </DialogHeader>

        <TagProvider>
          <div className="flex flex-col h-full">
            <div className="space-y-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search images..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Button variant="outline" className="gap-2">
                  <SortAsc className="h-4 w-4" />
                  Sort by
                </Button>

                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>

              <TagFilter
                selectedTags={selectedTags}
                onTagSelect={(tag) => {
                  setSelectedTags(prev =>
                    prev.includes(tag)
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  );
                }}
              />
            </div>

            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="grid grid-cols-4 gap-4">
                {filteredImages.map((image) => (
                  <div
                    key={image.id}
                    className={cn(
                      "group relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all",
                      selectedImageId === image.id
                        ? "ring-2 ring-primary"
                        : "hover:ring-2 hover:ring-primary/50"
                    )}
                    onClick={() => setSelectedImageId(image.id)}
                  >
                    <Image
                      src={image.url}
                      alt={image.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-2 left-2 right-2 text-white">
                        <p className="font-medium">{image.name}</p>
                      </div>
                    </div>
                    {selectedImageId === image.id && (
                      <div className="absolute inset-0 bg-primary/20" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSelect} disabled={!selectedImageId}>
                Select Image
              </Button>
            </div>
          </div>
        </TagProvider>
      </DialogContent>
    </Dialog>
  );
}