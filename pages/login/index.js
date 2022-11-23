import { Button, TextField } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"
export default function Login() {

    const { push } = useRouter()

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')


    const onSubmit = () => {
        if (email && password) {
            window.localStorage.setItem('logged', email)
            push('/')
        }
    }


    return (
        <div className="container">
            <div className="form">
                <h2>Welcome back</h2>
                <p className="wellcome-back">Welcome back! Please enter your details.</p>
                <p id="email" >Email</p>
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
                <Button onClick={onSubmit} id="sign-in" variant="contained" >Sign in</Button>
                <p className="dont-have-account">Don't have an account? Sign up <span>for free</span></p>
            </div>



        </div >


    )
}
