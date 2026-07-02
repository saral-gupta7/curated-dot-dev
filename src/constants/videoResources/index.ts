import { BACKEND_VIDEOS } from './backend'
import { DATABASE_VIDEOS } from './databases'
import { DEVELOPER_TOOL_VIDEOS } from './developerTools'
import { DEVOPS_VIDEOS } from './devops'
import { ENGINEERING_VIDEOS } from './engineering'
import { FRONTEND_VIDEOS } from './frontend'
import { LANGUAGE_VIDEOS } from './languages'
import type { VideoResource } from '../constants.types'

export const VIDEO_RESOURCES: VideoResource[] = [
  ...LANGUAGE_VIDEOS,
  ...FRONTEND_VIDEOS,
  ...BACKEND_VIDEOS,
  ...DEVOPS_VIDEOS,
  ...DATABASE_VIDEOS,
  ...ENGINEERING_VIDEOS,
  ...DEVELOPER_TOOL_VIDEOS,
].sort((first, second) => first.id - second.id)
