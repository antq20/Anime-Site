import LogIn from "../components/Login"
import { useOutletContext } from "react-router-dom"
const LoginPage = () =>{
    const {user,setUser}= useOutletContext()
    return(
        <>
        <h1>Login</h1>
        <LogIn setUser={setUser}/>
        </>
    )
}

export default LoginPage