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

  // TODO perhaps pass this into axios req
  const config = {
    params: { access_token: process.env.FACEBOOK_ACCESS_TOKEN },
  }

  // CURL
  // curl -X GET -G \
  // -d 'access_token=<ACCESS_TOKEN>' \
  // https://graph.facebook.com/v7.0/{person-id}/

  endpoints.forEach((ep) => {
    const fullURI = `https://graph.facebook.com/v7.0/${ep.url}?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`

    axios
      .get(fullURI) // trying w.o config token
      .then((res) => {
        handleResponse(fullURI, ep, res)
      })
      .catch((error) => {
        console.log('Req failed for', fullURI)
        console.error(error)
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
