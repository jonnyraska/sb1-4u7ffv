"use client";

import { Set, WidgetConfig } from './widget-builder';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface GeneralSettingsProps {
  config: WidgetConfig;
  onChange: (config: WidgetConfig) => void;
  sets: Set[];
}

export function GeneralSettings({ config, onChange, sets }: GeneralSettingsProps) {
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <Label>Starting Set</Label>
        <Select
          value={config.startingSet.toString()}
          onValueChange={(value) =>
            onChange({ ...config, startingSet: parseInt(value) })
          }
          disabled={sets.length === 0}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select starting set" />
          </SelectTrigger>
          <SelectContent>
            {sets.map((set, index) => (
              <SelectItem key={set.id} value={index.toString()}>
                Set {index + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Background Color</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={config.backgroundColor}
            onChange={(e) =>
              onChange({ ...config, backgroundColor: e.target.value })
            }
            className="w-12 h-12 p-1"
          />
          <Input
            type="text"
            value={config.backgroundColor}
            onChange={(e) =>
              onChange({ ...config, backgroundColor: e.target.value })
            }
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}