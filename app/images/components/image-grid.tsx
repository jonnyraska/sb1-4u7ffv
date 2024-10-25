"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImagePreview } from "./image-preview";
import { useTags } from "../context/tag-context";
import { sampleData } from "../data/sample-data";
import { ImageTagEditor } from "./image-tag-editor";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface ImageItem {
  id: string;
  name: string;
  url: string;
  tags: string[];
}

interface ImageGridProps {
  searchQuery: string;
  selectedTags: string[];
}

export function ImageGrid({
  searchQuery,
  selectedTags,
}: ImageGridProps) {
  const [images, setImages] = useState(sampleData.images);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [tagEditorOpen, setTagEditorOpen] = useState(false);
  const { getTagById } = useTags();

  const filteredImages = images.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => image.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const handleImageClick = (image: ImageItem) => {
    setSelectedImage(image);
  };

  const handleEditTags = (e: React.MouseEvent, image: ImageItem) => {
    e.stopPropagation();
    setSelectedImage(image);
    setTagEditorOpen(true);
  };

  const handleUpdateTags = (imageId: string, newTags: string[]) => {
    setImages(prevImages => 
      prevImages.map(img => 
        img.id === imageId ? { ...img, tags: newTags } : img
      )
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <Card 
            key={image.id}
            className="group relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleImageClick(image)}
          >
            <div className="relative aspect-square">
              <Image
                src={image.url}
                alt={image.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-2 right-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => handleEditTags(e, image)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-medium mb-2">{image.name}</h3>
                  <div className="flex flex-wrap gap-1">
                    {image.tags.map(tagId => {
                      const tag = getTagById(tagId);
                      if (!tag) return null;
                      return (
                        <Badge
                          key={tag.id}
                          variant={tag.type === "project" ? "secondary" : "outline"}
                          className="bg-black/50 text-white border-white/20"
                        >
                          {tag.label}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <ImageTagEditor
        image={selectedImage}
        open={tagEditorOpen}
        onOpenChange={setTagEditorOpen}
        onUpdateTags={handleUpdateTags}
      />

      <ImagePreview
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}