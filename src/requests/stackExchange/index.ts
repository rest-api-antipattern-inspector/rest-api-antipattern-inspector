import axios, { AxiosResponse } from 'axios'
import { storeResponseMeta } from '../../data-access-layer/storeMeta'
import { APIs } from '../../enums/APIs'
import { HTTPMethods } from '../../enums/HTTPMethods'
import extractRequestHeaders from '../../utils/extractRequestHeaders'
import endpoints from './endpoints'

export default (): void => {
  endpoints.forEach(async (ep) => {
    const fullUri = `https://api.stackexchange.com/2.2/${ep.url}`

    if (ep.method === HTTPMethods.GET) {
      const res = await axiosGETRequest(fullUri)

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
    }
  })
}

function axiosGETRequest(url: string): Promise<AxiosResponse<any>> {
  return new Promise((resolve) => {
    axios.get(url).then((res) => {
      resolve(res)
    })
  })
}
