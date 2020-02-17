import mongoose, { Schema } from 'mongoose'

const requiredStringConfig = {
  required: true,
  type: String,
}

const requiredBoolConfig = {
  required: true,
  type: Boolean,
}

const requiredNumberConfig = {
  required: true,
  type: Number,
}

const responseMetaSchema = new Schema({
  date: { required: true, type: Date, default: Date.now },
  sessionID: requiredStringConfig,
  uri: requiredStringConfig,

  isBreakingSelfDescriptiveness: requiredBoolConfig,

  isIgnoringCaching: requiredBoolConfig,

  isIgnoringMIMEType: requiredBoolConfig,

  isIgnoringStatusCode: requiredBoolConfig,

  isMisusingCookies: requiredBoolConfig,

  httpMethod: requiredStringConfig,
  isUsingWrongHTTPMethod: requiredBoolConfig,
})

const ResponseMeta = mongoose.model(
  'ResponseMeta',
  responseMetaSchema
)

export default ResponseMeta
