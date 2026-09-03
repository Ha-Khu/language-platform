import express from 'express'
import Anthropic from '@anthropic-ai/sdk'
import { scenarios } from '../scenarios.js'
const router = express.Router()
const client = new Anthropic()


router.post("/", async (req, res)=>{
  const messages = req.body.messages
  const scenario = req.body.scenario
  if(!messages || messages.length === 0){
    return res.status(400).json({error: "messages required"})
  }
  const scenarioConfig = scenarios[scenario]
  if(!scenarioConfig){
    return res.status(400).json({error: "Invalid scenario"})
  }
  try{
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: scenarioConfig.systemPrompt,
      messages
    })
    const reply = response.content[0].text
    res.json({reply})
  } catch(error){
    console.error(error)
    res.status(500).json({error: "AI request failed"})
  }
})


export default router