import { GET, POST, PUT } from '../../utils/HTTPMethods'
import randomWords from 'random-words'
import {
  track_id,
  album_id,
  artist_id,
  category_id,
  episode_id,
  playlist_id,
  show_id,
} from './constants'

const tagname = randomWords()

export const endpoints = [
  {
    url: `albums/${album_id}`,
    method: GET,
    endpoint: 'albums/{id}',
  },
  {
    url: `albums/${album_id}/tracks`,
    method: GET,
    endpoint: 'albums/{id}/tracks',
  },
  {
    url: `albums`,
    method: GET,
    params:
      '?ids=41MnTivkwTO3UUJ8DrqEJJ,6JWc4iAiJ9FjyK0B59ABb4,6UXCm6bOO4gFlDQZV5yL3',
  },
  {
    url: `artists/${artist_id}`,
    method: GET,
    endpoint: 'artists/{id}',
  },
  {
    url: `artists/${artist_id}/albums`,
    method: GET,
    endpoint: 'artists/{id}/albums',
  },
  {
    url: `artists/${artist_id}/top-tracks`,
    method: GET,
    endpoint: 'artists/{id}/top-tracks',
    params: '?country=SE',
  },
  {
    url: `artists/${artist_id}/related-artists`,
    method: GET,
    endpoint: 'artists/{id}/related-artists',
  },
  {
    url: `artists`,
    method: GET,
    params: '?ids=0oSGxfWSnnOXhD2fKuz2Gy,3dBVyJ7JuOMt4GE9607Qin',
  },
  {
    url: `browse/categories/${category_id}`,
    method: GET,
    endpoint: 'categories/{id}',
  },
  {
    url: `browse/categories/${category_id}/playlists`,
    method: GET,
    endpoint: 'categories/{id}/playlists',
  },
  {
    url: `browse/categories`,
    method: GET,
  },
  {
    url: `browse/featured-playlists`,
    method: GET,
  },
  {
    url: `browse/new-releases`,
    method: GET,
  },
  {
    url: `recommendations`,
    method: GET,
    params:
      '?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50&market=US',
  },
  {
    url: `episodes`,
    method: GET,
    endpoint: 'episodes',
    params: '?ids=77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf',
  },
  {
    url: `playlists/${playlist_id}/followers/contains`,
    method: GET,
    endpoint: 'playlists/{playlist_id}/followers/contains',
    params: '?ids=possan,elogain',
  },
  {
    url: `playlists/${playlist_id}`,
    method: GET,
    endpoint: 'playlists/{playlist_id}',
  },
  {
    url: `playlists/${playlist_id}/images`,
    method: GET,
    endpoint: 'playlists/{playlist_id}/images',
  },
  {
    url: `playlists/${playlist_id}/tracks`,
    method: GET,
    endpoint: 'playlists/{playlist_id}/tracks',
  },
  {
    url: `search`,
    method: GET,
    params: '?q=tania%20bowra&type=artist',
  },
  {
    url: `shows/${show_id}`,
    method: GET,
    endpoint: 'shows/{id}',
    params: '?market=us',
  },
  {
    url: `shows`,
    method: GET,
    params: '?ids=5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ',
  },
  {
    url: `shows/${show_id}/episodes`,
    method: GET,
    endpoint: 'shows/{id}/episodes',
    params: '?market=us',
  },
  {
    url: `audio-analysis/${track_id}`,
    method: GET,
    endpoint: 'audio-analysis/{id}',
  },
  {
    url: `audio-features/${track_id}`,
    method: GET,
    endpoint: 'audio-features/{id}',
  },
  {
    url: `audio-features`,
    method: GET,
    endpoint: 'audio-features',
    params:
      '?ids=4JpKVNYnVcJ8tuMKjAj50A,2NRANZE9UCmPAS5XVbXL40,24JygzOLM0EmRQeGtFcIcG',
  },
  {
    url: `tracks/${track_id}`,
    method: GET,
    endpoint: 'tracks/{id}',
  },
  {
    url: `tracks`,
    method: GET,
    endpoint: 'tracks',
    params:
      '?ids=11dFghVXANMlKmJXsNCbNl,20I6sIOMTCkB6w7ryavxtO,7xGfFoTpQ2E7fRF5lN10tr',
  },
]

export default endpoints
