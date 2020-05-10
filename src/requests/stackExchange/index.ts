import axios from 'axios'
import { storeResponseMeta } from '../../data-access-layer/storeMeta'
import { APIs } from '../../enums/APIs'
import { GET, POST, PUT, PATCH, DELETE } from '../../utils/HTTPMethods'
import extractRequestHeaders from '../../utils/extractRequestHeaders'
import endpoints from './endpoints'

export default (): void => {
  endpoints.forEach((ep) => {
    const url = ep.url
  })
}

function stackOverflowInfo() {
  const uri = 'https://api.stackexchange.com/2.2/info?site=stackoverflow'

  // TODO for each url, check valid

  axios.get(uri).then((response) => {
    const reqHeaderString = response.request._header
    const reqHeaders = extractRequestHeaders(reqHeaderString)

    storeResponseMeta({
      api: APIs.stackExchange,
      endpoint: '/2.2/info?site=stackoverflow',
      wholeURI: uri,

      httpMethod: GET,
      status: {
        statusCode: response.status,
        statusText: response.statusText,
      },

      requestHeaders: reqHeaders,
      responseHeaders: response.headers,

      body: response.data,
    })
  })
}

/**
 * Related questions to these 3 questions:
 * https://stackoverflow.com/questions/60075228/exchange-different-arrays-elements-in-ruby
 * https://stackoverflow.com/questions/60075237/best-way-to-handle-an-account-linking-verification-system
 * https://stackoverflow.com/questions/57496313/execution-failed-for-task-appmergedebugresources-com-android-builder-interna
 */
function relatedQuestionsSO() {
  const uri =
    'https://api.stackexchange.com/2.2/questions/60075228;60075237;57496313/related?order=desc&sort=activity&site=stackoverflow'

  axios.get(uri).then((response) => {
    const reqHeaderString = response.request._header
    const reqHeaders = extractRequestHeaders(reqHeaderString)

    storeResponseMeta({
      api: APIs.stackExchange,
      endpoint:
        '/2.2/questions/60075228;60075237;57496313/related?order=desc&sort=activity&site=stackoverflow',
      wholeURI: uri,

      httpMethod: GET,
      status: {
        statusCode: response.status,
        statusText: response.statusText,
      },

      requestHeaders: reqHeaders,
      responseHeaders: response.headers,

      body: response.data,
    })
  })
}
