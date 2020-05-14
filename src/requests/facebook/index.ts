import axios from 'axios'
import { storeResponseMeta } from '../../data-access-layer/storeMeta'
import { APIs } from '../../enums/APIs'
import extractRequestHeaders from '../../utils/extractRequestHeaders'
import endpoints from './endpoints'
import IFBEndpoint from './IFBEndpoint'

export default (): void => {
  const headers = {
    headers: { access_token: process.env.FACEBOOK_ACCESS_TOKEN },
  }

  endpoints.forEach((ep) => {
    const fullURI = `https://graph.facebook.com/v7.0/${ep.url}`

    //
  })
}
