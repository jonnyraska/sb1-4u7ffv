"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function Filters() {
  const [timeRange, setTimeRange] = useState("7days");

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    // Here you would typically trigger a data refresh based on the new time range
  };

  return (
    <Select value={timeRange} onValueChange={handleTimeRangeChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Time Period" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="7days">Past 7 days</SelectItem>
        <SelectItem value="30days">Past 30 days</SelectItem>
        <SelectItem value="6months">Past 6 months</SelectItem>
        <SelectItem value="12months">Past 12 months</SelectItem>
        <SelectItem value="all">All time</SelectItem>
      </SelectContent>
    </Select>
  );
}