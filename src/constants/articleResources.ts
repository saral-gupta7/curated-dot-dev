import type { ArticleResource } from './constants.types'

export const ARTICLE_RESOURCES: ArticleResource[] = [
  {
    id: 101,
    title: 'The JavaScript Event Loop',
    description:
      'A visual explanation of the call stack, task queue, microtasks, and rendering.',
    topic: 'javascript',
    publication: 'javascript.info',
    readTime: '12 min',
    url: 'https://javascript.info/event-loop',
  },
  {
    id: 102,
    title: 'You Might Not Need an Effect',
    description:
      'The React team explains when Effects are unnecessary and what to use instead.',
    topic: 'react',
    publication: 'React',
    readTime: '9 min',
    url: 'https://react.dev/learn/you-might-not-need-an-effect',
  },
  {
    id: 103,
    title: 'Use The Index, Luke',
    description:
      'A practical guide to database indexing and reading query performance.',
    topic: 'postgresql',
    publication: 'Use The Index, Luke',
    readTime: '18 min',
    url: 'https://use-the-index-luke.com/',
  },
  {
    id: 104,
    title: 'The Twelve-Factor App',
    description:
      'A concise methodology for building deployable and maintainable web services.',
    topic: 'architecture',
    publication: '12factor.net',
    readTime: '14 min',
    url: 'https://12factor.net/',
  },
  {
    id: 105,
    title: 'Kubernetes Concepts',
    description:
      'The official conceptual map for clusters, workloads, services, and configuration.',
    topic: 'kubernetes',
    publication: 'Kubernetes Docs',
    readTime: '16 min',
    url: 'https://kubernetes.io/docs/concepts/',
  },
  {
    id: 106,
    title: 'Pro Git: Branching',
    description:
      'A clear, detailed mental model for branches, merges, and remote workflows.',
    topic: 'git',
    publication: 'Git SCM',
    readTime: '20 min',
    url: 'https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell',
  },
]
