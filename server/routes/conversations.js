import express from 'express'
import db from '../db.js'
const router = express.Router()

router.post("/", async (req, res)=>{
  try{
    const {scenario, messages} = req.body
    const user_id = req.user.id
    if(!messages || !scenario){
      res.status(400).json({error: "scenario and messages required"})
      return
    }
    let sql = "INSERT INTO conversations (user_id, scenario, messages) VALUES (?, ?, ?)"
    const [result] = await db.query(sql, [user_id, scenario, JSON.stringify(messages)])
    res.status(201).json({ id: result.insertId })
  } catch(error){
    res.status(500).json({error: "Failed to save conversation"})
  }
})

router.get("/", async (req, res)=>{
  try{
    const user_id = req.user.id
    let sql = "SELECT id, scenario, created_at, updated_at FROM conversations WHERE user_id = ? ORDER BY updated_at DESC"
    const [rows] = await db.query(sql, [user_id])
    res.json(rows)
  } catch(error){
    res.status(500).json({error: "Failed to load"})
  }
})

export default router