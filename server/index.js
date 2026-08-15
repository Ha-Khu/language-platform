import 'dotenv/config'
import express from 'express'
import cors from 'cors'
const app = express()
const port = process.env.PORT
import chatRouter from './routes/chat.js'

app.use(cors())
app.use(express.json())
app.use('/api/chat', chatRouter)


app.listen(port, ()=>{
  console.log(`Example app listening on port ${port}`)
})