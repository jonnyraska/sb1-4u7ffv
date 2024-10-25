"use client";

import { Images, ArrowLeftRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface WidgetTypeOption {
  id: 'gallery' | 'before-after';
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const widgetTypes: WidgetTypeOption[] = [
  {
    id: 'gallery',
    name: 'Gallery Widget',
    description: 'Create an interactive image gallery with thumbnails and transitions',
    icon: Images,
  },
  {
    id: 'before-after',
    name: 'Before & After Widget',
    description: 'Compare images with an interactive slider or side-by-side view',
    icon: ArrowLeftRight,
  },
];

interface WidgetTypeSelectorProps {
  selectedType: WidgetTypeOption['id'] | null;
  onSelect: (type: WidgetTypeOption['id']) => void;
}

export function WidgetTypeSelector({ selectedType, onSelect }: WidgetTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {widgetTypes.map((type) => (
        <Card
          key={type.id}
          className={cn(
            "relative flex flex-col items-start gap-2 p-6 cursor-pointer transition-all hover:shadow-lg",
            selectedType === type.id && "ring-2 ring-primary"
          )}
          onClick={() => onSelect(type.id)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <type.icon className={cn(
                "h-6 w-6",
                selectedType === type.id ? "text-primary" : "text-primary/60"
              )} />
            </div>
            <h3 className="text-lg font-semibold">{type.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{type.description}</p>
        </Card>
      ))}
    </div>
  );
}