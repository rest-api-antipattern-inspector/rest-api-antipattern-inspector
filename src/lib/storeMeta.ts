import fs from 'fs'
import IResponse from '../interfaces/IResponse'
import IResponseMeta from '../interfaces/IResponseMeta'
import {
  isBreakingSelfDescriptiveness,
  isForgettingHypermedia,
  isIgnoringCaching,
  isIgnoringMIMEType,
  isIgnoringStatusCode,
  isMisusingCookies,
} from './designAntipatternsDetectors'

export const storeResponseMeta = async (
  uri: string,
  res: IResponse,
  httpMethod: string
) => {
  const body = await res.text()

  console.log(isForgettingHypermedia(res, body, httpMethod))

  // const responseMeta: IResponseMeta = {
  //   uri,
  //   httpMethod: httpMethod,

  //   isBreakingSelfDescriptiveness: isBreakingSelfDescriptiveness(
  //     res,
  //     httpMethod
  //   ),

  //   isForgettingHypermedia: isForgettingHypermedia(
  //     res,
  //     body,
  //     httpMethod
  //   ),

  //   isIgnoringCaching: isIgnoringCaching(res, httpMethod),

  //   isIgnoringMIMEType: isIgnoringMIMEType(res),

  //   isIgnoringStatusCode: isIgnoringStatusCode(
  //     res,
  //     httpMethod
  //   ),

  //   isMisusingCookies: isMisusingCookies(res),
  // }

  // writeToFile(responseMeta)

  // console.log(`Stored info for ${httpMethod} ${uri}`)
}

function writeToFile(responseMeta: IResponseMeta) {
  const responses = JSON.parse(
    fs.readFileSync('responses.json', 'utf8')
  )

  responses.push(responseMeta)

  fs.writeFileSync(
    'responses.json',
    JSON.stringify(responses)
  )
}
