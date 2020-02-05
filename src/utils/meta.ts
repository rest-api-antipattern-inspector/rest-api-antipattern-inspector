import { Response } from 'node-fetch'

export const logInfo = (
  uri: string,
  res: Response
): void => {
  console.log('\n')
  console.log(uri)
  console.log(res.status)
  console.log(res.headers)
}
