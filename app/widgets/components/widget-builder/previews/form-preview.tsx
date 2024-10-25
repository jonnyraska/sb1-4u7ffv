"use client";

import { FormConfig } from '../widget-builder';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface FormPreviewProps {
  config: FormConfig;
}

export function FormPreview({ config }: FormPreviewProps) {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-4">
        {config.showName && (
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
        )}
        
        {config.showEmail && (
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
        )}
        
        {config.showPhone && (
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="Enter your phone number" />
          </div>
        )}
        
        {config.showDescription && (
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Tell us about your project"
              rows={4}
            />
          </div>
        )}

        <Button className="w-full">Submit</Button>
      </div>
    </div>
  );
}