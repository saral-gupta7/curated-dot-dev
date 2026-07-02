import { TOPIC_GROUPS } from './topicGroups'
import type { TopicNode } from './constants.types'

export function getTopicIds(selection: string) {
  const topic = findTopic(TOPIC_GROUPS, selection)
  return topic ? getLeafTopicIds(topic) : [selection]
}

export function getTopicLabel(selection: string) {
  return findTopic(TOPIC_GROUPS, selection)?.label ?? 'All resources'
}

function findTopic(
  topics: TopicNode[],
  selection: string,
): TopicNode | undefined {
  for (const topic of topics) {
    if (topic.id === selection) return topic
    const child = topic.children
      ? findTopic(topic.children, selection)
      : undefined
    if (child) return child
  }
  return undefined
}

function getLeafTopicIds(topic: TopicNode): string[] {
  if (!topic.children?.length) return [topic.id]
  return topic.children.flatMap(getLeafTopicIds)
}
