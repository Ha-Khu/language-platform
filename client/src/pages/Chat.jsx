import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Chat() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  async function handleSend() {
    const newMessages = [...messages, {role: "user", content: message}]
    setMessages(newMessages)
    const res = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: {"Content-type": "application/json",
                "Authorization": `Bearer ${token}`},
      body: JSON.stringify({messages: newMessages})
    })
    const data = await res.json()
    setMessages([... newMessages, {role: "assistant", content: data.reply}])
    setMessage("")
  }

  function handleLogout(){
    localStorage.removeItem('token')
    navigate("/login")
  }

  return (
    <div>
      <input 
      type="text" 
      value={message}
      onChange={e => setMessage(e.target.value)}
      />

      <button onClick={handleSend}>Send</button>
      <button onClick={handleLogout}>Log Out</button>

      {messages.map((m, i)=>(
        <div key={i}>
          <strong>{m.role}:</strong> {m.content}
        </div>
      ))}
    </div>
  )
  
}

export default Chat
