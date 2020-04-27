import IHeadersObject from '../interfaces/IHeadersObject'
import INonStandardHeader from '../interfaces/INonStandardHeader'
import MIMETypes from './MIMETypes'
import IStatusCombo from '../interfaces/IStatusCombo'
import { HTTPMethods } from '../enums/HTTPMethods'

export const registerHeader = (
  nonstandardHeaders: INonStandardHeader[],
  headerType: string,
  headerKey: string
): void => {
  nonstandardHeaders.push({
    headerType,
    headerKey,
  })
}

export const getAllKeys = (obj: object): string[] => {
  const keys: string[] = []

  /**
   * This inner function is inspired by this demo:
   * https://stackoverflow.com/a/25370536/9374593
   */
  function collectKeys(obj: any, properties: string[]): any | void {
    const result = []

    for (const key in obj) {
      const value = obj[key]

      properties.push(key)

      if (typeof value === 'object') {
        result.push(collectKeys(value, properties))
      } else {
        result.push(value)
      }
    }

    return result
  }

  collectKeys(obj, keys)
  return keys
}

export const containsLinks = (keys: string[]): boolean => {
  for (const key of keys) {
    if (isLinkTerm(key)) return true
  }

  return false
}

function isLinkTerm(key: string): boolean {
  const linkTerms = ['link', 'Link', 'href', 'Href', 'links', 'Links']

  return linkTerms.includes(key)
}

export const isAcceptedMIMEType = (
  contentType: string,
  acceptedMIMETypes: string[]
): boolean =>
  // '*/*' means data of any kind is accepted
  acceptedMIMETypes.includes('*/*') || acceptedMIMETypes.includes(contentType)

export const isStandardMIMEType = (contentType: string): boolean =>
  MIMETypes.some((type) => contentType.includes(type))

export const getHeaderValue = (
  headers: IHeadersObject,
  capitalizedHeaderName: string
): string | undefined => {
  const headerValue =
    headers[capitalizedHeaderName] ||
    headers[capitalizedHeaderName.toLowerCase()]

  if (!headerValue) return undefined

  return headerValue.toLowerCase()
}

export const getHeaderValues = (
  headers: IHeadersObject,
  capitalizedHeaderName: string
): string[] | undefined => {
  const headerContent =
    headers[capitalizedHeaderName] ||
    headers[capitalizedHeaderName.toLowerCase()]

  if (!headerContent) return undefined

  const headerValues =
    typeof headerContent === 'string'
      ? headerContent.split(', ')
      : headerContent

  return headerValues.map((hv) => hv.toLowerCase())
}

export const containsCookieHeader = (headers: IHeadersObject): boolean => {
  const cookieHeaders = [
    'Cookie',
    'Cookie2',
    'Set-Cookie',
    'Set-Cookie2',
    'cookie',
    'cookie2',
    'set-cookie',
    'set-cookie2',
  ]

  for (let cookieHeader of cookieHeaders) {
    if (headers[cookieHeader] !== undefined) return true
  }

  return false
}

export const containsHeaderLowercasedOrCapitalized = (
  headers: IHeadersObject,
  capitalizedHeaderName: string
): boolean => {
  return (
    headers[capitalizedHeaderName] !== undefined ||
    headers[capitalizedHeaderName.toLowerCase()] !== undefined
  )
}
