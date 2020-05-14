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
    endpoint: '{user-id}/apprequestformerrecipients',
    url: `${userID}/apprequestformerrecipients`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/apprequests',
    url: `${userID}/apprequests`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/assigned_business_asset_groups',
    url: `${userID}/assigned_business_asset_groups`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/business_users',
    url: `${userID}/business_users`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/custom_labels',
    url: `${userID}/custom_labels`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/friends',
    url: `${userID}/friends`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/groups',
    url: `${userID}/groups`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: 'likes',
    url: `${userID}/likes`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/live_encoders',
    url: `${userID}/live_encoders`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/live_videos',
    url: `${userID}/live_videos`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/music',
    url: `${userID}/music`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/permissions',
    url: `${userID}/permissions`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/photos',
    url: `${userID}/photos`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/request_history',
    url: `${userID}/request_history`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/taggable_friends',
    url: `${userID}/taggable_friends`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/videos',
    url: `${userID}/videos`,
    method: HTTPMethods.GET,
  },
]

export default endpoints
