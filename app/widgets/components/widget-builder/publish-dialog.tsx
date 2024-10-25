"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Copy, Link } from 'lucide-react';

interface PublishDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  widgetId: string;
  widgetName: string;
}

export function PublishDialog({ open, onOpenChange, widgetId, widgetName }: PublishDialogProps) {
  const [copied, setCopied] = useState<'link' | 'embed' | null>(null);
  const shareUrl = `https://propertyvue.com/widgets/${widgetId}`;
  const embedCode = `<iframe
  src="${shareUrl}/embed"
  width="100%"
  height="600"
  frameborder="0"
  allow="autoplay; fullscreen"
  title="${widgetName}"
></iframe>`;

  const handleCopy = async (type: 'link' | 'embed') => {
    const text = type === 'link' ? shareUrl : embedCode;
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Share Widget</DialogTitle>
          <DialogDescription>
            Share your widget via link or embed it on your website
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="link" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="link">Share Link</TabsTrigger>
            <TabsTrigger value="embed">Embed Code</TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="space-y-4">
            <div className="flex gap-2">
              <Input
                readOnly
                value={shareUrl}
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleCopy('link')}
              >
                {copied === 'link' ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link className="h-4 w-4" />
              Anyone with the link can view this widget
            </div>
          </TabsContent>

          <TabsContent value="embed" className="space-y-4">
            <div className="relative">
              <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                <code className="text-sm">{embedCode}</code>
              </pre>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => handleCopy('embed')}
              >
                {copied === 'embed' ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Copy and paste this code into your website's HTML where you want the widget to appear
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}