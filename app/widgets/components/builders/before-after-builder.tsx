"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BeforeAfterImage {
  id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
}

interface BeforeAfterBuilderProps {
  widgetId: string;
}

export function BeforeAfterBuilder({ widgetId }: BeforeAfterBuilderProps) {
  const [settings, setSettings] = useState({
    displayMode: 'slider' as 'slider' | 'sideBySide',
    showLabels: true,
    beforeLabel: 'Before',
    afterLabel: 'After',
    showTitles: true,
    autoPlay: true,
    autoPlayInterval: 5000,
    showArrows: true,
    showDots: true,
    sliderColor: '#ffffff',
    labelColor: '#ffffff',
    titleColor: '#ffffff',
    maxWidth: 1200,
  });

  const [images, setImages] = useState<BeforeAfterImage[]>([
    {
      id: '1',
      title: 'Kitchen Renovation',
      beforeImage: 'https://images.unsplash.com/photo-1484154218962-a197022b5858',
      afterImage: 'https://images.unsplash.com/photo-1556911220-bff31c812dba',
    },
    {
      id: '2',
      title: 'Bathroom Remodel',
      beforeImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14',
      afterImage: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea',
    },
  ]);

  const [activeImage, setActiveImage] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

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
            {settings.displayMode === 'slider' ? (
              <div className="relative aspect-[16/9]">
                <Image
                  src={images[activeImage].afterImage}
                  alt="After"
                  fill
                  className="object-cover"
                />
                <div 
                  className="absolute inset-0"
                  style={{
                    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                  }}
                >
                  <Image
                    src={images[activeImage].beforeImage}
                    alt="Before"
                    fill
                    className="object-cover"
                  />
                </div>

                <div 
                  className="absolute top-0 bottom-0"
                  style={{
                    left: `${sliderPosition}%`,
                    width: '2px',
                    backgroundColor: settings.sliderColor,
                    cursor: 'ew-resize',
                  }}
                />

                {settings.showLabels && (
                  <>
                    <div 
                      className="absolute top-4 left-4 bg-black/50 px-2 py-1 rounded text-sm"
                      style={{ color: settings.labelColor }}
                    >
                      {settings.beforeLabel}
                    </div>
                    <div 
                      className="absolute top-4 right-4 bg-black/50 px-2 py-1 rounded text-sm"
                      style={{ color: settings.labelColor }}
                    >
                      {settings.afterLabel}
                    </div>
                  </>
                )}

                {settings.showTitles && (
                  <div 
                    className="absolute bottom-4 left-4 right-4 text-center bg-black/50 py-2 px-4 rounded"
                    style={{ color: settings.titleColor }}
                  >
                    <h3 className="text-lg font-semibold">{images[activeImage].title}</h3>
                  </div>
                )}

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(parseInt(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize w-full"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={images[activeImage].beforeImage}
                    alt="Before"
                    fill
                    className="object-cover rounded-lg"
                  />
                  {settings.showLabels && (
                    <div 
                      className="absolute top-4 left-4 bg-black/50 px-2 py-1 rounded text-sm"
                      style={{ color: settings.labelColor }}
                    >
                      {settings.beforeLabel}
                    </div>
                  )}
                </div>
                <div className="relative aspect-[4/3]">
                  <Image
                    src={images[activeImage].afterImage}
                    alt="After"
                    fill
                    className="object-cover rounded-lg"
                  />
                  {settings.showLabels && (
                    <div 
                      className="absolute top-4 left-4 bg-black/50 px-2 py-1 rounded text-sm"
                      style={{ color: settings.labelColor }}
                    >
                      {settings.afterLabel}
                    </div>
                  )}
                </div>
              </div>
            )}

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
              <div key={image.id} className="space-y-4 p-4 border rounded-lg">
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={image.beforeImage}
                      alt="Before"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                      Before
                    </div>
                  </div>
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={image.afterImage}
                      alt="After"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                      After
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Before/After Pair
            </Button>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Display Settings</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Display Mode</Label>
                <RadioGroup
                  value={settings.displayMode}
                  onValueChange={(value: 'slider' | 'sideBySide') =>
                    setSettings({ ...settings, displayMode: value })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="slider" id="slider" />
                    <Label htmlFor="slider">Slider</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sideBySide" id="sideBySide" />
                    <Label htmlFor="sideBySide">Side by Side</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between">
                <Label>Show Labels</Label>
                <Switch
                  checked={settings.showLabels}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, showLabels: checked })
                  }
                />
              </div>

              {settings.showLabels && (
                <>
                  <div className="space-y-2">
                    <Label>Before Label</Label>
                    <Input
                      value={settings.beforeLabel}
                      onChange={(e) =>
                        setSettings({ ...settings, beforeLabel: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>After Label</Label>
                    <Input
                      value={settings.afterLabel}
                      onChange={(e) =>
                        setSettings({ ...settings, afterLabel: e.target.value })
                      }
                    />
                  </div>
                </>
              )}

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
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Style Settings</h3>
            <div className="space-y-4">
              {settings.displayMode === 'slider' && (
                <div className="space-y-2">
                  <Label>Slider Color</Label>
                  <Input
                    type="color"
                    value={settings.sliderColor}
                    onChange={(e) =>
                      setSettings({ ...settings, sliderColor: e.target.value })
                    }
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Label Color</Label>
                <Input
                  type="color"
                  value={settings.labelColor}
                  onChange={(e) =>
                    setSettings({ ...settings, labelColor: e.target.value })
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