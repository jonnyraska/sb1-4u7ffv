"use client";

import { useState } from "react";
import { Eye, MousePointerClick, Clock, FileText, TrendingUp, TrendingDown, ChevronUp, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Widget {
  id: string;
  name: string;
  views: {
    value: number;
    change: number;
  };
  clicks: {
    value: number;
    change: number;
  };
  avgTime: {
    value: number; // in seconds
    change: number;
  };
  submissions: {
    value: number;
    change: number;
  };
}

const initialWidgets: Widget[] = [
  {
    id: "1",
    name: "Kitchen Remodel Gallery",
    views: { value: 2345, change: 15.2 },
    clicks: { value: 486, change: 8.7 },
    avgTime: { value: 154, change: 12.3 },
    submissions: { value: 45, change: 20.1 }
  },
  {
    id: "2",
    name: "Master Bath Before/After",
    views: { value: 1987, change: -2.3 },
    clicks: { value: 395, change: 5.4 },
    avgTime: { value: 116, change: -8.1 },
    submissions: { value: 38, change: 15.2 }
  },
  {
    id: "3",
    name: "Outdoor Living Spaces",
    views: { value: 1654, change: 10.5 },
    clicks: { value: 312, change: 12.8 },
    avgTime: { value: 192, change: 18.4 },
    submissions: { value: 29, change: -4.2 }
  }
];

type SortField = 'views' | 'clicks' | 'avgTime' | 'submissions';
type SortDirection = 'asc' | 'desc';

function MetricCell({ 
  icon: Icon, 
  value, 
  change,
}: { 
  icon: any;
  value: string | number;
  change: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-gray-400" />
      <div>
        <div className="font-medium">{value}</div>
        <div className={`text-sm flex items-center gap-1 ${
          change >= 0 ? 'text-green-500' : 'text-red-500'
        }`}>
          {change >= 0 ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          {Math.abs(change)}%
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

export function MetricsTable() {
  const [widgets, setWidgets] = useState(initialWidgets);
  const [sortField, setSortField] = useState<SortField>('views');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }

    const sortedWidgets = [...widgets].sort((a, b) => {
      const aValue = a[field].value;
      const bValue = b[field].value;
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      return (aValue - bValue) * multiplier;
    });

    setWidgets(sortedWidgets);
  };

  const SortButton = ({ field, label }: { field: SortField; label: string }) => (
    <Button
      variant="ghost"
      size="sm"
      className="font-medium text-gray-500 hover:text-gray-700"
      onClick={() => handleSort(field)}
    >
      {label}
      {sortField === field && (
        sortDirection === 'asc' ? (
          <ChevronUp className="ml-1 h-4 w-4" />
        ) : (
          <ChevronDown className="ml-1 h-4 w-4" />
        )
      )}
    </Button>
  );

  return (
    <Card>
      <div className="p-6">
        <div className="grid grid-cols-5 gap-4 text-sm mb-4">
          <div>Widget Name</div>
          <SortButton field="views" label="Views" />
          <SortButton field="clicks" label="Clicks" />
          <SortButton field="avgTime" label="Avg. Time" />
          <SortButton field="submissions" label="Form Submissions" />
        </div>
        {widgets.map((widget) => (
          <div
            key={widget.id}
            className="grid grid-cols-5 gap-4 py-4 border-t border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="font-medium text-[#0d3366]">{widget.name}</div>
            <MetricCell 
              icon={Eye} 
              value={widget.views.value.toLocaleString()} 
              change={widget.views.change}
            />
            <MetricCell 
              icon={MousePointerClick} 
              value={widget.clicks.value.toLocaleString()} 
              change={widget.clicks.change}
            />
            <MetricCell 
              icon={Clock} 
              value={formatTime(widget.avgTime.value)} 
              change={widget.avgTime.change}
            />
            <MetricCell 
              icon={FileText} 
              value={widget.submissions.value.toLocaleString()} 
              change={widget.submissions.change}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}