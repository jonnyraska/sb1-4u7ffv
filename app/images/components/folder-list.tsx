"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Folder, Plus } from "lucide-react";

interface FolderItem {
  id: string;
  name: string;
}

interface FolderListProps {
  onSelect: (folderId: string | null) => void;
}

export function FolderList({ onSelect }: FolderListProps) {
  const [folders, setFolders] = useState<FolderItem[]>([
    { id: "1", name: "Kitchen Projects" },
    { id: "2", name: "Bathroom Remodels" },
  ]);
  const [newFolderName, setNewFolderName] = useState("");

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: Math.random().toString(36).substr(2, 9),
        name: newFolderName.trim(),
      };
      setFolders([...folders, newFolder]);
      setNewFolderName("");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Folders</h2>
      <div className="flex gap-2">
        <Input
          placeholder="New folder name..."
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
        />
        <Button onClick={handleCreateFolder}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => onSelect(null)}
        >
          <Folder className="h-4 w-4 mr-2" />
          All Images
        </Button>
        {folders.map((folder) => (
          <Button
            key={folder.id}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => onSelect(folder.id)}
          >
            <Folder className="h-4 w-4 mr-2" />
            {folder.name}
          </Button>
        ))}
      </div>
    </div>
  );
}