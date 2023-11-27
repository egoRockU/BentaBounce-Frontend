import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./views/user/login/Login"
import Register from "./views/user/register/Register"
import Home from "./views/user/home/Home"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
