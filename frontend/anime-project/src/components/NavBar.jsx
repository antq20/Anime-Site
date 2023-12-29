import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function NavBar({setUser}) {
  const token= localStorage.getItem('token')
  const isLoggedIn=!!token
  const [searchQuery,setSearchQuery]=useState("")
  const [userName, setUserName]=useState(null)
  const [profileImg,setProfileImg]=useState(null)
  const navigate=useNavigate()

  const handleLogOut= ()=>{
    localStorage.removeItem('token')
    setUser(null)
    window.location.href = '/'
  }

  const handleSearch= (e) =>{
    e.preventDefault()
    navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
  }

  

    const getInfo = async()=>{
    try {
      let response = await axios.get('http://127.0.0.1:8000/api/v1/users/info/', {
        headers: {
          "Authorization": `token ${token}`,
        },
      });
      setUserName(response.data.username);
      setProfileImg(response.data.profileImg)
    } catch (error) {
      console.error('Error fetching user info', error);
    }
  }
;
getInfo()
  



  return (
    <>
    <Navbar bg="dark" data-bs-theme="dark" style={{ paddingTop: '0%', paddingBottom: '0%' }}>
      <Container id='cardContainer' fluid>
        <Navbar.Brand id='logo' href="/" style={{ fontSize: '1.5rem' }}>Anime Central</Navbar.Brand>
        <Nav className="me-auto" style={{ paddingTop: '1%' }}>
          <Nav.Link id='favoritesLink' href="/favorites/" style={{ fontSize: '1rem' }}>Favorites</Nav.Link>
          {isLoggedIn ? (
            <>
              <Nav.Link href="/profile/" style={{ fontSize: '1rem' }}>
                {userName}
                <img
                  id='profileImage'
                  src={profileImg}
                  style={{ width: '5rem', height: '5rem', marginLeft:"1rem" }}
                  alt="Profile"
                />
                <Button variant='dark' onClick={handleLogOut} style={{ fontSize: '1rem', marginLeft:'2rem'}}>Log out</Button>

              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/signup/" style={{ fontSize: '1rem' }}>Sign Up</Nav.Link>
              <Nav.Link href="/login/" style={{ fontSize: '1rem' }}>Login</Nav.Link>
            </>
          )}
        </Nav>
        <Form className="d-flex" onSubmit={handleSearch}>
          <Form.Control
            type="text"
            placeholder='Search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ fontSize: '1rem' }}
          />
          <Button type="submit" variant="outline-light" style={{ fontSize: '1rem' }}>Search</Button>
        </Form>
      </Container>
    </Navbar>
  </>
  );
}

export default NavBar;
