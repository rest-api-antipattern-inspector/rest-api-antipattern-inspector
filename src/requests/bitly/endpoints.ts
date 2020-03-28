// https://dev.bitly.com/v4_documentation.html

import { GET, POST, PATCH } from '../../lib/constants'

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
]
