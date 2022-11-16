import express from 'express'
import * as dotenv from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
dotenv.config()
const app = express()
import './db'

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('test')
})
const port = process.env.PORT || 4001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
