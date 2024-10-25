"use client";

import { useState } from "react";
import { Plus, Tag, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTags } from "../context/tag-context";

interface TagSelectorProps {
  type: "tag" | "project";
  onSelect: (tagId: string) => void;
  selectedTags: string[];
}

export function TagSelector({ type, onSelect, selectedTags }: TagSelectorProps) {
  const [open, setOpen] = useState(false);
  const [newTagValue, setNewTagValue] = useState("");
  const { tags, addTag } = useTags();

  const filteredTags = tags.filter((tag) => tag.type === type);
  const label = type === "tag" ? "Tag" : "Project";

  const handleCreateTag = () => {
    if (newTagValue.trim()) {
      addTag(newTagValue.trim(), type);
      setNewTagValue("");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-start">
          {type === "tag" ? (
            <Tag className="h-4 w-4 mr-2" />
          ) : (
            <FolderGit2 className="h-4 w-4 mr-2" />
          )}
          Add {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput placeholder={`Search ${label.toLowerCase()}s...`} />
          <CommandList>
            <CommandEmpty>
              <div className="p-4 text-sm">
                <p className="text-gray-500">No {label.toLowerCase()}s found.</p>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    value={newTagValue}
                    onChange={(e) => setNewTagValue(e.target.value)}
                    placeholder={`Create new ${label.toLowerCase()}...`}
                    className="flex-1 px-2 py-1 text-sm border rounded"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCreateTag}
                    disabled={!newTagValue.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CommandEmpty>
            <CommandGroup heading={`${label}s`}>
              {filteredTags.map((tag) => (
                <CommandItem
                  key={tag.id}
                  onSelect={() => {
                    onSelect(tag.id);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        selectedTags.includes(tag.id)
                          ? "bg-primary"
                          : "bg-gray-200"
                      }`}
                    />
                    {tag.label}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}