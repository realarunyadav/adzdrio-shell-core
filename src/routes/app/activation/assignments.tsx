import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/activation/assignments')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/activation/assignments"!</div>
}
