// https://developer.twitter.com/en/docs/tutorials/postman-getting-started

const fetch = require('node-fetch')

const bearer = {
  token_type: 'bearer',
  access_token:
    'AAAAAAAAAAAAAAAAAAAAADRZCQEAAAAAMghF4XfekuIsevP48fydc17XxLo%3DOQlLF3xC65oDc5b12usutjMQKZzm6GwWXUHfM9qND70zH6JRMG',
}

const twitter = async (data) => {
  const response = await fetch(
    `https://api.twitter.com/labs/1/users?usernames=TwitterDev&format=detailed`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': data ? 'application/json' : '',
        Authorization:
          bearer.token_type + ' ' + bearer.access_token,
      },
      body:
        data && method !== 'GET'
          ? JSON.stringify(data)
          : undefined,
    }
  )
  console.log(response)
}

twitter()
