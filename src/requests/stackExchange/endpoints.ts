import ISEEndpoint from './ISEEndpoint'
import { HTTPMethods } from '../../enums/HTTPMethods'

const endpoints: ISEEndpoint[] = [
  {
    method: HTTPMethods.GET,
    url: 'info?site=stackoverflow',
    endpoint: 'info?site={site}',
  },
  {
    method: HTTPMethods.GET,
    url:
      'questions/60075228;60075237;57496313/related?order=desc&sort=activity&site=stackoverflow',
    endpoint: 'questions/{ids}/related?order=desc&sort=activity&site={site}',
  },
]

export default endpoints
