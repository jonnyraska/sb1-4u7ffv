"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";

interface Tag {
  id: string;
  label: string;
  type: "tag" | "project";
}

const availableTags: Tag[] = [
  { id: "1", label: "Kitchen", type: "project" },
  { id: "2", label: "Modern", type: "tag" },
  { id: "3", label: "Bathroom", type: "project" },
  { id: "4", label: "Traditional", type: "tag" },
  { id: "5", label: "Contemporary", type: "tag" },
];

interface ImageTagsProps {
  tags: string[];
  onAddTag: (tagId: string) => void;
  onRemoveTag: (tagId: string) => void;
}

export function ImageTags({ tags, onAddTag, onRemoveTag }: ImageTagsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedTags = tags.map(id => 
    availableTags.find(tag => tag.id === id)
  ).filter((tag): tag is Tag => tag !== undefined);

  const filteredTags = availableTags.filter(tag =>
    tag.label.toLowerCase().includes(search.toLowerCase()) &&
    !tags.includes(tag.id)
  );

  return (
    <div className="flex flex-wrap gap-2">
      {selectedTags.map((tag) => (
        <Badge
          key={tag.id}
          variant={tag.type === "project" ? "secondary" : "outline"}
          className="flex items-center gap-1"
        >
          {tag.label}
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => onRemoveTag(tag.id)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-7">
            <Plus className="h-4 w-4 mr-1" />
            Add Tag
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-0" align="start">
          <Command>
            <CommandInput 
              placeholder="Search tags..." 
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              {filteredTags.map((tag) => (
                <CommandItem
                  key={tag.id}
                  onSelect={() => {
                    onAddTag(tag.id);
                    setIsOpen(false);
                  }}
                >
                  {tag.label}
                  <Badge 
                    variant="secondary" 
                    className="ml-2"
                  >
                    {tag.type}
                  </Badge>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}