"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Tag {
  id: string;
  label: string;
  type: "tag" | "project";
}

interface TagContextType {
  tags: Tag[];
  addTag: (label: string, type: "tag" | "project") => void;
  removeTag: (id: string) => void;
  getTagById: (id: string) => Tag | undefined;
}

const TagContext = createContext<TagContextType | undefined>(undefined);

export function TagProvider({ children }: { children: ReactNode }) {
  const [tags, setTags] = useState<Tag[]>([
    { id: "1", label: "Kitchen", type: "tag" },
    { id: "2", label: "Bathroom", type: "tag" },
    { id: "3", label: "Modern", type: "tag" },
    { id: "4", label: "Project A", type: "project" },
    { id: "5", label: "Project B", type: "project" },
  ]);

  const addTag = (label: string, type: "tag" | "project") => {
    const newTag: Tag = {
      id: Math.random().toString(36).substr(2, 9),
      label,
      type,
    };
    setTags((prev) => [...prev, newTag]);
  };

  const removeTag = (id: string) => {
    setTags((prev) => prev.filter((tag) => tag.id !== id));
  };

  const getTagById = (id: string) => {
    return tags.find((tag) => tag.id === id);
  };

  return (
    <TagContext.Provider value={{ tags, addTag, removeTag, getTagById }}>
      {children}
    </TagContext.Provider>
  );
}

export function useTags() {
  const context = useContext(TagContext);
  if (context === undefined) {
    throw new Error("useTags must be used within a TagProvider");
  }
  return context;
}