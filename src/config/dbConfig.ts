import dotenv from 'dotenv'
import mongoose from 'mongoose'

export const dbConnect = () => {
  const db = mongoose.connection

  db.on('error', (error) =>
    console.error('Database error: ' + error)
  )

  db.once('open', () => {
    console.log('Connected to DB')
  })

  process.on('SIGINT', () => {
    db.close(() => {
      console.log('\nDB connection closed')
      process.exit(0)
    })
  })

  dotenv.config()

  const connectionString =
    process.env.DB_CONNECTION_STRING || ''

  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}
