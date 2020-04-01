export default interface ResponseMeta {
  uri: string
  httpMethod: string
  statusCode: number

  isBreakingSelfDescriptiveness: boolean

  nonStandardHeaders: string[]

  isForgettingHypermedia: boolean

  isIgnoringCaching: boolean

  isIgnoringMIMEType: boolean

  isIgnoringStatusCode: boolean

  isMisusingCookies: boolean
}
