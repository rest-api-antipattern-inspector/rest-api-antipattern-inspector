import {
  isBreakingSelfDescriptiveness,
  isForgettingHypermedia,
  isIgnoringCaching,
  isIgnoringMIMEType,
  isIgnoringStatusCode,
  isMisusingCookies,
} from '../lib/designAntipatternsDetectors'
import IResponse from '../interfaces/IResponse'

// Try just running, tsc + run

// export default interface IResponse {
//   status: number

//   /**
//    * The response body
//    */
//   text(): Promise<string>

//   headers: {
//     has(name: string): boolean
//     get(name: string): string | null
//   }
// }

class FakeResponse {
  status: number

  constructor(status: number) {
    this.status = status

    const responseStub: IResponse = {
      status: this.status,
      text: textReturner,
    }
  }
}

function textReturner(): Promise<string> {
  return new Promise((resolve) => {
    resolve('')
  })
}
