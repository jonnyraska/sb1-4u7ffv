"use client";

import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function InboxFilters() {
  return (
    <div className="flex gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search messages..."
          className="pl-10"
        />
      </div>
      <Select defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Filter by Widget" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Widgets</SelectItem>
          <SelectItem value="kitchen">Kitchen Gallery</SelectItem>
          <SelectItem value="bathroom">Bathroom Gallery</SelectItem>
          <SelectItem value="outdoor">Outdoor Spaces</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}