"use client";

import { useState } from 'react';
import { Filters } from './filters';
import { OverviewMetrics } from './overview-metrics';
import { MetricsTable } from './metrics-table';
import { MetricsGraph } from './metrics-graph';
import { InboxDialog } from './inbox-dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Inbox } from 'lucide-react';

export function InsightsOverview() {
  const [inboxOpen, setInboxOpen] = useState(false);
  const unreadCount = 2; // This would typically come from your data store

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <Filters />
        <Button onClick={() => setInboxOpen(true)} variant="outline" className="relative">
          <Inbox className="h-4 w-4 mr-2" />
          Inbox
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>
      <OverviewMetrics />
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Metrics Comparison</h2>
        <MetricsGraph />
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Widget Performance</h2>
        <MetricsTable />
      </div>

      <InboxDialog open={inboxOpen} onOpenChange={setInboxOpen} />
    </div>
  );
}