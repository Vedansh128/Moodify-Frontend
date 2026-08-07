import React from 'react'
import "../style/login.scss"
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const Login = () => {

    const navigate = useNavigate()

        const { handleLogin, loading } = useAuth();
        
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")

        try {
            await handleLogin({ email, password })
            navigate("/")
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Login failed")
        }
    }

  return (
    <main className="login-page">
            <div className="form-container">
               <>
    <h1>🎵 Moodify</h1>

    <p>
        Login to continue your music journey
    </p>
</>
                <form onSubmit={handleSubmit} >
                    <FormGroup
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email"
                        placeholder="Enter your email"
                    />
                    <FormGroup
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        placeholder="Enter your password"
                    />
                    <button className='button' type="submit">Login</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </main>
  )
}

export default Login
