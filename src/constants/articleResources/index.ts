import type { ArticleResource } from '../constants.types'
import { DATABASE_ARTICLES } from './databases'
import { DEVELOPER_TOOL_ARTICLES } from './developerTools'
import { DEVOPS_ARTICLES } from './devops'
import { ENGINEERING_ARTICLES } from './engineering'
import { FRONTEND_ARTICLES } from './frontend'
import { LANGUAGE_ARTICLES } from './languages'

export const ARTICLE_RESOURCES: ArticleResource[] = [
  ...LANGUAGE_ARTICLES,
  ...FRONTEND_ARTICLES,
  ...DEVOPS_ARTICLES,
  ...DATABASE_ARTICLES,
  ...ENGINEERING_ARTICLES,
  ...DEVELOPER_TOOL_ARTICLES,
]
