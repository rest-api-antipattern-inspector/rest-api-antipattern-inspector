import IFBEndpoint from './IFBEndpoint'
import { HTTPMethods } from '../../enums/HTTPMethods'

const endpoints: IFBEndpoint[] = [
  {
    url: 'person-id',
    endpoint: 'person-id',
    method: HTTPMethods.GET,
  },
]

export default endpoints
