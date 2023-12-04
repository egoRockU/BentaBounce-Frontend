import "./login.css"
import pattern from "../../../img/flower-pattern.png"
import { GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
const Login = () => {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [inputs, setInputs] = useState([])
    const navigate = useNavigate()


    useEffect(()=>{
        setInputs({'user': user, 'password': password})
    },[user, password])

    const clickSignUp = (e) => {
        e.preventDefault()
        navigate("/register")
    }

    const clickLogo = () => {
        navigate("/")
    }


    const login = (e) => {
        e.preventDefault()
        axios.post(' https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/accounts/login.php', inputs, {
            headers : {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res)=>{
            switch (res.data["status"]){
                case "success":
                    localStorage.setItem("isLoggedIn", true)
                    localStorage.setItem("user_id", res.data["user_id"])
                    localStorage.setItem("username", res.data["username"])
                    alert (res.data["message"])
                    navigate('/')
                    break
                case "failed":
                    alert (res.data["message"])
                    break
                default:
                    console.log(res.data);
            }
        })
        
    }

    const handleGoogleLogin = async (credentialResponse) => {
        var obj = jwtDecode(credentialResponse.credential)
        var googleInputs = {'user': obj.email, 'password': obj.family_name+obj.given_name}
        axios.post(' https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/accounts/login.php', googleInputs, {
            headers : {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res)=>{
            switch (res.data["status"]){
                case "success":
                    localStorage.setItem("isLoggedIn", true)
                    localStorage.setItem("user_id", res.data["user_id"])
                    localStorage.setItem("username", res.data["username"])
                    alert (res.data["message"])
                    navigate('/')
                    break
                case "failed":
                    alert ("Account NOT registered")
                    navigate('/register')
                    break
                default:
                    console.log(res.data);
            }
        })
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
                    <button className="login" onClick={login}>Log in</button>
                    <p className="forgot">Forgot Password</p>
                    <div className="design">
                        <div className="line"></div>
                        <p>OR</p>
                        <div className="line"></div>
                    </div>
                    {/* google button here */}
                    <GoogleOAuthProvider clientId="902561606959-pe62hc31n1qamkoetnrptkv0jmhi0p2q.apps.googleusercontent.com">
                        <div className="google">
                        <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            type="buttton"
                            size="medium"
                            text="continue_with"
                        />
                        </div>
                    </GoogleOAuthProvider>
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