import "./login.css"
import Google from "../../../img/google.png"
import pattern from "../../../img/flower-pattern.png"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
const Login = () => {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const clickSignUp = (e) => {
        e.preventDefault()
        navigate("/register")
    }

    const clickLogo = () => {
        navigate("/")
    }

    return (
        <>
            <img className="pattern" src={pattern} />
            <nav>
                <h1 className="logo" onClick={clickLogo}>BENTABOUNCE</h1>
                <h1>Log In</h1>
            </nav>

            <div className="container">
                <div className="modal">
                    <h1>Login</h1>
                    <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="Phone Number / Email Address" type="text" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
                    <button className="login">Log in</button>
                    <p className="forgot">Forgot Password</p>
                    <div className="design">
                        <div className="line"></div>
                        <p>OR</p>
                        <div className="line"></div>
                    </div>
                    <button className="google"><img src={Google}/>Google</button>
                    <div className="footer">
                        <p>New to BentaBounce?</p>
                        <a href="" onClick={clickSignUp}>Sign Up</a>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Login