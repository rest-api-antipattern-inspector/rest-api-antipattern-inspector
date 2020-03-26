// https://developer.twitter.com/en/docs/api-reference-index

import {
  SCREEN_NAME,
  COUNT,
  SCREEN_NAME_2,
  QUERY,
  LIST_SLUG,
  COLLECTION_NAME,
} from './constants'
import { GET, POST } from '../../lib/constants'

export const postLevel1 = [
  // Post, retrieve, and engage with Tweets
  // 300* per user; 300* per app
  // {
  //   url: `statuses/update`,
  //   method: POST,
  //   params: { status: COLLECTION_NAME },
  // },
  // Create and manage lists
  {
    url: `lists/create`,
    method: POST,
    params: { name: LIST_SLUG },
  },
  // Follow, search, and get users
  {
    url: `friendships/create`,
    method: POST,
    params: { screen_name: SCREEN_NAME_2, count: COUNT },
  },
  {
    url: `friendships/update`,
    method: POST,
    params: { screen_name: SCREEN_NAME_2, count: COUNT },
  },
  // Mute, block, and report users
  {
    url: 'blocks/create',
    method: POST,
    params: { screen_name: SCREEN_NAME_2 },
  },
  {
    url: 'mutes/users/create',
    method: POST,
    params: { screen_name: SCREEN_NAME_2 },
  },
  // Curate a collection of Tweets
  // {
  //   url: `collections/create`,
  //   method: POST,
  //   params: { name: COLLECTION_NAME },
  // },
]

export const postLevel2 = [
  // Create and manage lists
  {
    url: `lists/members/create`,
    method: POST,
    params: {
      slug: LIST_SLUG,
      owner_screen_name: SCREEN_NAME,
      screen_name: SCREEN_NAME,
    },
  },
  {
    url: `lists/subscribers/create`,
    method: POST,
    params: {
      slug: LIST_SLUG,
      owner_screen_name: SCREEN_NAME,
    },
  },
]

export const getLevel = [
  //Create and manage lists
  {
    url: 'lists/list',
    method: GET,
    params: { screen_name: SCREEN_NAME },
  },
  {
    url: 'lists/members',
    method: GET,
    params: {
      slug: LIST_SLUG,
      owner_screen_name: SCREEN_NAME,
    },
  },
  {
    url: 'lists/members/show',
    method: GET,
    params: {
      slug: LIST_SLUG,
      owner_screen_name: SCREEN_NAME,
      screen_name: SCREEN_NAME,
    },
  },
  {
    url: 'lists/memberships',
    method: GET,
    params: { screen_name: SCREEN_NAME },
  },
  {
    url: 'lists/ownerships',
    method: GET,
    params: { screen_name: SCREEN_NAME },
  },
  {
    url: 'lists/show',
    method: GET,
    params: {
      slug: LIST_SLUG,
      owner_screen_name: SCREEN_NAME,
    },
  },
  {
    url: 'lists/statuses',
    method: GET,
    params: {
      slug: LIST_SLUG,
      owner_screen_name: SCREEN_NAME,
    },
  },
  {
    url: 'lists/subscribers',
    method: GET,
    params: {
      slug: LIST_SLUG,
      owner_screen_name: SCREEN_NAME,
    },
  },
  {
    url: 'lists/subscribers/show',
    method: GET,
    params: {
      slug: LIST_SLUG,
      owner_screen_name: SCREEN_NAME,
      screen_name: SCREEN_NAME,
    },
  },
  {
    url: 'lists/subscriptions',
    method: GET,
    params: {
      slug: LIST_SLUG,
      owner_screen_name: SCREEN_NAME,
    },
  },
  // Follow, search, and get users
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
    params: {
      target_screen_name: SCREEN_NAME_2,
      count: COUNT,
    },
  },
  {
    url: `users/lookup`,
    method: GET,
    params: { screen_name: SCREEN_NAME, count: COUNT },
  },
  {
    url: `users/search`,
    method: GET,
    params: {
      screen_name: SCREEN_NAME_2,
      count: COUNT,
      q: QUERY,
    },
  },
  {
    url: `users/show`,
    method: GET,
    params: {
      screen_name: SCREEN_NAME_2,
      count: COUNT,
    },
  },
  // Get Tweet timelines
  {
    url: 'statuses/home_timeline',
    method: GET,
    params: { screen_name: SCREEN_NAME, count: COUNT },
  },
  {
    url: 'statuses/mentions_timeline',
    method: GET,
    params: { screen_name: SCREEN_NAME, count: COUNT },
  },
  {
    url: 'statuses/user_timeline',
    method: GET,
    params: { screen_name: SCREEN_NAME, count: COUNT },
  },
  // Mute, block, and report users
  {
    url: 'blocks/ids',
    method: GET,
    params: { count: COUNT },
  },
  {
    url: 'blocks/list',
    method: GET,
    params: { count: COUNT },
  },
  {
    url: 'mutes/users/ids',
    method: GET,
    params: { count: COUNT },
  },
  {
    url: 'mutes/users/list',
    method: GET,
    params: { count: COUNT },
  },
]

export const deleteLevel1 = [
  // Create and manage lists
  {
    url: `lists/members/destroy`,
    method: POST,
    params: {
      slug: LIST_SLUG,
      owner_screen_name: SCREEN_NAME,
      screen_name: SCREEN_NAME,
    },
  },
  {
    url: `lists/subscribers/destroy`,
    method: POST,
    params: {
      slug: LIST_SLUG,
      owner_screen_name: SCREEN_NAME,
    },
  },
]

export const deleteLevel2 = [
  // Create and manage lists
  {
    url: `lists/destroy`,
    method: POST,
    params: {
      slug: LIST_SLUG,
      owner_screen_name: SCREEN_NAME,
    },
  },
  // Follow, search, and get users
  {
    url: `friendships/destroy`,
    method: POST,
    params: { screen_name: SCREEN_NAME_2, count: COUNT },
  },
  // Mute, block, and report users
  {
    url: 'blocks/destroy',
    method: POST,
    params: { screen_name: SCREEN_NAME_2 },
  },
  {
    url: 'mutes/users/destroy',
    method: POST,
    params: { screen_name: SCREEN_NAME_2 },
  },
]
