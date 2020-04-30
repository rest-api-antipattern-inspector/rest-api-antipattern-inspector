import { GET, POST, PUT } from '../../utils/HTTPMethods'
import randomWords from 'random-words'

const tagname = randomWords()

export const endpoints = [
  {
    url: 'tutorial',
    method: GET,
  },
]

export default endpoints
