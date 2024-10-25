"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Image, Columns, FormInput, GripVertical } from "lucide-react";
import { ImageSet } from "./widget-builder";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";

interface SetListProps {
  sets: ImageSet[];
  selectedSetId: string | null;
  onSetSelect: (id: string) => void;
  onAddSet: (type: ImageSet["type"]) => void;
  onUpdateSet: (id: string, config: any) => void;
  onRemoveSet: (id: string) => void;
  onReorderSets: (sets: ImageSet[]) => void;
}

export function SetList({ 
  sets, 
  selectedSetId,
  onSetSelect,
  onAddSet, 
  onUpdateSet, 
  onRemoveSet, 
  onReorderSets 
}: SetListProps) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(sets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onReorderSets(items);
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Set
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onAddSet("image")}>
            <Image className="h-4 w-4 mr-2" />
            Single Image
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAddSet("sideBySide")}>
            <Columns className="h-4 w-4 mr-2" />
            Side by Side
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAddSet("form")}>
            <FormInput className="h-4 w-4 mr-2" />
            Form
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ScrollArea className="flex-1 mt-4 -mx-2 px-2">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sets">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {sets.map((set, index) => (
                  <Draggable key={set.id} draggableId={set.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        onClick={() => onSetSelect(set.id)}
                        className={cn(
                          "p-3 rounded-lg border bg-white transition-colors cursor-pointer",
                          selectedSetId === set.id && "border-primary ring-1 ring-primary",
                          snapshot.isDragging ? "shadow-lg" : "hover:border-primary/50"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div {...provided.dragHandleProps}>
                              <GripVertical className="h-5 w-5 text-gray-400" />
                            </div>
                            <span className="font-medium">
                              {set.type === "image" && "Single Image"}
                              {set.type === "sideBySide" && "Side by Side"}
                              {set.type === "form" && "Form"}
                              {" "}Set {index + 1}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveSet(set.id);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ScrollArea>
    </div>
  );
}