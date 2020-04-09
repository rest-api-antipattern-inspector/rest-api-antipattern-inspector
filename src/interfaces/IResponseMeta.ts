export default interface ResponseMeta {
  wholeURI: string
  endpoint: string
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
