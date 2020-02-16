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

// TODO: store more types of info
const responseMetaSchema = new Schema({
  date: { required: true, type: Date, default: Date.now },
  sessionID: requiredStringConfig,
  uri: requiredStringConfig,

  isBreakingSelfDescriptiveness: requiredBoolConfig,

  isIgnoringCaching: requiredBoolConfig,

  isIgnoringMIMEType: requiredBoolConfig,

  expectedStatusCode: requiredNumberConfig,
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
