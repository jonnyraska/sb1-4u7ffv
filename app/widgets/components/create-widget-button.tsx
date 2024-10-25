"use client";

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function CreateWidgetButton() {
  const router = useRouter();

  const handleCreate = () => {
    const widgetId = Math.random().toString(36).substr(2, 9);
    router.push(`/widgets/${widgetId}`);
  };

  return (
    <Button onClick={handleCreate}>
      <Plus className="h-4 w-4 mr-2" />
      Create Widget
    </Button>
  );
}