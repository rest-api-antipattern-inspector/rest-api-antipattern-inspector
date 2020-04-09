import HttpHeaders from './StandardHTTPHeaders'
import IHeadersObject from '../interfaces/IHeadersObject'

export const isStandardHeader = (headerKey: string): boolean =>
  HttpHeaders.includes(headerKey)

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

export const containsLinks = (parts: string[]): boolean => {
  for (const part of parts) {
    if (isLinkTerm(part)) return true
  }

  return false
}

function isLinkTerm(part: string): boolean {
  return part === 'link' || part === 'links' || part === 'href'
}

export const cookieHeaders = [
  'Cookie',
  'Cookie2',
  'Set-Cookie',
  'Set-Cookie2',
  'cookie',
  'cookie2',
  'set-cookie',
  'set-cookie2',
]

export const containsHeaderLowercasedOrCapitalized = (
  headers: IHeadersObject,
  capitalizedHeaderName: string
): boolean => {
  return (
    headers[capitalizedHeaderName] !== undefined ||
    headers[capitalizedHeaderName.toLowerCase()] !== undefined
  )
}

export const getHeaderValue = (
  headers: IHeadersObject,
  capitalizedHeaderName: string
): string => {
  const headerValue =
    headers[capitalizedHeaderName] ||
    headers[capitalizedHeaderName.toLowerCase()]

  return headerValue.toLowerCase()
}
