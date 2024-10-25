"use client";

import { WidgetBuilder } from '../components/widget-builder/widget-builder';

export default function WidgetBuilderPage({
  params,
}: {
  params: { id: string };
}) {
  return <WidgetBuilder widgetId={params.id} />;
}