export default (reqHeaderText: string): string[] => {
  const rawReqHeaders = reqHeaderText.split('\r\n')
  rawReqHeaders.shift()

  const reqHeaders = rawReqHeaders.filter((item) => item !== '')
  return reqHeaders
}
