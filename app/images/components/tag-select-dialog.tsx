"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";
import { useTags } from "../context/tag-context";

interface TagSelectDialogProps {
  open: boolean;
  onClose: () => void;
  selectedImages: string[];
  onComplete: () => void;
}

export function TagSelectDialog({
  open,
  onClose,
  selectedImages,
  onComplete,
}: TagSelectDialogProps) {
  const { tags, addTag } = useTags();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState("");

  const handleAddTag = (tagId: string) => {
    if (!selectedTags.includes(tagId)) {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleRemoveTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter(id => id !== tagId));
  };

  const handleCreateTag = () => {
    if (newTagInput.trim()) {
      addTag(newTagInput.trim(), "tag");
      setNewTagInput("");
    }
  };

  const handleApply = () => {
    // Implement tag application logic here
    onComplete();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Tags</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Create new tag..."
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateTag()}
            />
            <Button onClick={handleCreateTag} disabled={!newTagInput.trim()}>
              Add
            </Button>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Selected Tags</label>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tagId) => {
                const tag = tags.find((t) => t.id === tagId);
                if (!tag) return null;
                return (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag.label}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => handleRemoveTag(tag.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                );
              })}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Available Tags</label>
            <div className="flex flex-wrap gap-2">
              {tags
                .filter((tag) => !selectedTags.includes(tag.id))
                .map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="outline"
                    className="cursor-pointer hover:bg-secondary"
                    onClick={() => handleAddTag(tag.id)}
                  >
                    {tag.label}
                  </Badge>
                ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleApply}>
            Apply to {selectedImages.length} {selectedImages.length === 1 ? "image" : "images"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}