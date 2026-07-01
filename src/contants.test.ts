import { describe, expect, it } from 'vitest'
import {
  ARTICLE_RESOURCES,
  TOPIC_GROUPS,
  VIDEO_RESOURCES,
  getTopicIds,
  getTopicLabel,
} from './contants'

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

  it('keeps every resource attached to a known topic', () => {
    const knownTopics = new Set(
      TOPIC_GROUPS.flatMap((group) => [
        group.id,
        ...(group.children?.map((child) => child.id) ?? []),
      ]),
    )
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
})
