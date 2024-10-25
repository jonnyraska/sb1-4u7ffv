"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, MousePointerClick, FileText, MoreVertical, Copy, Pencil, Trash2, Calendar } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useRouter, usePathname } from 'next/navigation';

interface Widget {
  id: string;
  name: string;
  type: 'gallery' | 'before-after' | null;
  status: 'published' | 'draft';
  createdAt: Date;
  stats: {
    views: number;
    clicks: number;
    submissions: number;
  };
}

const initialWidgets: Widget[] = [
  {
    id: '1',
    name: 'Kitchen Remodel Gallery',
    type: 'gallery',
    status: 'published',
    createdAt: new Date('2024-03-15'),
    stats: {
      views: 2345,
      clicks: 486,
      submissions: 45,
    },
  },
  {
    id: '2',
    name: 'Master Bath Before/After',
    type: 'before-after',
    status: 'published',
    createdAt: new Date('2024-03-10'),
    stats: {
      views: 1987,
      clicks: 395,
      submissions: 38,
    },
  },
  {
    id: '3',
    name: 'Client Testimonials',
    type: 'gallery',
    status: 'draft',
    createdAt: new Date('2024-03-20'),
    stats: {
      views: 0,
      clicks: 0,
      submissions: 0,
    },
  },
];

export function WidgetList() {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
  const router = useRouter();
  const pathname = usePathname();

  // Check if we're returning from the widget builder
  useEffect(() => {
    const match = pathname.match(/^\/widgets$/);
    if (match) {
      const storedWidget = sessionStorage.getItem('newWidget');
      if (storedWidget) {
        const newWidget = JSON.parse(storedWidget);
        setWidgets(prev => [
          {
            id: newWidget.id,
            name: newWidget.name || 'New Widget',
            type: null,
            status: 'draft',
            createdAt: new Date(),
            stats: {
              views: 0,
              clicks: 0,
              submissions: 0,
            },
          },
          ...prev,
        ]);
        sessionStorage.removeItem('newWidget');
      }
    }
  }, [pathname]);

  const handleDuplicate = (widget: Widget) => {
    const newWidget = {
      ...widget,
      id: Math.random().toString(36).substr(2, 9),
      name: `${widget.name} (Copy)`,
      status: 'draft' as const,
      createdAt: new Date(),
      stats: { views: 0, clicks: 0, submissions: 0 },
    };
    setWidgets([...widgets, newWidget]);
  };

  const handleDelete = (widgetId: string) => {
    setWidgets(widgets.filter(w => w.id !== widgetId));
  };

  const handleEdit = (widgetId: string) => {
    router.push(`/widgets/${widgetId}`);
  };

  return (
    <div className="grid gap-6">
      {widgets.map((widget) => (
        <Card key={widget.id} className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-[#0d3366]">
                  {widget.name}
                </h3>
                <Badge variant={widget.status === 'published' ? 'default' : 'secondary'}>
                  {widget.status === 'published' ? 'Published' : 'Draft'}
                </Badge>
                {widget.type && (
                  <Badge variant="outline" className="capitalize">
                    {widget.type === 'gallery' ? 'Image Gallery' : 'Before/After'}
                  </Badge>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  {format(widget.createdAt, 'MMM d, yyyy')}
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex items-center gap-2 text-gray-500">
                  <Eye className="h-4 w-4" />
                  <span>{widget.stats.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <MousePointerClick className="h-4 w-4" />
                  <span>{widget.stats.clicks.toLocaleString()} clicks</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <FileText className="h-4 w-4" />
                  <span>{widget.stats.submissions.toLocaleString()} submissions</span>
                </div>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleDuplicate(widget)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEdit(widget.id)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-red-600"
                  onClick={() => handleDelete(widget.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Card>
      ))}
    </div>
  );
}