import IResponse from '../interfaces/IResponse'

/**
 * @param status - Status Code
 * @param textContent - Response body in JSON format
 * @param headers
 */
export default class FakeResponse {
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
      text: () =>
        new Promise((resolve) => {
          resolve(this.textContent)
        }),
      headers: {
        has: (name) => this.headers.includes(name),
        get: (name) =>
          this.headers.find((item) => item === name) ||
          null,
      },
    }
  }
}
