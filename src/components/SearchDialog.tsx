import { BookOpenText, CornerDownLeft, Play, Search, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { ARTICLE_RESOURCES, VIDEO_RESOURCES } from '../contants'
import { cn } from '../lib/utils'
import { useAppStore } from '../stores/useAppStore'

export function SearchDialog() {
  const { closeSearch, isSearchOpen, query, setQuery } = useAppStore(
    useShallow((state) => ({
      closeSearch: state.closeSearch,
      isSearchOpen: state.isSearchOpen,
      query: state.query,
      setQuery: state.setQuery,
    })),
  )
  const inputRef = useRef<HTMLInputElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const results = useMemo(
    () =>
      [
        ...VIDEO_RESOURCES.filter((item) =>
          `${item.title} ${item.description} ${item.author} ${item.topic}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        ).map((item) => ({
          id: `video-${item.id}`,
          title: item.title,
          meta: `${item.author} / ${item.duration}`,
          url: item.url,
          kind: 'Video' as const,
        })),
        ...ARTICLE_RESOURCES.filter((item) =>
          `${item.title} ${item.description} ${item.publication} ${item.topic}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        ).map((item) => ({
          id: `article-${item.id}`,
          title: item.title,
          meta: `${item.publication} / ${item.readTime}`,
          url: item.url,
          kind: 'Article' as const,
        })),
      ].slice(0, 7),
    [query],
  )

  useEffect(() => {
    if (isSearchOpen) {
      setIsMounted(true)
      const frame = window.requestAnimationFrame(() => setIsVisible(true))
      const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 60)
      return () => {
        window.cancelAnimationFrame(frame)
        window.clearTimeout(focusTimer)
      }
    }

    setIsVisible(false)
    const exitTimer = window.setTimeout(() => setIsMounted(false), 220)
    return () => window.clearTimeout(exitTimer)
  }, [isSearchOpen])

  useEffect(() => {
    setSelectedIndex((index) =>
      Math.min(index, Math.max(results.length - 1, 0)),
    )
  }, [results.length])

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelectedIndex((index) => (index + 1) % results.length)
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelectedIndex((index) => (index - 1 + results.length) % results.length)
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      window.open(results[selectedIndex]?.url, '_blank', 'noopener,noreferrer')
      closeSearch()
    }
  }

  if (!isMounted) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 grid place-items-center bg-zinc-950/0 p-4 backdrop-blur-none transition-[background-color,backdrop-filter] duration-200 motion-reduce:transition-none',
        isVisible && 'bg-zinc-950/70 backdrop-blur-md',
      )}
      role="presentation"
      onMouseDown={closeSearch}
    >
      <section
        className={cn(
          'w-full max-w-xl translate-y-4 scale-[0.96] overflow-hidden rounded-xl border border-zinc-300 bg-[#f4f3ef] opacity-0 shadow-2xl shadow-black/30 transition-[transform,opacity] duration-200 ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transform-none motion-reduce:transition-none dark:border-zinc-700 dark:bg-zinc-900',
          isVisible && 'translate-y-0 scale-100 opacity-100',
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Search resources"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-zinc-200 px-4 py-3.5 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <Search
            size={18}
            className={cn(
              'transition-transform duration-200 motion-reduce:transition-none',
              isVisible && 'scale-110 text-orange-500',
            )}
          />
          <input
            className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-600"
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search videos and articles"
            aria-controls="search-results"
            aria-activedescendant={
              results[selectedIndex]
                ? `search-${results[selectedIndex].id}`
                : undefined
            }
          />
          <button
            className="grid size-8 place-items-center rounded-lg transition hover:bg-zinc-200 hover:text-zinc-900 active:scale-90 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            onClick={closeSearch}
            aria-label="Close search"
          >
            <X size={17} />
          </button>
        </div>

        <div
          className="p-2"
          id="search-results"
          role="listbox"
          aria-label="Search results"
        >
          {results.length ? (
            results.map((result, index) => {
              const isSelected = index === selectedIndex
              return (
                <a
                  className={cn(
                    'group grid grid-cols-[32px_1fr_auto] items-center gap-3 rounded-lg px-2.5 py-2.5 transition-[background-color,transform] duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-orange-500 dark:hover:bg-zinc-800',
                    isSelected &&
                      'translate-x-0.5 bg-white shadow-sm dark:bg-zinc-800',
                  )}
                  href={result.url}
                  target="_blank"
                  rel="noreferrer"
                  key={result.id}
                  id={`search-${result.id}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <span
                    className={cn(
                      'grid size-8 place-items-center rounded-lg bg-zinc-200 text-zinc-600 transition-colors dark:bg-zinc-800 dark:text-zinc-300',
                      isSelected &&
                        'bg-orange-500 text-white dark:bg-orange-500 dark:text-white',
                    )}
                  >
                    {result.kind === 'Video' ? (
                      <Play size={13} fill="currentColor" />
                    ) : (
                      <BookOpenText size={14} />
                    )}
                  </span>
                  <span className="grid min-w-0 gap-1">
                    <strong className="truncate text-xs text-zinc-900 dark:text-zinc-100">
                      {result.title}
                    </strong>
                    <small className="text-[10px] text-zinc-500">
                      {result.meta}
                    </small>
                  </span>
                  {isSelected ? (
                    <span className="flex items-center gap-1 text-[9px] text-zinc-400">
                      <CornerDownLeft size={12} /> Enter
                    </span>
                  ) : (
                    <span className="text-xs text-zinc-400">↗</span>
                  )}
                </a>
              )
            })
          ) : (
            <p className="px-5 py-10 text-center text-xs text-zinc-500">
              No resources found. Try a broader search.
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-zinc-200 px-4 py-2.5 text-[9px] text-zinc-400 dark:border-zinc-800 dark:text-zinc-600">
          <span>↑ ↓ Navigate</span>
          <span>↵ Open</span>
          <span className="ml-auto">Esc Close</span>
        </div>
      </section>
    </div>
  )
}
