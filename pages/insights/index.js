import { Suspense } from 'react';
import { InsightsOverview } from '@/components/insights/insights-overview';
import { Card } from '@/components/ui/card';

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