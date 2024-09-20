import React from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap/';
import logo from '../../assets/logo.png';


const HeaderSection = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary mb-5">
      <Container>
        <Navbar.Brand href="/">
        <Image
        src={logo}
        alt="Logo"
        width={100}
        height={100}
        className='d-inline-block align-top'
        />
        
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#testimonials">Testimonials</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/login">Sign In</Nav.Link>
            <Nav.Link href="/register">
              sign Up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderSection;