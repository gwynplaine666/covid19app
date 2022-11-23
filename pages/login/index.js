import { Button, TextField, Alert } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"
export default function Login() {

    const { push } = useRouter()

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')


    const onSubmit = () => {
        if (email && password) {
            window.localStorage.setItem('logged', email)
            window.localStorage.setItem('user', JSON.stringify({email, password}) )
            push('/')
        }
    }


    return (
        <div className="container">
            <div className="form">
                <h2>Welcome!</h2>
                <p className="wellcome-back">Welcome! Please enter your details.</p>
                <p id="email" >Email</p>
                {!email.includes('@') && <Alert severity="warning">Please, enter valid email</Alert>}
                <TextField
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    fullWidth type='email' placeholder="Enter your email" />
                <p id="password">Password</p>
                <TextField
                    value={password}
                    placeholder="Enter your password"
                    onChange={event => setPassword(event.target.value)}
                    fullWidth type='password' />
                <Button disabled={!email.includes('@')} onClick={onSubmit} id="sign-in" variant="contained" >Sign up</Button>
            </div>



        </div >


    )
}
