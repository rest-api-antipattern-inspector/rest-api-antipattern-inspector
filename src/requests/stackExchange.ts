import fetch from 'node-fetch'
import { storeResponseMeta } from '../lib/storeMeta'

export const doStackExchangeRequests = (): void => {
  stackOverflowInfo()
  relatedQuestionsSO()
}

async function stackOverflowInfo(): Promise<void> {
  const uri =
    'https://api.stackexchange.com/2.2/info?site=stackoverflow'

  storeResponseMeta(uri, await fetch(uri), 'GET', true)
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

  storeResponseMeta(uri, await fetch(uri), 'GET', true)
}
