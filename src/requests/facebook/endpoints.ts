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
  {
    endpoint: '{user-id}/ad_studies',
    url: `${userID}/ad_studies`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{USER_ID}/adaccounts',
    url: `${userID}/adaccounts`,
    method: HTTPMethods.GET,
  },
  {},
]

export default endpoints
