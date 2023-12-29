import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {api} from "../utilities"

const SignUp= ({setUser})=>{
    const[email,setEmail]= useState("")
    const[password, setPassword]= useState("")
    const [username, setUsername] = useState("")
    const [firstName, setFirstName]= useState("")
    const [lastName, setLastName]= useState("")
    const navigate = useNavigate();

    const signUp= async(e)=>{
        e.preventDefault()
        let response= await api.post("signup/",{
            email:email,
            username:username,
            password:password,
        })

        if (response.status===201){
            setUser(response.data.user)
            localStorage.setItem("token", response.data.token)
            api.defaults.headers.common[
                "Authorization"
            ] = `Token ${response.data.token}`
            navigate("/")
        }
        else {
            alert("Something went wrong.")
        }
    }
    return (
        <Form id="signupForm" onSubmit={(e) => signUp(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
             style={{width:"25rem"}}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="name@example.com"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
             style={{width:"25rem"}}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="username"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
             style={{width:"25rem"}}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            />
          </Form.Group>
          <Button type="submit">Sign Up</Button>
        </Form>
      );
    };
    
    export default SignUp;
  
