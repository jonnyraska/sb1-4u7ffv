"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WidgetConfig } from "./widget-builder";

interface SettingsProps {
  config: WidgetConfig;
  onUpdateConfig: (config: Partial<WidgetConfig>) => void;
}

export function Settings({ config, onUpdateConfig }: SettingsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Starting Set</Label>
        <Select
          value={config.startingSet}
          onValueChange={(value) => onUpdateConfig({ startingSet: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose starting set" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Set 1</SelectItem>
            <SelectItem value="2">Set 2</SelectItem>
            <SelectItem value="3">Set 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Background Color</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={config.backgroundColor}
            onChange={(e) => onUpdateConfig({ backgroundColor: e.target.value })}
            className="w-12 h-12 p-1 rounded-lg"
          />
          <Input
            type="text"
            value={config.backgroundColor}
            onChange={(e) => onUpdateConfig({ backgroundColor: e.target.value })}
            placeholder="#000000"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}