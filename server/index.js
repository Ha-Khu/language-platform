import 'dotenv/config'
import express from 'express'
import cors from 'cors'
const app = express()
const port = process.env.PORT
import chatRouter from './routes/chat.js'
import authRouter from './routes/auth.js'
import verifyToken from './middleware/verifyToken.js'
import conversationsRouter from './routes/conversations.js'

app.use(cors())
app.use(express.json())
app.use('/api/chat', verifyToken, chatRouter)
app.use('/api/auth', authRouter)
app.use('/api/conversations', verifyToken, conversationsRouter)

app.listen(port, ()=>{
  console.log(`Example app listening on port ${port}`)
})