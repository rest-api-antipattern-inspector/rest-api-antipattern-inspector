import axios, { AxiosResponse } from 'axios'
import { storeResponseMeta } from '../../data-access-layer/storeMeta'
import { APIs } from '../../enums/APIs'
import extractRequestHeaders from '../../utils/extractRequestHeaders'
import endpoints from './endpoints'
import ISEEndpoint from './ISEEndpoint'

export default (): void => {
  // 44 endpoints
  axiosGetRequests(endpoints, 0)
}

/**
 * Recursive function, exits after all se endpoints have been called
 */
function axiosGetRequests(seEndpoints: ISEEndpoint[], i: number) {
  const timeout = getTimeOut(i)
  console.log('timeout', timeout)

  const fullUri = `https://api.stackexchange.com/2.2/${seEndpoints[i].url}`

  setTimeout(() => {
    // axios
    //   .get(fullUri)
    //   .then((res) => {
    //     handleResponse(fullUri, seEndpoints[i], res)

    console.log(i, fullUri)

    i++

    if (i < seEndpoints.length) {
      axiosGetRequests(seEndpoints, i)
    }
    // })
    // .catch((error) => {
    //   console.log('Req failed for', fullUri)
    // })
  }, timeout)
}

function getTimeOut(i): number {
  // pause every 25th request, stackexchange only allows 30 per second
  return i === 24 || (i !== (0 || 25) && i % 25 === 0) ? 3000 : 0
}

function handleResponse(
  fullUri: string,
  endpoint: ISEEndpoint,
  res: AxiosResponse
) {
  const reqHeaderString = res.request._header
  const reqHeaders = extractRequestHeaders(reqHeaderString)

  storeResponseMeta({
    api: APIs.stackExchange,
    wholeURI: fullUri,
    endpoint: endpoint.endpoint ? endpoint.endpoint : endpoint.url,

    status: {
      statusCode: res.status,
      statusText: res.statusText,
    },

    requestHeaders: reqHeaders,
    responseHeaders: res.headers,
    body: res.data,
    httpMethod: endpoint.method,
  })
}
