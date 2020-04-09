// https://dev.bitly.com/v4_documentation.html
import { ORG_ID, BITLINK } from './constants'
import { HTTPMethods } from '../../enums/HTTPMethods'

export const endpoints = [
  // user
  {
    url: 'user',
    method: HTTPMethods.GET,
  },
  {
    url: 'user',
    method: HTTPMethods.PATCH,
    data: { name: 'lnu' },
  },
  // organisations
  {
    url: 'organizations',
    method: HTTPMethods.GET,
  },
  {
    url: `organizations/${ORG_ID}/shorten_counts`,
    method: HTTPMethods.GET,
  },
  {
    url: `organizations/${ORG_ID}`,
    method: HTTPMethods.GET,
  },
  // Bitlinks
  {
    url: 'shorten',
    method: HTTPMethods.POST,
    data: {
      domain: 'bit.ly',
      long_url:
        'https://stackoverflow.com/questions/38717816/twitter-api-text-field-value-is-truncated',
    },
  },
  {
    url: `bitlinks/${BITLINK}/countries`,
    method: HTTPMethods.GET,
  },
  {
    url: `bitlinks/${BITLINK}/clicks`,
    method: HTTPMethods.GET,
  },
  {
    url: `bitlinks/${BITLINK}/referrers_by_domains`,
    method: HTTPMethods.GET,
  },
  {
    url: 'expand',
    method: HTTPMethods.POST,
    data: {
      bitlink_id: BITLINK,
    },
  },
  {
    url: 'bitlinks',
    method: HTTPMethods.POST,
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
    method: HTTPMethods.GET,
  },
  {
    url: `bitlinks/${BITLINK}/clicks/summary`,
    method: HTTPMethods.GET,
  },
  {
    url: `bitlinks/${BITLINK}`,
    method: HTTPMethods.PATCH,
    data: {
      title: 'example',
      tags: ['string', 'hola', 'ghghgh'],
    },
  },
  {
    url: `bitlinks/${BITLINK}`,
    method: HTTPMethods.GET,
  },
  {
    url: `bitlinks/${BITLINK}/referring_domains`,
    method: HTTPMethods.GET,
  },
]
