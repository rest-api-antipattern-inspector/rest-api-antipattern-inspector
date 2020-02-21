import {
  isBreakingSelfDescriptiveness,
  isForgettingHypermedia,
  isIgnoringCaching,
  isIgnoringMIMEType,
  isIgnoringStatusCode,
  isMisusingCookies,
} from '../lib/designAntipatternsDetectors'
import IResponse from '../interfaces/IResponse'

class FakeResponse {
  status: number
  textContent: string
  headers: string[]
  responseStub: IResponse

  constructor(
    status: number,
    textContent: string,
    headers: string[]
  ) {
    this.status = status
    this.textContent = textContent
    this.headers = headers

    this.responseStub = {
      status: this.status,
      text: this.textReturner,
      headers: {
        has: this.hasHeader,
        get: this.getHeader,
      },
    }
  }

  textReturner(): Promise<string> {
    return new Promise((resolve) => {
      resolve(this.textContent)
    })
  }

  hasHeader(name: string): boolean {
    return this.headers.includes(name)
  }

  getHeader(name: string): string | null {
    return (
      this.headers.find((item) => item === name) || null
    )
  }
}
