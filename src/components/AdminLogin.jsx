import { useState } from "react"
import axios from "axios"
import "./admin.css"
import { useNavigate } from "react-router"

const AdminLogIn = () => {

    const [adminName, setAdminName] = useState('')
    const [adminPass, setAdminPass] = useState('')
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault()
        console.log(adminName)
        console.log(adminPass)
        const inputs = {
            'adminName': adminName,
            'adminPass': adminPass
        }
        axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/admin/adminLogin.php', inputs, {
            headers : {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res)=>{
            switch (res.data["status"]){
                case "success":
                    navigate("/adminhome")
                    console.log(res.data["data"])
                    break
                case "failed":
                    alert (res.data["message"])
                    break
                default:
                    console.log(res.data);
            }
        })
    }

    return (
        <>
            <div className="log-in-nav">
                <h1 className="titleLogIn">ADMIN LOGIN</h1>
            </div>
            <div className="surface">
                <div className="log-in-box">
                    <form onSubmit={login}>
                            <input id="adminName" type="text" onChange={(e)=>{setAdminName(e.target.value)}}/><br/>
                            Password <br/>
                            <input id="adminPassword" type="text" onChange={(e)=>{setAdminPass(e.target.value)}}/><br/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AdminLogIn