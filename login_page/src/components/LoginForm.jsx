import React, { useState } from 'react'
import styles from '../app.module.css'
import axios from 'axios'

const LoginForm = () => {
     const [login, setLogin] = useState({
        username: '',
        password: '',
    })
    const handleInput = (event) => {
        setLogin({ ...login, [event.target.name]: event.target.value })
    }
    function handleSubmit(event) {
        event.preventDefault()
        axios.post('http://10.0.0.8:8000/auth/login/', login)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.login}>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit} className={styles.register_form}>
                <input type='text' onChange={handleInput} name='username' placeholder='Enter your username' />
                <input type='password' onChange={handleInput} name='password' placeholder='Enter your password' />
                <div className={styles.btns}>
                    <button className={styles.btn}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm