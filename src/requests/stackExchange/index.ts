import axios, { AxiosResponse } from 'axios'
import { storeResponseMeta } from '../../data-access-layer/storeMeta'
import { APIs } from '../../enums/APIs'
import extractRequestHeaders from '../../utils/extractRequestHeaders'
import endpoints from './endpoints'
import ISEEndpoint from './ISEEndpoint'

export default (): void => {
  getRequest(endpoints, 0)
}

function getRequest(seEndpoints: ISEEndpoint[], i: number) {
  shouldPause(i)
    ? pauseThenKeepGoing(seEndpoints, i)
    : axiosGETRequest(seEndpoints, i)
}

function shouldPause(i): boolean {
  // pause every 25th request, stackexchange only allows 30 per second
  return i === 24 || (i !== 0 && i !== 25 && i % 25 === 0)
}

function pauseThenKeepGoing(seEndpoints: ISEEndpoint[], i: number) {
  console.log(
    'Pause 3 seconds after next request, stackexchange only allows 30 requests per second'
  )

  setTimeout(() => {
    axiosGETRequest(seEndpoints, i)
  }, 3000)
}

function axiosGETRequest(seEndpoints: ISEEndpoint[], i: number) {
  const fullUri = `https://api.stackexchange.com/2.2/${seEndpoints[i].url}`

  axios
    .get(fullUri)
    .then((res) => {
      handleResponse(fullUri, seEndpoints[i], res)
      recurse(seEndpoints, i)
    })
    .catch((error) => {
      console.log('Req failed for', fullUri)
    })
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

function recurse(seEndpoints: ISEEndpoint[], i: number) {
  i++

  if (i < seEndpoints.length) {
    getRequest(seEndpoints, i)
  }
}
