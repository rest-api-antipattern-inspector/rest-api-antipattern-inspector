// TODO perhaps create res interface with status, methods for get & has

export default interface IResponse {
  status: number

  /**
   * The response body
   */
  text(): Promise<string>

  headers: {
    has(name: string): boolean
    get(name: string): string
  }
}
