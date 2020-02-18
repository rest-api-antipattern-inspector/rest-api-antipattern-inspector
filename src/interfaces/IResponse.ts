export default interface IResponse {
  status: number

  /**
   * The response body
   */
  text(): Promise<string>

  headers: {
    has(name: string): boolean
    get(name: string): string | null
  }
}
