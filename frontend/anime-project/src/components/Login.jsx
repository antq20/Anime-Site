import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {useState} from "react"
import {api} from "../utilities"
import { useNavigate } from "react-router-dom"

const LogIn= ({setUser})=>{
    const [username,setUsername]=useState("")
    const[password,setPassword]=useState("")
    const navigate=useNavigate()


    const logIn = async(e)=>{
        e.preventDefault()
        let response = await api.post("login/", {
            username:username,
            password:password
        })

        if (response.status ===200){
            console.log(response.data.user)

            setUser(response.data.user)
            localStorage.setItem("token", response.data.token)
            api.defaults.headers.common["Authorization"]= `Token ${response.data.token}`
            navigate("/")
        }else {
            alert("Invalid username or password")
        }


    }


    return (
        <Form id="loginForm" onSubmit={(e) => logIn(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control 
            style={{width:"25rem"}}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder=""
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
             style={{width:"25rem"}}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder=""
            />
          </Form.Group>
          <Button type="submit">Log In</Button>
        </Form>
      );
    };
    
    export default LogIn