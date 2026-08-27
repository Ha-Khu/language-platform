import { Link } from 'react-router-dom'

function Landing(){
  return(
    <div>
      <h1>LangBuddy</h1>
      <p>
        LangBuddy ťa učí cudzie jazyky cez reálne konverzácie. Vyber si situáciu,
        chatuj s AI partnerom a dostávaj jemné opravy chýb priamo počas rozhovoru.
       </p>

      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Landing