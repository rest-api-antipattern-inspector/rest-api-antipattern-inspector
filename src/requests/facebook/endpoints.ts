import IFBEndpoint from './IFBEndpoint'
import { HTTPMethods } from '../../enums/HTTPMethods'

const userID = process.env.FACEBOOK_USER_ID

const endpoints: IFBEndpoint[] = [
  {
    endpoint: '{person-id}',
    url: userID,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/accounts',
    url: `${userID}/accounts`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/albums',
    url: `${userID}/albums`,
    method: HTTPMethods.GET,
  },
]

export default endpoints
