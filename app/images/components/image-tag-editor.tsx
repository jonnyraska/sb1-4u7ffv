"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useTags } from "../context/tag-context";

interface ImageTagEditorProps {
  image: {
    id: string;
    name: string;
    tags: string[];
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateTags: (imageId: string, newTags: string[]) => void;
}

export function ImageTagEditor({
  image,
  open,
  onOpenChange,
  onUpdateTags,
}: ImageTagEditorProps) {
  const { tags, addTag, getTagById } = useTags();
  const [newTagInput, setNewTagInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
      const newTag = addTag(newTagInput.trim(), "tag");
      setSelectedTags([...selectedTags, newTag.id]);
      setNewTagInput("");
    }
  };

  const handleSave = () => {
    if (image) {
      onUpdateTags(image.id, selectedTags);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Labels</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add new label..."
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateTag()}
            />
            <Button onClick={handleCreateTag} disabled={!newTagInput.trim()}>
              Add
            </Button>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Selected Labels</h4>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tagId) => {
                const tag = getTagById(tagId);
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
            <h4 className="text-sm font-medium">Available Labels</h4>
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
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}