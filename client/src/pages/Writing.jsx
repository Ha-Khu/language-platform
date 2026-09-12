import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

function Writing(){
  const [text, setText] = useState("")
  const [task, setTask] = useState("")
  const [feedback, setFeedback] = useState("")
  const {scenario} = useParams()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() =>{
    async function loadTask(){
      const res = await fetch("http://localhost:3001/api/writing-scenarios",{
        method:"GET",
        headers: {"Authorization": `Bearer ${token}`}
      })
      const data = await res.json()
      const existing = data.find((e) => e.key === scenario)
      if(existing){
        setTask(existing.task)
      }
    }
    loadTask()
  }, [])

  return(
      <p> {task} </p>
  )
}

export default Writing