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
import evaluateRouter from './routes/evaluate.js'
import { writingScenarios } from './writingScenarios.js'

app.use(cors())
app.use(express.json())
app.use('/api/chat', verifyToken, chatRouter)
app.use('/api/auth', authRouter)
app.use('/api/conversations', verifyToken, conversationsRouter)
app.use('/api/evaluate', verifyToken, evaluateRouter)

app.get("/api/scenarios", (req, res)=>{
  const list = Object.entries(scenarios).map(([key, s]) =>({
    key,
    name: s.name,
    language: s.language,
    difficulty: s.difficulty
  }))
  res.json(list)
})

app.get("/api/writing-scenarios", (req, res)=>{
  const list = Object.entries(writingScenarios).map(([key, s])=>({
    key,
    name: s.name,
    register: s.register,
    difficulty: s.difficulty,
    task: s.task
  }))
  res.json(list)
})

app.listen(port, ()=>{
  console.log(`Example app listening on port ${port}`)
})