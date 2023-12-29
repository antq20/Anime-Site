import SignUp from "../components/SignUp"
import { useState } from "react"

const SignUpPage = () =>{
    const [user,setUser]= useState(null)
    return(
        <>
        <h1>Sign Up</h1>
        <SignUp setUser={setUser}/>
        </>
    )
}

export default SignUpPage