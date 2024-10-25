"use client";

import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Eye, MousePointerClick, Clock, FileText } from "lucide-react";

const metrics = [
  {
    name: "Total Views",
    value: "5,986",
    change: "+12.5%",
    trend: "up",
    icon: Eye
  },
  {
    name: "Total Clicks",
    value: "1,193",
    change: "+8.2%",
    trend: "up",
    icon: MousePointerClick
  },
  {
    name: "Avg. Time",
    value: "2m 34s",
    change: "-3.1%",
    trend: "down",
    icon: Clock
  },
  {
    name: "Form Submissions",
    value: "112",
    change: "+15.3%",
    trend: "up",
    icon: FileText
  }
];

export function OverviewMetrics() {
  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      {metrics.map((metric) => (
        <Card key={metric.name} className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <metric.icon className="h-5 w-5" />
                <span className="text-sm">{metric.name}</span>
              </div>
              <div className="text-2xl font-bold text-[#0d3366]">
                {metric.value}
              </div>
            </div>
            <div className={`flex items-center ${
              metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {metric.trend === 'up' ? (
                <ArrowUpRight className="h-5 w-5" />
              ) : (
                <ArrowDownRight className="h-5 w-5" />
              )}
              <span className="text-sm font-medium">{metric.change}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}