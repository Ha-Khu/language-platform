import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Scenarios(){
  const [scenarios, setScenarios] = useState([])
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

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

  function selectScenario(key){
    navigate(`/chat/${key}`)
  }

  return(
    <div>
      {scenarios.map(s =>(
        <div key={s.key} onClick={() => selectScenario(s.key)}>
          {s.name} - {s.difficulty} - {s.language}
        </div>
      ))}
    </div>
  )

}

export default Scenarios