"use client";

import { useState } from 'react';
import { GalleryBuilder } from './builders/gallery-builder';
import { BeforeAfterBuilder } from './builders/before-after-builder';
import { WidgetTypeSelector } from './widget-type-selector';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface WidgetBuilderProps {
  widgetId: string;
}

export function WidgetBuilder({ widgetId }: WidgetBuilderProps) {
  const [widget, setWidget] = useState({
    id: widgetId,
    name: "New Widget",
    type: null as 'gallery' | 'before-after' | null,
    status: "draft" as const
  });

  const handleTypeSelect = (type: 'gallery' | 'before-after') => {
    setWidget(prev => ({
      ...prev,
      type,
      name: type === 'gallery' ? 'New Gallery Widget' : 'New Before & After Widget'
    }));
  };

  if (!widget.type) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link href="/widgets">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Widgets
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-[#0d3366]">Create New Widget</h1>
            <p className="text-gray-500">
              Choose a widget type to get started
            </p>
          </div>
        </div>

        <WidgetTypeSelector
          selectedType={widget.type}
          onSelect={handleTypeSelect}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/widgets">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Widgets
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-[#0d3366]">{widget.name}</h1>
            <Badge variant={widget.status === 'draft' ? 'secondary' : 'default'}>
              {widget.status === 'draft' ? 'Draft' : 'Active'}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {widget.type === 'gallery' ? 'Image Carousel' : 'Before/After Comparison'}
            </Badge>
          </div>
          <p className="text-gray-500">
            {widget.type === 'gallery' 
              ? 'Create an engaging image carousel with descriptions and smooth transitions'
              : 'Build interactive before/after comparisons with slider or side-by-side views'
            }
          </p>
        </div>
      </div>

      {widget.type === 'gallery' && <GalleryBuilder widgetId={widgetId} />}
      {widget.type === 'before-after' && <BeforeAfterBuilder widgetId={widgetId} />}
    </div>
  );
}