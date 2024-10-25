import { Suspense } from 'react';
import { Metadata } from 'next';
import { InsightsOverview } from './components/insights-overview';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Insights | Property Vue',
  description: 'Analytics and insights for your property widgets',
};

export default function InsightsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#0d3366]">Insights</h1>
      <Suspense fallback={<Card className="p-8">Loading insights...</Card>}>
        <InsightsOverview />
      </Suspense>
    </div>
  );
}