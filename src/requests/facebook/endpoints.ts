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
  {
    endpoint: '{user-id}/apprequestformerrecipients',
    url: `${userID}/apprequestformerrecipients`,
    method: HTTPMethods.GET,
  },

  // pattern trial
  {
    endpoint: '{user-id}/apprequests',
    url: `${userID}/apprequests`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/assigned_ad_accounts',
    url: `${userID}/assigned_ad_accounts`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/assigned_business_asset_groups',
    url: `${userID}/assigned_business_asset_groups`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/assigned_pages',
    url: `${userID}/assigned_pages`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/assigned_product_catalogs',
    url: `${userID}/assigned_product_catalogs`,
    method: HTTPMethods.GET,
  },

  // ctrl+v
  {
    endpoint: '{user-id}/business_users',
    url: `${userID}/business_users`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/businesses',
    url: `${userID}/businesses`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/custom_labels',
    url: `${userID}/custom_labels`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/user_feed',
    url: `${userID}/user_feed`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/friendlists',
    url: `${userID}/friendlists`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/friends',
    url: `${userID}/friends`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/game_items',
    url: `${userID}/game_items`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/games_stats',
    url: `${userID}/games_stats`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/groups',
    url: `${userID}/groups`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/ids_for apps',
    url: `${userID}/ids_for apps`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/ids_for business',
    url: `${userID}/ids_for business`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/ids_for pages',
    url: `${userID}/ids_for pages`,
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
    endpoint: '{user-id}/managed_groups',
    url: `${userID}/managed_groups`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/managers',
    url: `${userID}/managers`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/music',
    url: `${userID}/music`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/notifications',
    url: `${userID}/notifications`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/user_outbox',
    url: `${userID}/user_outbox`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/permissions',
    url: `${userID}/permissions`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/personal_ad accounts',
    url: `${userID}/personal_ad accounts`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/phones',
    url: `${userID}/phones`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/photos',
    url: `${userID}/photos`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/reports',
    url: `${userID}/reports`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/request_history',
    url: `${userID}/request_history`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/rich_media documents',
    url: `${userID}/rich_media documents`,
    method: HTTPMethods.GET,
  },
  {
    endpoint: '{user-id}/skills',
    url: `${userID}/skills`,
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
