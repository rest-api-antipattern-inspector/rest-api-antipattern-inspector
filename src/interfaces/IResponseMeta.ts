import INonStandardHeader from './INonStandardHeader'

export default interface IResponseMeta {
  api: string
  endpoint: string

  wholeURI: string

  httpMethod: string
  statusCode: number

  nonstandardHeaders: INonStandardHeader[]

  designAntipatterns: {
    isBreakingSelfDescriptiveness: boolean

    isForgettingHypermedia: boolean

    isIgnoringCaching: boolean

    isIgnoringMIMEType: boolean

    isIgnoringStatusCode: boolean

    isMisusingCookies: boolean
  }
}
