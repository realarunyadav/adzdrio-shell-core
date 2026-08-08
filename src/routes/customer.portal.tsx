import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/customer/portal')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/customer/portal"!</div>
}
