module.exports = [
  {
    url: 'statuses/user_timeline',
    params: { screen_name: 'Carl_Gustav_XVI', count: 1 },
    method: 'get',
  },
  {
    url: 'followers/ids',
    params: { screen_name: 'Carl_Gustav_XVI' },
    method: 'get',
  },
  {
    url: 'followers/list',
    params: { screen_name: 'Carl_Gustav_XVI', count: 1 },
    method: 'get',
  },
]
