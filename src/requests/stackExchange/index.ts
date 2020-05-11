import axios, { AxiosResponse } from 'axios'
import { storeResponseMeta } from '../../data-access-layer/storeMeta'
import { APIs } from '../../enums/APIs'
import extractRequestHeaders from '../../utils/extractRequestHeaders'
import endpoints from './endpoints'

export default (): void => {
  console.log('Endpoints length', endpoints.length)

  endpoints.forEach(async (ep) => {
    const fullUri = `https://api.stackexchange.com/2.2/${ep.url}`

    const res = await axios.get(fullUri)

    const reqHeaderString = res.request._header
    const reqHeaders = extractRequestHeaders(reqHeaderString)

    storeResponseMeta({
      api: APIs.stackExchange,
      wholeURI: fullUri,
      endpoint: ep.endpoint ? ep.endpoint : ep.url,

      status: {
        statusCode: res.status,
        statusText: res.statusText,
      },

      requestHeaders: reqHeaders,
      responseHeaders: res.headers,

      body: res.data,
      httpMethod: ep.method,
    })
  })
}
