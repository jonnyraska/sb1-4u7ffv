"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { useTags } from "../context/tag-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface TagManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TagManager({ open, onOpenChange }: TagManagerProps) {
  const { tags, addTag, removeTag } = useTags();
  const [newTagName, setNewTagName] = useState("");
  const [newProjectName, setNewProjectName] = useState("");

  const handleAddTag = (type: "tag" | "project") => {
    const name = type === "tag" ? newTagName : newProjectName;
    if (name.trim()) {
      addTag(name.trim(), type);
      if (type === "tag") {
        setNewTagName("");
      } else {
        setNewProjectName("");
      }
    }
  };

  const projectTags = tags.filter(tag => tag.type === "project");
  const regularTags = tags.filter(tag => tag.type === "tag");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Manage Labels</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="tags">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tags">Tags</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="tags" className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="New tag name..."
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTag("tag")}
              />
              <Button onClick={() => handleAddTag("tag")}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-2">
                {regularTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center justify-between bg-secondary/50 p-2 rounded-lg"
                  >
                    <Badge variant="outline">{tag.label}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTag(tag.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="New project name..."
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTag("project")}
              />
              <Button onClick={() => handleAddTag("project")}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-2">
                {projectTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center justify-between bg-secondary/50 p-2 rounded-lg"
                  >
                    <Badge variant="secondary">{tag.label}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTag(tag.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}