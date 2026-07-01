import { ArrowUpRight, BookOpenText } from 'lucide-react'
import type { ArticleResource } from '../contants'

export function ArticleCard({ article }: { article: ArticleResource }) {
  return (
    <a
      className="group flex min-h-52 flex-col rounded-xl border border-zinc-200 bg-white/50 p-5 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 dark:border-zinc-800 dark:bg-zinc-900/35 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
      href={article.url}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-400 dark:text-zinc-600">
        <span className="flex items-center gap-2">
          <BookOpenText size={14} className="text-orange-500" />
          {article.publication}
        </span>
        <span>{article.readTime}</span>
      </div>
      <h3 className="mt-7 text-xl font-semibold tracking-[-0.04em] text-zinc-900 dark:text-zinc-100">
        {article.title}
      </h3>
      <p className="mt-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
        {article.description}
      </p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[11px] font-bold text-zinc-800 dark:text-zinc-200">
        Read article{' '}
        <ArrowUpRight
          size={14}
          className="text-orange-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </a>
  )
}
