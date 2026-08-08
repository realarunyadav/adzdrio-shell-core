import { createFileRoute } from '@tanstack/react-router';
import { IncentiveEngine } from '@/components/incentives/IncentiveEngine';

export const Route = createFileRoute('/modules/incentives')({
  component: IncentiveEngine,
  head: () => ({
    meta: [
      { title: 'Incentive Engine — ABOS Enterprise' },
      { name: 'description', content: 'Configure and track employee incentive programs and achievements.' }
    ]
  })
});
