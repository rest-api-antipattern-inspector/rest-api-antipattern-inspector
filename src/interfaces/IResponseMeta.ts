import INonStandardHeader from './INonStandardHeader'

export default interface IResponseMeta {
  api: string
  endpoint: string

  wholeURI: string

  httpMethod: string
  statusCode: number

  isBreakingSelfDescriptiveness: boolean

  nonstandardHeaders: INonStandardHeader[]

  isForgettingHypermedia: boolean

  isIgnoringCaching: boolean

  isIgnoringMIMEType: boolean

  isIgnoringStatusCode: boolean

  isMisusingCookies: boolean
}
