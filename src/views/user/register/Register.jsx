import "./register.css"
import { GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import pattern from "../../../img/flower-pattern.png"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [inputs, setInputs] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        setInputs({'username': username,'email': email, 'password': password})
    },[username, email, password])

    const clickLogo = () => {
        navigate("/")
    }

    const signUp = (e) => {
        e.preventDefault()
        if (password === confirmPass){
            axios.post(' https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/accounts/signup.php', inputs, {
            headers : {
                "ngrok-skip-browser-warning": "8888"
            }
            }).then((res)=>{
                switch (res.data["status"]){
                    case "failed":
                        alert (res.data["message"])
                        break
                    case "success":
                        alert (res.data["message"])
                        navigate("/login")
                        break
                    default:
                        console.log(res.data);
                }})

        } else {
            alert ('Make sure the password matches')
        }
    }
    

    const clickLogin = (e) => {
        e.preventDefault()
        navigate("/login")
    }

    const handleGoogleRegister = async (credentialResponse) => {
        var obj = jwtDecode(credentialResponse.credential)
        var googleInputs = {'username': obj.name, 'email': obj.email, 'password': obj.family_name+obj.given_name}
        axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/accounts/signup.php', googleInputs, {
            headers : {
                "ngrok-skip-browser-warning": "8888"
            }
            }).then((res)=>{
                switch (res.data["status"]){
                    case "failed":
                        alert (res.data["message"])
                        break
                    case "success":
                        alert (res.data["message"])
                        navigate("/login")
                        break
                    default:
                        console.log(res.data);
                }})
    }

    return (
        <>
        <img className="pattern" src={pattern} />
        <nav>
            <h1 className="logo" onClick={clickLogo}>BENTABOUNCE</h1>
            <h1>Sign Up</h1>
        </nav>
        <div className="container">
            <div className="modal">
                <h1>Sign Up</h1>
                <form onSubmit={signUp}>
                    <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" required/>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required/>
                    <input type="password" minLength="6" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                    <input type="password" minLength="6" onChange={(e) => setConfirmPass(e.target.value)} placeholder="Confirm Password" required/>
                    <button className="next">Sign Up</button>
                </form>
                    <div className="design">
                        <div className="line"></div>
                        <p>OR</p>
                        <div className="line"></div>
                    </div>
                <GoogleOAuthProvider clientId="902561606959-pe62hc31n1qamkoetnrptkv0jmhi0p2q.apps.googleusercontent.com">
                        <div className="google">
                        <GoogleLogin
                            onSuccess={handleGoogleRegister}
                            type="buttton"
                            size="medium"
                            text="signup_with"
                        />
                        </div>
                </GoogleOAuthProvider>
                <p className="footerP">By signing up, you agree to BentaBounce&apos;s</p>
                <div className="privacy"><a href="http://">Terms and Condition</a> & <a href="http://">Privacy Policy</a></div>
                <div className="footer">
                    <p>Have an Account?</p>
                    <a onClick={clickLogin} href="">Log In</a>
                </div>
            </div>
        </div>
        </>
    )
}

export default Register