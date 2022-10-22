import React, {useState} from 'react'
import axios from 'axios'
import AddLoginUser from './AddLoginUser'

const  login = ({token, setToken}) => {
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [addUserMode, setAddUserMode] = useState(false)

  console.log(addUserMode)

  const loginHandler = () => {
    axios({
      url:"https://fakestoreapi.com/auth/login",
      method:'POST',
      data: {
        username: userName,
        password
      }
    }).then(res => {
      console.log(res.data.token)
      setToken(res.data.token)
      localStorage.setItem("userToken", res.data.token)
    }).catch(error => {
      console.log('error:', error)
      setError(error.response.data)
    })
  }

  const activateAddUserMode = () => {
    setAddUserMode(true)
  }

  return (
    <div className='login'>
      <h2>MY TO-DO LIST</h2>
      <h4>{!addUserMode ? 'Login' : 'Add User'}</h4>
      {!addUserMode ? (
        <>
        <div className='login-inputs'>
          <input 
            className='input-username'
            type='text' 
            value={userName} 
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
          />
          <input 
            className='input-password'
            type='password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
          {error && <small>error placeholder</small>}        
          <button className='button-login' onClick={loginHandler}>Login</button>
          <button onClick={activateAddUserMode} style={{color: 'darkorchid'}}>Register New User</button>
        </div>
        </>
      ): <AddLoginUser />
      }

    </div>
  )
}

export default login