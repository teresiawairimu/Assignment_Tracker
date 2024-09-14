import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FooterSection = () => {
    return (
        <Container fluid className="bg-body-secondary text-center mt-5">
            <Row className="mb-5">
                <Col className="mt-4">
                    <h6 className="text-start mb-5">Assignment Tracker</h6>
                    <p className="text-start">456 Oak Street</p>
                    <p className="text-start">Springfield, IL 62701, USA</p>
                    <p className="text-start">Phone: (555) 123-4567</p>
                    <p className="text-start">Email: info@assignmenttracker.com</p>
                </Col>

                <Col className="mt-4">
                    <h6 className="text-start mb-5">Useful links</h6>
                    <div className="d-flex align-items-center">
                        <Link to="#hero" className="text-start text-decoration-none">Home</Link>
                    </div>
                    <div className="d-flex align-items-center">
                        <Link to="#features" className="text-start text-decoration-none">Features</Link>
                    </div>
                    <div className="d-flex align-items-center">
                        <Link to="#testimonials" className="text-start text-decoration-none">Testimonials</Link>
                    </div>
                </Col>

                <Col className="mt-4">
                    <p className="text-start mb-5">Follow us:</p>
                    <div className="text-start">
                    <Link to="#facebook">
                        <i 
                        className="bi bi-facebook" 
                        style={{ 
                            fontSize: '1em', 
                            marginRight: '5px', 
                            transition: 'opacity 0.5s', 
                            opacity: '0.8' }}>
                        </i>
                    </Link>

                    <Link to="#twitter">
                        <i 
                        className="bi bi-twitter-x" 
                        style={{ 
                            fontSize: '1em', 
                            marginRight: '5px', 
                            transition: 'opacity 0.5s', 
                            opacity: '0.8' }}>
                        </i>
                    </Link>
                    <Link to="#instagram">
                        <i 
                        className="bi bi-instagram" 
                        style={{ 
                            fontSize: '1em', 
                            marginRight: '5px', 
                            transition: 'opacity 0.5s', 
                            opacity: '0.8' }}>
                        </i>
                    </Link>
                    <Link to="#linkedin">
                        <i 
                        className="bi bi-linkedin" 
                        style={{ 
                            fontSize: '1em', 
                            marginRight: '5px', 
                            transition: 'opacity 0.5s', 
                            opacity: '0.8' }}>
                        </i>
                    </Link>
                    </div>
                </Col>
            </Row>
            <Row>
                <p>&copy; 2024 Assignment Tracker All Rights Reserved</p>
            </Row>
        </Container>
    );
}

export default FooterSection;
