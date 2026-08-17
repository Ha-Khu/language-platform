import express from 'express'
import Anthropic from '@anthropic-ai/sdk'
const router = express.Router()
const client = new Anthropic()

const SYSTEM_PROMPT = `You are a waiter at a restaurant. The user is a language learner practicing ordering food in English. Reply in English, in character, keeping it short and natural. If the user makes a grammar or vocabulary mistake, gently correct it: reply naturally first, then add a brief correction note in Slovak.`

router.post("/", async (req, res)=>{
  const message = req.body.message
  try{
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {role: "user", content: message}
      ]
    })
    const reply = response.content[0].text
    res.json({reply})
  } catch(error){
    console.log(error)
    res.status(500).json({error: "AI request failed"})
  }
})


export default router