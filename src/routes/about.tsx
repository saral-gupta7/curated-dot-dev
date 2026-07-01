import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({ component: About })

function About() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">This is the about page.</h1>
      <p className="mt-4 text-lg">
        <Link to="/">Back to home</Link>
      </p>
    </div>
  )
}
