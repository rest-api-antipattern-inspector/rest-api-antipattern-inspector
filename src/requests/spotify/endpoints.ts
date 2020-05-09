import { GET, POST, PUT } from '../../utils/HTTPMethods'
import { username, imageHash } from './constants'
import randomWords from 'random-words'

const tagname = randomWords()

export const endpoints = [
  {
    url: 'account/me/images',
    method: GET,
  },
]

export default endpoints
