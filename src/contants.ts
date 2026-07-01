import {
  Blocks,
  BookOpenText,
  Boxes,
  Braces,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Server,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type TopicChild = { id: string; label: string }

export type TopicGroup = {
  id: string
  label: string
  icon: LucideIcon
  children?: TopicChild[]
}

export type VideoResource = {
  id: number
  title: string
  description: string
  topic: string
  author: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  thumbnail: string
  url: string
}

export type ArticleResource = {
  id: number
  title: string
  description: string
  topic: string
  publication: string
  readTime: string
  url: string
}

export const TOPIC_GROUPS: TopicGroup[] = [
  { id: 'all', label: 'All resources', icon: Blocks },
  {
    id: 'languages',
    label: 'Languages',
    icon: Braces,
    children: [
      { id: 'java', label: 'Java' },
      { id: 'go', label: 'Go' },
      { id: 'python', label: 'Python' },
      { id: 'javascript', label: 'JavaScript' },
      { id: 'typescript', label: 'TypeScript' },
      { id: 'cpp', label: 'C++' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend frameworks',
    icon: Code2,
    children: [
      { id: 'react', label: 'React' },
      { id: 'nextjs', label: 'Next.js' },
      { id: 'vue', label: 'Vue' },
      { id: 'svelte', label: 'Svelte' },
      { id: 'css', label: 'CSS & UI' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend frameworks',
    icon: Server,
    children: [
      { id: 'node', label: 'Node.js' },
      { id: 'spring', label: 'Spring Boot' },
      { id: 'django', label: 'Django' },
      { id: 'fastapi', label: 'FastAPI' },
      { id: 'gin', label: 'Gin' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & cloud',
    icon: Cloud,
    children: [
      { id: 'ansible', label: 'Ansible' },
      { id: 'docker', label: 'Docker' },
      { id: 'kubernetes', label: 'Kubernetes' },
      { id: 'terraform', label: 'Terraform' },
      { id: 'aws', label: 'AWS' },
      { id: 'ci-cd', label: 'CI/CD' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    icon: Database,
    children: [
      { id: 'postgresql', label: 'PostgreSQL' },
      { id: 'mysql', label: 'MySQL' },
      { id: 'mongodb', label: 'MongoDB' },
      { id: 'redis', label: 'Redis' },
      { id: 'database-design', label: 'Database design' },
    ],
  },
  {
    id: 'developer-tools',
    label: 'Terminal & GitHub',
    icon: GitBranch,
    children: [
      { id: 'git', label: 'Git' },
      { id: 'github', label: 'GitHub' },
      { id: 'shell', label: 'Shell & terminal' },
      { id: 'cli-tools', label: 'CLI tools' },
    ],
  },
  {
    id: 'engineering',
    label: 'Software engineering',
    icon: Boxes,
    children: [
      { id: 'system-design', label: 'System design' },
      { id: 'architecture', label: 'Architecture' },
      { id: 'testing', label: 'Testing' },
    ],
  },
]

export const LIBRARY_LINKS = [
  { id: 'videos', label: 'Video library', icon: Blocks },
  { id: 'articles', label: 'Articles & blogs', icon: BookOpenText },
] as const

// Placeholder content. Replace or extend these objects as your library grows.
export const VIDEO_RESOURCES: VideoResource[] = [
  {
    id: 1,
    title: 'JavaScript: The Hard Parts',
    description:
      'A durable mental model for closures, callbacks, and asynchronous JavaScript.',
    topic: 'javascript',
    author: 'Frontend Masters',
    duration: '9h 14m',
    level: 'Intermediate',
    thumbnail: 'https://i.ytimg.com/vi/Bv_5Zv5c-Ts/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=Bv_5Zv5c-Ts',
  },
  {
    id: 2,
    title: 'TypeScript for Professionals',
    description:
      'Types, generics, narrowing, and patterns that scale with a real codebase.',
    topic: 'typescript',
    author: 'freeCodeCamp',
    duration: '5h 09m',
    level: 'Intermediate',
    thumbnail: 'https://i.ytimg.com/vi/30LWjhZzg50/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=30LWjhZzg50',
  },
  {
    id: 3,
    title: 'React Full Course',
    description:
      'Modern React fundamentals through useful interfaces, hooks, and reusable components.',
    topic: 'react',
    author: 'Scrimba',
    duration: '11h 55m',
    level: 'Beginner',
    thumbnail: 'https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
  },
  {
    id: 4,
    title: 'Node.js and Express',
    description:
      'From the event loop to a production-minded API with middleware and authentication.',
    topic: 'node',
    author: 'freeCodeCamp',
    duration: '8h 16m',
    level: 'Beginner',
    thumbnail: 'https://i.ytimg.com/vi/Oe421EPjeBE/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
  },
  {
    id: 5,
    title: 'CSS for JavaScript Developers',
    description:
      'Layout, positioning, responsive design, and the browser rules behind polished interfaces.',
    topic: 'css',
    author: 'Kevin Powell',
    duration: '1h 03m',
    level: 'Intermediate',
    thumbnail: 'https://i.ytimg.com/vi/OXGznpKZ_sA/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=OXGznpKZ_sA',
  },
  {
    id: 6,
    title: 'PostgreSQL in One Course',
    description:
      'Relational databases, queries, joins, indexes, and practical schema design.',
    topic: 'postgresql',
    author: 'Amigoscode',
    duration: '4h 19m',
    level: 'Beginner',
    thumbnail: 'https://i.ytimg.com/vi/SpfIwlAYaKk/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=SpfIwlAYaKk',
  },
  {
    id: 7,
    title: 'System Design Fundamentals',
    description:
      'Scaling, caching, load balancing, queues, and the tradeoffs behind each choice.',
    topic: 'system-design',
    author: 'ByteByteGo',
    duration: '1h 07m',
    level: 'Advanced',
    thumbnail: 'https://i.ytimg.com/vi/m8Icp_Cid5o/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=m8Icp_Cid5o',
  },
  {
    id: 8,
    title: 'Docker in 100 Seconds',
    description:
      'A fast orientation to images, containers, Dockerfiles, and why teams use them.',
    topic: 'docker',
    author: 'Fireship',
    duration: '2m 46s',
    level: 'Beginner',
    thumbnail: 'https://i.ytimg.com/vi/Gjnup-PuquQ/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=Gjnup-PuquQ',
  },
  {
    id: 9,
    title: 'Git and GitHub for Beginners',
    description:
      'Commits, branches, remotes, pull requests, and resolving common conflicts.',
    topic: 'git',
    author: 'freeCodeCamp',
    duration: '1h 08m',
    level: 'Beginner',
    thumbnail: 'https://i.ytimg.com/vi/RGOj5yH7evk/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=RGOj5yH7evk',
  },
]

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

export function getTopicIds(selection: string) {
  const group = TOPIC_GROUPS.find((item) => item.id === selection)
  return group?.children?.map((child) => child.id) ?? [selection]
}

export function getTopicLabel(selection: string) {
  for (const group of TOPIC_GROUPS) {
    if (group.id === selection) return group.label
    const child = group.children?.find((item) => item.id === selection)
    if (child) return child.label
  }
  return 'All resources'
}
