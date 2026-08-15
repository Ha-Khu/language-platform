import express from 'express'
const router = express.Router()


router.post("/", (req, res)=>{
  const message = req.body.message
  res.json({reply: message})
})

export default router