import fs from 'fs'
import { parseStringPromise } from 'xml2js'
import IStatusCombo from '../interfaces/IStatusCombo'

export const getStandardCombos = (): Promise<IStatusCombo[]> =>
  new Promise(async (resolve) => {
    const xmlStatusCombos = fs.readFileSync(
      './data-files/statuscodes.xml',
      'utf8'
    )

    const parsedXml = await parseStringPromise(xmlStatusCombos)
    resolve(parsedXml['statuscodes']['statuscode'])
  })
