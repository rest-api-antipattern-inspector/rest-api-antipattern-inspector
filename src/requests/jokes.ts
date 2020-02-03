import request from 'request'

export const jokeRequest = () => {
  request(
    'https://sv443.net/jokeapi/category/programming',
    (error, response, body) => {
      if (error) {
        console.error(error)
      }

      const info = `Body:\n${body}\nStatus code:\n${response.statusCode}\nRaw headers:\n${response.rawHeaders}`
      console.log(info)
    }
  )
}
