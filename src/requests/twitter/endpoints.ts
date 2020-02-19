export default [
  {
    url:
      'statuses/user_timeline.json?screen_name=Carl_Gustav_XVI&count=1',
    method: 'get',
    statusCode: 200,
  },
  {
    url:
      'followers/ids.json?screen_name=Carl_Gustav_XVI&count=1',
    method: 'get',
    statusCode: 200,
  },
  {
    url:
      'followers/list.json?screen_name=Carl_Gustav_XVI&count=1',
    method: 'get',
    statusCode: 200,
  },
]
