import { useState } from "react"
import axios from "axios"
import "./admin.css"

const AdminLogIn = () => {

    const [adminName, setAdminName] = useState('')
    const [adminPass, setAdminPass] = useState('')

    const login = (e) => {
        e.preventDefault()
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
                    console.log(res.data["data"][0].id)
                    sessionStorage.setItem("adminId", res.data["data"][0].id)
                    sessionStorage.setItem("adminName", res.data["data"][0].username)
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
                            Admin Name <br/>
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