"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Image from 'next/image';

interface ImageSelectorModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (images: Array<{ id: string; url: string; title?: string }>) => void;
  multiple?: boolean;
  title?: string;
}

export function ImageSelectorModal({
  open,
  onClose,
  onSelect,
  multiple = true,
  title = "Select Images",
}: ImageSelectorModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // Mock data - in a real app, this would come from your image library
  const availableImages = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858',
      title: 'Modern Kitchen',
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba',
      title: 'Luxury Bathroom',
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      title: 'Living Room',
    },
  ];

  const filteredImages = availableImages.filter(
    (image) => image.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImageClick = (imageId: string) => {
    if (!multiple) {
      setSelectedImages([imageId]);
      return;
    }

    setSelectedImages((prev) =>
      prev.includes(imageId)
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId]
    );
  };

  const handleConfirm = () => {
    const selectedImageData = availableImages.filter((img) =>
      selectedImages.includes(img.id)
    );
    onSelect(selectedImageData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 max-h-[400px] overflow-y-auto p-1">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer group ${
                selectedImages.includes(image.id)
                  ? 'ring-2 ring-primary'
                  : 'hover:ring-2 hover:ring-primary/50'
              }`}
              onClick={() => handleImageClick(image.id)}
            >
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 left-2 right-2 text-white text-sm">
                  {image.title}
                </div>
              </div>
              {selectedImages.includes(image.id) && (
                <div className="absolute inset-0 bg-primary/20" />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={selectedImages.length === 0}>
            Add Selected
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}