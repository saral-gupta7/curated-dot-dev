import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'

const themeInitializer = `try{const value=localStorage.getItem('curated-dev-preferences');const state=value?JSON.parse(value).state:null;document.documentElement.classList.toggle('dark',state?.darkMode!==false)}catch{document.documentElement.classList.add('dark')}`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'curated.dev | The good stuff, without the digging',
      },
      {
        name: 'description',
        content: 'A hand-picked library of technical resources for developers.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:site_name',
        content: 'curated.dev',
      },
      {
        property: 'og:title',
        content: 'curated.dev | The good stuff, without the digging',
      },
      {
        property: 'og:description',
        content: 'A hand-picked library of technical resources for developers.',
      },
      {
        property: 'og:image',
        content: '/logo512.png',
      },
      {
        property: 'og:image:width',
        content: '512',
      },
      {
        property: 'og:image:height',
        content: '512',
      },
      {
        property: 'og:image:alt',
        content: 'curated.dev logo',
      },
      {
        name: 'twitter:card',
        content: 'summary',
      },
      {
        name: 'twitter:title',
        content: 'curated.dev | The good stuff, without the digging',
      },
      {
        name: 'twitter:description',
        content: 'A hand-picked library of technical resources for developers.',
      },
      {
        name: 'twitter:image',
        content: '/logo512.png',
      },
      {
        name: 'twitter:image:alt',
        content: 'curated.dev logo',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
        <HeadContent />
      </head>
      <body>
        {children}
        {import.meta.env.DEV ? (
          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        ) : null}
        <Scripts />
      </body>
    </html>
  )
}
