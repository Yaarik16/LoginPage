import './App.css';
import styles from './app.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios';

function App() {
  
  useEffect(() => {
    axios.get('http://10.0.0.8:8000/auth/login/')
    .then(function(res) {
      setCurrentUser(true)
    })
    .catch(function(res) {
      setCurrentUser(false)
    })
  }, [])

  const [currentUser, setCurrentUser] = useState()
  const [registrationToggle, setRegistrationToggle] = useState(false)

  const submitLogout = (e) => {
    e.preventDefault()
    setCurrentUser(false)
  }

  function update_form_btn () {
    if (registrationToggle) {
      document.getElementById('form_btn').innerHTML = 'Register'
      setRegistrationToggle(false)
    } else {
      document.getElementById('form_btn').innerHTML = 'Log in'
      setRegistrationToggle(true)
    }
  } 

  function handleRegister(event) {
    event.preventDefault()
    axios.post('http://10.0.0.8:8000/auth/register/', register)
    .then(response => console.log(response))
    .then(function(res) {
      setCurrentUser(true)
    })
    .catch(err => console.log(err))
}
const [register, setRegister] = useState({
  username: '',
  password: '',
  first_name: '',
  last_name: '',
  language: '',
})
const handleInputReg = (event) => {
  setRegister({ ...register, [event.target.name]: event.target.value })
}

function handleLogin(event) {
  event.preventDefault()
  axios.post('http://10.0.0.8:8000/auth/login/', login)
      .then(response => console.log(response))
      .then(function(res) {
        setCurrentUser(true)
      })
      .catch(err => console.log(err))
}

  const [login, setLogin] = useState({
     username: '',
     password: '',
 })
 const handleInputLog = (event) => {
     setLogin({ ...login, [event.target.name]: event.target.value })
 }

  if (currentUser) {
    return (
      <div class={styles.wrap}>
        <form onSubmit={e => submitLogout(e)}>
        <button className={styles.btn}>Log out</button>
          </form>
        <h2>You are logged in!</h2>
      </div>
    )
  }
  return (
    <div className={styles.wrap}>
      <button id='form_btn' className={styles.btn} onClick={update_form_btn}>Register</button>
      {
        registrationToggle ? (
          <div className={styles.register}>
          <h2>Register now</h2>
          <form onSubmit={handleRegister} className={styles.register_form}>
              <input type='text' onChange={handleInputReg} name='username' placeholder='Enter your username' />
              <input type='password' onChange={handleInputReg} name='password' placeholder='Enter your password' />
              <input type='text' onChange={handleInputReg} name='first_name' placeholder='Enter your first name' />
              <input type='text' onChange={handleInputReg} name='last_name' placeholder='Enter your last name' />
              <input type='text' onChange={handleInputReg} name='language' placeholder='Enter your language' />
              <button className={styles.btn}>Submit</button>
          </form>
      </div>
        ) : (
          <div className={styles.login}>
          <h2>Log in</h2>
          <form onSubmit={handleLogin} className={styles.register_form}>
              <input type='text' onChange={handleInputLog} name='username' placeholder='Enter your username' />
              <input type='password' onChange={handleInputLog} name='password' placeholder='Enter your password' />
              <div className={styles.btns}>
                  <button className={styles.btn}>Submit</button>
              </div>
          </form>
      </div>
        )
      }
    </div>
  )
}

export default App;
