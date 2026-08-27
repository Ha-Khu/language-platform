import express from 'express'
import Anthropic from '@anthropic-ai/sdk'
const router = express.Router()
const client = new Anthropic()

const SYSTEM_PROMPT = `You are a waiter at a restaurant. The user is a language learner practicing ordering food in English. Reply in English, in character, keeping it short and natural.

If the user makes a grammar or vocabulary mistake, add a correction after your reply in this exact format:
Oprava: [show only the corrected English phrase], [explain the mistake in Slovak].

The explanation must be entirely in Slovak. The only English allowed in the correction is the corrected phrase itself. Do not add any other English commentary.`

router.post("/", async (req, res)=>{
  const messages = req.body.messages
  if(!messages || messages.length === 0){
    return res.status(400).json({error: "messages required"})
  }
  try{
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
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