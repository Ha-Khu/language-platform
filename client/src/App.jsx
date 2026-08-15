import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("")
  const [reply, setReply] = useState("")

  async function handleSend() {
    const res = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({message})
    })
    const data = await res.json()
    setReply(data.reply)
  }

  return (
    <div>
      <input 
      type="text" 
      value={message}
      onChange={e => setMessage(e.target.value)}
      />

      <button onClick={handleSend}>Send</button>

      <div>{reply}</div>
    </div>
  )
  
}

export default App
