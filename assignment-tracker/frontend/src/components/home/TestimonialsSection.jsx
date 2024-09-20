import React from 'react';
import { Image, Container, Carousel } from 'react-bootstrap';
import student1 from '../../assets/images/student1.jpg';
import student2 from '../../assets/images/student2.jpg';
import student3 from '../../assets/images/student3.jpg';

const TestimonialsSection = () => {
    return (
        <section id="testimonials" className="mt-5 mb-5 py-5">
        <Container>
            <div className="text-center">
                <h1 className="p-2">Testimonials</h1>
                <p className="p-2">What our users are saying</p>
            </div>
            <Carousel>
                <Carousel.Item interval={3000}> 
                    <div className="d-flex justify-content-center">
                        <Image
                        src={student1}
                        alt="University Student"
                        className="img-fluid"
                        style={{ maxWidth: '30%', height: 'auto' }}
                        />
                    </div>
                    <div className="text-center mb-5">
                        <h5>Jane Doe</h5>
                        <h6>University Student</h6>
                        <p>
                            This app has been a lifesaver for managing school assignments. 
                            I can track my deadlines, organize tasks by categories, 
                            and even collaborate with classmates. 
                            It's like having a personal assistant for schoolwork!
                        </p>
                    </div>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <div className="d-flex justify-content-center">
                        <Image
                        src={student2}
                        alt="College Student"
                        className="img-fluid"
                        style={{ maxWidth: '30%', height: 'auto' }}
                        />
                    </div>
                    <div className="text-center mb-5">
                        <h5>John Smith</h5>
                        <h6>College Student</h6>
                        <p>
                        This assignment tracker has completely transformed the way I manage my tasks. 
                        The user-friendly interface, coupled with powerful features like deadline reminders 
                        and progress tracking, has made staying on top of my workload so much easier.
                        Highly recommended!
                        </p>
                    </div>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <div className="d-flex justify-content-center">
                        <Image
                        src={student3}
                        alt="University Student"
                        className="img-fluid"
                        style={{ maxWidth: '30%', height: 'auto' }}
                        />
                    </div>
                    <div className="text-center mb-5">
                        <h5>Emily Brown</h5>
                        <h6>University Student</h6>
                        <p>
                        I’ve been using this app for a few months now, 
                        and it’s been a game-changer for collaboration within our team. 
                        The ability to assign tasks and track progress has significantly boosted our productivity. 
                        </p>
                    </div>
                </Carousel.Item>            
            
            </Carousel>
        </Container>
        </section>
    );
}

export default TestimonialsSection;