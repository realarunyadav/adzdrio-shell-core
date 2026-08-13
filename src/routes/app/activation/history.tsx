import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/activation/history')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/activation/history"!</div>
}
