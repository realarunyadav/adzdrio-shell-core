import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/activation/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/activation/$id"!</div>
}
