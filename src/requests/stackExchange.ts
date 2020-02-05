import fetch, { Response } from 'node-fetch'

export const doStackExchangeRequests = (): void => {
  stackOverflowInfo()
  relatedQuestionsSO()
}

function logInfo(uri: string, res: Response): void {
  console.log('\n')
  console.log(uri)
  console.log(res.status)
  console.log(res.headers)
}

async function stackOverflowInfo(): Promise<void> {
  const uri =
    'https://api.stackexchange.com/2.2/info?site=stackoverflow'

  logInfo(uri, await fetch(uri))
}

/**
 * Related questions to these 3 questions:
 * https://stackoverflow.com/questions/60075228/exchange-different-arrays-elements-in-ruby
 * https://stackoverflow.com/questions/60075237/best-way-to-handle-an-account-linking-verification-system
 * https://stackoverflow.com/questions/57496313/execution-failed-for-task-appmergedebugresources-com-android-builder-interna
 */
async function relatedQuestionsSO(): Promise<void> {
  const uri =
    'https://api.stackexchange.com/2.2/questions/60075228;60075237;57496313/related?order=desc&sort=activity&site=stackoverflow'

  logInfo(uri, await fetch(uri))
}
