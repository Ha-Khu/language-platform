import { Link } from 'react-router-dom'

function Landing(){
  return(
    <div>
      <h1>LangBuddy</h1>
      <p>Some text about this</p>

      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Landing