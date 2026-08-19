import express from 'express'
import bcrypt from 'bcrypt'
import db from '../db.js'
const router = express.Router()

router.post("/register", async (req, res)=>{
  try{
    const {name, email, password} = req.body
    if(!name || !email || !password){
      res.status(400).json({error: "name, email and password required"})
      return
    }
    let checkMail = "SELECT * FROM users WHERE email = ?"
    const [rows] = await db.query(checkMail, [email])
    if(rows.length > 0) {
      res.status(400).json({error: "Email already exists"})
      return
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    let sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
    await db.query(sql, [name, email, hashedPassword])
    res.status(201).json({message: "User registered successfully"})
  } catch (error){
    res.status(500).json({error: "Registration failed"})
  }
})

export default router