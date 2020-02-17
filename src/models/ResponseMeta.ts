import mongoose, { Schema } from 'mongoose'

const requiredStringConfig = {
  required: true,
  type: String,
}

const requiredBoolConfig = {
  required: true,
  type: Boolean,
}

const responseMetaSchema = new Schema({
  date: { required: true, type: Date, default: Date.now },
  sessionID: requiredStringConfig,

  uri: requiredStringConfig,
  httpMethod: requiredStringConfig,

  isBreakingSelfDescriptiveness: requiredBoolConfig,

  isForgettingHypermedia: requiredBoolConfig,

  isIgnoringCaching: requiredBoolConfig,

  isIgnoringMIMEType: requiredBoolConfig,

  isIgnoringStatusCode: requiredBoolConfig,

  isMisusingCookies: requiredBoolConfig,
})

const ResponseMeta = mongoose.model(
  'ResponseMeta',
  responseMetaSchema
)

export default ResponseMeta
