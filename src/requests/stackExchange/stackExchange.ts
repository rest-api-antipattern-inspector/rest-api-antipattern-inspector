import axios from 'axios'
import { storeResponseMeta } from '../../data-access-layer/storeMeta'
import { APIs } from '../../enums/APIs'
import IHeadersObject from '../../interfaces/IHeadersObject'
import { GET, POST, PUT, PATCH, DELETE } from '../../utils/HTTPMethods'
import extractRequestHeaders from '../../utils/extractRequestHeaders'

export const doStackExchangeRequests = (): void => {
  stackOverflowInfo()
  relatedQuestionsSO()
}

async function stackOverflowInfo() {
  const uri = 'https://api.stackexchange.com/2.2/info?site=stackoverflow'

  axios.get(uri).then((response) => {
    const reqHeaderString = response.request._header
    const requestHeaders = extractRequestHeaders(reqHeaderString)

    console.log('stackexchange')
    console.log(uri)
    console.log('/2.2/info?site=stackoverflow')

    console.log('GET')
    console.log({
      statusCode: response.status,
      statusText: response.statusText,
    })

    console.log(requestHeaders)
    console.log(response.headers)

    console.log(response.data)
  })

  /*
  storeResponseMeta(
    APIs.stackExchange,
    uri,
    '/2.2/info?site=stackoverflow',
    res.status,
    headers,
    body,
    GET
  )
  */
}

/**
 * Related questions to these 3 questions:
 * https://stackoverflow.com/questions/60075228/exchange-different-arrays-elements-in-ruby
 * https://stackoverflow.com/questions/60075237/best-way-to-handle-an-account-linking-verification-system
 * https://stackoverflow.com/questions/57496313/execution-failed-for-task-appmergedebugresources-com-android-builder-interna
 */
async function relatedQuestionsSO() {
  const uri =
    'https://api.stackexchange.com/2.2/questions/60075228;60075237;57496313/related?order=desc&sort=activity&site=stackoverflow'

  // TODO make req & storeMeta

  // axios.get(uri).then((response) => {
  //   const reqHeaderString = response.request._header
  //   const requestHeaders = extractRequestHeaders(reqHeaderString)

  //   console.log('stackexchange')
  //   console.log(uri)
  //   console.log('/2.2/info?site=stackoverflow')

  //   console.log('GET')
  //   console.log({
  //     statusCode: response.status,
  //     statusText: response.statusText,
  //   })

  //   console.log(requestHeaders)
  //   console.log(response.headers)

  //   console.log(response.data)
  // })

  /*
  storeResponseMeta(
    APIs.stackExchange,
    uri,
    '/2.2/questions/{question_ids}/related?order=desc&sort=activity&site=stackoverflow',
    res.status,
    headers,
    body,
    GET
  )
  */
}

/*
function getHeaders(res: Response): IHeadersObject {
  const headers: IHeadersObject = {}
  const rawHeaders = res.headers.raw()
  const headerKeys = Object.keys(rawHeaders)
  const headerValues = Object.values(rawHeaders)

  for (let i = 0; i < headerKeys.length; i++) {
    headers[headerKeys[i]] = headerValues[i][0]
  }

  return headers
}
*/
