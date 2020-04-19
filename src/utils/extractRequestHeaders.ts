import IHeadersObject from '../interfaces/IHeadersObject'

export default (reqHeaderText: string): IHeadersObject => {
  const rawReqHeaderFields = reqHeaderText.split('\r\n')
  rawReqHeaderFields.shift()
  const reqHeaderFields = rawReqHeaderFields.filter((item) => item !== '')

  const requestHeadersObj: IHeadersObject = {}

  reqHeaderFields.forEach((field) => {
    const colonIndex = field.indexOf(':')

    const key = field.slice(0, colonIndex)
    const value = field.includes(', ')
      ? getFieldArray(field, colonIndex)
      : getFieldString(field, colonIndex)

    requestHeadersObj[key] = value
  })

  return requestHeadersObj
}

const getFieldArray = (field: string, colonIndex: number): string[] =>
  field
    .slice(colonIndex + 1)
    .replace(' ', '')
    .split(', ')

const getFieldString = (field: string, colonIndex: number): string =>
  field.slice(colonIndex + 1).replace(' ', '')
