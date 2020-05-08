import { GET, POST, PUT, PATCH, DELETE } from '../../utils/HTTPMethods'
import randomWords from 'random-words'
import {
  user_id,
  follow_user_id,
  category,
  video_id,
  animation_video_id,
  channel_id,
  group_id,
} from './constants'

export const endpoints = [
  {
    url: 'tutorial',
    method: GET,
  },
  {
    url: `users/${user_id}`,
    method: PATCH,
    endpoint: 'users/{user_id}',
    data: {
      bio: randomWords(),
    },
  },
  {
    url: `me`,
    method: PATCH,
    endpoint: 'me',
    data: {
      bio: randomWords(),
    },
  },
  {
    url: `users/${user_id}`,
    method: GET,
    endpoint: 'users/{user_id}',
  },
  {
    url: `users/${user_id}`,
    method: GET,
    endpoint: 'me',
  },
  {
    url: `users/${user_id}/feed`,
    method: GET,
    endpoint: 'users/{user_id}/feed',
  },
  {
    url: `me/feed`,
    method: GET,
    endpoint: 'me/feed',
  },
  {
    url: `users/${user_id}/following/${follow_user_id}`,
    method: PUT,
    endpoint: 'users/{user_id}/following/{follow_user_id}',
  },
  {
    url: `me/following/${follow_user_id}`,
    method: PUT,
    endpoint: 'me/following/{follow_user_id}',
  },
  {
    url: `users/${user_id}/followers`,
    method: GET,
    endpoint: 'users/{user_id}/followers}',
  },
  {
    url: `me/followers`,
    method: GET,
  },
  {
    url: `users/${user_id}/following/${follow_user_id}`,
    method: DELETE,
    endpoint: 'users/{user_id}/following/{follow_user_id}',
  },
  {
    url: `me/following/${follow_user_id}`,
    method: DELETE,
    endpoint: 'me/following/{follow_user_id}',
  },
  {
    url: `users?query=${randomWords()}`,
    method: GET,
    endpoint: 'users',
  },
  {
    url: `categories/${category}`,
    method: GET,
    endpoint: 'categories/{category}',
  },
  {
    url: `categories`,
    method: GET,
    endpoint: 'categories',
  },
  {
    url: `categories/${category}/channels`,
    method: GET,
    endpoint: 'categories/{category}/channels',
  },
  {
    url: `categories/${category}/groups`,
    method: GET,
    endpoint: 'categories/{category}/groups',
  },
  {
    url: `users/${user_id}/categories/${category}`,
    method: PUT,
    endpoint: 'users/{user_id}/categories/{category}',
  },
  {
    url: `me/categories/${category}`,
    method: PUT,
    endpoint: 'me/categories/{category}',
  },
  {
    url: `users/${user_id}/categories/${category}`,
    method: DELETE,
    endpoint: 'users/{user_id}/categories/{category}',
  },
  {
    url: `/me/categories/${category}`,
    method: DELETE,
    endpoint: '/me/categories/{category}',
  },
  {
    url: `categories/${category}/videos/${animation_video_id}`,
    method: GET,
    endpoint: 'categories/{category}/videos/{video_id}',
  },
  {
    url: `videos/${animation_video_id}/categories`,
    method: GET,
    endpoint: 'videos/{video_id}/categories',
  },
  {
    url: `categories/${category}/videos`,
    method: GET,
    endpoint: 'categories/{category}/videos',
  },
  {
    url: `channels/${channel_id}`,
    method: PATCH,
    endpoint: 'channels/{channel_id}',
    data: { name: randomWords(), description: randomWords() },
  },
  {
    url: `channels/${channel_id}`,
    method: GET,
    endpoint: 'channels/{channel_id}',
  },
  {
    url: `channels`,
    method: GET,
    endpoint: 'channels',
  },
  {
    url: `users/${user_id}/channels`,
    method: GET,
    endpoint: 'users/{user_id}/channels',
  },
  {
    url: `me/channels`,
    method: GET,
    endpoint: 'me/channels',
  },
  {
    url: `channels/${channel_id}/categories/${category}`,
    method: PUT,
    endpoint: 'channels/{channel_id}/categories/{category}',
  },
  {
    url: `channels/${channel_id}/categories`,
    method: GET,
    endpoint: 'channels/{channel_id}/categories',
  },
  {
    url: `channels/${channel_id}/moderators/${user_id}`,
    method: GET,
    endpoint: 'channels/{channel_id}/moderators/{user_id}',
  },
  {
    url: `channels/${channel_id}/moderators`,
    method: GET,
    endpoint: 'channels/{channel_id}/moderators',
  },
  {
    url: `users/${user_id}/channels/${channel_id}`,
    method: GET,
    endpoint: 'users/{user_id}/channels/{channel_id}',
  },
  {
    url: `me/channels/${channel_id}`,
    method: GET,
    endpoint: 'me/channels/{channel_id}',
  },
  {
    url: `channels/${channel_id}/users`,
    method: GET,
    endpoint: 'channels/{channel_id}/users',
  },
  {
    url: `users/${user_id}/channels/${channel_id}`,
    method: PUT,
    endpoint: 'users/{user_id}/channels/{channel_id}',
  },
  {
    url: `me/channels/${channel_id}`,
    method: PUT,
    endpoint: 'me/channels/{channel_id}',
  },
  {
    url: `channels/${channel_id}/tags/${randomWords()}`,
    method: PUT,
    endpoint: 'channels/{channel_id}/tags/{word}',
  },
  {
    url: `channels/${channel_id}/tags/${randomWords()}`,
    method: DELETE,
    endpoint: 'channels/{channel_id}/tags/{word}',
  },
  {
    url: `channels/${channel_id}/tags`,
    method: GET,
    endpoint: 'channels/{channel_id}/tags',
  },
  {
    url: `channels/${channel_id}/videos/${video_id}`,
    method: GET,
    endpoint: 'channels/{channel_id}/videos/{video_id}',
  },
  {
    url: `videos/${video_id}/available_channels`,
    method: GET,
    endpoint: 'videos/{video_id}/available_channels',
  },
  {
    url: `channels/${channel_id}/videos`,
    method: GET,
    endpoint: 'channels/{channel_id}/videos',
  },
  {
    url: `groups/${group_id}`,
    method: GET,
    endpoint: 'groups/{group_id}',
  },
  {
    url: `groups`,
    method: GET,
    endpoint: 'groups',
  },
  {
    url: `users/${user_id}/groups/${group_id}`,
    method: GET,
    endpoint: 'users/{user_id}/groups/{group_id}',
  },
  {
    url: `me/groups/${group_id}`,
    method: GET,
    endpoint: 'me/groups/{group_id}',
  },
  {
    url: `groups/${group_id}/videos/${video_id}`,
    method: PUT,
    endpoint: 'groups/{group_id}/videos/{video_id}',
  },
  {
    url: `groups/${group_id}/videos/${video_id}`,
    method: GET,
    endpoint: 'groups/{group_id}/videos/{video_id}',
  },
  {
    url: `groups/${group_id}/videos`,
    method: GET,
    endpoint: 'groups/{group_id}/videos',
  },
  {
    url: `users/${user_id}/likes/${video_id}`,
    method: DELETE,
    endpoint: 'users/{user_id}/likes/{video_id}',
  },
  {
    url: `me/likes/${video_id}`,
    method: DELETE,
    endpoint: 'me/likes/{video_id}',
  },
  {
    url: `videos/${video_id}/likes`,
    method: GET,
    endpoint: 'videos/{video_id}/likes',
  },
  {
    url: `channels/${channel_id}/videos/${video_id}/likes`,
    method: GET,
    endpoint: 'channels/{channel_id}/videos/{video_id}/likes',
  },
  {
    url: `users/${user_id}/likes`,
    method: GET,
    endpoint: 'users/{user_id}/likes',
  },
  {
    url: `me/likes`,
    method: GET,
    endpoint: 'me/likes',
  },
]

export default endpoints
