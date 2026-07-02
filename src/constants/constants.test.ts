import { describe, expect, it } from 'vitest'
import {
  ARTICLE_RESOURCES,
  TOPIC_GROUPS,
  VIDEO_RESOURCES,
  getTopicIds,
  getTopicLabel,
} from '.'
import type { TopicNode } from '.'

function flattenTopicIds(topics: TopicNode[]): string[] {
  return topics.flatMap((topic) => [
    topic.id,
    ...(topic.children ? flattenTopicIds(topic.children) : []),
  ])
}

describe('resource taxonomy', () => {
  it('expands a parent category into its child topics', () => {
    expect(getTopicIds('languages')).toEqual(
      expect.arrayContaining([
        'java',
        'go',
        'python',
        'javascript',
        'typescript',
        'cpp',
      ]),
    )
  })

  it('resolves labels for groups and nested topics', () => {
    expect(getTopicLabel('devops')).toBe('DevOps & cloud')
    expect(getTopicLabel('kubernetes')).toBe('Kubernetes')
  })

  it('expands backend runtime groups into their framework topics', () => {
    expect(getTopicIds('go-backend')).toEqual(['gin', 'chi', 'echo'])
    expect(getTopicIds('python-backend')).toEqual([
      'fastapi',
      'flask',
      'django',
    ])
    expect(getTopicIds('javascript-backend')).toEqual([
      'express',
      'fastify',
      'elysia',
      'nestjs',
    ])
    expect(getTopicLabel('nestjs')).toBe('NestJS')
  })

  it('keeps every resource attached to a known topic', () => {
    const knownTopics = new Set(flattenTopicIds(TOPIC_GROUPS))
    const resourceTopics = [...VIDEO_RESOURCES, ...ARTICLE_RESOURCES].map(
      (resource) => resource.topic,
    )

    expect(resourceTopics.every((topic) => knownTopics.has(topic))).toBe(true)
  })

  it('uses valid external URLs for every resource', () => {
    const urls = [...VIDEO_RESOURCES, ...ARTICLE_RESOURCES].map(
      (resource) => resource.url,
    )

    expect(urls.every((url) => URL.canParse(url))).toBe(true)
  })

  it('keeps YouTube thumbnails aligned with their video IDs', () => {
    for (const resource of VIDEO_RESOURCES) {
      const videoId = new URL(resource.url).searchParams.get('v')
      expect(videoId).toBeTruthy()
      expect(resource.thumbnail).toContain(`/vi/${videoId}/`)
    }
  })
})
