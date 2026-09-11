import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function WritingScenarios(){
  const [writingScenario, setWritingScenario] = useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(()=>{
    async function loadWritingScenarios(){
      const res = await fetch("http://localhost:3001/api/writing-scenarios", {
        method: "GET",
        headers: {"Authorization": `Bearer ${token}`}
      })
      setWritingScenario(await res.json())
    }
    loadWritingScenarios()
  }, [])

  function selectWritingScenario(key){
    navigate(`/writing/${key}`)
  }

  return(
    <div>
      {writingScenario.map(w => (
        <div key={w.key} onClick={() => selectWritingScenario(w.key)}>
          {w.name} - {w.register} - {w.difficulty}
        </div>
      ))}
    </div>
  )
}

export default WritingScenarios