"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ChevronRight, 
  Folder, 
  FolderOpen, 
  Plus, 
  MoreVertical,
  Pencil,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  imageCount: number;
}

interface FolderSidebarProps {
  selectedFolderId: string | null;
  onFolderSelect: (folderId: string | null) => void;
}

export function FolderSidebar({ selectedFolderId, onFolderSelect }: FolderSidebarProps) {
  const [folders, setFolders] = useState<Folder[]>([
    { id: "1", name: "Kitchen Projects", parentId: null, imageCount: 12 },
    { id: "2", name: "Bathroom Remodels", parentId: null, imageCount: 8 },
    { id: "3", name: "Living Spaces", parentId: null, imageCount: 15 },
    { id: "4", name: "Before", parentId: "1", imageCount: 6 },
    { id: "5", name: "After", parentId: "1", imageCount: 6 },
  ]);

  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: Folder = {
        id: Math.random().toString(36).substr(2, 9),
        name: newFolderName.trim(),
        parentId: null,
        imageCount: 0,
      };
      setFolders([...folders, newFolder]);
      setNewFolderName("");
      setNewFolderDialogOpen(false);
    }
  };

  const handleUpdateFolder = () => {
    if (editingFolder && newFolderName.trim()) {
      setFolders(folders.map(folder => 
        folder.id === editingFolder.id 
          ? { ...folder, name: newFolderName.trim() }
          : folder
      ));
      setEditingFolder(null);
      setNewFolderName("");
    }
  };

  const handleDeleteFolder = (folderId: string) => {
    setFolders(folders.filter(folder => folder.id !== folderId));
    if (selectedFolderId === folderId) {
      onFolderSelect(null);
    }
  };

  const renderFolder = (folder: Folder, level: number = 0) => {
    const hasChildren = folders.some(f => f.parentId === folder.id);
    const isExpanded = expandedFolders.has(folder.id);
    const childFolders = folders.filter(f => f.parentId === folder.id);

    return (
      <div key={folder.id}>
        <div
          className={cn(
            "flex items-center gap-2 py-1 px-2 rounded-md cursor-pointer hover:bg-gray-100",
            selectedFolderId === folder.id && "bg-gray-100",
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
            className="flex-1 flex items-center gap-2 py-1"
            onClick={() => onFolderSelect(folder.id)}
          >
            {selectedFolderId === folder.id ? (
              <FolderOpen className="h-4 w-4 text-blue-500" />
            ) : (
              <Folder className="h-4 w-4 text-gray-500" />
            )}
            <span className="flex-1">{folder.name}</span>
            <span className="text-sm text-gray-500">
              {folder.imageCount}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-transparent"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setEditingFolder(folder);
                  setNewFolderName(folder.name);
                  setNewFolderDialogOpen(true);
                }}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => handleDeleteFolder(folder.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Folders</h2>
        <Dialog open={newFolderDialogOpen} onOpenChange={setNewFolderDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Folder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingFolder ? "Rename Folder" : "Create New Folder"}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Input
                placeholder="Enter folder name..."
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setNewFolderDialogOpen(false);
                  setEditingFolder(null);
                  setNewFolderName("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={editingFolder ? handleUpdateFolder : handleCreateFolder}
                disabled={!newFolderName.trim()}
              >
                {editingFolder ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-1">
          <div
            className={cn(
              "flex items-center gap-2 py-1 px-2 rounded-md cursor-pointer hover:bg-gray-100",
              selectedFolderId === null && "bg-gray-100"
            )}
            onClick={() => onFolderSelect(null)}
          >
            <Folder className="h-4 w-4 text-gray-500" />
            <span className="flex-1">All Images</span>
            <span className="text-sm text-gray-500">
              {folders.reduce((sum, folder) => sum + folder.imageCount, 0)}
            </span>
          </div>
          {rootFolders.map(folder => renderFolder(folder))}
        </div>
      </ScrollArea>
    </div>
  );
}