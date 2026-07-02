import {
  Blocks,
  Boxes,
  Braces,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Server,
} from 'lucide-react'
import type { TopicGroup } from './constants.types'

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
      { id: 'rust', label: 'Rust' },
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
      {
        id: 'go-backend',
        label: 'Go',
        children: [
          { id: 'gin', label: 'Gin' },
          { id: 'chi', label: 'Chi' },
          { id: 'echo', label: 'Echo' },
        ],
      },
      {
        id: 'python-backend',
        label: 'Python',
        children: [
          { id: 'fastapi', label: 'FastAPI' },
          { id: 'flask', label: 'Flask' },
          { id: 'django', label: 'Django' },
        ],
      },
      {
        id: 'javascript-backend',
        label: 'JavaScript / TypeScript',
        children: [
          { id: 'express', label: 'Express' },
          { id: 'fastify', label: 'Fastify' },
          { id: 'elysia', label: 'Elysia' },
          { id: 'nestjs', label: 'NestJS' },
        ],
      },
      {
        id: 'java-backend',
        label: 'Java',
        children: [{ id: 'spring', label: 'Spring Boot' }],
      },
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
