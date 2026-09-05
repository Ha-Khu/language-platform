import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Scenarios(){
  const [scenarios, setScenarios] = useState([])
  const token = localStorage.getItem('token')

  useEffect(()=>{
    async function loadScenarios(){
      const res = await fetch("http://localhost:3001/api/scenarios", {
        method: "GET",
        headers: {"Authorization": `Bearer ${token}`}
      })

      setScenarios(await res.json())
    }
    loadScenarios()
  }, [])

  return(
    <div>
      {scenarios.map(s =>(
        <div key={s.key}>
          {s.name} - {s.difficulty} - {s.language}
        </div>
      ))}
    </div>
  )

}

export default Scenarios