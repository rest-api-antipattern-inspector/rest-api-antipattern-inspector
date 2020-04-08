import { isForgettingHypermedia } from '../src/lib/designAntipatternsDetectors'
import { GET, POST, PUT, PATCH, DELETE } from '../src/lib/constants'

const linkBody = {
  message: {
    title: 'This is a title',
    content: 'This is content',
    link:
      'https://stackoverflow.com/questions/61100538/bboxes-not-optimal-recalculating-bounding-boxes-in-autodesk-forge-viewer',
  },
}

const LinkBody = {
  message: {
    title: 'This is a title',
    content: 'This is content',
    Link:
      'https://stackoverflow.com/questions/61100538/bboxes-not-optimal-recalculating-bounding-boxes-in-autodesk-forge-viewer',
  },
}

const hrefBody = {
  message: {
    title: 'This is a title',
    content: 'This is content',
    href:
      'https://stackoverflow.com/questions/61100538/bboxes-not-optimal-recalculating-bounding-boxes-in-autodesk-forge-viewer',
  },
}

const HrefBody = {
  message: {
    title: 'This is a title',
    content: 'This is content',
    Href:
      'https://stackoverflow.com/questions/61100538/bboxes-not-optimal-recalculating-bounding-boxes-in-autodesk-forge-viewer',
  },
}

const linksBody = {
  related: {
    links: [
      'https://stackoverflow.com/questions/61100538/bboxes-not-optimal-recalculating-bounding-boxes-in-autodesk-forge-viewer',
      'https://stackoverflow.com/questions/61100538/bboxes-not-optimal-recalculating-bounding-boxes-in-autodesk-forge-viewer2',
    ],
  },
}

const LinksBody = {
  related: {
    Links: [
      'https://stackoverflow.com/questions/61100538/bboxes-not-optimal-recalculating-bounding-boxes-in-autodesk-forge-viewer',
      'https://stackoverflow.com/questions/61100538/bboxes-not-optimal-recalculating-bounding-boxes-in-autodesk-forge-viewer2',
    ],
  },
}

const missingLinkBody = {
  animal: {
    name: 'Donald Duck',
    species: 'duck',
  },
}

///

// FALSE

///

// POST

test('Forgetting Hypermedia: false. POST, links & lowercase location', () => {
  expect(
    isForgettingHypermedia(linkBody, POST, {
      location:
        'https://stackoverflow.com/questions/61100538/bboxes-not-optimal-recalculating-bounding-boxes-in-autodesk-forge-viewer',
    })
  ).toBeFalsy()
})

test('Forgetting Hypermedia: false. POST, no links but lowercase location', () => {
  expect(
    isForgettingHypermedia(missingLinkBody, POST, {
      location:
        'https://stackoverflow.com/questions/61100538/bboxes-not-optimal-recalculating-bounding-boxes-in-autodesk-forge-viewer',
    })
  ).toBeFalsy()
})

test('Forgetting Hypermedia: false. POST, no links but Capitalized location', () => {
  expect(
    isForgettingHypermedia(missingLinkBody, POST, {
      Location:
        'https://stackoverflow.com/questions/61100538/bboxes-not-optimal-recalculating-bounding-boxes-in-autodesk-forge-viewer',
    })
  ).toBeFalsy()
})

test('Forgetting Hypermedia: false. POST, no location but link', () => {
  expect(isForgettingHypermedia(linkBody, POST, {})).toBeFalsy()
})

test('Forgetting Hypermedia: false. POST, no location but Link', () => {
  expect(isForgettingHypermedia(LinkBody, POST, {})).toBeFalsy()
})

test('Forgetting Hypermedia: false. POST, no location but href', () => {
  expect(isForgettingHypermedia(hrefBody, POST, {})).toBeFalsy()
})

test('Forgetting Hypermedia: false. POST, no location but Href', () => {
  expect(isForgettingHypermedia(HrefBody, POST, {})).toBeFalsy()
})

test('Forgetting Hypermedia: false. POST, no location but links', () => {
  expect(isForgettingHypermedia(linksBody, POST, {})).toBeFalsy()
})

test('Forgetting Hypermedia: false. POST, no location but Links', () => {
  expect(isForgettingHypermedia(LinksBody, POST, {})).toBeFalsy()
})

// GET

test('Forgetting Hypermedia: false. GET & link', () => {
  expect(isForgettingHypermedia(linkBody, GET, {})).toBeFalsy()
})

test('Forgetting Hypermedia: false. GET & Link', () => {
  expect(isForgettingHypermedia(LinkBody, GET, {})).toBeFalsy()
})

test('Forgetting Hypermedia: false. GET & href', () => {
  expect(isForgettingHypermedia(hrefBody, GET, {})).toBeFalsy()
})

test('Forgetting Hypermedia: false. GET & Href', () => {
  expect(isForgettingHypermedia(HrefBody, GET, {})).toBeFalsy()
})

test('Forgetting Hypermedia: false. GET & links', () => {
  expect(isForgettingHypermedia(linksBody, GET, {})).toBeFalsy()
})

test('Forgetting Hypermedia: false. GET & Links', () => {
  expect(isForgettingHypermedia(LinksBody, GET, {})).toBeFalsy()
})

///

// TRUE

///

// POST

test('Forgetting Hypermedia: true. POST without links & without location', () => {
  expect(
    isForgettingHypermedia(missingLinkBody, POST, {
      Accept: 'application/json',
    })
  ).toBeTruthy()
})

test('Forgetting Hypermedia: true. GET without links', () => {
  expect(
    isForgettingHypermedia(missingLinkBody, GET, {
      Accept: 'application/json',
    })
  ).toBeTruthy()
})
