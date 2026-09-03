import 'dotenv/config'
import express from 'express'
import cors from 'cors'
const app = express()
const port = process.env.PORT
import chatRouter from './routes/chat.js'
import authRouter from './routes/auth.js'
import verifyToken from './middleware/verifyToken.js'
import conversationsRouter from './routes/conversations.js'
import { scenarios } from './scenarios.js'

app.use(cors())
app.use(express.json())
app.use('/api/chat', verifyToken, chatRouter)
app.use('/api/auth', authRouter)
app.use('/api/conversations', verifyToken, conversationsRouter)

app.get("/api/scenarios", (req, res)=>{
  const list = Object.entries(scenarios).map(([key, s]) =>({
    key,
    name: s.name,
    language: s.language,
    difficulty: s.difficulty
  }))
  res.json(list)
})

app.listen(port, ()=>{
  console.log(`Example app listening on port ${port}`)
})