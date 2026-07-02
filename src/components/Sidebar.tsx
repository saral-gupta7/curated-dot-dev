import { BookOpen, ChevronDown, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { LIBRARY_LINKS, TOPIC_GROUPS, getTopicIds } from '../constants'
import type { TopicNode } from '../constants'
import { cn } from '../lib/utils'
import { useAppStore } from '../stores/useAppStore'

const iconButton =
  'group grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg text-zinc-500 transition-all duration-200 hover:bg-zinc-200 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 active:scale-90 motion-reduce:transition-none dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'

type NestedTopicListProps = {
  activeTopic: string
  depth?: number
  expanded: string[]
  isVisible: boolean
  topics: TopicNode[]
  onClose: () => void
  onSelect: (topic: string) => void
  onToggle: (topic: string) => void
}

function containsTopic(topic: TopicNode, selection: string): boolean {
  return Boolean(
    topic.children?.some(
      (child) => child.id === selection || containsTopic(child, selection),
    ),
  )
}

function NestedTopicList({
  activeTopic,
  depth = 0,
  expanded,
  isVisible,
  topics,
  onClose,
  onSelect,
  onToggle,
}: NestedTopicListProps) {
  return (
    <div
      className={cn(
        'grid',
        depth > 0 && 'ml-2 border-l border-zinc-300 pl-2 dark:border-zinc-700',
      )}
    >
      {topics.map((topic) => {
        const hasChildren = Boolean(topic.children?.length)
        const isExpanded = expanded.includes(topic.id)
        const isActive = topic.id === activeTopic
        const hasActiveDescendant = getTopicIds(topic.id).includes(activeTopic)

        return (
          <div key={topic.id}>
            <div
              className={cn(
                'group flex rounded-md transition-colors duration-200',
                (isActive || hasActiveDescendant) &&
                  'bg-white/70 dark:bg-zinc-800/70',
              )}
            >
              <button
                tabIndex={isVisible ? 0 : -1}
                className={cn(
                  'relative min-w-0 flex-1 rounded-md px-2 py-1.5 text-left text-[11px] text-zinc-500 transition-all duration-200 before:absolute before:-left-[18px] before:top-1/2 before:h-px before:w-0 before:bg-orange-500 before:transition-all hover:translate-x-0.5 hover:bg-white/60 hover:text-zinc-950 hover:before:w-2 motion-reduce:transform-none motion-reduce:transition-none dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
                  depth > 0 && 'text-[10.5px]',
                  isActive &&
                    'translate-x-0.5 bg-white font-semibold text-zinc-950 before:w-2 dark:bg-zinc-800 dark:text-zinc-100',
                )}
                onClick={() => {
                  onSelect(topic.id)
                  if (hasChildren) {
                    if (!isExpanded) onToggle(topic.id)
                  } else {
                    onClose()
                  }
                }}
              >
                <span className="block truncate">{topic.label}</span>
              </button>
              {hasChildren ? (
                <button
                  tabIndex={isVisible ? 0 : -1}
                  className="grid w-7 place-items-center text-zinc-400 transition-colors hover:text-zinc-800 dark:hover:text-zinc-100"
                  onClick={() => onToggle(topic.id)}
                  aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${topic.label}`}
                >
                  <ChevronDown
                    size={12}
                    className={cn(
                      'transition-transform duration-300 ease-out motion-reduce:transition-none',
                      isExpanded && 'rotate-180',
                    )}
                  />
                </button>
              ) : null}
            </div>

            {topic.children ? (
              <div
                className={cn(
                  'overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none',
                  isExpanded
                    ? 'max-h-72 translate-y-0 opacity-100'
                    : 'pointer-events-none max-h-0 -translate-y-1 opacity-0',
                )}
                aria-hidden={!isExpanded}
              >
                <NestedTopicList
                  activeTopic={activeTopic}
                  depth={depth + 1}
                  expanded={expanded}
                  isVisible={isVisible && isExpanded}
                  topics={topic.children}
                  onClose={onClose}
                  onSelect={onSelect}
                  onToggle={onToggle}
                />
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export function MobileHeader() {
  const { openSearch, openSidebar } = useAppStore(
    useShallow((state) => ({
      openSearch: state.openSearch,
      openSidebar: state.openSidebar,
    })),
  )

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-zinc-200/80 bg-[#f4f3ef]/90 px-4 backdrop-blur-xl lg:hidden dark:border-zinc-800 dark:bg-[#10110f]/90">
      <button
        className={iconButton}
        onClick={openSidebar}
        aria-label="Open topic menu"
      >
        <Menu
          size={19}
          className="transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none"
        />
      </button>
      <a
        className="flex items-center gap-2.5 text-sm font-bold tracking-[-0.04em]"
        href="/"
        aria-label="curate.dev home"
      >
        <span className="grid size-7 place-items-center rounded-lg bg-zinc-900 text-[10px] text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950">
          c/
        </span>
        curate.dev
      </a>
      <button
        className={iconButton}
        onClick={openSearch}
        aria-label="Search resources"
      >
        <Search
          size={18}
          className="transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none"
        />
      </button>
    </header>
  )
}

export function Sidebar() {
  const {
    activeTopic,
    closeSidebar,
    contentType,
    darkMode,
    isSidebarOpen,
    openSearch,
    setActiveTopic,
    setContentType,
    toggleTheme,
  } = useAppStore(
    useShallow((state) => ({
      activeTopic: state.activeTopic,
      closeSidebar: state.closeSidebar,
      contentType: state.contentType,
      darkMode: state.darkMode,
      isSidebarOpen: state.isSidebarOpen,
      openSearch: state.openSearch,
      setActiveTopic: state.setActiveTopic,
      setContentType: state.setContentType,
      toggleTheme: state.toggleTheme,
    })),
  )
  const activeGroup = TOPIC_GROUPS.find(
    (group) => group.id === activeTopic || containsTopic(group, activeTopic),
  )?.id
  const [expanded, setExpanded] = useState<string[]>(
    activeGroup && activeGroup !== 'all' ? [activeGroup] : ['languages'],
  )

  const toggleGroup = (id: string) => {
    setExpanded((groups) =>
      groups.includes(id)
        ? groups.filter((group) => group !== id)
        : [...groups, id],
    )
  }

  return (
    <>
      <button
        className={cn(
          'fixed inset-0 z-30 cursor-default bg-zinc-950/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none lg:hidden',
          isSidebarOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none',
        )}
        onClick={closeSidebar}
        aria-label="Close menu"
      />
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-[292px] flex-col overflow-hidden border-r border-zinc-200 bg-[#ebeae5] shadow-2xl shadow-zinc-950/10 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none lg:inset-y-3 lg:left-3 lg:w-[270px] lg:rounded-2xl lg:border lg:shadow-none dark:border-zinc-800 dark:bg-[#191a18] dark:shadow-black/30',
          isSidebarOpen
            ? 'translate-x-0'
            : '-translate-x-full lg:translate-x-0',
        )}
      >
        <div className="flex items-center justify-between px-5 pb-4 pt-5">
          <a
            className="group flex items-center gap-2.5 text-sm font-bold tracking-[-0.04em]"
            href="/"
            aria-label="curate.dev home"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-zinc-900 text-[11px] text-zinc-50 transition-transform duration-300 ease-out group-hover:-rotate-3 group-hover:scale-105 motion-reduce:transition-none dark:bg-zinc-100 dark:text-zinc-950">
              c/
            </span>
            curate.dev
          </a>
          <button
            className={cn(iconButton, 'lg:hidden')}
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <button
          className="group mx-4 mb-5 grid grid-cols-[18px_1fr_auto] items-center gap-2 rounded-lg border border-zinc-300 bg-white/60 px-3 py-2.5 text-left text-xs text-zinc-500 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-white hover:shadow-sm focus-visible:outline-2 focus-visible:outline-orange-500 active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
          onClick={openSearch}
        >
          <Search
            size={15}
            className="transition-transform duration-200 group-hover:scale-110 group-hover:text-orange-500 motion-reduce:transition-none"
          />
          <span>Search everything</span>
          <kbd className="rounded border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 font-mono text-[9px] text-zinc-500 transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:transition-none dark:border-zinc-700 dark:bg-zinc-800">
            ⌘ K
          </kbd>
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-5 [scrollbar-width:thin]">
          <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-600">
            Library
          </p>
          <div className="mb-5 grid gap-1">
            {LIBRARY_LINKS.map((link) => {
              const Icon = link.icon
              return (
                <button
                  key={link.id}
                  className={cn(
                    'group relative flex w-full items-center gap-2.5 overflow-hidden rounded-lg px-2.5 py-2 text-left text-xs font-medium text-zinc-600 transition-all duration-200 hover:translate-x-0.5 hover:bg-white/70 hover:text-zinc-950 motion-reduce:transform-none motion-reduce:transition-none dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
                    contentType === link.id &&
                      'bg-white text-zinc-950 shadow-sm dark:bg-zinc-800 dark:text-zinc-100',
                  )}
                  onClick={() => {
                    setContentType(link.id)
                    document
                      .querySelector('#library')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <span
                    className={cn(
                      'absolute inset-y-2 left-0 w-0.5 -translate-x-full rounded-full bg-orange-500 transition-transform duration-200 motion-reduce:transition-none',
                      contentType === link.id && 'translate-x-0',
                    )}
                  />
                  <Icon
                    size={15}
                    strokeWidth={1.8}
                    className={cn(
                      'transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none',
                      contentType === link.id && 'text-orange-500',
                    )}
                  />
                  {link.label}
                </button>
              )
            })}
          </div>

          <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-600">
            Browse topics
          </p>
          <nav className="grid gap-0.5" aria-label="Resource topics">
            {TOPIC_GROUPS.map((group) => {
              const Icon = group.icon
              const isExpanded = expanded.includes(group.id)
              const isActive = group.id === activeTopic
              const hasActiveChild = containsTopic(group, activeTopic)

              return (
                <div key={group.id}>
                  <div
                    className={cn(
                      'group flex rounded-lg transition-all duration-200 hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none',
                      (isActive || hasActiveChild) &&
                        'bg-white/70 dark:bg-zinc-800/70',
                    )}
                  >
                    <button
                      className={cn(
                        'flex min-w-0 flex-1 items-center gap-2.5 px-2.5 py-2 text-left text-xs font-medium text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100',
                        isActive && 'text-zinc-950 dark:text-zinc-100',
                      )}
                      onClick={() => {
                        setActiveTopic(group.id)
                        if (group.children && !isExpanded) toggleGroup(group.id)
                      }}
                    >
                      <Icon
                        size={15}
                        strokeWidth={1.8}
                        className={cn(
                          'transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none',
                          (isActive || hasActiveChild) && 'text-orange-500',
                        )}
                      />
                      <span className="truncate">{group.label}</span>
                    </button>
                    {group.children ? (
                      <button
                        className="grid w-8 place-items-center text-zinc-400 transition-colors hover:text-zinc-800 dark:hover:text-zinc-100"
                        onClick={() => toggleGroup(group.id)}
                        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${group.label}`}
                      >
                        <ChevronDown
                          size={14}
                          className={cn(
                            'transition-transform duration-300 ease-out motion-reduce:transition-none',
                            isExpanded && 'rotate-180',
                          )}
                        />
                      </button>
                    ) : null}
                  </div>
                  {group.children ? (
                    <div
                      className={cn(
                        'overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none',
                        isExpanded
                          ? 'max-h-[50rem] translate-y-0 opacity-100'
                          : 'pointer-events-none max-h-0 -translate-y-1.5 opacity-0',
                      )}
                      aria-hidden={!isExpanded}
                    >
                      <div
                        className={cn(
                          'origin-top transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none',
                          isExpanded ? 'scale-y-100' : 'scale-y-95',
                        )}
                      >
                        <div className="relative ml-[17px] border-l border-zinc-300 py-1 pl-[17px] dark:border-zinc-700">
                          <NestedTopicList
                            activeTopic={activeTopic}
                            expanded={expanded}
                            isVisible={isExpanded}
                            topics={group.children}
                            onClose={closeSidebar}
                            onSelect={setActiveTopic}
                            onToggle={toggleGroup}
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </nav>
        </div>

        <div className="border-t border-zinc-300 p-3 dark:border-zinc-800">
          <div className="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-2">
              <Sun size={14} /> Theme
            </span>
            <button
              className="group relative h-6 w-11 rounded-lg border border-zinc-300 bg-white transition-all duration-200 hover:border-orange-400 active:scale-95 motion-reduce:transition-none dark:border-zinc-700 dark:bg-zinc-900"
              onClick={toggleTheme}
              aria-label="Toggle color theme"
            >
              <span
                className={cn(
                  'absolute left-1 top-1 size-3.5 rounded bg-zinc-900 transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none dark:bg-zinc-100',
                  darkMode && 'translate-x-[19px]',
                )}
              />
              <Moon
                size={11}
                className="absolute right-1.5 top-1.5 text-zinc-500"
              />
            </button>
          </div>
          <p className="mt-1 flex items-center gap-2 px-2.5 text-[10px] text-zinc-400 dark:text-zinc-600">
            <BookOpen size={13} /> Built for curious developers.
          </p>
        </div>
      </aside>
    </>
  )
}
