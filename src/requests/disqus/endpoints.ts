import { forum, username, threadId, categoryId, postId } from './constants'
import { GET, POST, PATCH } from '../../utils/HTTPMethods'
const DISQUS_ACCESS_TOKEN = process.env.DISQUS_ACCESS_TOKEN
// https://disqus.com/api/docs/
// start by creating a forum:
// http://disqus.com&name=lnu+test&short_name=lnutest
export const staticEnpoints = [
  {
    method: POST,
    url: 'forums/create.json',
    params: ``,
  },
  {
    method: POST,
    url: 'categories/create.json',
    params: ``,
  },
]
export const level1 = [
  {
    method: POST,
    url: 'threads/create.json',
    params: `&forum=${forum}&title=testing`,
  },
  {
    method: POST,
    url: 'posts/create.json',
    params: `&thread=${threadId}&message=testing`,
  },
]
export const level2 = [
  //forum
  {
    method: GET,
    url: 'forums/details.json',
    params: `&forum=${forum}`,
  },
  {
    method: POST,
    url: 'forums/addModerator.json',
    params: `&user=username:${username}&forum=${forum}`,
  },
  {
    method: GET,
    url: 'forums/interestingForums.json',
  },
  {
    method: GET,
    url: 'forums/listCategories.json',
    params: `&forum=${forum}`,
  },
  {
    method: GET,
    url: 'forums/listFollowers.json',
    params: `&forum=${forum}`,
  },
  {
    method: GET,
    url: 'forums/listModerators.json',
    params: `&forum=${forum}`,
  },
  {
    method: GET,
    url: 'forums/listMostActiveUsers.json',
    params: `&forum=${forum}`,
  },
  {
    method: GET,
    url: 'forums/listMostLikedUsers.json',
    params: `&forum=${forum}`,
  },
  {
    method: GET,
    url: 'forums/listPosts.json',
    params: `&forum=${forum}`,
  },
  {
    method: GET,
    url: 'forums/listThreads.json',
    params: `&forum=${forum}`,
  },
  {
    method: GET,
    url: 'forums/listUserModerationHistory.json',
    params: `&user=username:${username}&forum=${forum}`,
  },
  // categories
  {
    method: GET,
    url: 'categories/details.json',
    params: `&category=${categoryId}`,
  },
  {
    method: GET,
    url: 'categories/list.json',
    params: `&forum=${forum}`,
  },
  {
    method: GET,
    url: 'categories/listPosts.json',
    params: `&category=${categoryId}`,
  },
  {
    method: GET,
    url: 'categories/listThreads.json',
    params: `&category=${categoryId}`,
  },
  {
    method: POST,
    url: 'posts/approve.json',
    params: `&post=${postId}`,
  },
  {
    method: GET,
    url: 'posts/details.json',
    params: `&post=${postId}`,
  },
  {
    method: GET,
    url: 'posts/getContext.json',
    params: `&post=${postId}`,
  },
  {
    method: GET,
    url: 'posts/list.json',
    params: ``,
  },
  {
    method: GET,
    url: 'posts/listModerationHistory.json',
    params: `&post=${postId}`,
  },
  {
    method: GET,
    url: 'posts/listPopular.json',
    params: ``,
  },
  {
    method: GET,
    url: 'posts/listReporters.json',
    params: `&posts=${postId}`,
  },
  {
    method: POST,
    url: 'posts/update.json',
    params: `&post=${postId}&message=updating`,
  },
  {
    method: POST,
    url: 'posts/vote.json',
    params: `&post=${postId}&vote=1`,
  },
  {
    method: GET,
    url: 'threads/details.json',
    params: `&thread=${threadId}`,
  },
  {
    method: GET,
    url: 'threads/list.json',
    params: ``,
  },
  {
    method: GET,
    url: 'threads/listPosts.json',
    params: `&thread=${threadId}`,
  },
  {
    method: POST,
    url: 'threads/update.json',
    params: `&thread=${threadId}`,
  },
  {
    method: GET,
    url: 'users/details.json',
    params: ``,
  },
  {
    method: GET,
    url: 'users/interestingUsers.json',
    params: ``,
  },
  {
    method: GET,
    url: 'users/listActiveForums.json',
    params: ``,
  },
  {
    method: GET,
    url: 'users/listForums.json',
    params: ``,
  },
  {
    method: GET,
    url: 'users/listMostActiveForums.json',
    params: ``,
  },
  {
    method: GET,
    url: 'users/listOwnedChannels.json',
    params: ``,
  },
  {
    method: GET,
    url: 'users/listPosts.json',
    params: ``,
  },
  {
    method: POST,
    url: 'users/updateProfile.json',
    params: `&about=om`,
  },
]

export default [...level1, ...level2, ...staticEnpoints]
