import Login from './components/Login'
import { Home } from './Home'
import { useState } from 'react'

function App() {  
  const [token, setToken] = useState(localStorage.getItem("useToken") ?? null)
  console.log(token)
  return (
    <div className="container">
      {token ? <Home setToken={setToken} /> : <Login token={token} setToken={setToken} />}      
    </div>
  )
}

export default App
