"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type Metric = 'views' | 'clicks' | 'avgTime' | 'submissions';

interface MetricConfig {
  id: Metric;
  label: string;
  color: string;
  formatter?: (value: number) => string;
}

const metrics: MetricConfig[] = [
  { id: 'views', label: 'Views', color: '#0d3366' },
  { id: 'clicks', label: 'Clicks', color: '#16a34a' },
  { id: 'avgTime', label: 'Avg Time', color: '#ea580c', formatter: (seconds) => `${Math.floor(seconds / 60)}m ${seconds % 60}s` },
  { id: 'submissions', label: 'Form Submissions', color: '#6366f1' },
];

const data = [
  {
    date: '2024-03-01',
    views: 1200,
    clicks: 280,
    avgTime: 145,
    submissions: 25,
  },
  {
    date: '2024-03-02',
    views: 1350,
    clicks: 290,
    avgTime: 155,
    submissions: 28,
  },
  {
    date: '2024-03-03',
    views: 1100,
    clicks: 250,
    avgTime: 140,
    submissions: 22,
  },
  {
    date: '2024-03-04',
    views: 1450,
    clicks: 310,
    avgTime: 160,
    submissions: 30,
  },
  {
    date: '2024-03-05',
    views: 1600,
    clicks: 350,
    avgTime: 165,
    submissions: 35,
  },
  {
    date: '2024-03-06',
    views: 1800,
    clicks: 380,
    avgTime: 170,
    submissions: 38,
  },
  {
    date: '2024-03-07',
    views: 2000,
    clicks: 420,
    avgTime: 175,
    submissions: 42,
  },
];

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export function MetricsGraph() {
  const [metric1, setMetric1] = useState<Metric>('views');
  const [metric2, setMetric2] = useState<Metric>('clicks');

  const getMetricConfig = (metricId: Metric) => 
    metrics.find(m => m.id === metricId)!;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{formatDate(label)}</p>
          {payload.map((entry: any, index: number) => {
            const metricConfig = metrics.find(m => m.label === entry.name)!;
            const value = metricConfig.formatter 
              ? metricConfig.formatter(entry.value)
              : entry.value.toLocaleString();
            
            return (
              <p
                key={index}
                className="text-sm"
                style={{ color: entry.color }}
              >
                {entry.name}: {value}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Select value={metric1} onValueChange={(value: Metric) => setMetric1(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select first metric" />
          </SelectTrigger>
          <SelectContent>
            {metrics.map((metric) => (
              <SelectItem 
                key={metric.id} 
                value={metric.id}
                disabled={metric.id === metric2}
              >
                {metric.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="text-sm font-medium text-gray-500">vs</span>

        <Select value={metric2} onValueChange={(value: Metric) => setMetric2(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select second metric" />
          </SelectTrigger>
          <SelectContent>
            {metrics.map((metric) => (
              <SelectItem 
                key={metric.id} 
                value={metric.id}
                disabled={metric.id === metric1}
              >
                {metric.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              stroke={getMetricConfig(metric1).color}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke={getMetricConfig(metric2).color}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            <Line
              yAxisId="left"
              type="monotone"
              dataKey={metric1}
              name={getMetricConfig(metric1).label}
              stroke={getMetricConfig(metric1).color}
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey={metric2}
              name={getMetricConfig(metric2).label}
              stroke={getMetricConfig(metric2).color}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}