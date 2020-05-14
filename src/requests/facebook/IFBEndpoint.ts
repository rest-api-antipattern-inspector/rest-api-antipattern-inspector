import { HTTPMethods } from '../../enums/HTTPMethods'

export default interface IFBEndpoint {
  readonly url: string
  readonly method: HTTPMethods
  readonly data?: object
  readonly endpoint?: string
}
