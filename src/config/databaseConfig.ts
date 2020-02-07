import mongoose from 'mongoose'

export const dbConnect = () => {
  const db = mongoose.connection

  db.on('error', (error) =>
    console.error('Database error: ' + error)
  )

  db.once('open', () => {
    console.log('Connected to database')
  })

  process.on('SIGINT', () => {
    db.close(() => {
      console.log('\nDatabase connection closed')
      process.exit(0)
    })
  })

  const connectionString =
    process.env.DB_CONNECTION_STRING || ''

  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}
