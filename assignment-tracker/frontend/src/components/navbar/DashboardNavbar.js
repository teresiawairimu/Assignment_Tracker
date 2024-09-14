import React from 'react';
import {Button, Container, Navbar, Nav} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import logo from '../../assets/logo.png';


const DashboardNavbar = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try{
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
         <img 
         src={logo}
         width={100} 
         height={100}
         className='d-inline-block align-top'
         alt="Logo" 

         />
         </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/category">Category</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="#settings">Settings</Nav.Link>  
          </Nav>
          <Nav>
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DashboardNavbar;