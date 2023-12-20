import React from 'react';
import { Container, Row, Col, Card, Accordion } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class Profile extends React.Component {
  render() {
    return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Drew Stroede</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Software Developer
              </Card.Subtitle>
              <Card.Text>
              Hello, I&apos;m Drew Stroede, a Houston-based software developer with a unique background in coaching, having worked with Superbowl champions, Olympic Gold Medalists, and other elite athletes. It was during my time as an online coach that my passion for software development and data collection truly took root. Combining my experience in college athletics and an MBA, I bring a blend of discipline and business acumen to the tech world. Now, eager to leverage my skills, I aim to empower individuals by using technology to facilitate continuous self-improvement. Let&apos;s connect and explore how my blend of education, coaching experience, and tech expertise can make a meaningful impact together.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
          <Col>
            <Accordion>
              <Card>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Resume</Accordion.Header>
                  <Accordion.Body>
                    <p>Life Insurance Agent - Globe Life Liberty National</p>
                    <p>Senior Performance Coach - Future</p>
                    <p>Director of S&C - Webber International University</p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Education</Accordion.Header>
                  <Accordion.Body>
                    <p>Bachelor&apos;s - University of Wisconsin-Oshkosh</p>
                    <p>Master&apos;s in Business Administration - Webber International University</p>
                    <p>Certificate in Software Developmnt In-Progress - Code Fellows</p>
                  </Accordion.Body>
                </Accordion.Item>
              </Card>
            </Accordion>
          </Col>
        </Row>
    </Container>
    );
  }
}

export default Profile;