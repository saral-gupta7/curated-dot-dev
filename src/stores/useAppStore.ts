import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

export type ContentType = 'videos' | 'articles'

type AppState = {
  activeTopic: string
  contentType: ContentType
  darkMode: boolean
  isSearchOpen: boolean
  isSidebarOpen: boolean
  query: string
  closeSearch: () => void
  closeSidebar: () => void
  openSearch: () => void
  openSidebar: () => void
  resetLibrary: () => void
  setActiveTopic: (topic: string) => void
  setContentType: (contentType: ContentType) => void
  setQuery: (query: string) => void
  toggleTheme: () => void
}

export const initialAppState = {
  activeTopic: 'all',
  contentType: 'videos' as ContentType,
  darkMode: true,
  isSearchOpen: false,
  isSidebarOpen: false,
  query: '',
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        ...initialAppState,
        closeSearch: () => set({ isSearchOpen: false }, false, 'search/close'),
        closeSidebar: () =>
          set({ isSidebarOpen: false }, false, 'sidebar/close'),
        openSearch: () => set({ isSearchOpen: true }, false, 'search/open'),
        openSidebar: () => set({ isSidebarOpen: true }, false, 'sidebar/open'),
        resetLibrary: () =>
          set(
            {
              activeTopic: initialAppState.activeTopic,
              query: initialAppState.query,
            },
            false,
            'library/reset',
          ),
        setActiveTopic: (activeTopic) =>
          set({ activeTopic }, false, 'library/setTopic'),
        setContentType: (contentType) =>
          set(
            { contentType, isSidebarOpen: false },
            false,
            'library/setContentType',
          ),
        setQuery: (query) => set({ query }, false, 'search/setQuery'),
        toggleTheme: () =>
          set(
            (state) => ({ darkMode: !state.darkMode }),
            false,
            'theme/toggle',
          ),
      }),
      {
        name: 'curated-dev-preferences',
        storage: createJSONStorage(() => window.localStorage),
        partialize: (state) => ({ darkMode: state.darkMode }),
        skipHydration: true,
        version: 1,
      },
    ),
    { name: 'curated.dev', enabled: import.meta.env.DEV },
  ),
)
