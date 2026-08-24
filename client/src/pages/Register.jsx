import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register(){
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [error, setError] = useState("")
const navigate = useNavigate()

async function handleRegister() {
  try{
    const res = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({name, email, password})
    })
    if(!res.ok){
      setError("Register failed")
      return
    }
    navigate("/login")
  } catch(error){
    setError("Register failed")
  }
}

return(
  <div>
    <input 
     type="text"
     placeholder='name'
     value={name}
     onChange={(e) => setName(e.target.value)} 
    />

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

      <button onClick={handleRegister}>Register</button>

  </div>
)

}

export default Register