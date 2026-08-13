import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/activation/queue')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/activation/queue"!</div>
}
