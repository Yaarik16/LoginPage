import React, { useState } from 'react'
import styles from '../app.module.css'
import axios from 'axios'


const RegisterForm = () => {


    const [register, setRegister] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        language: '',
    })
    const handleInput = (event) => {
        setRegister({ ...register, [event.target.name]: event.target.value })
    }

    function handleSubmit(event) {
        event.preventDefault()
        axios.post('http://10.0.0.8:8000/auth/register/', register)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }
    
    return (
        <div className={styles.register}>
            <h2>Register now</h2>
            <form onSubmit={handleSubmit} className={styles.register_form}>
                <input type='text' onChange={handleInput} name='username' placeholder='Enter your username' />
                <input type='password' onChange={handleInput} name='password' placeholder='Enter your password' />
                <input type='text' onChange={handleInput} name='first_name' placeholder='Enter your first_name' />
                <input type='text' onChange={handleInput} name='last_name' placeholder='Enter your last_name' />
                <input type='text' onChange={handleInput} name='language' placeholder='Enter your language' />
                <button className={styles.btn}>Submit</button>
            </form>
        </div>
    )
}

export default RegisterForm