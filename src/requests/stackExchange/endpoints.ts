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
    /**
     * Related questions to these 3 questions:
     * https://stackoverflow.com/questions/60075228/exchange-different-arrays-elements-in-ruby
     * https://stackoverflow.com/questions/60075237/best-way-to-handle-an-account-linking-verification-system
     * https://stackoverflow.com/questions/57496313/execution-failed-for-task-appmergedebugresources-com-android-builder-interna
     */
    url:
      'questions/60075228;60075237;57496313/related?order=desc&sort=activity&site=stackoverflow',
    endpoint: 'questions/{ids}/related?order=desc&sort=activity&site={site}',
  },
]

export default endpoints
