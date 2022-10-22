import React, { useState } from 'react'

const AddLoginUser = () => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [completed, setCompleted] = useState(false)

  const handleFormSubmit = () => {
    axios({
      url:"https://fakestoreapi.com/users",
      method:'POST',  
      data: {
        email,
        username: userName,
        password,
        name: {
          firstname: firstName,
          lastname: lastName
        },
        address:{
          city:'kilcoole',
          street:'7835 new road',
          number:3,
          zipcode:'12926-3874',
          geolocation:{
              lat:'-37.3159',
              long:'81.1496'
          }
        },
        phone:'1-570-236-7033'
      }
    }) .then(res=>res.json())
      .then(json=>console.log(json))
  }

  return (
    <form onSubmit={handleFormSubmit} style={{paddingTop: '20px'}}>
        <div className="wrapper">
          <label>email</label>
          <input 
            type="text"
            id="email"
            className="input"
            value={email}
            onInput={(e) => setEmail(e.target.value)}
            required
            autoFocus
            maxLength={50}
            placeholder="Email"
          /><br />
          <label>firstname</label>
          <input 
            type="text"
            id="firstname"
            className="input"
            value={firstName}
            onInput={(e) => setFirstName(e.target.value)}
            required
            autoFocus
            maxLength={50}
            placeholder="firstName"
          /><br />
          <label>lastname</label>
          <input 
            type="text"
            id="lastname"
            className="input"
            value={lastName}
            onInput={(e) => setLastName(e.target.value)}
            required
            autoFocus
            maxLength={50}
            placeholder="lastname"
          /><br />
          <label>username</label>
          <input 
            type="text"
            id="username"
            className="input"
            value={userName}
            onInput={(e) => setUserName(e.target.value)}
            required
            autoFocus
            maxLength={50}
            placeholder="username"
          /><br />
          <label>password</label>
          <input 
            type="text"
            id="password"
            className="input"
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            required
            autoFocus
            maxLength={50}
            placeholder="password"
          /><br />
        </div>
        <button 
          className="btn"
          aria-label="Add Task"
          type="submit"
          style={{color:'white'}}
        >
          Add User
        </button>
    </form>
  )
}

export default AddLoginUser