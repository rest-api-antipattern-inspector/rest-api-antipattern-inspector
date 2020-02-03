import request from 'request'

export const jokeRequest = () => {
  request(
    'https://sv443.net/jokeapi/category/programming',
    (error, response, body) => {
      if (error) {
        console.error(error)
      }

      const info = `
Body:
${body}
Status code:
${response.statusCode}
Raw headers:
${response.rawHeaders}
`
      console.log(info)
    }
  )
}
