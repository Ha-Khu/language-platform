import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  async function handleSend() {
    const newMessages = [...messages, {role: "user", content: message}]
    setMessages(newMessages)
    const res = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({messages: newMessages})
    })
    const data = await res.json()
    setMessages([... newMessages, {role: "assistant", content: data.reply}])
    setMessage("")
  }

  return (
    <div>
      <input 
      type="text" 
      value={message}
      onChange={e => setMessage(e.target.value)}
      />

      <button onClick={handleSend}>Send</button>

      {messages.map((m, i)=>(
        <div key={i}>
          <strong>{m.role}:</strong> {m.content}
        </div>
      ))}
    </div>
  )
  
}

export default App
