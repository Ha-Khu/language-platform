import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  async function handleLogin(){
    try{
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({email, password})
      })
      if(!res.ok){
        setError("Login failed, please try again")
        return
      }
      const data = await res.json()
      localStorage.setItem('token', data.token)
      navigate("/chat")
    }catch(error){
      setError("Login failed, please try again")
    }
  }

  return(
    <div>
      <input 
      type="email"
      placeholder='you@example.com'
      value={email}
      onChange={(e) => setEmail(e.target.value)} 
      />

      <input 
      type="password" 
      placeholder='*******'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <p>{error}</p>
      )}

      <button onClick={handleLogin}>
        Sign In
      </button>
    </div>
  )
}

export default Login