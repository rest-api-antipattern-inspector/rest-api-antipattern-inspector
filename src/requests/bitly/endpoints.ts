// https://dev.bitly.com/v4_documentation.html
import { ORG_ID, BITLINK } from './constants'
import { GET, POST, PATCH } from '../../utils/HTTPMethods'

export const endpoints = [
  // user
  {
    url: 'user',
    method: GET,
  },
  {
    url: 'user',
    method: PATCH,
    data: { name: 'lnu' },
  },
  // organisations
  {
    url: 'organizations',
    method: GET,
  },
  {
    url: `organizations/${ORG_ID}/shorten_counts`,
    method: GET,
    endpoint: 'organizations/{ORG_ID}/shorten_counts',
  },
  {
    url: `organizations/${ORG_ID}`,
    method: GET,
    endpoint: 'organizations/{ORG_ID}',
  },
  // Bitlinks
  {
    url: 'shorten',
    method: POST,
    data: {
      domain: 'bit.ly',
      long_url:
        'https://stackoverflow.com/questions/38717816/twitter-api-text-field-value-is-truncated',
    },
  },
  {
    url: `bitlinks/${BITLINK}/countries`,
    method: GET,
    endpoint: 'bitlinks/{BITLINK}/countries',
  },
  {
    url: `bitlinks/${BITLINK}/clicks`,
    method: GET,
    endpoint: 'bitlinks/{BITLINK}/clicks',
  },
  {
    url: `bitlinks/${BITLINK}/referrers_by_domains`,
    method: GET,
    endpoint: 'bitlinks/{BITLINK}/referrers_by_domains',
  },
  {
    url: 'expand',
    method: POST,
    data: {
      bitlink_id: BITLINK,
    },
  },
  {
    url: 'bitlinks',
    method: POST,
    data: {
      domain: 'bit.ly',
      title: 'example',
      tags: ['string', 'hola'],
      long_url:
        'https://stackoverflow.com/questions/38717816/twitter-api-text-field-value-is-truncated',
    },
  },
  {
    url: `bitlinks/${BITLINK}/referrers`,
    method: GET,
    endpoint: 'bitlinks/{BITLINK}/referrers',
  },
  {
    url: `bitlinks/${BITLINK}/clicks/summary`,
    method: GET,
    endpoint: 'bitlinks/{BITLINK}/clicks/summary',
  },
  {
    url: `bitlinks/${BITLINK}`,
    method: PATCH,
    data: {
      title: 'example',
      tags: ['string', 'hola', 'ghghgh'],
    },
    endpoint: 'bitlinks/{BITLINK}',
  },
  {
    url: `bitlinks/${BITLINK}`,
    method: GET,
    endpoint: 'bitlinks/{BITLINK}',
  },
  {
    url: `bitlinks/${BITLINK}/referring_domains`,
    method: GET,
    endpoint: 'bitlinks/{BITLINK}/referring_domains',
  },
]

export default endpoints
