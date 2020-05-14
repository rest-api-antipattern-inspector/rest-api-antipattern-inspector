import { GET, POST, PUT } from '../../utils/HTTPMethods'
import randomWords from 'random-words'
import { nasa_id } from './constants'

const tagname = randomWords()

export const endpoints = [
  {
    url: 'cad.api',
    method: GET,
    params: 'des=433&date-min=1900-01-01&date-max=2100-01-01&dist-max=0.2',
    noAuth: true,
  },
  {
    url: 'fireball.api',
    method: GET,
    params: 'limit=20',
    noAuth: true,
  },
  {
    url: 'mdesign.api',
    method: GET,
    params: 'des=1&class=true',
    noAuth: true,
  },
  {
    url: 'nhats.api',
    method: GET,
    noAuth: true,
  },
  {
    url: 'sentry.api',
    method: GET,
    params: 'des=99942',
    noAuth: true,
  },
  {
    url: 'natural',
    method: GET,
    noAuth: true,
    apibase: 'https://epic.gsfc.nasa.gov/api/',
  },
  {
    url: 'natural/all',
    method: GET,
    noAuth: true,
    apibase: 'https://epic.gsfc.nasa.gov/api/',
  },
  {
    url: 'planetary/apod',
    method: GET,
    apibase: 'https://api.nasa.gov/',
  },
  {
    url: 'neo/rest/v1/feed',
    method: GET,
    apibase: 'https://api.nasa.gov/',
  },
  {
    url: 'DONKI/CME',
    method: GET,
    apibase: 'https://api.nasa.gov/',
  },
  {
    url: 'EPIC/api/natural/images',
    method: GET,
    apibase: 'https://api.nasa.gov/',
  },
  {
    url: 'cgi-bin/nstedAPI/nph-nstedAPI',
    method: GET,
    params: '&table=exoplanets&format=ipac&where=pl_kepflag=1',
    apibase: 'https://exoplanetarchive.ipac.caltech.edu/',
  },
  {
    url: 'genelab/data/glds/files/87',
    method: GET,
    endpoint: 'genelab/data/glds/files/{GLDS_STUDY_ID}',
    apibase: 'https://genelab-data.ndc.nasa.gov/',
  },
  {
    url: 'genelab/data/search',
    method: GET,
    params:
      'term=space&from=0&type=cgene,nih_geo_gse&ffield=links&fvalue=GPL16417&ffield=Data%20Source%20Accession.raw&fvalue=GSE82255',
    apibase: 'https://genelab-data.ndc.nasa.gov/',
  },
  {
    url: 'mars-photos/api/v1/rovers/curiosity/photos',
    method: GET,
    params: '&sol=1000',
    apibase: 'https://api.nasa.gov/',
  },
  {
    url: 'search',
    method: GET,
    params: '&q=lunar',
    noAuth: true,
    apibase: 'https://images-api.nasa.gov/',
  },
  {
    url: `asset/${nasa_id}`,
    method: GET,
    noAuth: true,
    endpoint: 'asset/{nasa_id}',
    apibase: 'https://images-api.nasa.gov/',
  },
  {
    url: `metadata/${nasa_id}`,
    method: GET,
    noAuth: true,
    endpoint: 'metadata/{nasa_id}',
    apibase: 'https://images-api.nasa.gov/',
  },
  {
    url: `captions/JSC-Orion-2019-GA_V_BRoll_Highlights-00001`,
    method: GET,
    noAuth: true,
    endpoint: 'captions/{nasa_id}',
    apibase: 'https://images-api.nasa.gov/',
  },
  {
    url: 'techport/api/projects/17792',
    method: GET,
    endpoints: 'techport/api/projects/{archive_id}',
    apibase: 'https://api.nasa.gov/',
  },
  {
    url: 'tle',
    method: GET,
    noAuth: true,
    apibase: 'http://data.ivanstanojevic.me/api/',
  },
]

export default endpoints
