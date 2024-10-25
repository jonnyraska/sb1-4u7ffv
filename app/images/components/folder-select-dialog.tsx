"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Folder, FolderOpen, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FolderSelectDialogProps {
  open: boolean;
  onClose: () => void;
  selectedImages: string[];
  onComplete: () => void;
}

interface Folder {
  id: string;
  name: string;
  parentId: string | null;
}

export function FolderSelectDialog({
  open,
  onClose,
  selectedImages,
  onComplete,
}: FolderSelectDialogProps) {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  // Mock folder data
  const folders: Folder[] = [
    { id: "1", name: "Kitchen Projects", parentId: null },
    { id: "2", name: "Bathroom Remodels", parentId: null },
    { id: "3", name: "Living Spaces", parentId: null },
    { id: "4", name: "Before", parentId: "1" },
    { id: "5", name: "After", parentId: "1" },
  ];

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleMove = () => {
    // Implement move logic here
    onComplete();
    onClose();
  };

  const renderFolder = (folder: Folder, level: number = 0) => {
    const hasChildren = folders.some(f => f.parentId === folder.id);
    const isExpanded = expandedFolders.has(folder.id);
    const childFolders = folders.filter(f => f.parentId === folder.id);

    return (
      <div key={folder.id}>
        <div
          className={cn(
            "flex items-center gap-2 py-2 px-2 rounded-md cursor-pointer hover:bg-gray-100",
            selectedFolder === folder.id && "bg-gray-100",
            level > 0 && "ml-6"
          )}
        >
          {hasChildren && (
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => toggleFolder(folder.id)}
            >
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform",
                  isExpanded && "rotate-90"
                )}
              />
            </Button>
          )}
          <div
            className="flex-1 flex items-center gap-2"
            onClick={() => setSelectedFolder(folder.id)}
          >
            {selectedFolder === folder.id ? (
              <FolderOpen className="h-4 w-4 text-blue-500" />
            ) : (
              <Folder className="h-4 w-4 text-gray-500" />
            )}
            <span>{folder.name}</span>
          </div>
        </div>
        {isExpanded && childFolders.length > 0 && (
          <div className="mt-1">
            {childFolders.map(childFolder => renderFolder(childFolder, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const rootFolders = folders.filter(folder => folder.parentId === null);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Move to Folder</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-1">
            <div
              className={cn(
                "flex items-center gap-2 py-2 px-2 rounded-md cursor-pointer hover:bg-gray-100",
                selectedFolder === null && "bg-gray-100"
              )}
              onClick={() => setSelectedFolder(null)}
            >
              <Folder className="h-4 w-4 text-gray-500" />
              <span>Root Directory</span>
            </div>
            {rootFolders.map(folder => renderFolder(folder))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleMove}>
            Move {selectedImages.length} {selectedImages.length === 1 ? "image" : "images"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}