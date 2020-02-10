import mongoose, { Schema } from 'mongoose'

const requiredStringConfig = {
  required: true,
  type: String,
}

// TODO: store more types of info
const responseMetaSchema = new Schema({
  date: { required: true, type: Date, default: Date.now },
  sessionID: requiredStringConfig,
  uri: requiredStringConfig,
  status: { required: true, type: Number },
})

const ResponseMeta = mongoose.model(
  'ResponseMeta',
  responseMetaSchema
)

export default ResponseMeta
