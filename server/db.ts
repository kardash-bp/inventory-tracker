import mongoose from 'mongoose'
console.log(process.env.MONGO_API_KEY)

class Database {
  constructor() {
    this.connect()
  }
  async connect() {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI!)
      if (!conn) {
        throw new Error('Not connected to db!')
      }
      console.log(`MongoDB connected ${conn.connection.host}`)
    } catch (err: any) {
      console.log(`error: ${err.message}`)
    }
  }
}
export default new Database()
