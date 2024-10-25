import { WidgetList } from '@/components/widgets/widget-list';
import { CreateWidgetButton } from '@/components/widgets/create-widget-button';

export default function WidgetsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#0d3366] mb-2">Widgets</h1>
          <p className="text-gray-500">Create and manage your property widgets</p>
        </div>
        <CreateWidgetButton />
      </div>
      <WidgetList />
    </div>
  );
}