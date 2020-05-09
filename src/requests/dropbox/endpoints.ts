// https://dev.bitly.com/v4_documentation.html
import { GET, POST, PATCH } from '../../utils/HTTPMethods'

export const endpoints = [
  // {
  //   url: 'check/user',
  //   method: POST,
  //   data: { query: 'foo' },
  // },
  // {
  //   url: 'file_requests/list_v2',
  //   method: POST,
  //   data: { limit: 10 },
  // },
  {
    url: 'cloud_docs/get_content',
    method: POST,
    data: { file_id: 'id:pXGlEfaZvvAAAAAAAAAAGw' },
    base: 'content',
  },
]

export default endpoints
