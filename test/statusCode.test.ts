import { isIgnoringStatusCode } from '../src/lib/designAntipatternDetectors'
import { HTTPMethods } from '../src/enums/HTTPMethods'
import { getStandardCombos } from '../src/data-access-layer/standardCombos'
import IStatusCombo from '../src/interfaces/IStatusCombo'

///

// TRUE

///

test('Ignoring Status Code: true, GET 201', async () => {
  const statusCombos: IStatusCombo[] = await getStandardCombos()
  expect(
    isIgnoringStatusCode(HTTPMethods.GET, 201, 'created', statusCombos)
  ).toBeTruthy()
})

test('Ignoring Status Code: true, POST 200', async () => {
  const statusCombos: IStatusCombo[] = await getStandardCombos()
  expect(
    isIgnoringStatusCode(HTTPMethods.POST, 200, 'ok', statusCombos)
  ).toBeTruthy()
})

test('Ignoring Status Code: true, DELETE 201', async () => {
  const statusCombos: IStatusCombo[] = await getStandardCombos()
  expect(
    isIgnoringStatusCode(HTTPMethods.DELETE, 201, 'created', statusCombos)
  ).toBeTruthy()
})

///

// FALSE

///

test('Ignoring Status Code: false, GET 200', async () => {
  const statusCombos: IStatusCombo[] = await getStandardCombos()
  expect(
    isIgnoringStatusCode(HTTPMethods.GET, 200, 'ok', statusCombos)
  ).toBeFalsy()
})

test('Ignoring Status Code: false, POST 201', async () => {
  const statusCombos: IStatusCombo[] = await getStandardCombos()
  expect(isIgnoringStatusCode(HTTPMethods.POST, 201)).toBeFalsy()
})

test('Ignoring Status Code: false, PUT 201', async () => {
  const statusCombos: IStatusCombo[] = await getStandardCombos()
  expect(isIgnoringStatusCode(HTTPMethods.PUT, 201)).toBeFalsy()
})

test('Ignoring Status Code: false, PUT 200', async () => {
  const statusCombos: IStatusCombo[] = await getStandardCombos()
  expect(isIgnoringStatusCode(HTTPMethods.PUT, 200)).toBeFalsy()
})

test('Ignoring Status Code: false, PATCH 201', async () => {
  const statusCombos: IStatusCombo[] = await getStandardCombos()
  expect(isIgnoringStatusCode(HTTPMethods.PATCH, 201)).toBeFalsy()
})

test('Ignoring Status Code: false, PATCH 200', async () => {
  const statusCombos: IStatusCombo[] = await getStandardCombos()
  expect(isIgnoringStatusCode(HTTPMethods.PATCH, 200)).toBeFalsy()
})

test('Ignoring Status Code: false, DELETE 200', async () => {
  const statusCombos: IStatusCombo[] = await getStandardCombos()
  expect(isIgnoringStatusCode(DELETE, 200)).toBeFalsy()
})

test('Ignoring Status Code: false, OPTIONS 200', async () => {
  const statusCombos: IStatusCombo[] = await getStandardCombos()
  expect(isIgnoringStatusCode('OPTIONS', 200)).toBeFalsy()
})
