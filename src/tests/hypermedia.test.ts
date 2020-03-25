import FakeResponse from './FakeResponse'
import { isForgettingHypermedia } from '../lib/designAntipatternsDetectors'

test('Forgetting Hypermedia: true, POST but no Location header', () => {
  const responseStub = new FakeResponse(200, '', [])
    .responseStub

  expect(
    isForgettingHypermedia(responseStub, '', 'POST')
  ).toBeTruthy()
})

test('Forgetting Hypermedia: false, POST with Location header', () => {
  const responseStub = new FakeResponse(200, '', [
    'Location',
  ]).responseStub

  expect(
    isForgettingHypermedia(responseStub, '', 'POST')
  ).toBeFalsy()
})

test('Forgetting Hypermedia: true, GET without link terms', () => {
  const responseStub = new FakeResponse(200, '', [])
    .responseStub

  expect(
    isForgettingHypermedia(
      responseStub,
      '{"data": "Howdy"}',
      'GET'
    )
  ).toBeTruthy()
})

test('Forgetting Hypermedia: false, GET with link property in body', () => {
  const responseStub = new FakeResponse(200, '', [])
    .responseStub

  expect(
    isForgettingHypermedia(
      responseStub,
      `
      {
        "data": 'B',
        "prev": {
          "data": 'A',
          "link": 'example.com/POST?id=1',
        },
        "next": {
          "data": 'C',
          "link": 'example.com/POST?id=3',
        },
      }
      `,
      'GET'
    )
  ).toBeFalsy()
})

test('Forgetting Hypermedia: false, GET with links property in body', () => {
  const responseStub = new FakeResponse(200, '', [])
    .responseStub

  expect(
    isForgettingHypermedia(
      responseStub,
      `
        {
            "data": "B",
            "related": {
                "appropriate": true,
                "links": [
                    "example.com/POST/A",
                    "example.com/POST/C"
                ]
            }
        }
    `,
      'GET'
    )
  ).toBeFalsy()
})

test('Forgetting Hypermedia: false, GET with href property in body', () => {
  const responseStub = new FakeResponse(200, '', [])
    .responseStub

  expect(
    isForgettingHypermedia(
      responseStub,
      `
        {
          "data": 'B',
          "prev": {
            "data": 'A',
            "href": 'example.com/POST?id=1',
          },
          "next": {
            "data": 'C',
            "href": 'example.com/POST?id=3',
          },
        }
        `,
      'GET'
    )
  ).toBeFalsy()
})
