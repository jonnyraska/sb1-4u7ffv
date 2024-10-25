"use client";

import { useState } from "react";
import { ImageGrid } from "./image-grid";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, SortAsc } from "lucide-react";
import { TagFilter } from "./tag-filter";

interface ImageExplorerProps {
  searchQuery: string;
  currentFolderId: string | null;
  onFolderOpen: (folderId: string | null) => void;
  selectedImages: string[];
  onSelectionChange: (images: string[]) => void;
}

export function ImageExplorer({
  searchQuery,
  currentFolderId,
  onFolderOpen,
  selectedImages,
  onSelectionChange,
}: ImageExplorerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (result: any) => {
    setIsDragging(false);
    
    if (!result.destination) return;

    const sourceId = result.source.droppableId;
    const destinationId = result.destination.droppableId;
    const imageId = result.draggableId;

    if (sourceId === destinationId) return;

    // Here you would update the image's folder in your data store
    console.log(`Moving image ${imageId} from ${sourceId} to ${destinationId}`);
  };

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search files and folders..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => {}}
            />
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

          <Button variant="outline" className="gap-2">
            <SortAsc className="h-4 w-4" />
            Sort by
          </Button>

          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <Droppable droppableId={currentFolderId || "root"}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`rounded-lg transition-colors ${
                isDragging ? "bg-gray-50" : ""
              }`}
            >
              <ImageGrid
                searchQuery={searchQuery}
                currentFolderId={currentFolderId}
                isDragging={isDragging}
                selectedItems={selectedImages}
                onSelectionChange={onSelectionChange}
                selectedTags={selectedTags}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onFolderOpen={onFolderOpen}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}