import { WidgetBuilder } from '@/components/widgets/widget-builder';
import { useRouter } from 'next/router';

export default function WidgetBuilderPage() {
  const router = useRouter();
  const { id } = router.query;

  return <WidgetBuilder widgetId={id} />;
}