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
    res.status(500).json({error: "Failed to load conversations"})
  }
})

router.get("/:id", async (req, res)=>{
  try{
    const id = req.params.id
    const user_id = req.user.id
    let sql = "SELECT * FROM conversations WHERE id = ? AND user_id = ?"
    const [rows] = await db.query(sql, [id, user_id])
    if(rows.length === 0){
      res.status(404).json({error: "Does not exist"})
      return
    }
    const conversation = rows[0]
    conversation.messages = JSON.parse(conversation.messages)
    res.json(conversation)
  } catch(error){
    res.status(500).json({error: "Failed to load conversations"})
  }
})

router.put("/:id", async (req, res)=>{
  try{
    const id = req.params.id
    const user_id = req.user.id
    const {messages} = req.body
    if(!messages){
      res.status(400).json({error: "messages required"})
      return
    }
    let sql = "UPDATE conversations SET messages = ? WHERE id = ? AND user_id = ?"
    const [result] = await db.query(sql, [JSON.stringify(messages), id, user_id])
    if(result.affectedRows === 0){
      res.status(404).json({error: "Failed to insert"})
      return
    }
    res.status(200).json({message: "Conversation updated"})
  } catch(error){
    res.status(500).json({error: "Failed to load conversations"})
  }
})

router.delete("/:id", async (req, res)=>{
  try{
    const id = req.params.id
    const user_id = req.user.id
    let sql = "DELETE FROM conversations WHERE id = ? AND user_id = ?"
    const [result] = await db.query(sql, [id, user_id])
    if(result.affectedRows === 0){
      res.status(404).json({error: "Failed to delete"})
      return
    }
    res.status(200).json({message: "Conversation deleted"})
  } catch(error){
    res.status(500).json({error: "Failed to load conversations"})
  }
})

export default router