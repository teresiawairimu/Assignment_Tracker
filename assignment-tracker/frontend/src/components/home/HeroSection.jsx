import React from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import student from "../../assets/images/student.jpg";


const HeroSection = () => {
    return (
        <Container fluid className="my-5 pt-5 pb-5 p-5">
        <Row className="align-items-center">
        <Col md={6}>
        <h1>Track assignments easily</h1>
        <p>Keep track of your assignments and never miss a deadline</p>
        <Button href="/register" variant="primary">Get started</Button>
        </Col>
        <Col md={6} className="text-center">
        <Image 
        src={student} 
        alt="student studying" 
        className="img-fluid"
        style={{ maxWidth: '80%', height: 'auto' }}
        />
        </Col>
        </Row>
        </Container>
    );
};

export default HeroSection;