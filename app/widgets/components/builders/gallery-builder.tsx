"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface CarouselImage {
  id: string;
  url: string;
  title: string;
  description: string;
}

interface GalleryBuilderProps {
  widgetId: string;
}

export function GalleryBuilder({ widgetId }: GalleryBuilderProps) {
  const [settings, setSettings] = useState({
    autoPlay: true,
    autoPlayInterval: 5000,
    showArrows: true,
    showDots: true,
    showTitles: true,
    showDescriptions: true,
    overlayColor: 'rgba(0, 0, 0, 0.5)',
    titleColor: '#ffffff',
    descriptionColor: '#ffffff',
    maxWidth: 1200,
  });

  const [images, setImages] = useState<CarouselImage[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858',
      title: 'Modern Kitchen Design',
      description: 'Sleek and contemporary kitchen with marble countertops and state-of-the-art appliances.',
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba',
      title: 'Luxury Master Bath',
      description: 'Spa-like master bathroom featuring a freestanding tub and custom tilework.',
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      title: 'Open Concept Living',
      description: 'Bright and airy living space that seamlessly connects to the dining area.',
    },
  ]);

  const [activeImage, setActiveImage] = useState(0);

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Tabs defaultValue="preview">
      <TabsList className="mb-4">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="preview">
        <Card className="p-6">
          <div 
            className="relative rounded-lg overflow-hidden"
            style={{ maxWidth: `${settings.maxWidth}px`, margin: '0 auto' }}
          >
            <div className="relative aspect-[16/9]">
              <Image
                src={images[activeImage].url}
                alt={images[activeImage].title}
                fill
                className="object-cover"
              />
              {(settings.showTitles || settings.showDescriptions) && (
                <div 
                  className="absolute inset-0 flex flex-col justify-end p-8"
                  style={{ background: settings.overlayColor }}
                >
                  {settings.showTitles && (
                    <h3 
                      className="text-2xl font-bold mb-2"
                      style={{ color: settings.titleColor }}
                    >
                      {images[activeImage].title}
                    </h3>
                  )}
                  {settings.showDescriptions && (
                    <p 
                      className="text-lg"
                      style={{ color: settings.descriptionColor }}
                    >
                      {images[activeImage].description}
                    </p>
                  )}
                </div>
              )}
            </div>

            {settings.showArrows && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {settings.showDots && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      index === activeImage
                        ? "bg-white scale-125"
                        : "bg-white/50 hover:bg-white/75"
                    )}
                    onClick={() => setActiveImage(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="content">
        <Card className="p-6">
          <div className="space-y-6">
            {images.map((image, index) => (
              <div key={image.id} className="flex gap-6 p-4 border rounded-lg">
                <div className="relative w-48 aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={image.title}
                      onChange={(e) => {
                        const newImages = [...images];
                        newImages[index].title = e.target.value;
                        setImages(newImages);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={image.description}
                      onChange={(e) => {
                        const newImages = [...images];
                        newImages[index].description = e.target.value;
                        setImages(newImages);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Image
            </Button>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Display Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Auto Play</Label>
                <Switch
                  checked={settings.autoPlay}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, autoPlay: checked })
                  }
                />
              </div>

              {settings.autoPlay && (
                <div className="space-y-2">
                  <Label>Auto Play Interval (ms)</Label>
                  <Input
                    type="number"
                    value={settings.autoPlayInterval}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        autoPlayInterval: parseInt(e.target.value) || 5000,
                      })
                    }
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <Label>Show Navigation Arrows</Label>
                <Switch
                  checked={settings.showArrows}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, showArrows: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Show Navigation Dots</Label>
                <Switch
                  checked={settings.showDots}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, showDots: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Show Titles</Label>
                <Switch
                  checked={settings.showTitles}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, showTitles: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Show Descriptions</Label>
                <Switch
                  checked={settings.showDescriptions}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, showDescriptions: checked })
                  }
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Style Settings</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Overlay Color</Label>
                <Input
                  type="text"
                  value={settings.overlayColor}
                  onChange={(e) =>
                    setSettings({ ...settings, overlayColor: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Title Color</Label>
                <Input
                  type="color"
                  value={settings.titleColor}
                  onChange={(e) =>
                    setSettings({ ...settings, titleColor: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Description Color</Label>
                <Input
                  type="color"
                  value={settings.descriptionColor}
                  onChange={(e) =>
                    setSettings({ ...settings, descriptionColor: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Max Width (px)</Label>
                <Input
                  type="number"
                  value={settings.maxWidth}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      maxWidth: parseInt(e.target.value) || 1200,
                    })
                  }
                />
              </div>
            </div>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}