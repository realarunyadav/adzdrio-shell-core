import { createFileRoute } from '@tanstack/react-router';
import { DataCenter } from '@/components/data-center/DataCenter';

export const Route = createFileRoute('/platform/data-center')({
  component: DataCenter,
  head: () => ({
    meta: [
      { title: 'Data Import & Export Center — ABOS Enterprise' },
      { name: 'description', content: 'Enterprise-grade data mapping, validation, and migration hub for ABOS.' }
    ]
  })
});
