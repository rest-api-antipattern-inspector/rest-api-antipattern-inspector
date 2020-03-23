import {
  SCREEN_NAME,
  COUNT,
  SCREEN_NAME_2,
} from './constants'
import { GET, POST } from '../../lib/constants'

export default [
  {
    url: 'statuses/user_timeline',
    method: GET,
    params: { screen_name: SCREEN_NAME_2, count: COUNT },
  },
  {
    url: 'followers/ids',
    method: GET,
    params: { screen_name: SCREEN_NAME, count: COUNT },
  },
  {
    url: 'followers/list',
    method: GET,
    params: { screen_name: SCREEN_NAME, count: COUNT },
  },
  {
    url: 'friends/ids',
    method: GET,
    params: { screen_name: SCREEN_NAME, count: COUNT },
  },
  {
    url: 'friends/list',
    method: GET,
    params: { screen_name: SCREEN_NAME, count: COUNT },
  },
  {
    url: 'friendships/incoming',
    method: GET,
    params: { screen_name: SCREEN_NAME, count: COUNT },
  },
  {
    url: `friendships/lookup`,
    method: GET,
    params: { screen_name: SCREEN_NAME, count: COUNT },
  },
  {
    url: `friendships/no_retweets/ids`,
    method: GET,
    params: { screen_name: SCREEN_NAME, count: COUNT },
  },
  {
    url: `friendships/outgoing`,
    method: GET,
    params: { screen_name: SCREEN_NAME, count: COUNT },
  },
  {
    url: `friendships/show`,
    method: GET,
    params: { screen_name: SCREEN_NAME, count: COUNT },
  },
]
