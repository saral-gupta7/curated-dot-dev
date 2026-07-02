/** @vitest-environment jsdom */

import { beforeEach, describe, expect, it } from 'vitest'
import { initialAppState, useAppStore } from './useAppStore'

describe('application store', () => {
  beforeEach(() => {
    window.localStorage.clear()
    useAppStore.setState(initialAppState)
  })

  it('coordinates sidebar and search visibility', () => {
    useAppStore.getState().openSidebar()
    useAppStore.getState().openSearch()

    expect(useAppStore.getState()).toMatchObject({
      isSearchOpen: true,
      isSidebarOpen: true,
    })

    useAppStore.getState().closeSidebar()
    useAppStore.getState().closeSearch()

    expect(useAppStore.getState()).toMatchObject({
      isSearchOpen: false,
      isSidebarOpen: false,
    })
  })

  it('closes the mobile sidebar when the content type changes', () => {
    useAppStore.getState().openSidebar()
    useAppStore.getState().setContentType('articles')

    expect(useAppStore.getState()).toMatchObject({
      contentType: 'articles',
      isSidebarOpen: false,
    })
  })

  it('resets library filters without changing preferences', () => {
    useAppStore.getState().setActiveTopic('kubernetes')
    useAppStore.getState().setQuery('cluster')
    useAppStore.getState().toggleTheme()
    useAppStore.getState().resetLibrary()

    expect(useAppStore.getState()).toMatchObject({
      activeTopic: 'all',
      darkMode: false,
      query: '',
    })
  })

  it('persists only durable user preferences', () => {
    useAppStore.getState().setActiveTopic('react')
    useAppStore.getState().openSearch()
    useAppStore.getState().toggleTheme()

    const persisted = JSON.parse(
      window.localStorage.getItem('curated-dev-preferences') ?? '{}',
    ) as { state?: Record<string, unknown> }

    expect(persisted.state).toEqual({ darkMode: false })
  })
})
