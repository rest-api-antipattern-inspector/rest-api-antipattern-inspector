export default interface ResponseMeta {
  uri: string
  httpMethod: string

  isBreakingSelfDescriptiveness: boolean

  nonStandardHeaders: string[]

  isForgettingHypermedia: boolean

  isIgnoringCaching: boolean

  isIgnoringMIMEType: boolean

  isIgnoringStatusCode: boolean

  isMisusingCookies: boolean
}
