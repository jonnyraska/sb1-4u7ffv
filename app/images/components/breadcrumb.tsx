"use client";

import { ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface BreadcrumbProps {
  currentFolderId: string | null;
  onNavigate: (folderId: string | null) => void;
}

interface FolderPath {
  id: string;
  name: string;
}

export function Breadcrumb({ currentFolderId, onNavigate }: BreadcrumbProps) {
  const [path, setPath] = useState<FolderPath[]>([]);

  // In a real app, this would fetch the folder path from your data store
  useEffect(() => {
    if (currentFolderId) {
      // Mock folder path data
      setPath([
        { id: currentFolderId, name: "Current Folder" },
      ]);
    } else {
      setPath([]);
    }
  }, [currentFolderId]);

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <Button
        variant="ghost"
        size="sm"
        className="h-8"
        onClick={() => onNavigate(null)}
      >
        <Home className="h-4 w-4 mr-1" />
        Home
      </Button>
      {path.map((folder, index) => (
        <div key={folder.id} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1" />
          <Button
            variant="ghost"
            size="sm"
            className="h-8"
            onClick={() => onNavigate(folder.id)}
          >
            {folder.name}
          </Button>
        </div>
      ))}
    </div>
  );
}