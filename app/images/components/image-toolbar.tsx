"use client";

import { UploadDialog } from "./upload-dialog";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TagFilter } from "./tag-filter";
import { Button } from "@/components/ui/button";
import { TagManager } from "./tag-manager";
import { useState } from "react";

interface ImageToolbarProps {
  onSearch: (query: string) => void;
  selectedTags: string[];
  onTagSelect: (tags: string[]) => void;
}

export function ImageToolbar({ 
  onSearch, 
  selectedTags,
  onTagSelect 
}: ImageToolbarProps) {
  const [tagManagerOpen, setTagManagerOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search images..."
            className="pl-10"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Button 
          variant="outline"
          onClick={() => setTagManagerOpen(true)}
        >
          Manage Labels
        </Button>
        <UploadDialog />
      </div>

      <TagFilter
        selectedTags={selectedTags}
        onTagSelect={onTagSelect}
      />

      <TagManager 
        open={tagManagerOpen} 
        onOpenChange={setTagManagerOpen}
      />
    </div>
  );
}