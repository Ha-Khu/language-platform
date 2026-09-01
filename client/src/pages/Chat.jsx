import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Chat() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [conversationId, setConversationId] = useState(null)
  const [conversations, setConversations] = useState([])
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
    const finalMessages = [... newMessages, {role: "assistant", content: data.reply}]
    setMessages(finalMessages)
    setMessage("")

    if(conversationId === null){
      const newCon = await fetch("http://localhost:3001/api/conversations", {
        method: "POST",
        headers: {"Content-type": "application/json",
                  "Authorization": `Bearer ${token}`},
        body: JSON.stringify({scenario: "restaurant", messages: finalMessages})
      })
      const conData = await newCon.json()
      setConversationId(conData.id)
    } else {
      const exiCon = await fetch(`http://localhost:3001/api/conversations/${conversationId}`, {
        method: "PUT",
        headers: {"Content-type": "application/json",
                  "Authorization": `Bearer ${token}`},
        body: JSON.stringify({messages: finalMessages})
      })
    }
  }

  useEffect(() =>{
    async function loadConversations(){
      const res = await fetch("http://localhost:3001/api/conversations", {
        method: "GET",
        headers: {"Authorization" : `Bearer ${token}`}
      })
      const data = await res.json()
      setConversations(data)
    }
    loadConversations()
  }, [])

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

      <div>
        {conversations.map(c =>(
          <div key={c.id}>
            {c.scenario} - {c.updated_at}
          </div>
        ))}
      </div>
    </div>
  )
  
}

export default Chat
