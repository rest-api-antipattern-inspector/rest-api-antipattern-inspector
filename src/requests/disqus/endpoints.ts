import { forum } from './constants'

// https://disqus.com/api/docs/
// start by creating a forum:
// http://disqus.com&name=lnu+test&short_name=lnutest
export const endpoints = [
  //forum
  {
    method: 'GET',
    url: 'forums/details.json',
    params: `&forum=${forum}`,
  },
]
