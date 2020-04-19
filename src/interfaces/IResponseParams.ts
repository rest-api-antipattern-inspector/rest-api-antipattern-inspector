import { APIs } from '../enums/APIs'
import IHeadersObject from './IHeadersObject'

export default interface IResonseParams {
  api: APIs
  wholeURI: string
  endpoint: string

  httpMethod: string
  status: {
    statusCode: number
    statusText: string
  }

  requestHeaders: IHeadersObject
  responseHeaders: IHeadersObject

  body: object
}
