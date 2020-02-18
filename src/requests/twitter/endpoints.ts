export default [
  {
    url: 'statuses/user_timeline',
    params: { screen_name: 'Carl_Gustav_XVI', count: 1 },
    method: 'get',
    statusCode: 200,
  },
  {
    url: 'followers/ids',
    params: { screen_name: 'Carl_Gustav_XVI' },
    method: 'get',
    statusCode: 200,
  },
  {
    url: 'followers/list',
    params: { screen_name: 'Carl_Gustav_XVI', count: 1 },
    method: 'get',
    statusCode: 200,
  },
]
