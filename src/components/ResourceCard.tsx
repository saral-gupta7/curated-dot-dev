import { ArrowUpRight, Play } from 'lucide-react'
import type { VideoResource } from '../constants'

export function ResourceCard({
  resource,
  priority = false,
}: {
  resource: VideoResource
  priority?: boolean
}) {
  return (
    <a
      className="group min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
      href={resource.url}
      target="_blank"
      rel="noreferrer"
    >
      <div className="relative aspect-video overflow-hidden rounded-xl bg-zinc-200 shadow-[0_1px_0_rgba(0,0,0,0.08)] dark:bg-zinc-900">
        <img
          className="size-full object-cover saturate-[.8] transition duration-500 ease-out group-hover:scale-[1.025] group-hover:saturate-100"
          src={resource.thumbnail}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950/55 via-transparent to-transparent" />
        <span className="absolute bottom-3.5 left-4 grid size-9 place-items-center rounded-lg bg-zinc-50/95 pl-0.5 text-zinc-900 transition group-hover:scale-105 group-hover:bg-orange-500 group-hover:text-white">
          <Play size={16} fill="currentColor" />
        </span>
        <span className="absolute bottom-3 right-3 rounded-md bg-zinc-950/80 px-2 py-1 font-mono text-[10px] font-semibold text-zinc-100">
          {resource.duration}
        </span>
      </div>
      <div className="px-0.5 pt-4">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-400 dark:text-zinc-600">
          <span>{resource.author}</span>
          <span>{resource.level}</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold tracking-[-0.035em] text-zinc-900 dark:text-zinc-100">
          {resource.title}
        </h3>
        <p className="mt-1.5 max-w-[55ch] text-xs leading-5 text-zinc-500 dark:text-zinc-400">
          {resource.description}
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-zinc-800 dark:text-zinc-200">
          Watch resource{' '}
          <ArrowUpRight
            size={14}
            className="text-orange-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </a>
  )
}
