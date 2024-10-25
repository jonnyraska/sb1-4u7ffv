"use client";

import { useState, useRef } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { TagSelector } from "./tag-selector";
import { useTags } from "../context/tag-context";

interface UploadingFile {
  file: File;
  progress: number;
}

export function UploadDialog() {
  const [open, setOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getTagById } = useTags();

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files?.length) {
      await handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFiles = async (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    if (!imageFiles.length) return;

    setIsUploading(true);
    setUploadingFiles(imageFiles.map(file => ({ file, progress: 0 })));

    // Simulate upload progress
    const uploadPromises = imageFiles.map((file, index) => {
      return new Promise<void>((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadingFiles(prev => 
            prev.map((f, i) => 
              i === index ? { ...f, progress } : f
            )
          );

          if (progress >= 100) {
            clearInterval(interval);
            resolve();
          }
        }, 200);
      });
    });

    await Promise.all(uploadPromises);

    const newImages = await Promise.all(
      imageFiles.map(async (file) => {
        const url = URL.createObjectURL(file);
        return {
          id: Math.random().toString(36).substr(2, 9),
          url,
          name: file.name,
          tags: [...selectedTags, ...selectedProjects],
          type: 'file' as const,
        };
      })
    );

    if (window.addImagesToGrid) {
      window.addImagesToGrid(newImages);
    }

    setIsUploading(false);
    setUploadingFiles([]);
    setOpen(false);
    setSelectedTags([]);
    setSelectedProjects([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Images</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Projects</h3>
              <TagSelector
                type="project"
                onSelect={(tagId) =>
                  setSelectedProjects(prev =>
                    prev.includes(tagId)
                      ? prev.filter(id => id !== tagId)
                      : [...prev, tagId]
                  )
                }
                selectedTags={selectedProjects}
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Tags</h3>
              <TagSelector
                type="tag"
                onSelect={(tagId) =>
                  setSelectedTags(prev =>
                    prev.includes(tagId)
                      ? prev.filter(id => id !== tagId)
                      : [...prev, tagId]
                  )
                }
                selectedTags={selectedTags}
              />
            </div>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? "border-primary bg-primary/5" : "border-gray-200"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                if (e.target.files?.length) {
                  await handleFiles(Array.from(e.target.files));
                }
              }}
            />
            {isUploading ? (
              <div className="space-y-4">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400" />
                <div className="space-y-2">
                  {uploadingFiles.map((file, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="truncate">{file.file.name}</span>
                        <span>{file.progress}%</span>
                      </div>
                      <Progress value={file.progress} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <Upload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">
                  Drag and drop your images here, or{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    browse
                  </button>
                </p>
                <p className="text-xs text-gray-500">
                  Supports: JPG, PNG, GIF (up to 10MB each)
                </p>
              </>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}