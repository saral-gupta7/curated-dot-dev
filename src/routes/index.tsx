import { createFileRoute } from '@tanstack/react-router'
import { ArrowDown, BookOpenText, Play, Sparkles } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { ArticleCard } from '../components/ArticleCard'
import { MobileHeader, Sidebar } from '../components/Sidebar'
import { ResourceCard } from '../components/ResourceCard'
import { SearchDialog } from '../components/SearchDialog'
import {
  ARTICLE_RESOURCES,
  VIDEO_RESOURCES,
  getTopicIds,
  getTopicLabel,
} from '../constants'
import { cn } from '../lib/utils'
import { useAppStore } from '../stores/useAppStore'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const {
    activeTopic,
    closeSearch,
    contentType,
    darkMode,
    openSearch,
    resetLibrary,
    setContentType,
  } = useAppStore(
    useShallow((state) => ({
      activeTopic: state.activeTopic,
      closeSearch: state.closeSearch,
      contentType: state.contentType,
      darkMode: state.darkMode,
      openSearch: state.openSearch,
      resetLibrary: state.resetLibrary,
      setContentType: state.setContentType,
    })),
  )

  useEffect(() => {
    void useAppStore.persist.rehydrate()
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        openSearch()
      }
      if (event.key === 'Escape') closeSearch()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeSearch, openSearch])

  const selectedTopics = useMemo(
    () => (activeTopic === 'all' ? null : getTopicIds(activeTopic)),
    [activeTopic],
  )
  const filteredVideos = useMemo(
    () =>
      VIDEO_RESOURCES.filter(
        (resource) =>
          !selectedTopics || selectedTopics.includes(resource.topic),
      ),
    [selectedTopics],
  )
  const filteredArticles = useMemo(
    () =>
      ARTICLE_RESOURCES.filter(
        (resource) =>
          !selectedTopics || selectedTopics.includes(resource.topic),
      ),
    [selectedTopics],
  )
  const visibleItems =
    contentType === 'videos' ? filteredVideos : filteredArticles
  const activeLabel = getTopicLabel(activeTopic)

  return (
    <div className="min-h-dvh bg-[#f4f3ef] font-[Avenir_Next,Avenir,Segoe_UI,sans-serif] text-zinc-900 antialiased selection:bg-orange-200 selection:text-zinc-950 dark:bg-[#10110f] dark:text-zinc-100 dark:selection:bg-orange-700">
      <MobileHeader />
      <Sidebar />

      <main className="px-4 lg:ml-[294px] lg:px-[5vw]">
        <section className="flex min-h-[min(720px,88dvh)] max-w-5xl flex-col justify-center py-14 sm:py-20">
          <div className="mb-7 flex w-fit items-center gap-2 text-xs font-bold text-orange-500">
            <Sparkles size={15} /> Hand-picked, not scraped
          </div>
          <h1 className="max-w-4xl text-[clamp(3.25rem,8vw,7.7rem)] font-medium leading-[0.9] tracking-[-0.075em] text-zinc-900 dark:text-zinc-100">
            The good stuff,
            <br />
            without the digging.
          </h1>
          <p className="mt-7 max-w-lg text-sm leading-6 text-zinc-500 sm:text-base sm:leading-7 dark:text-zinc-400">
            A small, opinionated library of technical resources that genuinely
            helped me learn and build.
          </p>
          <a
            className="mt-7 inline-flex w-fit items-center gap-2 border-b border-zinc-800 pb-1 text-xs font-bold transition hover:text-orange-500 dark:border-zinc-200"
            href="#library"
          >
            Browse the library{' '}
            <ArrowDown
              size={15}
              className="transition-transform group-hover:translate-y-0.5"
            />
          </a>
        </section>

        <section
          className="border-t border-zinc-200 py-10 sm:py-14 dark:border-zinc-800"
          id="library"
        >
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">
                {activeLabel}
              </h2>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                {visibleItems.length} useful{' '}
                {visibleItems.length === 1 ? 'resource' : 'resources'}, and
                counting.
              </p>
            </div>
            <div
              className="flex w-fit rounded-lg border border-zinc-200 bg-white/50 p-1 dark:border-zinc-800 dark:bg-zinc-900/50"
              role="tablist"
              aria-label="Resource format"
            >
              <button
                className={cn(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-[11px] font-semibold text-zinc-500 transition',
                  contentType === 'videos' &&
                    'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100',
                )}
                onClick={() => setContentType('videos')}
                role="tab"
                aria-selected={contentType === 'videos'}
              >
                <Play size={13} /> Videos
              </button>
              <button
                className={cn(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-[11px] font-semibold text-zinc-500 transition',
                  contentType === 'articles' &&
                    'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100',
                )}
                onClick={() => setContentType('articles')}
                role="tab"
                aria-selected={contentType === 'articles'}
              >
                <BookOpenText size={13} /> Articles
              </button>
            </div>
          </div>

          {visibleItems.length ? (
            contentType === 'videos' ? (
              <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredVideos.map((resource, index) => (
                  <ResourceCard
                    resource={resource}
                    priority={index < 2}
                    key={resource.id}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredArticles.map((article) => (
                  <ArticleCard article={article} key={article.id} />
                ))}
              </div>
            )
          ) : (
            <div className="rounded-xl border border-dashed border-zinc-300 px-5 py-24 text-center dark:border-zinc-800">
              <h3 className="text-xl font-semibold tracking-[-0.03em]">
                Nothing tucked away here yet.
              </h3>
              <p className="mt-2 text-xs text-zinc-500">
                This category is ready for the resources you add next.
              </p>
              <button
                className="mt-5 rounded-lg bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-zinc-50 transition hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 dark:bg-zinc-100 dark:text-zinc-950"
                onClick={resetLibrary}
              >
                Show all resources
              </button>
            </div>
          )}
        </section>

        <footer className="grid min-h-28 grid-cols-2 items-center gap-4 border-t border-zinc-200 text-[10px] text-zinc-400 sm:grid-cols-3 dark:border-zinc-800 dark:text-zinc-600">
          <span className="font-bold text-zinc-800 dark:text-zinc-200">
            curate.dev
          </span>
          <p className="hidden text-center sm:block">
            Good resources deserve to be easy to find.
          </p>
          <span className="text-right">Made with care</span>
        </footer>
      </main>

      <SearchDialog />
    </div>
  )
}
