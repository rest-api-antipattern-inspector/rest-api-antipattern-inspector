export default interface ResponseMeta {
  api: string
  endpoint: string

  wholeURI: string

  httpMethod: string
  statusCode: number

  isBreakingSelfDescriptiveness: boolean

  nonstandardHeaders: string[]

  isForgettingHypermedia: boolean

  isIgnoringCaching: boolean

  isIgnoringMIMEType: boolean

  isIgnoringStatusCode: boolean

  isMisusingCookies: boolean
}
