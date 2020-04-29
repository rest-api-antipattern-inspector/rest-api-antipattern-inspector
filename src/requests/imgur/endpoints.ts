import { GET, POST, PUT } from '../../utils/HTTPMethods'
import { username } from './constants'

export const endpoints = [
  // {
  //   url: 'account/me/images',
  //   method: GET,
  // },
  // {
  //   url: `account/${username}`,
  //   method: GET,
  //   endpoint: 'account/{username}',
  // },
  // {
  //   url: `account/me/block`,
  //   method: GET,
  // },
  // {
  //   url: `account/me/images`,
  //   method: GET,
  // },
  // {
  //   url: `account/${username}/submissions/{{page}}`,
  //   method: GET,
  //   endpoint: 'account/{username}/submissions/{page}',
  // },
  // {
  //   url: `account/${username}/available_avatars`,
  //   method: GET,
  //   endpoint: 'account/{username}/available_avatars',
  // },
  // {
  //   url: `account/${username}/avatar`,
  //   method: GET,
  //   endpoint: 'account/{username}/avatar',
  // },
  // {
  //   url: `account/me/settings`,
  //   method: GET,
  // },
  // { notworking
  //   url: `account/${username}/settings`,
  //   endpoint: 'account/{username}/settings',
  //   method: PUT,
  //   data: { bio: 'hittepå' },
  // },
  // {
  //   url: `account/${username}/settings`,
  //   endpoint: 'account/{username}/settings',
  //   method: GET,
  // },
  // {
  //   url: `account/${username}/verifyemail`,
  //   endpoint: 'account/{username}/verifyemail',
  //   method: GET,
  // },
  {
    url: `account/${username}/verifyemail`,
    endpoint: 'account/{username}/verifyemail',
    method: POST,
  },
  // {
  //   url: `account/${username}/albums`,
  //   endpoint: 'account/{username}/albums/{page}',
  //   method: GET,
  // },
  // {
  //   url: `account/${username}/albums/ids`,
  //   endpoint: 'account/{username}/albums/ids/{page}',
  //   method: GET,
  // },
  // {
  //   url: `account/${username}/albums/count`,
  //   endpoint: 'account/{username}/albums/count',
  //   method: GET,
  // },
  // {
  //   url: `account/${username}/comments`,
  //   endpoint: 'account/{username}/comments/{commentSort}/{page}',
  //   method: GET,
  // },
  // { not working, need id
  //   url: `account/${username}/comment/${commentId}`,
  //   endpoint: 'account/{username}/comment/{commentId}',
  //   method: GET,
  // },
  // {
  //   url: `account/${username}/comments/ids`,
  //   endpoint: 'account/{username}/comments/ids/{sort}/{page}',
  //   method: GET,
  // },
  // {
  //   url: `account/${username}/comments/count`,
  //   endpoint: 'account/{username}/comments/count',
  //   method: GET,
  // },
  // {
  //   url: `account/${username}/images`,
  //   endpoint: 'account/{username}/images/{page}',
  //   method: GET,
  // },
  // { not working, need id
  //   url: `account/${username}/image/${imageId}`,
  //   endpoint: 'account/{{username}}/image/{{imageId}}',
  //   method: GET,
  // },
  // {
  //   url: `account/${username}/images/ids`,
  //   endpoint: 'account/{username}/images/ids/{page}',
  //   method: GET,
  // },
  // {
  //   url: `account/${username}/images/count`,
  //   endpoint: 'account/{username}/images/count',
  //   method: GET,
  // },
  // {
  //   url: `account/${username}/notifications/replies`,
  //   endpoint: 'account/{username}/notifications/replies',
  //   method: GET,
  // },
  // { not working, need id
  //   url: `comment/${commentId}`,
  //   endpoint: 'comment/{commentId}',
  //   method: GET,
  // },
  // { not working, need id
  //   url: `comment/${commentId}/replies`,
  //   endpoint: 'comment/{commentId}/replies',
  //   method: GET,
  // },
  // { not working, need id
  //   url: `album/${albumHash}`,
  //   endpoint: 'album/{albumHash}',
  //   method: GET,
  // },
  // { not working, need id
  //   url: `album/${albumHash}/images`,
  //   endpoint: 'album/{albumHash}/images',
  //   method: GET,
  // },
  // { not working, need id
  //   url: `album/${albumHash}/image/${imageHash}`,
  //   endpoint: 'album/{albumHash}/image/{imageHash}',
  //   method: GET,
  // },
  //   { not working, need id
  //   url: `image/${imageHash}`,
  //   endpoint: 'image/{imageHash}',
  //   method: GET,
  // },
]

export default endpoints
