import axios, { AxiosResponse } from 'axios'
import { storeResponseMeta } from '../../data-access-layer/storeMeta'
import { APIs } from '../../enums/APIs'
import extractRequestHeaders from '../../utils/extractRequestHeaders'
import endpoints from './endpoints'
import IFBEndpoint from './IFBEndpoint'

export default (): void => {
  // TODO Our Facebook Access Token will expire in July
  // generate a new one then to be able keep running this program
  // https://www.sociablekit.com/get-facebook-long-lived-user-access-token/

  const config = {
    params: { access_token: process.env.FACEBOOK_ACCESS_TOKEN },
  }

  const baseURL = 'https://graph.facebook.com'
  const versionString = 'v7.0'

  endpoints.forEach((ep) => {
    const fullURI = `${baseURL}/${versionString}/${ep.url}`

    axios
      .get(fullURI, config)
      .then((res) => {
        handleResponse(fullURI, ep, res)
      })
      .catch((error) => {
        console.log('Req failed for', fullURI)
      })
  })
}

function handleResponse(
  fullUri: string,
  endpoint: IFBEndpoint,
  res: AxiosResponse
) {
  const reqHeaderString = res.request._header
  const reqHeaders = extractRequestHeaders(reqHeaderString)

  storeResponseMeta({
    api: APIs.facebook,
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
