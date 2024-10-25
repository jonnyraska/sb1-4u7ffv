"use client";

import { Trash2, FolderOpen, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { FolderSelectDialog } from "./folder-select-dialog";
import { TagSelectDialog } from "./tag-select-dialog";

interface BulkActionsBarProps {
  selectedCount: number;
  onClear: () => void;
  selectedImages: string[];
}

export function BulkActionsBar({ 
  selectedCount, 
  onClear,
  selectedImages 
}: BulkActionsBarProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [folderDialogOpen, setFolderDialogOpen] = useState(false);
  const [tagDialogOpen, setTagDialogOpen] = useState(false);

  const handleDelete = () => {
    // Implement delete logic here
    setDeleteDialogOpen(false);
    onClear();
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {selectedCount} {selectedCount === 1 ? "image" : "images"} selected
          </span>
          <Button variant="ghost" size="sm" onClick={onClear}>
            Clear selection
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFolderDialogOpen(true)}
          >
            <FolderOpen className="h-4 w-4 mr-2" />
            Move to Folder
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTagDialogOpen(true)}
          >
            <Tag className="h-4 w-4 mr-2" />
            Add Tags
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Images</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedCount}{" "}
              {selectedCount === 1 ? "image" : "images"}? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <FolderSelectDialog
        open={folderDialogOpen}
        onClose={() => setFolderDialogOpen(false)}
        selectedImages={selectedImages}
        onComplete={onClear}
      />

      <TagSelectDialog
        open={tagDialogOpen}
        onClose={() => setTagDialogOpen(false)}
        selectedImages={selectedImages}
        onComplete={onClear}
      />
    </>
  );
}