import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import progress from '../../assets/images/progress.jpg';
import './FeaturesSection.css';

const FeaturesSection = () => {
    return (
        <section id="features">
        <Container className="fluid my-5 pt-5 pb-5 ">  
            <Row className=" align-items-center">
                <h2 className="text-center pb-5">Features</h2>
                <Col md={6}>
                    <img 
                    src={progress} 
                    alt="progress" 
                    className="img-fluid" 
                    style={{ maxWidth: '80%', height: 'auto' }}
                    />
                </Col>
                <Col md={6}>
                    <Row>
                        <Col xs={6} className="d-flex flex-column align-items-start">
                            <div className="d-flex align-items-center">
                            <i className="bi bi-list-check" style={{ fontSize: '2em', color: 'blue'}}></i>
                            <p className="ms-3">Trask Management</p>
                            </div>
                            <p className="feature-description"> 
                                Efficiently manage tasks by creating, updating, and organizing them with ease.
                                Stay on top of your workload and prioritize what's important.
                             </p>
                        </Col>
                        <Col xs={6} className="d-flex flex-column align-items-start">
                            <div className="d-flex align-items-center">
                                <i className="bi bi-graph-up" style={{fontSize: '2em', color: 'blue'}}></i>
                                <p className="ms-3">Progress Tracking</p>
                            </div>
                            <p className="feature-description">
                            Monitor your progress in real time. 
                            Visualize task completion and track overall project advancement effortlessly  
                            </p>  
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} className="d-flex flex-column align-items-start">
                            <div className="d-flex align-items-center">
                                <i className="bi bi-calendar" style={{ fontSize: '2em', color: 'blue'}}></i>
                                <p className="ms-3">Deadline Reminders</p>
                            </div>
                            <p className="feature-description">
                            Never miss a deadline again with automated reminders. 
                            Stay informed about upcoming due dates and manage your time effectively.
                            </p>
                        </Col>
                        <Col xs={6} className="d-flex flex-column align-items-start">
                            <div className="d-flex align-items-center">
                                <i className="bi bi-people-fill" style={{ fontSize: '2em', color: 'blue'}}></i>
                                <p className="ms-3">Collaboration</p>
                            </div>
                            <p className="feature-description">
                            Work seamlessly with team members by assigning tasks, sharing progress, 
                            and collaborating on projects in real time.
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} className="d-flex flex-column align-items-start">
                            <div className="d-flex align-items-center">
                                <i className="bi bi-bookmark-check" style={{ fontSize: '2em', color: 'blue'}}></i>
                                <p className="ms-3">Category Organization</p>
                            </div>
                            <p className="feature-description">
                            Organize tasks by category to keep your workflow clear and structured. 
                            Group related tasks for better project management.
                            </p>
                        </Col>
                        <Col xs={6} className="d-flex flex-column align-items-start">
                            <div className="d-flex align-items-center">
                                <i className="bi bi-graph-up-arrow" style={{ fontSize: '2em', color: 'blue'}}></i>
                                <p className="ms-3">Analytics and Reports</p>
                            </div>
                            <p className="feature-description">
                            Get insights into your productivity with detailed analytics. 
                            Generate reports to evaluate task completion rates and project efficiency.
                            </p>
                        </Col>
                    </Row>
                </Col>
            
            </Row>
        
        </Container>
        </section>
        
    );
}

export default FeaturesSection;