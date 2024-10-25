"use client";

import { Badge } from "@/components/ui/badge";
import { useTags } from "../context/tag-context";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TagFilterProps {
  selectedTags: string[];
  onTagSelect: (tags: string[]) => void;
}

export function TagFilter({ selectedTags, onTagSelect }: TagFilterProps) {
  const { tags } = useTags();

  // Group tags by type
  const projectTags = tags.filter(tag => tag.type === "project");
  const regularTags = tags.filter(tag => tag.type === "tag");

  const handleTagClick = (tagId: string) => {
    onTagSelect(
      selectedTags.includes(tagId)
        ? selectedTags.filter(id => id !== tagId)
        : [...selectedTags, tagId]
    );
  };

  return (
    <ScrollArea className="w-full" orientation="horizontal">
      <div className="flex gap-6 pb-2">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500">Projects</h3>
          <div className="flex flex-wrap gap-2">
            {projectTags.map((tag) => (
              <Badge
                key={tag.id}
                variant={selectedTags.includes(tag.id) ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => handleTagClick(tag.id)}
              >
                {tag.label}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {regularTags.map((tag) => (
              <Badge
                key={tag.id}
                variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleTagClick(tag.id)}
              >
                {tag.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}