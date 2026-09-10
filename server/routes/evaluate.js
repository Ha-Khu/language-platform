import express from 'express'
import Anthropic from '@anthropic-ai/sdk'
import { writingScenarios } from '../writingScenarios.js'
const router = express.Router()
const client = new Anthropic()

router.post("/", async (req, res)=>{
  const {scenario, text} = req.body
  if(!scenario || !text){
    res.status(400).json({error: "scenario and text required"})
    return
  }
  const writingScenarioConfig = writingScenarios[scenario]
  if(!writingScenarioConfig){
    res.status(400).json({error: "writing scenario reqired"})
    return
  }
  try{
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: writingScenarioConfig.systemPrompt,
      messages: [{role: "user", content: text}]
    })
    const feedback = response.content[0].text
    res.json({feedback})
  } catch(error){
    console.log(error)
    res.status(500).json({error: "Ai request failed"})
  }
})

export default router