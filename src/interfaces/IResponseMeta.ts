export default interface ResponseMeta {
  uri: string
  httpMethod: string

  isBreakingSelfDescriptiveness: boolean

  // TODO uncomment
  // isForgettingHypermedia: boolean

  isIgnoringCaching: boolean

  isIgnoringMIMEType: boolean

  isIgnoringStatusCode: boolean

  isMisusingCookies: boolean
}
