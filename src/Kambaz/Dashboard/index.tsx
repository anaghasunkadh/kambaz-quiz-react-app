import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={3} lg={5} className="g-4">

          <Col className="wd-dashboard-course">
            <Card>
              <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/react.png" height={160} />
                <Card.Body>
                  <Card.Title className="text-nowrap overflow-hidden">CS1234 React JS</Card.Title>
                  <Card.Text className="overflow-hidden" style={{ height: "100px" }}>
                    Full Stack Software Developer
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course">
            <Card>
              <Link to="/Kambaz/Courses/2345/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/nodejs.jpeg" height={160} />
                <Card.Body>
                  <Card.Title className="text-nowrap overflow-hidden">CS2345 Node JS</Card.Title>
                  <Card.Text className="overflow-hidden" style={{ height: "100px" }}>
                    Back End Development
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course">
            <Card>
              <Link to="/Kambaz/Courses/3456/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/mongodb.jpeg" height={160} />
                <Card.Body>
                  <Card.Title className="text-nowrap overflow-hidden">CS3456 MongoDB</Card.Title>
                  <Card.Text className="overflow-hidden" style={{ height: "100px" }}>
                    Database for Web
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course">
            <Card>
              <Link to="/Kambaz/Courses/4567/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/python.webp" height={160} />
                <Card.Body>
                  <Card.Title className="text-nowrap overflow-hidden">CS4567 Python</Card.Title>
                  <Card.Text className="overflow-hidden" style={{ height: "100px" }}>
                    Programming Fundamentals
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course">
            <Card>
              <Link to="/Kambaz/Courses/5678/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/docker.png" height={160} />
                <Card.Body>
                  <Card.Title className="text-nowrap overflow-hidden">CS5678 Docker</Card.Title>
                  <Card.Text className="overflow-hidden" style={{ height: "100px" }}>
                    Containers and DevOps
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course">
            <Card>
              <Link to="/Kambaz/Courses/6789/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="public/images/AWS.avif" height={160} />
                <Card.Body>
                  <Card.Title className="text-nowrap overflow-hidden">CS6789 AWS Cloud</Card.Title>
                  <Card.Text className="overflow-hidden" style={{ height: "100px" }}>
                    Cloud Infrastructure Essentials
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course">
            <Card>
              <Link to="/Kambaz/Courses/7890/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="public/images/typescript.webp" height={160} />
                <Card.Body>
                  <Card.Title className="text-nowrap overflow-hidden">CS7890 TypeScript</Card.Title>
                  <Card.Text className="overflow-hidden" style={{ height: "100px" }}>
                    Modern Frontend Development
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

        </Row>
      </div>
    </div>
  );
}
