export default interface ResponseMeta {
  uri: string
  httpMethod: string

  isBreakingSelfDescriptiveness: boolean

  isForgettingHypermedia: boolean

  isIgnoringCaching: boolean

  isIgnoringMIMEType: boolean

  isIgnoringStatusCode: boolean

  isMisusingCookies: boolean
}
