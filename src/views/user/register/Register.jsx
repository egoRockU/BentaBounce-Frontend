import "./register.css"
import Google from "../../../img/google.png"
import pattern from "../../../img/flower-pattern.png"
import { useNavigate } from "react-router-dom"

const Register = () => {

    const navigate = useNavigate()

    const clickLogo = () => {
        navigate("/")
    }

    const clickLogin = (e) => {
        e.preventDefault()
        navigate("/login")
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
                <input type="text" placeholder="Phone Number"/>
                <button className="next">Next</button>
                <div className="design">
                    <div className="line"></div>
                    <p>OR</p>
                    <div className="line"></div>
                </div>
                <button className="google"><img src={Google}/>Google</button>
                <p className="footerP">By signing up, you agree to BentaBounce's</p>
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