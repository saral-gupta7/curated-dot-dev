import type { LucideIcon } from 'lucide-react'

export type TopicNode = {
  id: string
  label: string
  children?: TopicNode[]
}

export type TopicGroup = TopicNode & {
  icon: LucideIcon
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
